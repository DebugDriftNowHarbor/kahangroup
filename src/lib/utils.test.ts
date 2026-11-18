import test from 'node:test';
import assert from 'node:assert/strict';
import {
  toPersianDigits,
  toEnglishDigits,
  formatSlideCounter,
  clampSlideIndex,
  validateCollaborationForm,
} from './utils';

test('toPersianDigits converts ASCII numbers to Persian digits accurately', () => {
  assert.equal(toPersianDigits(1404), '۱۴۰۴');
  assert.equal(toPersianDigits('01 / 04'), '۰۱ / ۰۴');
});

test('toEnglishDigits normalizes Persian and Arabic numerals to ASCII', () => {
  assert.equal(toEnglishDigits('۰۹۱۲۳۴۵۶۷۸۹'), '09123456789');
  assert.equal(toEnglishDigits('٠٩١٢٠٠٠٠٠٠٠'), '09120000000');
});

test('formatSlideCounter formats zero-based slide index into padded Persian counter', () => {
  assert.equal(formatSlideCounter(0, 4), '۰۱ / ۰۴');
  assert.equal(formatSlideCounter(2, 4), '۰۳ / ۰۴');
  assert.equal(formatSlideCounter(3, 4), '۰۴ / ۰۴');
});

test('clampSlideIndex keeps slide index within valid deck range', () => {
  assert.equal(clampSlideIndex(-1, 4), 0);
  assert.equal(clampSlideIndex(2, 4), 2);
  assert.equal(clampSlideIndex(9, 4), 3);
});

test('validateCollaborationForm rejects empty fields and accepts valid Persian input', () => {
  const emptyCheck = validateCollaborationForm({
    fullName: '',
    phone: '',
    sectorCity: '',
    description: '',
  });
  assert.equal(emptyCheck.valid, false);
  assert.ok(emptyCheck.errors.fullName);
  assert.ok(emptyCheck.errors.phone);
  assert.ok(emptyCheck.errors.sectorCity);
  assert.ok(emptyCheck.errors.description);

  const validCheck = validateCollaborationForm({
    fullName: 'سهراب سپهری',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    sectorCity: 'املاک و مستغلات / تهران',
    description: 'درخواست استقرار زیرساخت یکپارچه مدیریت سرمایه و دارایی‌های ملکی در مجموعه.',
  });
  assert.equal(validCheck.valid, true);
  assert.deepEqual(validCheck.errors, {});
});
