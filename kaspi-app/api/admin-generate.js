import crypto from 'node:crypto';
import {
  normalizeCrockford,
  isValidCrockford16,
  formatCrockford16,
  computeActivationCode,
  EPOCH_MS,
  MS_PER_DAY
} from './_crypto.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }
  }

  const { password, deviceId, days } = body || {};

  // Check admin password
  const expectedPassword = process.env.ADMIN_PASSWORD || '20100723Para@';
  const bufGiven = Buffer.from(String(password || ''), 'utf8');
  const bufExpected = Buffer.from(expectedPassword, 'utf8');

  const isPasswordValid =
    bufGiven.length === bufExpected.length &&
    crypto.timingSafeEqual(bufGiven, bufExpected);

  if (!isPasswordValid) {
    return res.status(401).json({ ok: false, error: 'Неверный пароль администратора' });
  }

  if (!deviceId) {
    return res.status(400).json({ ok: false, error: 'Укажите Device ID' });
  }

  const cleanDeviceId = normalizeCrockford(deviceId);
  if (!isValidCrockford16(cleanDeviceId)) {
    return res.status(400).json({
      ok: false,
      error: 'Неверный формат Device ID (ожидается 16 символов, например ABCD-EFGH-JKMN-PQRS)'
    });
  }

  const secret = process.env.ACTIVATION_SECRET;
  if (!secret) {
    return res.status(500).json({ ok: false, error: 'ACTIVATION_SECRET is not set' });
  }

  // Parse days
  let numDays = null;
  if (typeof days === 'number' && days > 0) {
    numDays = days;
  } else if (typeof days === 'string' && days.trim() !== '' && !isNaN(parseInt(days, 10))) {
    const parsed = parseInt(days, 10);
    if (parsed > 0) numDays = parsed;
  }

  try {
    const rawCode = computeActivationCode(cleanDeviceId, secret, numDays);
    const formattedId = formatCrockford16(cleanDeviceId);
    const formattedCode = formatCrockford16(rawCode);

    let expiryDateStr = null;
    if (numDays) {
      const nowDay = Math.floor((Date.now() - EPOCH_MS) / MS_PER_DAY);
      const expiryTimestamp = EPOCH_MS + (nowDay + numDays + 1) * MS_PER_DAY - 1;
      const expiryDate = new Date(expiryTimestamp);
      expiryDateStr = expiryDate.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }

    return res.status(200).json({
      ok: true,
      deviceId: formattedId,
      code: formattedCode,
      isForever: !numDays,
      days: numDays,
      expiryDate: expiryDateStr
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
