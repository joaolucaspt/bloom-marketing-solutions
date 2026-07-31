import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
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
        cal("ui", { theme: "dark", styles: { branding: { brandColor: "#C9A227" } } });
      } catch {
        /* embed unavailable */
      }
    })();
  }, []);

  return (
    <section id="agendar" className="relative bg-[#050505] py-20 md:py-28">
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
          <div
            className="overflow-hidden bg-[#141414] shadow-2xl"
            style={{ borderRadius: 12, height: 680, width: "100%" }}
          >
            <Cal
              calLink="ls.agenciademarketing/diagnostico-gratuito"
              style={{ width: "100%", height: "100%", overflow: "auto" }}
              config={{ theme: "dark", layout: "month_view" }}
            />
          </div>
        </div>

        {/* Card de contato — centralizado e mais abaixo */}
        <div className="mt-20 flex justify-center md:mt-28">
          <div className="w-full max-w-[420px] rounded-2xl border border-primary bg-[#141414] p-8">
            <div className="flex justify-center">
              <LogoMark />
            </div>
            <div className="my-6 h-px bg-[#333]" />
            <p className="text-center text-xs uppercase tracking-[0.2em] text-[#888]">
              Telefone e WhatsApp
            </p>
            <p className="mt-2 text-center text-2xl font-medium text-foreground">{PHONE_DISPLAY}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full rounded-xl bg-primary py-3.5 text-center font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Falar agora no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
