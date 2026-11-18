import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/**
 * Converts any English or Arabic numerals in a number or string into Persian digits.
 */
export function toPersianDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit);
}

/**
 * Converts Persian or Arabic digits back to standard ASCII digits for validation.
 */
export function toEnglishDigits(value: string): string {
  let result = value;
  for (let i = 0; i < 10; i++) {
    result = result
      .replace(new RegExp(PERSIAN_DIGITS[i], 'g'), String(i))
      .replace(new RegExp(ARABIC_DIGITS[i], 'g'), String(i));
  }
  return result;
}

/**
 * Formats a slide index (0-based) and total count into a zero-padded Persian counter, e.g. "۰۱ / ۰۴".
 */
export function formatSlideCounter(currentIndex: number, totalSlides: number): string {
  const safeCurrent = Math.max(1, Math.min(totalSlides, currentIndex + 1));
  const currentPadded = String(safeCurrent).padStart(2, '0');
  const totalPadded = String(totalSlides).padStart(2, '0');
  return `${toPersianDigits(currentPadded)} / ${toPersianDigits(totalPadded)}`;
}

/**
 * Clamps a slide index within valid bounds [0, total - 1].
 */
export function clampSlideIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(total - 1, index));
}

export interface CollaborationFormInput {
  fullName: string;
  phone: string;
  sectorCity: string;
  description: string;
}

export interface CollaborationValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof CollaborationFormInput, string>>;
}

/**
 * Pure validation logic for the executive collaboration request form.
 */
export function validateCollaborationForm(
  input: CollaborationFormInput
): CollaborationValidationResult {
  const errors: Partial<Record<keyof CollaborationFormInput, string>> = {};

  const fullName = input.fullName.trim();
  if (!fullName || fullName.length < 3) {
    errors.fullName = 'لطفاً نام و نام خانوادگی خود را به صورت کامل وارد نمایید.';
  }

  const normalizedPhone = toEnglishDigits(input.phone.trim()).replace(/[\s\-()]/g, '');
  const phoneRegex = /^(\+98|0098|0)?9\d{9}$|^0\d{2,3}\d{7,8}$/;
  if (!normalizedPhone) {
    errors.phone = 'وارد کردن شماره تماس جهت هماهنگی ضروری است.';
  } else if (!phoneRegex.test(normalizedPhone)) {
    errors.phone = 'شماره تماس وارد شده معتبر نیست (نمونه: ۰۹۱۲۱۲۳۴۵۶۷).';
  }

  const sectorCity = input.sectorCity.trim();
  if (!sectorCity || sectorCity.length < 2) {
    errors.sectorCity = 'لطفاً حوزه فعالیت و شهر مورد نظر را مشخص فرمایید.';
  }

  const description = input.description.trim();
  if (!description || description.length < 10) {
    errors.description = 'لطفاً توضیحات مختصری درباره زمینه همکاری (حداقل ۱۰ نویسه) بنویسید.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
