import assert from 'node:assert';
import {
  normalizeCrockford,
  isValidCrockford16,
  formatCrockford16,
  computeActivationCode,
  verifyActivationCode,
  verifyActivationCodeDetailed
} from '../api/_crypto.js';
import activateHandler from '../api/activate.js';

const TEST_SECRET = '63e01d8f973f0bdf4fece14d210ddd467e41f965dc028817f42bdfcc1caf34bd';
process.env.ACTIVATION_SECRET = TEST_SECRET;

console.log('🧪 Starting Activation System Unit Tests (with Expiration)...\n');

// 1. Crockford Normalization & Validation
console.log('1️⃣ Testing Crockford Base32 normalization...');
const inputNormalized = normalizeCrockford('ab-cd-ef-gh-jk-mn-pq-rs');
assert.strictEqual(inputNormalized, 'ABCDEFGHJKMNPQRS');

const inputWithOandIL = normalizeCrockford('abcd-efgh-oi-lo');
assert.strictEqual(inputWithOandIL, 'ABCDEFGH0110');

assert.strictEqual(isValidCrockford16('ABCDEFGHJKMNPQRS'), true);
assert.strictEqual(isValidCrockford16('ABCDEFGHJKMNPQR'), false);
console.log('   ✅ Crockford Base32 rules verified.');

// 2. Forever vs Timed vs Expired Codes
console.log('2️⃣ Testing Forever, Timed, and Expired codes...');
const devA = 'KFAS-XHCN-1Z5V-23H1';
const cleanA = normalizeCrockford(devA);

// 2a. Forever code
const codeForever = computeActivationCode(cleanA, TEST_SECRET);
const verifyForever = verifyActivationCodeDetailed(cleanA, codeForever, TEST_SECRET);
assert.strictEqual(verifyForever.ok, true);
assert.strictEqual(verifyForever.isForever, true);
console.log(`   ✅ Forever code: ${formatCrockford16(codeForever)} (Valid: true, Forever: true)`);

// 2b. Timed code (30 days)
const code30Days = computeActivationCode(cleanA, TEST_SECRET, 30);
const verify30 = verifyActivationCodeDetailed(cleanA, code30Days, TEST_SECRET);
assert.strictEqual(verify30.ok, true);
assert.strictEqual(verify30.isForever, false);
assert.ok(verify30.expiryDate instanceof Date);
console.log(`   ✅ 30-day code: ${formatCrockford16(code30Days)} (Valid: true, Expires: ${verify30.expiryDate.toISOString().slice(0, 10)})`);

// 2c. Expired code (-1 day in the past)
const codeExpired = computeActivationCode(cleanA, TEST_SECRET, -1);
const verifyExpired = verifyActivationCodeDetailed(cleanA, codeExpired, TEST_SECRET);
assert.strictEqual(verifyExpired.ok, false);
assert.strictEqual(verifyExpired.reason, 'expired');
console.log(`   ✅ Expired code: ${formatCrockford16(codeExpired)} (Rejected as expired)`);

// 2d. Legacy code backward compatibility
const legacyCode = 'Y5C3-MX5A-Z7YK-KBB3';
const verifyLegacy = verifyActivationCodeDetailed(cleanA, legacyCode, TEST_SECRET);
assert.strictEqual(verifyLegacy.ok, true);
assert.strictEqual(verifyLegacy.isForever, true);
console.log(`   ✅ Legacy code: ${legacyCode} (Backward compatible: true, Forever: true)`);

// 3. Device Isolation (Device A code rejected for Device B)
console.log('3️⃣ Testing device isolation...');
const devB = 'WXYZ-2345-6789-ABCD';
const cleanB = normalizeCrockford(devB);
assert.strictEqual(verifyActivationCode(cleanB, codeForever, TEST_SECRET), false);
assert.strictEqual(verifyActivationCode(cleanB, code30Days, TEST_SECRET), false);
console.log('   ✅ Device A codes strictly rejected for Device B.');

// 4. API Handler Mocks (POST /api/activate)
console.log('4️⃣ Testing API handler mocks...');

function mockRes() {
  return {
    statusCode: null,
    headers: {},
    body: null,
    setHeader(k, v) { this.headers[k] = v; },
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
    end() { return this; }
  };
}

// 4a. Valid forever code -> 200 OK
const resForever = mockRes();
await activateHandler({
  method: 'POST',
  body: { deviceId: devA, code: codeForever }
}, resForever);
assert.strictEqual(resForever.statusCode, 200);
assert.strictEqual(resForever.body.ok, true);
assert.strictEqual(resForever.body.isForever, true);
console.log('   ✅ API accepted Forever code with 200 OK.');

// 4b. Valid 30-day code -> 200 OK
const res30 = mockRes();
await activateHandler({
  method: 'POST',
  body: { deviceId: devA, code: code30Days }
}, res30);
assert.strictEqual(res30.statusCode, 200);
assert.strictEqual(res30.body.ok, true);
assert.strictEqual(res30.body.isForever, false);
console.log('   ✅ API accepted 30-day code with 200 OK.');

// 4c. Expired code -> 403 Forbidden with error: 'expired'
const resExp = mockRes();
await activateHandler({
  method: 'POST',
  body: { deviceId: devA, code: codeExpired }
}, resExp);
assert.strictEqual(resExp.statusCode, 403);
assert.strictEqual(resExp.body.ok, false);
assert.strictEqual(resExp.body.error, 'expired');
console.log('   ✅ API rejected expired code with 403 & error: expired.');

// 4d. Wrong code -> 401
const resWrong = mockRes();
await activateHandler({
  method: 'POST',
  body: { deviceId: devA, code: '0000-0000-0000-0000' }
}, resWrong);
assert.strictEqual(resWrong.statusCode, 401);
assert.strictEqual(resWrong.body.ok, false);
console.log('   ✅ API rejected wrong code with 401.');

// 4e. Revoked device -> 403
process.env.REVOKED_DEVICE_IDS = `${cleanA}`;
const resRevoked = mockRes();
await activateHandler({
  method: 'POST',
  body: { deviceId: devA, code: codeForever }
}, resRevoked);
assert.strictEqual(resRevoked.statusCode, 403);
assert.strictEqual(resRevoked.body.error, 'revoked');
console.log('   ✅ API rejected revoked device with 403.');

console.log('\n🎉 ALL EXPIRATION & ACTIVATION UNIT TESTS PASSED SUCCESSFULLY!\n');
