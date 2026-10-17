import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Instagram, Mail } from "lucide-react";

import { LogoMark } from "@/components/Logo";
import fundador1 from "@/assets/fundador-1.png.asset.json";

const PHONE_DISPLAY = "(31) 97116-9912";
const FOUNDER_2_IMAGE_URL = "https://d2ol7oe51mr4n9.cloudfront.net/user_3KbxWz1tI4fun2yetahPElTpbzV/b4a65ecd-c62d-4933-a1c7-f94761ea797e.png";
const WHATSAPP_URL =
  "https://wa.me/5531971169912?text=" +
  encodeURIComponent(
    "Olá! Sou responsável por uma clínica odontológica e gostaria de conhecer as estratégias da LS para atrair novos pacientes."
  );

export default function Booking() {
  useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi();
        cal("ui", { theme: "dark", styles: { branding: { brandColor: "#D4AF37" } } });
      } catch {
        /* embed unavailable */
      }
    })();
  }, []);

  return (
    <section id="agendar" aria-labelledby="booking-heading" className="relative bg-[#050505]/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          {/* Coluna esquerda */}
          <div>
            <p className="font-caption text-xs text-primary">Conversa estratégica</p>
            <h2 id="booking-heading" className="mt-4 text-3xl md:text-4xl font-semibold leading-tight text-foreground">
              Sua próxima fase de crescimento começa com uma estratégia de captação bem definida.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[#a8a8a8]">
              Em 30 minutos, mapeamos as especialidades, a região de atendimento, a estrutura comercial e os objetivos de crescimento da clínica. A partir desse diagnóstico, definimos as prioridades de marketing e os próximos passos mais adequados à operação.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                "Você conversa diretamente com um dos fundadores",
                "Análise das especialidades, da região e da jornada de atendimento",
                "Prioridades de aquisição alinhadas ao momento da clínica",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-primary" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#a8a8a8]">
              {["Gratuito", "30 minutos", "Sem compromisso"].map((s, i) => (
                <span key={s} className="flex items-center gap-3">
                  {i > 0 && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  {s}
                </span>
              ))}
            </div>

            {/* Fundadores */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center -space-x-3">
                {[fundador1.url, FOUNDER_2_IMAGE_URL].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Fundador ${i + 1} da LS Agência de Marketing`}
                    loading="lazy"
                    className="h-12 w-12 rounded-full border border-primary object-cover"
                    style={{ filter: "grayscale(1)" }}
                  />
                ))}
              </div>
              <p className="text-sm text-[#a8a8a8]">
                <span className="font-semibold text-foreground">Fundadores</span> — Você fala com um de
                nós, sempre.
              </p>
            </div>
          </div>

          {/* Coluna direita — Cal.com */}
          <div className="flex flex-col items-center md:items-end">
            <div className="h-[540px] w-full max-w-[420px] overflow-hidden rounded-xl bg-[#141414] shadow-2xl sm:h-[580px]">
              <Cal
                calLink="ls.agenciademarketing/diagnostico-gratuito"
                style={{ width: "100%", height: "100%", overflow: "auto" }}
                config={{ theme: "dark", layout: "month_view" }}
              />
            </div>
            <p className="mt-4 w-full max-w-[420px] text-center text-sm text-[#a8a8a8] md:text-right">
              Problemas para visualizar a agenda?{" "}
              <a
                href="https://cal.com/ls.agenciademarketing/diagnostico-gratuito"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center font-semibold text-primary underline underline-offset-4 transition hover:text-foreground"
              >
                Abrir agendamento em nova aba
              </a>
            </p>
          </div>

        </div>

        {/* Card de contato — centralizado e mais abaixo */}
        <div className="mt-20 flex items-center justify-center md:mt-28">
          <div
            className="w-full max-w-[420px] rounded-2xl bg-[#141414] p-6 sm:p-8 md:p-12"
            style={{
              border: "1.5px solid #D4AF37",
              boxShadow: "0 0 40px rgba(212,175,55,0.15)",
            }}
          >
            <div className="flex justify-center">
              <LogoMark />
            </div>
            <div className="my-6 h-px bg-[#333]" />
            <p className="text-center text-xs uppercase tracking-[0.2em] text-[#888]">
              Telefone e WhatsApp
            </p>
            <a
              href="tel:+5531971169912"
              aria-label={`Ligar para a LS pelo número ${PHONE_DISPLAY}`}
              className="mt-2 flex min-h-[44px] items-center justify-center text-center text-2xl font-medium text-foreground transition-colors hover:text-primary"
            >
              {PHONE_DISPLAY}
            </a>

            <div className="my-6 h-px bg-[#333]" />
            <p className="text-center text-xs uppercase tracking-[0.2em] text-[#888]">
              Horário de atendimento
            </p>
            <p className="mt-2 text-center text-sm text-foreground">Segunda a sexta, 9h às 18h</p>

            <div className="mt-6 flex items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/ls.agenciademarketing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da LS Agência de Marketing"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-primary p-2 text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="mailto:contato@lsagenciademarketing.com.br"
                aria-label="Enviar e-mail para a LS Agência de Marketing"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-primary p-2 text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <Mail aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 flex w-full items-center justify-center rounded-xl bg-primary text-center font-semibold text-primary-foreground transition hover:brightness-110"
              style={{ height: 50, boxShadow: "0 0 20px rgba(212,175,55,0.3)" }}
            >
              Falar agora no WhatsApp
            </a>
            
          </div>
        </div>

      </div>
    </section>
  );
}
