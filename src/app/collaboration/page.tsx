import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { HOLDING_TITLE, HOLDING_SUBTITLE } from '../../config/ecosystems.config';
import {
  toPersianDigits,
  validateCollaborationForm,
  type CollaborationFormInput,
} from '../../lib/utils';
import { Button, Input, Textarea } from '../../components/ui';

interface CollaborationPageProps {
  onBack?: () => void;
  initialSectorPrefill?: string;
}

/** صفحه مستقل ثبت درخواست همکاری (مسیر /collaboration) */
export const CollaborationPage: React.FC<CollaborationPageProps> = ({
  onBack,
  initialSectorPrefill = '',
}) => {
  const [formData, setFormData] = useState<CollaborationFormInput>({
    fullName: '',
    phone: '',
    sectorCity: initialSectorPrefill,
    description: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CollaborationFormInput, string>>>({});
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCollaborationForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const codeNumber = Math.floor(100000 + ((formData.fullName.length * 7919) % 899999));
    setSubmittedCode(`HLD-${toPersianDigits(codeNumber)}`);
  };

  return (
    <div className="architectural-scroll relative flex min-h-dvh flex-col justify-between overflow-y-auto bg-ink text-milk">
      {/* نورپردازی */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-blob left-1/2 top-[-20%] h-[28rem] w-[40rem] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(106,92,255,0.22),transparent_66%)]" />
        <div className="grid-lines absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />
      </div>

      {/* هدر */}
      <header className="relative z-20 flex items-center justify-between border-b border-white/[0.06] px-5 py-5 sm:px-10">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="group glass-dark inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-milk"
          >
            <ArrowRight className="h-3.5 w-3.5 text-cyan transition-transform duration-300 group-hover:translate-x-0.5" />
            <span>بازگشت به منظومه</span>
          </button>
        ) : (
          <a href="/" className="text-sm font-bold text-milk transition-colors hover:text-violet">
            {HOLDING_TITLE}
          </a>
        )}
        <span className="hidden text-xs text-dusk sm:inline">{HOLDING_SUBTITLE}</span>
      </header>

      {/* فرم */}
      <main className="relative z-10 mx-auto w-full max-w-2xl px-6 py-14">
        {!submittedCode ? (
          <div className="glass-dark rounded-[2rem] p-8 sm:p-12">
            <span className="font-latin flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-violet">
              <Sparkles className="h-3.5 w-3.5 text-cyan" />
              STRATEGIC COLLABORATION
            </span>
            <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
              ثبت درخواست همکاری راهبردی
            </h1>
            <p className="mt-3 text-xs font-light leading-7 text-fog sm:text-sm">
              جهت استقرار زیست‌بوم‌های اختصاصی یا بررسی افق‌های مشترک توسعه با {HOLDING_TITLE}، مشخصات زیر را تکمیل فرمایید.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5 pt-7">
              <Input
                id="collab-page-fullname"
                label="نام و نام خانوادگی نماینده سازمانی"
                type="text"
                value={formData.fullName}
                error={errors.fullName}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                placeholder="مثال: دکتر آرش فرزاد"
              />

              <Input
                id="collab-page-phone"
                label="شماره تماس مستقیم"
                type="tel"
                dir="ltr"
                value={formData.phone}
                error={errors.phone}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, phone: e.target.value }));
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="0912 000 0000"
                className="text-right font-latin tabular-nums"
              />

              <Input
                id="collab-page-sector"
                label="حوزه فعالیت / شهر استقرار"
                type="text"
                value={formData.sectorCity}
                error={errors.sectorCity}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, sectorCity: e.target.value }));
                  if (errors.sectorCity) setErrors((prev) => ({ ...prev, sectorCity: undefined }));
                }}
                placeholder="مثال: مدیریت املاک و مستغلات / تهران"
              />

              <Textarea
                id="collab-page-desc"
                label="شرح موجز چشم‌انداز همکاری"
                rows={4}
                value={formData.description}
                error={errors.description}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, description: e.target.value }));
                  if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
                }}
                placeholder="توضیح کوتاه در رابطه با حجم عملیات، تعداد شعب یا نیاز به یکپارچگی زیست‌بوم..."
              />

              <div className="flex items-center justify-between gap-4 pt-3">
                <Button type="submit" variant="primary" size="lg">
                  ثبت رسمی درخواست
                </Button>
                {onBack && (
                  <Button type="button" variant="ghost" onClick={onBack}>
                    انصراف
                  </Button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="glass-dark rounded-[2rem] p-8 sm:p-12">
            <div className="flex items-center gap-2 text-xs font-medium text-mint">
              <Check className="h-5 w-5" />
              <span>ثبت قطعی در دبیرخانه اجرایی</span>
            </div>

            <h2 className="mt-4 text-2xl font-extrabold">درخواست شما با موفقیت دریافت و ثبت شد.</h2>
            <p className="mt-3 text-xs font-light leading-7 text-fog sm:text-sm">
              پرونده استقرار سازمانی شما تشکیل شده و کد پیگیری زیر اختصاص یافت. همکاران دبیرخانه در اسرع وقت جهت برنامه‌ریزی نشست راهبردی با شما تماس حاصل خواهند نمود.
            </p>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-mint/25 bg-ink-soft p-4">
              <span className="text-xs text-dusk">کد پیگیری دبیرخانه:</span>
              <span className="font-latin text-base font-bold tabular-nums text-mint">{submittedCode}</span>
            </div>

            <div className="mt-7 flex items-center justify-between">
              {onBack ? (
                <Button type="button" variant="primary" onClick={onBack}>
                  بازگشت به منظومه بُرهان
                </Button>
              ) : (
                <a
                  href="/"
                  className="rounded-full bg-milk px-6 py-3 text-xs font-bold text-ink transition-colors hover:bg-violet sm:text-sm"
                >
                  بازگشت به صفحه اصلی
                </a>
              )}
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setSubmittedCode(null);
                  setFormData({ fullName: '', phone: '', sectorCity: '', description: '' });
                }}
              >
                ثبت درخواست دیگر
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* فوتر */}
      <footer className="relative z-20 border-t border-white/[0.06] px-5 py-6 text-[11px] text-dusk sm:px-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 sm:flex-row">
          <span>
            © {toPersianDigits(1405)} {HOLDING_TITLE}. کلیه حقوق محفوظ است.
          </span>
          <span className="font-latin text-[10px] uppercase tracking-[0.2em]">STRATEGIC ONBOARDING OFFICE</span>
        </div>
      </footer>
    </div>
  );
};

export default CollaborationPage;
