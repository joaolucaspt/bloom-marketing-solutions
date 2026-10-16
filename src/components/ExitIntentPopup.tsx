import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "ls-exit-intent-shown";
const WHATSAPP_URL =
  "https://wa.me/5531971169912?text=" +
  encodeURIComponent(
    "Olá! Sou responsável por uma clínica odontológica e gostaria de conversar com a LS sobre a captação de pacientes."
  );
const MIN_DELAY_MS = 15000;

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // O pop-up continua funcional quando o armazenamento da sessão está bloqueado.
    }

    const mountedAt = Date.now();
    let done = false;
    let eligibilityTimer: number | undefined;

    const trigger = () => {
      if (done) return;
      if (Date.now() - mountedAt < MIN_DELAY_MS) return;
      done = true;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Não impedir a chamada de conversão se o armazenamento estiver indisponível.
      }
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
      // Recheck once the minimum delay elapses in case the user stopped scrolling
      // after crossing the threshold too early.
      eligibilityTimer = window.setTimeout(() => {
        if (!done) onScroll();
      }, Math.max(0, MIN_DELAY_MS - (Date.now() - mountedAt)));
    } else {
      document.addEventListener("mouseout", onMouseOut);
    }

    function cleanup() {
      if (eligibilityTimer !== undefined) {
        window.clearTimeout(eligibilityTimer);
        eligibilityTimer = undefined;
      }
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousActive = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousActive && previousActive !== document.body && previousActive.isConnected) {
        previousActive.focus();
      }
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-4 sm:items-center sm:py-8"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={() => setOpen(false)}
    >
      <div
        ref={dialogRef}
        id="exit-intent-dialog"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        aria-describedby="exit-intent-description"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[430px] overflow-y-auto rounded-2xl border border-primary p-6 shadow-2xl sm:p-9"
        style={{
          maxHeight: "calc(100dvh - 2rem)",
          background: "#0a0a0a",
          borderWidth: "1.5px",
          boxShadow: "0 0 40px rgba(212,175,55,0.2)",
        }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Fechar"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[#a8a8a8] transition-colors hover:text-foreground"
        >
          <X aria-hidden="true" size={18} />
        </button>

        <p className="text-center font-caption text-[11px] text-primary">ANTES DE VOCÊ IR</p>

        <h2
          id="exit-intent-title"
          className="mt-4 text-center font-heading text-foreground"
          style={{ fontSize: 21, lineHeight: 1.3, fontVariantNumeric: "lining-nums" }}
        >
          Quer conversar sobre a captação da sua clínica?
        </h2>

        <p id="exit-intent-description" className="mt-4 text-center" style={{ fontSize: 12.5, color: "#a8a8a8", lineHeight: 1.6 }}>
          Fale diretamente com a LS para discutir as especialidades, a região de atendimento e os objetivos de crescimento da sua clínica. Uma conversa objetiva, sem pressão.
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
            MÍDIA, PÁGINA E ATENDIMENTO PRECISAM TRABALHAR JUNTOS
          </p>
          <p style={{ marginTop: 8, color: "#ccc", fontWeight: 500, fontSize: 11, lineHeight: 1.4 }}>
            Vamos entender o cenário da sua clínica antes de alinhar os próximos passos.
          </p>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground transition hover:brightness-110"
          style={{ height: 46 }}
        >
          Conversar com a LS
        </a>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-4 flex min-h-[44px] w-full items-center justify-center text-center text-xs text-[#a8a8a8] underline transition-colors hover:text-foreground"
        >
          Continuar navegando
        </button>
      </div>
    </div>
  );
}
