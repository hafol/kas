#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  normalizeCrockford,
  isValidCrockford16,
  formatCrockford16,
  computeActivationCode,
  EPOCH_MS,
  MS_PER_DAY
} from '../api/_crypto.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load ACTIVATION_SECRET from .env.local or .env if not in process.env
function loadSecret() {
  if (process.env.ACTIVATION_SECRET) return process.env.ACTIVATION_SECRET;
  const envCandidates = [
    path.resolve(__dirname, '../.env.local'),
    path.resolve(__dirname, '../kaspi-app/.env.local'),
    path.resolve(process.cwd(), '.env.local'),
    path.resolve(__dirname, '../.env'),
    path.resolve(__dirname, '../kaspi-app/.env')
  ];

  for (const envPath of envCandidates) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^ACTIVATION_SECRET\s*=\s*["']?([^"'\r\n]+)["']?/m);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  }
  return null;
}

const args = process.argv.slice(2);
const rawInput = args[0];

if (!rawInput || rawInput === '--help' || rawInput === '-h') {
  console.log('\n============================================================');
  console.log('📱 KASPI ACTIVATION CODE GENERATOR');
  console.log('============================================================');
  console.log('Использование:');
  console.log('  node scripts/make-code.js <DEVICE_ID> [--forever | --days <число>]');
  console.log('\nПримеры:');
  console.log('  # Навсегда (по умолчанию):');
  console.log('  node scripts/make-code.js ABCD-EFGH-JKMN-PQRS');
  console.log('  node scripts/make-code.js ABCD-EFGH-JKMN-PQRS --forever');
  console.log('\n  # Временный доступ на 30 дней:');
  console.log('  node scripts/make-code.js ABCD-EFGH-JKMN-PQRS --days 30');
  console.log('\n  # Временный доступ на 7 дней:');
  console.log('  node scripts/make-code.js ABCD-EFGH-JKMN-PQRS --days 7\n');
  process.exit(1);
}

const cleanDeviceId = normalizeCrockford(rawInput);
if (!isValidCrockford16(cleanDeviceId)) {
  console.error(`\n❌ Ошибка: Неверный формат Device ID: "${rawInput}".`);
  console.error('Ожидается 16 символов Crockford Base32 (например: ABCD-EFGH-JKMN-PQRS).\n');
  process.exit(1);
}

// Parse flags: --days <N> or --forever
let days = null;
for (let i = 1; i < args.length; i++) {
  if (args[i] === '--forever') {
    days = null;
  } else if (args[i] === '--days' && args[i + 1]) {
    days = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i].startsWith('--days=')) {
    days = parseInt(args[i].split('=')[1], 10);
  }
}

const secret = loadSecret();
if (!secret) {
  console.error('\n❌ Ошибка: Переменная ACTIVATION_SECRET не найдена в .env.local!');
  console.error('Добавьте в файл .env.local строку:');
  console.error('  ACTIVATION_SECRET=<ваш_32_байтный_ключ>\n');
  process.exit(1);
}

try {
  const code = computeActivationCode(cleanDeviceId, secret, days);
  const formattedId = formatCrockford16(cleanDeviceId);
  const formattedCode = formatCrockford16(code);

  console.log('\n============================================================');
  console.log('📱 KASPI ACTIVATION CODE GENERATOR');
  console.log('============================================================');
  console.log(`Device ID:        ${formattedId}`);
  console.log(`Activation Code:  ${formattedCode}`);
  
  if (days && days > 0) {
    const nowDay = Math.floor((Date.now() - EPOCH_MS) / MS_PER_DAY);
    const expiryTimestamp = EPOCH_MS + (nowDay + days + 1) * MS_PER_DAY - 1;
    const expiryDate = new Date(expiryTimestamp);
    const formattedDate = expiryDate.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    console.log(`Срок доступа:     ВРЕМЕННЫЙ (${days} дн., до ${formattedDate})`);
  } else {
    console.log('Срок доступа:     НАВСЕГДА (Бессрочный доступ)');
  }
  console.log('============================================================\n');
} catch (err) {
  console.error('\n❌ Ошибка генерации кода:', err.message, '\n');
  process.exit(1);
}
