import { useEffect, useRef, useState } from "react";


const STORAGE_KEY = "cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // O aviso ainda precisa aparecer quando o navegador bloqueia o armazenamento.
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) {
      document.documentElement.style.removeProperty("--ls-cookie-banner-height");
      return;
    }

    const banner = bannerRef.current;
    if (!banner) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--ls-cookie-banner-height",
        `${Math.ceil(banner.getBoundingClientRect().height)}px`,
      );
    };

    updateHeight();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateHeight) : null;
    observer?.observe(banner);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateHeight);
      document.documentElement.style.removeProperty("--ls-cookie-banner-height");
    };
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div
      ref={bannerRef}
      role="region"
      aria-label="Aviso sobre cookies e serviços externos"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-0 left-0 w-full"
      style={{
        zIndex: 90,
        background: "#0a0a0a",
        borderTop: "1px solid #D4AF37",
        padding: "16px 24px",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p style={{ fontSize: 13 }} className="text-center leading-relaxed text-[#d5d5d5] sm:text-left">
          Este site utiliza armazenamento local para lembrar que o aviso foi fechado e carrega serviços
          de terceiros, como o agendamento online. Esses serviços podem aplicar suas próprias tecnologias
          de armazenamento. Consulte a{" "}
          <a href="/politica-de-privacidade" className="text-primary underline">
            Política de Privacidade
          </a>
          para saber mais.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 min-h-[44px] rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
