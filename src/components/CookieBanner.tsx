import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage indisponível */
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 w-full"
      style={{
        zIndex: 9999,
        background: "#0a0a0a",
        borderTop: "1px solid #D4AF37",
        padding: "16px 24px",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p style={{ fontSize: 13 }} className="text-center leading-relaxed text-[#d5d5d5] sm:text-left">
          Usamos cookies para melhorar sua experiência e analisar o tráfego do site. Ao continuar
          navegando, você concorda com nossa{" "}
          <Link to="/politica-de-privacidade" className="text-primary underline">
            Política de Privacidade
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
