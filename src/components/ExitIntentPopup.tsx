import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "ls-exit-intent-shown";
const WHATSAPP_URL = "https://wa.me/message/YAROFN2KO3W4I1";
const MIN_DELAY_MS = 15000;

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    const mountedAt = Date.now();
    let done = false;

    const trigger = () => {
      if (done) return;
      if (Date.now() - mountedAt < MIN_DELAY_MS) return;
      done = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
      cleanup();
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.7) trigger();
    };

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      document.addEventListener("mouseout", onMouseOut);
    }

    function cleanup() {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full"
        style={{
          maxWidth: 430,
          background: "#0a0a0a",
          border: "1.5px solid #D4AF37",
          borderRadius: 16,
          boxShadow: "0 0 40px rgba(212,175,55,0.2)",
          padding: "40px 36px",
        }}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4"
          style={{ color: "#666" }}
        >
          <X size={18} />
        </button>

        <p className="text-center font-caption text-[11px] text-primary">ANTES DE VOCÊ IR</p>

        <h2
          className="mt-4 text-center font-heading text-foreground"
          style={{ fontSize: 21, lineHeight: 1.3, fontVariantNumeric: "lining-nums" }}
        >
          Ainda em dúvida? A gente resolve isso numa conversa de 15 minutos
        </h2>

        <p className="mt-4 text-center" style={{ fontSize: 12.5, color: "#a8a8a8", lineHeight: 1.6 }}>
          Você não precisa decidir sozinho agora. Fale direto com um dos fundadores — sem discurso de
          vendas, sem pressão.
        </p>

        <div
          className="mt-5 text-center"
          style={{
            background: "#1a1408",
            border: "1px solid #D4AF37",
            borderRadius: 10,
            padding: "18px 16px",
          }}
        >
          <p style={{ color: "#D4AF37", fontWeight: 800, fontSize: 15, lineHeight: 1.35 }}>
            CADA DIA SEM ANUNCIAR É UM DIA A MAIS QUE SEU CONCORRENTE FICA NA FRENTE DE UM CLIENTE QUE
            PODERIA SER SEU
          </p>
          <p style={{ marginTop: 8, color: "#ccc", fontWeight: 500, fontSize: 11, lineHeight: 1.4 }}>
            FALAR AGORA NÃO CUSTA NADA. ESPERAR, PODE CUSTAR CARO.
          </p>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground transition hover:brightness-110"
          style={{ height: 46 }}
        >
          Sim, quero tirar minhas dúvidas agora
        </a>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-4 block w-full text-center underline"
          style={{ color: "#666", fontSize: 12 }}
        >
          Não, prefiro decidir sozinho depois
        </button>
      </div>
    </div>
  );
}
