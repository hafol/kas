import {
  normalizeCrockford,
  isValidCrockford16,
  verifyActivationCodeDetailed
} from './_crypto.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  // Parse body safely
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false });
    }
  }
  const { deviceId, code } = body || {};

  if (!deviceId || !code) {
    return res.status(400).json({ ok: false });
  }

  const cleanDeviceId = normalizeCrockford(deviceId);
  const cleanCode = normalizeCrockford(code);

  if (!isValidCrockford16(cleanDeviceId) || !isValidCrockford16(cleanCode)) {
    return res.status(400).json({ ok: false });
  }

  const secret = process.env.ACTIVATION_SECRET;
  if (!secret) {
    console.error('ACTIVATION_SECRET is not set in environment variables');
    return res.status(500).json({ ok: false, error: 'Server configuration error' });
  }

  // Check REVOKED_DEVICE_IDS (comma-separated list)
  const revoked = (process.env.REVOKED_DEVICE_IDS || '')
    .split(',')
    .map(s => normalizeCrockford(s))
    .filter(Boolean);

  if (revoked.includes(cleanDeviceId)) {
    return res.status(403).json({ ok: false, error: 'revoked' });
  }

  const result = verifyActivationCodeDetailed(cleanDeviceId, cleanCode, secret);
  if (result.ok) {
    return res.status(200).json({ ok: true, isForever: Boolean(result.isForever) });
  }

  if (result.reason === 'expired') {
    return res.status(403).json({ ok: false, error: 'expired' });
  }

  return res.status(401).json({ ok: false, error: 'invalid' });
}
