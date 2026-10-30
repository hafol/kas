import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import {
  normalizeCrockford,
  isValidCrockford16,
  verifyActivationCode
} from './api/_crypto.js';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  let secret = env.ACTIVATION_SECRET || process.env.ACTIVATION_SECRET;

  // Also check parent .env.local
  if (!secret) {
    try {
      const parentEnv = path.resolve(process.cwd(), '../.env.local');
      if (fs.existsSync(parentEnv)) {
        const content = fs.readFileSync(parentEnv, 'utf8');
        const match = content.match(/^ACTIVATION_SECRET\s*=\s*["']?([^"'\r\n]+)["']?/m);
        if (match && match[1]) {
          secret = match[1].trim();
        }
      }
    } catch (e) {}
  }

  return {
    plugins: [
      react(),
      {
        name: 'activation-api-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/activate', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: false, error: 'Method Not Allowed' }));
              return;
            }

            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const { deviceId, code } = parsed;
                const cleanDeviceId = normalizeCrockford(deviceId);
                const cleanCode = normalizeCrockford(code);

                if (!isValidCrockford16(cleanDeviceId) || !isValidCrockford16(cleanCode)) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: false }));
                  return;
                }

                if (!secret) {
                  console.error('[Dev Server] ACTIVATION_SECRET is not set in .env.local');
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: false, error: 'Server configuration error' }));
                  return;
                }

                const revoked = (process.env.REVOKED_DEVICE_IDS || env.REVOKED_DEVICE_IDS || '')
                  .split(',')
                  .map(s => normalizeCrockford(s))
                  .filter(Boolean);

                if (revoked.includes(cleanDeviceId)) {
                  res.statusCode = 403;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: false, error: 'revoked' }));
                  return;
                }

                const isValid = verifyActivationCode(cleanDeviceId, cleanCode, secret);
                res.statusCode = isValid ? 200 : 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: isValid }));
              } catch (err) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: false }));
              }
            });
          });
        }
      }
    ],
    server: {
      watch: {
        ignored: ['**/new icon for bg image/**', '**/_archive/**', '**/dist/**', '**/.git/**']
      }
    }
  };
});
