import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import ParticleNetwork from "@/components/ParticleNetwork";
import { LogoMark } from "@/components/Logo";
import Calculator from "@/components/Calculator";
import LandingPages from "@/components/LandingPages";
import Booking from "@/components/Booking";
import { useReveal } from "@/hooks/useReveal";
import bgTeam from "@/assets/bg-team.jpg";
import bgBranding from "@/assets/bg-branding.jpg";
import bgAudiovisual from "@/assets/bg-audiovisual.jpg";
import bgPerformance from "@/assets/bg-performance.jpg";
import bgPortrait from "@/assets/bg-portrait.jpg";
import svcSocial from "@/assets/svc-social.jpg";
import svcAudiovisual from "@/assets/svc-audiovisual.jpg";
import svcTech from "@/assets/svc-tech.jpg";
import svcEducacao from "@/assets/svc-educacao.jpg";
import svcPerformance from "@/assets/svc-performance.jpg";
import AdsPanel from "@/components/AdsPanel";
import ExitIntentPopup from "@/components/ExitIntentPopup";



function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Blobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="blob" style={{ background: "#D4AF37", width: 380, height: 380, top: "10%", left: "-8%" }} />
      <div className="blob" style={{ background: "#D4AF37", width: 460, height: 460, top: "40%", right: "-10%", animationDelay: "-6s" }} />
      <div className="blob" style={{ background: "#8a6f19", width: 300, height: 300, bottom: "5%", left: "30%", animationDelay: "-12s" }} />
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LS Agência de Marketing | Marketing para Clínicas Odontológicas" },
      {
        name: "description",
        content:
          "Agência de marketing odontológico especializada em captação de pacientes para clínicas odontológicas: tráfego pago no Google e Meta Ads e landing pages que convertem. Fale com um dos fundadores, sem compromisso.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "LS Agência de Marketing | Marketing para Clínicas Odontológicas" },
      {
        property: "og:description",
        content:
          "Agência de marketing odontológico especializada em captação de pacientes para clínicas odontológicas: tráfego pago no Google e Meta Ads e landing pages que convertem. Fale com um dos fundadores, sem compromisso.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: "https://ls-marketing-magic.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://ls-marketing-magic.lovable.app/" }],
  }),

  component: Index,
});

const PHONE_DISPLAY = "(31) 97116-9912";
const WHATSAPP_URL =
"https://wa.me/5531971169912?text=" +
  encodeURIComponent(
    "Olá! Sou responsável por uma clínica odontológica e gostaria de conhecer as estratégias da LS para atrair novos pacientes."
  );

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center ${className}`}>
      <LogoMark scale={0.85} />
    </a>
  );
}

/* Rotating words: vertical slide, italic serif, like the reference */
function RotatingWords({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span
      className="relative inline-flex align-bottom overflow-hidden text-primary"
      style={{ fontFamily: "var(--font-display)", fontWeight: 600, height: "1.35em", minWidth: "5ch" }}
    >
      <span
        className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateY(-${i * 1.35}em)` }}
      >
        {words.map((w) => (
          <span key={w} style={{ height: "1.35em", lineHeight: "1.35em" }} className="whitespace-nowrap">
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    { href: "#top", label: "Início" },
    { href: "#calculadora", label: "Calculadora" },
    { href: "#landing-pages", label: "Landing Pages" },
    { href: "#servicos", label: "Serviços" },
    { href: "#metodologia", label: "Metodologia" },
    { href: "#agendar", label: "Agendar" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-md bg-background/80 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-foreground/80 hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#agendar" className="btn-primary hidden sm:inline-flex">
            Falar com especialista
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            <div className="w-6 h-0.5 bg-foreground mb-1.5" />
            <div className="w-6 h-0.5 bg-foreground mb-1.5" />
            <div className="w-6 h-0.5 bg-foreground" />
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-foreground/80">
              {l.label}
            </a>
          ))}
          <a href="#agendar" onClick={() => setOpen(false)} className="btn-primary sm:hidden">
            Falar com especialista
          </a>
        </div>
      )}
    </header>
  );
}

/* Reusable ambient background so every section has an image */
function SectionBg({ src, opacity = 0.18 }: { src: string; opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <img src={src} alt="" className="w-full h-full object-cover" style={{ opacity }} loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/60" />
    </div>
  );
}

function Hero() {
  const words = ["pacientes novos", "agendamentos", "tratamentos de valor", "crescimento"];
  return (
    <section id="top" className="relative flex items-center pt-28 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgTeam} alt="" className="w-full h-full object-cover opacity-[0.12] scale-105 animate-[floaty_20s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/85 to-background/60" />
      </div>
      <Blobs />
      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_400px] lg:items-center">
          <div>
            <Reveal>
              <span className="font-caption text-xs text-primary/90">— LS · Agência de Marketing</span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.2] tracking-tight">
                Sua clínica odontológica <br />
                merece crescer <br />
                <RotatingWords words={words} />
              </h1>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-8 font-caption normal-case tracking-normal text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed" style={{ letterSpacing: 0 }}>
                Estratégias de marketing digital para atrair novos pacientes, fortalecer a presença
                <br />
                da sua clínica e transformar oportunidades em crescimento.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-8">
                <a href="#agendar" className="btn-primary">
                  Quero atrair mais pacientes
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <div className="flex justify-center lg:justify-end">
              <Calculator />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


function About() {
  return (
    <section id="sobre" className="relative py-24 md:py-32 overflow-hidden">
      <SectionBg src={bgBranding} opacity={0.14} />
      <Blobs />
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <span className="font-caption text-xs text-primary/80">Diagnóstico</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black leading-tight">
            O que impede <br />
            <span className="text-primary" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
              o crescimento da sua clínica?
            </span>
          </h2>
          <p className="mt-8 text-foreground/80 leading-relaxed">
            Muitas clínicas odontológicas dependem quase só de indicações e vivem com agenda irregular,
            enquanto o marketing não gera contatos de qualidade.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            A LS entende o negócio odontológico: atrair pacientes particulares, valorizar tratamentos de
            maior investimento e estruturar a jornada do primeiro contato até o agendamento.
          </p>
          <a href="#agendar" className="btn-primary mt-8">
            Quero melhorar a captação de pacientes
          </a>
        </Reveal>
        <Reveal delay={200}>
          <div className="relative animate-floaty">
            <div className="absolute -inset-3 rounded-3xl border border-primary/40" />
            <img
              src={bgTeam}
              alt="Equipe da LS Agência de Marketing"
              loading="lazy"
              className="relative rounded-2xl w-full object-cover aspect-[4/3]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section id="areas" className="relative py-24 md:py-32 overflow-hidden">
      <SectionBg src={bgPerformance} opacity={0.12} />
      <Blobs />
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <span className="font-caption text-xs text-primary/80">Ecossistema</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black leading-tight">
            O que oferecemos? <br />
            <span className="text-primary" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
              Um ecossistema com resultados reais.
            </span>
          </h2>
          <p className="mt-8 text-foreground/80 leading-relaxed max-w-lg">
            A LS ajuda clínicas odontológicas a se posicionarem de forma profissional e a captarem
            pacientes: tráfego pago no Google e Meta Ads, landing pages de conversão, presença digital e
            acompanhamento de indicadores.
          </p>
          <a href="#agendar" className="btn-primary mt-8">
            Conversar com a LS
          </a>
        </Reveal>
        <Reveal delay={200}>
          <div className="relative animate-floaty">
            <div className="absolute -inset-4 rounded-3xl border-2 border-primary rotate-[-3deg]" aria-hidden />
            <div className="relative">
              <AdsPanel />
            </div>
          </div>
        </Reveal>


      </div>
    </section>
  );
}

function Pillars() {
  const pillars = [
    {
      t: "Captação de Pacientes",
      d: "Campanhas de tráfego pago que colocam sua clínica na frente de quem procura serviços odontológicos.",
    },
    { t: "Vendas", d: "Melhoramos a eficiência entre o marketing e o atendimento comercial da sua clínica." },
    {
      t: "Tecnologia",
      d: "Landing pages e ferramentas que transformam visitantes em agendamentos.",
    },
    {
      t: "Gestão",
      d: "Estruturamos a aquisição de pacientes com dados, processos e acompanhamento de indicadores.",
    },
  ];
  const words = ["atrair pacientes", "lotar a agenda", "aumentar agendamentos", "captar mais leads", "vender mais tratamentos"];
  return (
    <section className="relative py-24 md:py-32 border-t border-border">
      <SectionBg src={bgTeam} opacity={0.1} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Como ajudamos sua clínica a <br />
            <RotatingWords words={words} />
          </h2>
          <div className="mt-8">
            <a href="#agendar" className="btn-primary">
              Quero conhecer a estratégia para minha clínica
            </a>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-10">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 120}>
              <article className="group card-lift p-8 md:p-10 rounded-3xl bg-card/80 backdrop-blur border border-border hover:border-primary/60 h-full">
                <div className="flex items-baseline gap-6">
                  <span className="text-6xl font-black text-primary/30 group-hover:text-primary group-hover:animate-pulse transition-colors">
                    0{i + 1}
                  </span>
                  <h3 className="text-3xl font-black">{p.t}</h3>
                </div>
                <p className="mt-6 font-caption normal-case text-foreground/70 leading-relaxed" style={{ letterSpacing: 0 }}>{p.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    t: "Google Ads",
    d: "Campanhas para alcançar pessoas que pesquisam por serviços odontológicos e transformá-las em agendamentos.",
    img: bgBranding,
  },
  {
    t: "Meta Ads",
    d: "Campanhas no Instagram e Facebook para gerar oportunidades comerciais qualificadas para a sua clínica.",
    img: svcSocial,
  },
  {
    t: "Landing Pages",
    d: "Páginas de conversão focadas em transformar visitantes em pacientes agendados.",
    img: svcAudiovisual,
  },
  {
    t: "Presença Digital",
    d: "Posicionamento profissional da sua clínica para transmitir confiança antes do primeiro atendimento.",
    img: svcTech,
  },
  {
    t: "Acompanhamento",
    d: "Relatórios e análise de indicadores para direcionar melhor o investimento em marketing da clínica.",
    img: svcEducacao,
  },
  {
    t: "Jornada do Paciente",
    d: "Otimização do caminho entre o primeiro contato, o atendimento comercial e o agendamento.",
    img: svcPerformance,
  },

];

function Services() {
  const [active, setActive] = useState(0);
  const words = ["de Pacientes", "de Agendamentos", "de Tratamentos", "de Resultados", "de Crescimento"];
  return (
    <section id="servicos" className="relative py-24 md:py-32 border-t border-border">
      <SectionBg src={bgAudiovisual} opacity={0.1} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Aproveite o nosso ecossistema <br />
            <RotatingWords words={words} />
          </h2>
          <p className="mt-6 text-foreground/70">
            Como podemos ajudar a sua clínica a crescer de forma sustentável? Formamos um ecossistema
            integrado para atrair e converter pacientes.
          </p>
        </div>

        <h3 className="mt-20 text-center text-3xl md:text-4xl font-black uppercase tracking-wider">
          Lista de Serviços
        </h3>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 border-b border-border pb-6">
          {SERVICES.map((s, i) => (
            <button
              key={s.t}
              onClick={() => setActive(i)}
              className={`relative font-caption text-xs md:text-sm transition-all pb-2 ${
                active === i ? "text-primary" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {s.t}
              <span
                className={`absolute left-0 -bottom-[7px] h-[2px] bg-primary transition-all duration-500 ${
                  active === i ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
          <div key={`txt-${active}`} className="fade-up">
            <span className="font-caption text-xs text-primary/80">Serviço {String(active + 1).padStart(2, "0")}</span>
            <h4 className="mt-3 text-3xl md:text-4xl font-black">{SERVICES[active].t}</h4>
            <p className="mt-6 text-foreground/70 leading-relaxed max-w-md">{SERVICES[active].d}</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
              Quero este serviço
            </a>
          </div>
          <div className="relative group">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/40 to-transparent blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
            <img
              key={SERVICES[active].img}
              src={SERVICES[active].img}
              alt={SERVICES[active].t}
              loading="lazy"
              className="relative w-full aspect-[4/3] object-cover rounded-2xl fade-up transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Belief() {
  return (
    <section id="sobre" className="relative py-24 md:py-32 bg-[#050505]/40 overflow-hidden border-t border-border">
      <div className="absolute inset-0 opacity-10">
        <img src={bgBranding} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black leading-tight">
          Não acreditamos... <br />
          <span className="text-primary" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            em hacks milagrosos
          </span>
        </h2>
        <p className="mt-10 text-lg leading-relaxed text-[#a8a8a8]">
          Nossa cultura vem da mentalidade Growth, da experimentação através de testes com inteligência de
          dados para validar rotas e trazer resultados sustentáveis. Acreditamos que o crescimento da sua
          clínica está vinculado à estratégia certa, e não ao tamanho da estrutura ou da cidade onde ela
          atende.
        </p>
        <a href="#agendar" className="btn-primary mt-10">
          Conversar com a LS
        </a>
      </div>
    </section>
  );
}

function Methodology() {
  const steps = [
    { t: "Diagnóstico", d: "Entendemos o momento da sua clínica, especialidades, dores e oportunidades." },
    { t: "Estratégia", d: "Desenhamos um plano de captação de pacientes com metas claras e mensuráveis." },
    { t: "Execução", d: "Rodamos campanhas, criamos páginas e implantamos os processos." },
    { t: "Otimização", d: "Analisamos dados, testamos hipóteses e escalamos o que funciona." },
  ];
  return (
    <section id="metodologia" className="relative py-24 md:py-32 border-t border-border">
      <SectionBg src={bgPerformance} opacity={0.1} />
      <div className="relative mx-auto max-w-7xl px-6">
        <span className="block text-center font-caption text-xs text-primary/80 mb-4">Metodologia</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-center">
          Como funciona <span className="text-primary" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>nossa metodologia</span>
        </h2>
        <div className="mt-16 grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 150}>
              <div className="card-lift relative p-8 rounded-2xl bg-card/80 backdrop-blur border border-border h-full">
                <div className="text-5xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const nav = [
    { href: "#top", label: "Início" },
    { href: "#calculadora", label: "Calculadora" },
    { href: "#landing-pages", label: "Landing Pages" },
    { href: "#servicos", label: "Serviços" },
    { href: "#metodologia", label: "Metodologia" },
    { href: "#agendar", label: "Agendar" },
  ];
  const servicos = [
    { href: "#servicos", label: "Google Ads" },
    { href: "#servicos", label: "Meta Ads" },
    { href: "#servicos", label: "Landing Pages" },
    { href: "#servicos", label: "Presença Digital" },
    { href: "#servicos", label: "Jornada do Paciente" },
  ];
  return (
    <footer className="border-t border-border bg-[#050505]/40 py-14">
      <div className="mx-auto max-w-7xl px-6 grid gap-10 md:grid-cols-4">
        <div>
          <LogoMark />
          <p className="mt-5 text-sm leading-relaxed text-[#a8a8a8] max-w-xs">
            Marketing e captação de pacientes para clínicas odontológicas.
          </p>
        </div>
        <div>
          <p className="font-caption text-xs text-primary">Navegação</p>
          <ul className="mt-4 space-y-2">
            {nav.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-sm text-[#a8a8a8] hover:text-primary transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-caption text-xs text-primary">Serviços</p>
          <ul className="mt-4 space-y-2">
            {servicos.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-sm text-[#a8a8a8] hover:text-primary transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-caption text-xs text-primary">Contato</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#888]">Telefone e WhatsApp</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-lg font-medium text-foreground hover:text-primary transition-colors"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-border px-6 pt-6">
        <p className="text-center text-xs text-[#888]">
          © 2026 LS Agência de Marketing. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}


function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition"
      style={{ backgroundColor: "#25D366", boxShadow: "0 10px 40px rgba(37,211,102,0.5)" }}
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-foreground">
      <ParticleNetwork />
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <LandingPages />
        <About />
        <Offer />
        <Pillars />
        <Services />
        <Belief />
        <Methodology />
        <Booking />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ExitIntentPopup />
    </div>

  );
}
