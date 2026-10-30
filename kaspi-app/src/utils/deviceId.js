export const CROCKFORD_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

/**
 * Normalizes input string to Crockford Base32:
 * - uppercase
 * - remove spaces and dashes
 * - O -> 0
 * - I -> 1, L -> 1
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
 * Formats 16-character string into 4x4 groups: ABCD-EFGH-JKMN-PQRS
 */
export function formatCrockford16(str) {
  const clean = normalizeCrockford(str);
  if (clean.length !== 16) return clean;
  return `${clean.slice(0, 4)}-${clean.slice(4, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}`;
}

/**
 * Validates if string has 16 valid Crockford characters
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
 * Encodes 10 bytes (80 bits) into 16 Crockford Base32 characters
 */
export function encodeCrockford80(bytes) {
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
 * Retrieves existing device ID from localStorage or creates a persistent new 80-bit Crockford ID.
 * Never regenerates if one already exists.
 */
export function getOrCreateDeviceId() {
  if (typeof window === 'undefined') return '';
  try {
    const existing = localStorage.getItem('device_id');
    if (existing && isValidCrockford16(existing)) {
      return formatCrockford16(existing);
    }
  } catch (e) {}

  // Generate 80 bits (10 bytes) using crypto.getRandomValues
  const bytes = new Uint8Array(10);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 10; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }

  const raw16 = encodeCrockford80(bytes);
  const formatted = formatCrockford16(raw16);

  try {
    localStorage.setItem('device_id', formatted);
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().catch(() => {});
    }
  } catch (e) {}

  return formatted;
}

/**
 * Detects if user is on iPhone or iPad
 */
export function isIosDevice() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isIos = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  return isIos;
}

/**
 * Detects if app is launched from Home Screen as standalone PWA
 */
export function isStandaloneApp() {
  if (typeof window === 'undefined') return false;
  return Boolean(
    window.navigator.standalone === true ||
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
  );
}
