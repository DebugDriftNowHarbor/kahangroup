import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { HOLDING_TITLE } from '../../config/ecosystems.config';
import {
  toPersianDigits,
  validateCollaborationForm,
  type CollaborationFormInput,
} from '../../lib/utils';
import { Drawer, Button, Input, Textarea } from '../ui';

export interface SubmittedCollaborationRecord extends CollaborationFormInput {
  referenceCode: string;
  submittedAt: string;
}

interface CollaborationDrawerProps {
  isOpen: boolean;
  initialSectorPrefill?: string;
  onClose: () => void;
  onSubmitted?: (record: SubmittedCollaborationRecord) => void;
}

export const CollaborationDrawer: React.FC<CollaborationDrawerProps> = ({
  isOpen,
  initialSectorPrefill = '',
  onClose,
  onSubmitted,
}) => {
  const [formData, setFormData] = useState<CollaborationFormInput>({
    fullName: '',
    phone: '',
    sectorCity: initialSectorPrefill,
    description: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CollaborationFormInput, string>>
  >({});

  const [submittedRecord, setSubmittedRecord] =
    useState<SubmittedCollaborationRecord | null>(null);

  useEffect(() => {
    if (initialSectorPrefill) {
      setFormData((prev) => ({
        ...prev,
        sectorCity: prev.sectorCity || initialSectorPrefill,
      }));
    }
  }, [initialSectorPrefill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCollaborationForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const codeNumber = Math.floor(100000 + (formData.fullName.length * 7919) % 899999);
    const record: SubmittedCollaborationRecord = {
      ...formData,
      referenceCode: `HLD-${toPersianDigits(codeNumber)}`,
      submittedAt: toPersianDigits('۱۴۰۵/۰۸/۱۲'),
    };
    setSubmittedRecord(record);
    onSubmitted?.(record);
  };

  const handleResetAndClose = () => {
    setSubmittedRecord(null);
    setErrors({});
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleResetAndClose}
      subtitle={`${HOLDING_TITLE} · دبیرخانه راهبردی`}
      title="درخواست همکاری"
      footer={
        <div className="flex items-center justify-between text-[11px] text-dusk">
          <span>محرمانگی اطلاعات سازمانی تضمین شده است.</span>
          <span>{HOLDING_TITLE}</span>
        </div>
      }
    >
      {!submittedRecord ? (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <p className="text-xs sm:text-sm text-fog font-light leading-relaxed">
            جهت بررسی امکان استقرار زیست‌بوم‌های مدیریتی یا آغاز همکاری‌های راهبردی، مشخصات مجموعه خود را ثبت فرمایید.
          </p>

          {/* نام و نام خانوادگی */}
          <Input
            id="collab-fullname"
            label="نام و نام خانوادگی"
            type="text"
            value={formData.fullName}
            error={errors.fullName}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, fullName: e.target.value }));
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            placeholder="مثال: دکتر آرش فرزاد"
          />

          {/* شماره تماس */}
          <Input
            id="collab-phone"
            label="شماره تماس"
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

          {/* حوزه فعالیت / شهر */}
          <Input
            id="collab-sector-city"
            label="حوزه فعالیت / شهر"
            type="text"
            value={formData.sectorCity}
            error={errors.sectorCity}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, sectorCity: e.target.value }));
              if (errors.sectorCity)
                setErrors((prev) => ({ ...prev, sectorCity: undefined }));
            }}
            placeholder="مثال: املاک و مستغلات / تهران"
          />

          {/* توضیحات مختصر */}
          <Textarea
            id="collab-description"
            label="توضیحات مختصر"
            rows={4}
            value={formData.description}
            error={errors.description}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, description: e.target.value }));
              if (errors.description)
                setErrors((prev) => ({ ...prev, description: undefined }));
            }}
            placeholder="شرح مختصر ساختار مجموعه و زمینه مورد نظر جهت همکاری یا بهره‌برداری از پلتفرم..."
          />

          <div className="pt-2 flex items-center justify-between gap-4">
            <Button type="submit" variant="primary">
              ثبت رسمی درخواست همکاری
            </Button>

            <Button type="button" variant="ghost" onClick={handleResetAndClose}>
              انصراف
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="p-6 border border-mint/30 bg-ink-soft space-y-4">
            <div className="flex items-center gap-2 text-xs text-mint">
              <Check className="w-4 h-4" />
              <span>ثبت موفق در دبیرخانه راهبردی هلدینگ</span>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-milk">
              درخواست همکاری شما با موفقیت ثبت گردید.
            </h3>

            <p className="text-xs sm:text-sm text-fog font-light leading-relaxed">
              اطلاعات ارسالی شما در اختیار واحد توسعه و استقرار سازمانی قرار گرفت. کارشناسان ارشد ما پس از بررسی، جهت هماهنگی جلسه با شما تماس خواهند گرفت.
            </p>

            <dl className="pt-4 border-t border-white/[0.08] space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <dt className="text-dusk">کد پیگیری دبیرخانه</dt>
                <dd className="text-mint font-latin tabular-nums">
                  {submittedRecord.referenceCode}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-dusk">متقاضی</dt>
                <dd className="text-milk">{submittedRecord.fullName}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-dusk">شماره تماس</dt>
                <dd className="text-milk tabular-nums font-latin" dir="ltr">
                  {toPersianDigits(submittedRecord.phone)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-dusk">حوزه فعالیت / شهر</dt>
                <dd className="text-milk">{submittedRecord.sectorCity}</dd>
              </div>
            </dl>
          </div>

          <div className="flex items-center justify-between">
            <Button type="button" variant="primary" onClick={handleResetAndClose}>
              بازگشت به نمای اصلی
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setSubmittedRecord(null);
                setFormData({
                  fullName: '',
                  phone: '',
                  sectorCity: '',
                  description: '',
                });
              }}
            >
              ثبت درخواست جدید
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};
