import crypto from 'node:crypto';

export const CROCKFORD_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
export const EPOCH_MS = 1767225600000; // 2026-01-01 00:00:00 UTC
export const MS_PER_DAY = 86400000;
export const FOREVER_DAY = 0xFFFF; // 65535 = Forever / Lifetime

/**
 * Normalizes a string according to Crockford Base32 rules:
 * - uppercase
 * - remove spaces and dashes
 * - map O -> 0
 * - map I -> 1, L -> 1
 */
export function normalizeCrockford(str) {
  if (!str) return '';
  return String(str)
    .toUpperCase()
    .replace(/[\s-]/g, '')
    .replace(/O/g, '0')
    .replace(/[IL]/g, '1');
}

/**
 * Checks if a string is valid 16-character Crockford Base32 (after normalization)
 */
export function isValidCrockford16(str) {
  const clean = normalizeCrockford(str);
  if (clean.length !== 16) return false;
  for (let i = 0; i < 16; i++) {
    if (!CROCKFORD_ALPHABET.includes(clean[i])) return false;
  }
  return true;
}

/**
 * Formats a 16-char Crockford string into 4x4 groups: ABCD-EFGH-JKMN-PQRS
 */
export function formatCrockford16(str) {
  const clean = normalizeCrockford(str);
  if (clean.length !== 16) return clean;
  return `${clean.slice(0, 4)}-${clean.slice(4, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}`;
}

/**
 * Encodes 10 bytes (80 bits) into 16 Crockford Base32 characters
 */
export function encodeCrockford80(bufferOrUint8Array) {
  const bytes = Uint8Array.from(bufferOrUint8Array);
  if (bytes.length < 10) {
    throw new Error('Expected at least 10 bytes (80 bits)');
  }
  let result = '';
  let buffer = 0;
  let bitsLeft = 0;
  for (let i = 0; i < 10; i++) {
    buffer = (buffer << 8) | bytes[i];
    bitsLeft += 8;
    while (bitsLeft >= 5) {
      bitsLeft -= 5;
      result += CROCKFORD_ALPHABET[(buffer >> bitsLeft) & 0x1F];
    }
  }
  return result.slice(0, 16);
}

/**
 * Decodes 16 Crockford Base32 characters into 10 bytes (80 bits)
 */
export function decodeCrockford80(str) {
  const clean = normalizeCrockford(str);
  if (clean.length !== 16) {
    throw new Error('Expected 16 Crockford characters');
  }
  const bytes = new Uint8Array(10);
  let buffer = 0;
  let bitsLeft = 0;
  let byteIndex = 0;
  for (let i = 0; i < 16; i++) {
    const val = CROCKFORD_ALPHABET.indexOf(clean[i]);
    if (val === -1) {
      throw new Error(`Invalid Crockford character: ${clean[i]}`);
    }
    buffer = (buffer << 5) | val;
    bitsLeft += 5;
    if (bitsLeft >= 8) {
      bitsLeft -= 8;
      bytes[byteIndex++] = (buffer >> bitsLeft) & 0xFF;
    }
  }
  return bytes;
}

/**
 * Computes an activation code with optional expiration:
 * - days: null / undefined / 0 -> Forever (FOREVER_DAY = 65535)
 * - days: integer > 0 -> Expires in N days from today
 *
 * Payload: 16-bit uint (expiryDay) + 64-bit HMAC-SHA256 signature
 */
export function computeActivationCode(deviceId, secret, days = null) {
  if (!secret) {
    throw new Error('ACTIVATION_SECRET is not configured');
  }
  const cleanDeviceId = normalizeCrockford(deviceId);
  if (!isValidCrockford16(cleanDeviceId)) {
    throw new Error(`Invalid Device ID format: "${deviceId}". Expected 16 Crockford Base32 characters.`);
  }

  let expiryDay = FOREVER_DAY;
  if (typeof days === 'number' && days > 0) {
    const nowDay = Math.floor((Date.now() - EPOCH_MS) / MS_PER_DAY);
    expiryDay = nowDay + days;
  } else if (typeof days === 'number' && days < 0) {
    // For unit testing expired codes
    const nowDay = Math.floor((Date.now() - EPOCH_MS) / MS_PER_DAY);
    expiryDay = nowDay + days;
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${cleanDeviceId}:${expiryDay}`, 'utf8');
  const digest = hmac.digest(); // 32 bytes

  const bytes = new Uint8Array(10);
  bytes[0] = (expiryDay >> 8) & 0xFF;
  bytes[1] = expiryDay & 0xFF;
  for (let i = 0; i < 8; i++) {
    bytes[i + 2] = digest[i];
  }

  return encodeCrockford80(bytes);
}

/**
 * Verifies activation code against deviceId and secret:
 * Returns: { ok: boolean, reason?: string, isForever?: boolean, expiryDate?: Date }
 */
export function verifyActivationCodeDetailed(deviceId, userCode, secret) {
  if (!secret) return { ok: false, reason: 'missing_secret' };
  const cleanDeviceId = normalizeCrockford(deviceId);
  const cleanCode = normalizeCrockford(userCode);
  if (!isValidCrockford16(cleanDeviceId) || !isValidCrockford16(cleanCode)) {
    return { ok: false, reason: 'invalid_format' };
  }

  try {
    const bytes = decodeCrockford80(cleanCode);
    const expiryDay = (bytes[0] << 8) | bytes[1];
    const givenDigest = Buffer.from(bytes.subarray(2, 10));

    // Verify time-bound HMAC
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(`${cleanDeviceId}:${expiryDay}`, 'utf8');
    const expectedDigest = hmac.digest().subarray(0, 8);

    if (crypto.timingSafeEqual(expectedDigest, givenDigest)) {
      if (expiryDay === FOREVER_DAY) {
        return { ok: true, isForever: true };
      }
      const expiryTimestamp = EPOCH_MS + (expiryDay + 1) * MS_PER_DAY - 1;
      const expiryDate = new Date(expiryTimestamp);
      if (Date.now() > expiryTimestamp) {
        return { ok: false, reason: 'expired', expiryDate };
      }
      return { ok: true, isForever: false, expiryDate };
    }
  } catch (err) {}

  // Fallback: Legacy v1 pure HMAC check (guarantees backward compatibility)
  try {
    const legacyHmac = crypto.createHmac('sha256', secret);
    legacyHmac.update(cleanDeviceId, 'utf8');
    const legacyExpected = encodeCrockford80(legacyHmac.digest().subarray(0, 10));
    const bufExpected = Buffer.from(legacyExpected, 'utf8');
    const bufUser = Buffer.from(cleanCode, 'utf8');
    if (bufExpected.length === bufUser.length && crypto.timingSafeEqual(bufExpected, bufUser)) {
      return { ok: true, isForever: true, isLegacy: true };
    }
  } catch (err) {}

  return { ok: false, reason: 'invalid_signature' };
}

/**
 * Boolean wrapper for backward compatibility
 */
export function verifyActivationCode(deviceId, userCode, secret) {
  return verifyActivationCodeDetailed(deviceId, userCode, secret).ok;
}
