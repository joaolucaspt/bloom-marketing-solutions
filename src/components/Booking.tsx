import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Instagram, Linkedin } from "lucide-react";

import { LogoMark } from "@/components/Logo";
import fundador1 from "@/assets/fundador-1.png.asset.json";
import fundador2 from "@/assets/fundador-2.png.asset.json";

const PHONE_DISPLAY = "(31) 97116-9912";
const WHATSAPP_URL = "https://wa.me/5531971169912";

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
    <section id="agendar" className="relative bg-[#050505]/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          {/* Coluna esquerda */}
          <div>
            <p className="font-caption text-xs text-primary">A jogada é sua</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight text-foreground">
              30 minutos. Vamos ver se faz sentido trabalharmos juntos.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[#a8a8a8]">
              Isso não é um discurso de vendas pronto. Queremos entender seu negócio, seus objetivos e onde
              você está travando — e aí te dizer com sinceridade como podemos ajudar, ou se não somos a
              opção certa pra você. Você vai falar com um dos fundadores, sempre. Sem pressão, sem enrolação.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                "Você fala com um fundador, nunca com um vendedor",
                "Entendemos seu negócio antes de propor qualquer coisa",
                "Uma resposta direta sobre se podemos ajudar",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-primary" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#a8a8a8]">
              {["Gratuito", "30 minutos", "Sem compromisso", "Resposta em até 1 dia útil"].map((s, i) => (
                <span key={s} className="flex items-center gap-3">
                  {i > 0 && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  {s}
                </span>
              ))}
            </div>

            {/* Fundadores */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center -space-x-3">
                {[fundador1, fundador2].map((f, i) => (
                  <img
                    key={i}
                    src={f.url}
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
          <div className="flex justify-center md:justify-end">
            <div
              className="w-full overflow-hidden bg-[#141414] shadow-2xl"
              style={{ borderRadius: 12, height: 520, maxWidth: 420 }}
            >
              <Cal
                calLink="ls.agenciademarketing/diagnostico-gratuito"
                style={{ width: "100%", height: "100%", overflow: "auto" }}
                config={{ theme: "dark", layout: "month_view" }}
              />
            </div>
          </div>

        </div>

        {/* Card de contato — centralizado e mais abaixo */}
        <div className="mt-20 flex items-center justify-center md:mt-28">
          <div
            className="w-full max-w-[420px] rounded-2xl bg-[#141414]"
            style={{
              padding: 48,
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
            <p className="mt-2 text-center text-2xl font-medium text-foreground">{PHONE_DISPLAY}</p>

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
                className="rounded-lg border border-primary p-2 text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da LS Agência de Marketing"
                className="rounded-lg border border-primary p-2 text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.5} />
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
            <p className="mt-3 text-center text-xs text-[#888]">Resposta em até 1 dia útil</p>
          </div>
        </div>

      </div>
    </section>
  );
}
