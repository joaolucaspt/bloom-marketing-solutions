import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import ParticleNetwork from "@/components/ParticleNetwork";
import bgTeam from "@/assets/bg-team.jpg";
import bgBranding from "@/assets/bg-branding.jpg";
import bgAudiovisual from "@/assets/bg-audiovisual.jpg";
import bgPerformance from "@/assets/bg-performance.jpg";
import bgPortrait from "@/assets/bg-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LS Agência de Marketing — Branding, Performance & Vendas" },
      {
        name: "description",
        content:
          "LS Agência de Marketing: ecossistema completo de branding, marketing digital, vendas e tecnologia para acelerar o crescimento do seu negócio.",
      },
      { property: "og:title", content: "LS Agência de Marketing" },
      {
        property: "og:description",
        content: "Branding, performance e vendas para acelerar o crescimento do seu negócio.",
      },
    ],
  }),
  component: Index,
});

const PHONE_DISPLAY = "(31) 97116-9912";
const WHATSAPP_URL =
  "https://wa.me/5531971169912?text=" +
  encodeURIComponent("Olá! Vim pelo site da LS Agência de Marketing e quero falar com um especialista.");

/* Logo — inline SVG, wordmark "LS" + divider + stacked "AGÊNCIA / DE MARKETING" */
function LogoMark({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 60" className={className} aria-label="LS Agência de Marketing" role="img">
      <g fill="currentColor">
        <path d="M8 8 h14 v36 h24 v8 H8 z" />
        <path d="M56 8 h40 v8 H66 v10 h26 c4 0 8 4 8 8 v10 c0 4 -4 8 -8 8 H54 v-8 h34 v-10 H62 c-4 0 -8 -4 -8 -8 V16 c0 -4 4 -8 8 -8 z" />
      </g>
      <line x1="115" y1="12" x2="115" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <g fill="currentColor" fontFamily="Inter, sans-serif" fontWeight="400" letterSpacing="2">
        <text x="125" y="26" fontSize="10">AGÊNCIA</text>
        <text x="125" y="42" fontSize="10">DE MARKETING</text>
      </g>
    </svg>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center text-foreground ${className}`}>
      <LogoMark className="h-9 md:h-10 w-auto" />
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
      className="relative inline-flex align-bottom overflow-hidden text-primary italic"
      style={{ fontFamily: "var(--font-display)", height: "1.1em", minWidth: "5ch" }}
    >
      <span
        className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateY(-${i * 1.1}em)` }}
      >
        {words.map((w) => (
          <span key={w} style={{ height: "1.1em", lineHeight: "1.1em" }} className="whitespace-nowrap">
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
    { href: "#sobre", label: "Sobre" },
    { href: "#areas", label: "Áreas De Atuação" },
    { href: "#servicos", label: "Serviços" },
    { href: "#contato", label: "Contato" },
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
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary hidden sm:inline-flex">
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
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary sm:hidden">
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
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
    </div>
  );
}

function Hero() {
  const words = ["Branding", "Marketing", "Vendas", "Crescimento"];
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgTeam} alt="" className="w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.02] tracking-tight">
            Nós somos <br />
            Especialistas em <br />
            <RotatingWords words={words} />
          </h1>
          <p className="mt-10 text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
            Seu crescimento não pode esperar! E você sabe disto.
            <br />
            Na LS Agência de Marketing, transformamos desafios em resultados.
          </p>
          <div className="mt-10">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary">
              Falar com especialista
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="relative py-24 md:py-32">
      <SectionBg src={bgBranding} opacity={0.14} />
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            O que impede <br />
            <span className="text-primary italic" style={{ fontFamily: "var(--font-display)" }}>
              o seu crescimento?
            </span>
          </h2>
          <p className="mt-8 text-foreground/80 leading-relaxed">
            Muitas empresas lutam para conectar estratégias de marketing e vendas de maneira eficaz.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Nós entendemos esses desafios e temos a solução para estruturarmos o seu marketing, melhorar o
            seu posicionamento, a experiência do seu usuário e acelerar suas vendas.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary mt-8">
            Falar com especialista
          </a>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl border border-primary/40" />
          <img
            src={bgTeam}
            alt="Equipe da LS Agência de Marketing"
            loading="lazy"
            className="relative rounded-2xl w-full object-cover aspect-[4/3]"
          />
        </div>
      </div>
    </section>
  );
}

const CLIENT_LOGOS = [
  "SICOOB", "MODELARIA OLGA", "GRUPO PRÓVIDA", "ANCIOPLEX",
  "SANTA CASA", "ALEXANDRE COMETTO", "ANNA HENKELMANN", "DINÂMICA",
  "BIOS·NAD", "CRIS BARISTA", "SKYFIT ACADEMIA", "ARCA",
  "RODRIGO JORGE", "CERTIFICAMINAS",
];

function ClientsStrip() {
  return (
    <section className="py-16 border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-10">
          Marcas que crescem conosco
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center">
          {CLIENT_LOGOS.map((n) => (
            <div
              key={n}
              className="text-center text-xs md:text-sm font-bold tracking-widest text-foreground/50 hover:text-foreground transition-colors"
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offer() {
  const words = ["Integradas", "com Resultados", "Sustentáveis"];
  return (
    <section id="areas" className="relative py-24 md:py-32">
      <SectionBg src={bgPerformance} opacity={0.12} />
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            O Que Oferecemos? <br />
            <RotatingWords words={words} />
          </h2>
          <p className="mt-8 text-foreground/80 leading-relaxed max-w-lg">
            A LS ajuda empresas a se posicionarem de forma profissional no mercado. Nosso ecossistema de
            serviços inclui presença digital, branding, performance e anúncios online, experiências,
            audiovisual, jornada do cliente, vendas, treinamentos e mentorias.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary mt-8">
            Falar com especialista
          </a>
        </div>
        <div className="relative">
          <div
            className="absolute -inset-4 rounded-3xl border-2 border-primary rotate-[-3deg]"
            aria-hidden
          />
          <img
            src={bgPortrait}
            alt="Especialista LS Agência de Marketing"
            loading="lazy"
            className="relative rounded-2xl w-full object-cover aspect-[4/5]"
          />
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const pillars = [
    {
      t: "Marketing Digital",
      d: "Presença digital, branding, performance, audiovisual, jornada do cliente, vendas, treinamentos e mentorias.",
    },
    { t: "Vendas", d: "Melhoramos a eficiência entre o comercial e o marketing do seu negócio." },
    {
      t: "Tecnologia",
      d: "Proporcionamos uma experiência incrível com acesso às melhores tecnologias do mercado.",
    },
    {
      t: "Negócios",
      d: "Estruturamos e aceleramos produtos e negócios com dados, processos e treinamentos.",
    },
  ];
  const words = ["crescer", "melhorar o branding", "otimizar resultados", "gerar mais leads", "aumentar as vendas"];
  return (
    <section className="relative py-24 md:py-32 border-t border-border">
      <SectionBg src={bgTeam} opacity={0.1} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Como ajudamos sua empresa a <br />
            <RotatingWords words={words} />
          </h2>
          <div className="mt-8">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary">
              Falar com especialista
            </a>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-10">
          {pillars.map((p, i) => (
            <article
              key={p.t}
              className="group p-8 md:p-10 rounded-3xl bg-card/80 backdrop-blur border border-border hover:border-primary/60 transition-colors"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-6xl font-black text-primary/30 group-hover:text-primary transition-colors">
                  0{i + 1}
                </span>
                <h3 className="text-3xl font-black">{p.t}</h3>
              </div>
              <p className="mt-6 text-foreground/70 leading-relaxed">{p.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    t: "Identidade Visual e Branding",
    d: "Naming, logotipo, personalidade, tom de voz, manifesto, arquétipo, definição de posicionamento.",
    img: bgBranding,
  },
  {
    t: "Redes Sociais",
    d: "Gestão completa de rede social, planejamento, conteúdo, lives, podcasts, influência e colabs.",
    img: bgTeam,
  },
  {
    t: "Produção Audiovisual",
    d: "Captação e edição de fotos, shooting, vídeos curtos, motions, filmes e locução.",
    img: bgAudiovisual,
  },
  {
    t: "Tech",
    d: "Desenvolvimento de Sites, Landing Pages, e-commerce, aplicativos e UX Design.",
    img: bgPerformance,
  },
  {
    t: "Educação",
    d: "Consultoria estratégica, treinamentos e mentorias.",
    img: bgTeam,
  },
  {
    t: "Performance",
    d: "Campanhas patrocinadas, SEO, mídia programática e merchandising.",
    img: bgPerformance,
  },
];

function Services() {
  const [active, setActive] = useState(0);
  const words = ["de Growth", "de Branding", "de Vendas", "de Experiências", "de Treinamentos"];
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
            Como podemos ajudar a sua empresa a crescer de forma sustentável? Formamos um ecossistema
            integrado para te ajudar de forma completa.
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
              className={`text-sm md:text-base font-bold transition-colors ${
                active === i ? "text-primary" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {s.t}
            </button>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h4 className="text-3xl md:text-4xl font-black">{SERVICES[active].t}</h4>
            <p className="mt-6 text-foreground/70 leading-relaxed max-w-md">{SERVICES[active].d}</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary mt-8">
              Quero este serviço
            </a>
          </div>
          <div className="relative">
            <img
              key={SERVICES[active].img}
              src={SERVICES[active].img}
              alt={SERVICES[active].t}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover rounded-2xl animate-[fadeUp_.5s_ease-out]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Belief() {
  return (
    <section className="relative py-24 md:py-32 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={bgBranding} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black leading-tight">
          Não acreditamos... <br />
          <span className="italic font-normal" style={{ fontFamily: "var(--font-display)" }}>
            em hacks milagrosos
          </span>
        </h2>
        <p className="mt-10 text-lg leading-relaxed text-background/80">
          Nossa cultura vem da mentalidade Growth, da experimentação através de testes com inteligência de
          dados para validar rotas e trazer resultados sustentáveis. Acreditamos que o seu crescimento
          está vinculado à sua mentalidade e não ao tamanho do seu negócio, estrutura ou segmentação de
          mercado.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary mt-10">
          Falar com especialista
        </a>
      </div>
    </section>
  );
}

function Methodology() {
  const steps = [
    { t: "Diagnóstico", d: "Entendemos o momento do seu negócio, dores e oportunidades." },
    { t: "Estratégia", d: "Desenhamos um plano personalizado com metas claras e mensuráveis." },
    { t: "Execução", d: "Rodamos campanhas, produzimos conteúdos e implantamos processos." },
    { t: "Otimização", d: "Analisamos dados, testamos hipóteses e escalamos o que funciona." },
  ];
  return (
    <section className="relative py-24 md:py-32 border-t border-border">
      <SectionBg src={bgPerformance} opacity={0.1} />
      <div className="relative mx-auto max-w-7xl px-6">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide text-center">
          Como funciona nossa metodologia
        </h2>
        <div className="mt-16 grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.t} className="relative p-8 rounded-2xl bg-card/80 backdrop-blur border border-border">
              <div className="text-5xl font-black text-primary">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Final contact section — logo + WhatsApp only, no form */
function Contact() {
  return (
    <section id="contato" className="relative py-24 md:py-32 overflow-hidden border-t border-border">
      <SectionBg src={bgTeam} opacity={0.15} />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tight">
          Vamos <br />
          <span className="italic font-normal text-primary" style={{ fontFamily: "var(--font-display)" }}>
            conversar?
          </span>
        </h2>
        <p className="mt-8 text-foreground/80 max-w-xl mx-auto">
          Entre em contato e descubra como podemos transformar seu marketing. Oferecemos uma consulta
          gratuita para entender suas necessidades e desenvolver uma estratégia personalizada.
        </p>

        <div className="mt-14 inline-flex flex-col items-center gap-6 p-10 md:p-14 rounded-3xl bg-card/80 backdrop-blur border border-border">
          <LogoMark className="h-14 md:h-16 w-auto text-foreground" />
          <div className="mt-2">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">Telefone e WhatsApp</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="mt-3 block text-3xl md:text-5xl font-black hover:text-primary transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary mt-2">
            Falar agora no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
          className="text-sm font-bold hover:text-primary transition-colors"
        >
          {PHONE_DISPLAY}
        </a>
        <p className="text-xs text-foreground/50 text-center">
          © {new Date().getFullYear()} LS Agência de Marketing. Todos os direitos reservados.
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
      rel="noopener"
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
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <ClientsStrip />
        <Offer />
        <Pillars />
        <Services />
        <Belief />
        <Methodology />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
