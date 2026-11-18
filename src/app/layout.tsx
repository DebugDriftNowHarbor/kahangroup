import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

/** پوسته ریشه — بافت نویز سراسری و کانتینر اصلی */
export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div dir="rtl" lang="fa" className="relative min-h-dvh bg-ink font-sans text-milk">
      {/* بافت نویز فیلم روی کل صفحه */}
      <div className="noise-layer" aria-hidden="true" />
      <main id="main-content" className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
