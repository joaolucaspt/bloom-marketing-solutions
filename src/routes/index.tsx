import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import Calculator from "@/components/Calculator";
import LandingPages from "@/components/LandingPages";
import Booking from "@/components/Booking";
import AdsPanel from "@/components/AdsPanel";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ServiceVisual, { type ServiceVisualVariant } from "@/components/ServiceVisual";
import { useReveal } from "@/hooks/useReveal";
import teamWhiteboard from "@/assets/team-whiteboard.jpg";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
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
          "Estratégia de marketing digital para clínicas odontológicas: Google Ads, Meta Ads, páginas de captação e acompanhamento de oportunidades. Converse com a LS.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "LS Agência de Marketing | Marketing para Clínicas Odontológicas" },
      {
        property: "og:description",
        content:
          "Google Ads, Meta Ads e páginas de captação conectados à jornada do contato, com estratégia adaptada à realidade da clínica.",
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
    "Olá! Sou responsável por uma clínica odontológica e gostaria de conversar sobre a estratégia de captação da minha clínica."
  );

const NAV_LINKS = [
  { href: "#sobre", label: "Abordagem" },
  { href: "#servicos", label: "Serviços" },
  { href: "#landing-pages", label: "Landing pages" },
  { href: "#metodologia", label: "Processo" },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center ${className}`} aria-label="LS Agência de Marketing — início">
      <LogoMark scale={0.85} />
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="site-nav-link">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#agendar" className="btn-primary hidden sm:inline-flex">
            Agendar diagnóstico <ArrowUpRight size={15} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="mobile-menu-button lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation lg:hidden"
          aria-label="Navegação móvel"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="site-nav-link">
              {link.label}
            </a>
          ))}
          <a href="#calculadora" onClick={() => setOpen(false)} className="site-nav-link">
            Simular investimento
          </a>
          <a href="#agendar" onClick={() => setOpen(false)} className="btn-primary mt-2">
            Agendar diagnóstico <ArrowUpRight size={15} />
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-14 px-5 pb-16 pt-32 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24 lg:pt-36">
        <div className="relative z-10 max-w-2xl">
          <Reveal>
            <p className="section-eyebrow"><span /> LS · Marketing para odontologia</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl xl:text-[68px]">
              Marketing para clínicas odontológicas.
              <span className="mt-2 block text-primary">Com estratégia do primeiro clique ao agendamento.</span>
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#bababa] md:text-lg md:leading-8">
              Conectamos Google Ads, Meta Ads e páginas de captação a uma jornada clara — para sua clínica
              gerar oportunidades e acompanhar o que acontece depois do primeiro contato.
            </p>
          </Reveal>
          <Reveal delay={230}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#agendar" className="btn-primary">
                Agendar diagnóstico <ArrowUpRight size={16} />
              </a>
              <a href="#sobre" className="btn-secondary">
                Conhecer a abordagem <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#a8a8a8]">
              <span>Estratégia adaptada à clínica</span>
              <span className="hidden text-[#665d43] sm:inline">/</span>
              <span>Acompanhamento de indicadores</span>
              <span className="hidden text-[#665d43] sm:inline">/</span>
              <span>Conversa direta com a LS</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={160} className="relative z-10 mx-auto w-full max-w-[520px] lg:ml-auto">
          <AdsPanel />
        </Reveal>
      </div>
      <div className="hero-service-strip">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-5 md:justify-between md:px-8">
          <span className="hero-strip-intro">Da estratégia à execução</span>
          <span>Google Ads</span>
          <span>Meta Ads</span>
          <span>Landing pages</span>
          <span>Mensuração</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  const priorities = [
    {
      number: "01",
      title: "Atrair",
      text: "Alcançar pessoas com intenção de buscar atendimento ou criar demanda para os serviços da clínica.",
    },
    {
      number: "02",
      title: "Converter",
      text: "Apresentar uma mensagem clara e um próximo passo simples, principalmente no celular.",
    },
    {
      number: "03",
      title: "Acompanhar",
      text: "Entender quais contatos chegam e como a equipe dá continuidade ao atendimento.",
    },
  ];

  return (
    <section id="sobre" className="site-section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <figure className="agency-photo-frame">
              <img
                src={teamWhiteboard}
                alt="Planejamento estratégico de uma equipe de marketing"
                loading="lazy"
                className="agency-team-photo"
              />
              <figcaption>
                <span>LS / Método de trabalho</span>
                <span>Estratégia · Execução · Aprendizado</span>
              </figcaption>
            </figure>
          </Reveal>
          <div className="pt-1">
            <Reveal>
              <p className="section-eyebrow"><span /> O desafio real</p>
              <h2 className="section-title mt-5">
                Marketing precisa fazer sentido para a operação da clínica.
              </h2>
              <p className="section-copy mt-5">
                Não basta gerar cliques. A campanha precisa conversar com os serviços oferecidos, a região atendida,
                a página de destino e a forma como a equipe responde aos contatos.
              </p>
            </Reveal>
            <div className="mt-8 divide-y divide-[#2a2a2a] border-y border-[#2a2a2a]">
              {priorities.map((item, index) => (
                <Reveal key={item.number} delay={index * 70}>
                  <div className="grid gap-2 py-5 sm:grid-cols-[48px_120px_1fr] sm:items-start sm:gap-4">
                    <span className="font-display text-lg text-primary">{item.number}</span>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-6 text-[#a9a9a9]">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Strategy() {
  const steps = [
    {
      number: "01",
      title: "Intenção",
      text: "Google Ads para trabalhar a procura existente, quando fizer sentido para a clínica.",
    },
    {
      number: "02",
      title: "Mensagem",
      text: "Meta Ads e criativos que apresentam a proposta com clareza para públicos relevantes.",
    },
    {
      number: "03",
      title: "Conversão",
      text: "Uma página que organiza as informações e facilita o contato com a equipe.",
    },
    {
      number: "04",
      title: "Aprendizado",
      text: "Indicadores que ajudam a identificar o que precisa ser ajustado no processo.",
    },
  ];

  return (
    <section id="processo" className="strategy-section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <p className="section-eyebrow"><span /> Uma visão integrada</p>
            <h2 className="section-title mt-5">Cada etapa tem uma função. O resultado depende da conexão entre elas.</h2>
          </div>
        </Reveal>
        <div className="strategy-steps mt-12">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 60}>
              <article className="strategy-step">
                <span className="strategy-step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="strategy-step-arrow hidden lg:block" size={18} aria-hidden="true" />
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES: {
  title: string;
  description: string;
  outcome: string;
  variant: ServiceVisualVariant;
}[] = [
  {
    title: "Google Ads",
    description:
      "Campanhas focadas em pesquisas relevantes para as especialidades e a região de atendimento da clínica, com palavras-chave e páginas alinhadas à intenção.",
    outcome: "Trabalhar a procura existente",
    variant: "google",
  },
  {
    title: "Meta Ads",
    description:
      "Campanhas no Instagram e Facebook com criativos e mensagens coerentes com os serviços da clínica e o próximo passo esperado do público.",
    outcome: "Apresentar a proposta ao público certo",
    variant: "meta",
  },
  {
    title: "Landing pages",
    description:
      "Páginas de captação com hierarquia clara, informações essenciais e chamadas para ação fáceis de usar em dispositivos móveis.",
    outcome: "Facilitar o contato",
    variant: "landing",
  },
  {
    title: "Presença digital",
    description:
      "Organização dos pontos de contato e da mensagem institucional para reforçar consistência entre campanhas, informações e canais da clínica.",
    outcome: "Transmitir clareza e confiança",
    variant: "presence",
  },
  {
    title: "Mensuração",
    description:
      "Acompanhamento de investimento, contatos e custos. Quando os dados estão disponíveis, a análise pode avançar para a relação com agendamentos.",
    outcome: "Decidir com base em dados disponíveis",
    variant: "analytics",
  },
  {
    title: "Jornada do contato",
    description:
      "Mapeamento da passagem entre o anúncio, o primeiro contato e o atendimento, para identificar pontos que merecem atenção e acompanhamento.",
    outcome: "Dar continuidade às oportunidades",
    variant: "journey",
  },
];

function Services() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

  return (
    <section id="servicos" className="site-section services-section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <p className="section-eyebrow"><span /> Como a LS pode atuar</p>
            <h2 className="section-title mt-5">Serviços que trabalham juntos, não em silos.</h2>
            <p className="section-copy mt-5">
              A composição depende do momento da clínica, das prioridades comerciais e da estrutura de atendimento.
              Estas são as frentes que podem fazer parte da estratégia.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-14">
          <div className="service-tabs" role="tablist" aria-label="Frentes de marketing">
            {SERVICES.map((service, index) => (
              <button
                key={service.title}
                type="button"
                role="tab"
                id={`service-tab-${index}`}
                aria-selected={active === index}
                aria-controls="service-panel"
                onClick={() => setActive(index)}
                className={`service-tab ${active === index ? "service-tab-active" : ""}`}
              >
                <span>{service.title}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${active}`}
            className="service-detail"
          >
            <div key={current.title} className="service-detail-copy fade-up">
              <p className="service-detail-kicker">Frente {String(active + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">{current.title}</h3>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#b1b1b1] md:text-base">{current.description}</p>
              <div className="mt-6 flex items-start gap-3 border-l border-primary pl-4">
                <div>
                  <p className="text-xs text-[#898989]">Papel na estratégia</p>
                  <p className="mt-1 text-sm font-medium text-white">{current.outcome}</p>
                </div>
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-7">
                Conversar sobre esta frente <ArrowUpRight size={15} />
              </a>
            </div>
            <div key={`visual-${current.variant}`} className="service-detail-visual fade-up">
              <ServiceVisual variant={current.variant} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Methodology() {
  const steps = [
    {
      number: "01",
      title: "Diagnóstico",
      description: "Entendemos a clínica, as especialidades, a região, as prioridades e a estrutura atual de atendimento.",
    },
    {
      number: "02",
      title: "Plano de ação",
      description: "Definimos quais canais fazem sentido, qual mensagem precisa ser comunicada e como o contato será acompanhado.",
    },
    {
      number: "03",
      title: "Implementação",
      description: "Configuramos as campanhas e páginas incluídas no escopo acordado, com caminhos de conversão claros.",
    },
    {
      number: "04",
      title: "Acompanhamento",
      description: "Analisamos os dados disponíveis, registramos aprendizados e ajustamos a estratégia com transparência.",
    },
  ];

  return (
    <section id="metodologia" className="site-section methodology-section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="section-eyebrow"><span /> O processo</p>
          <h2 className="section-title mt-5 max-w-3xl">Um processo claro, do diagnóstico à otimização.</h2>
        </Reveal>
        <div className="methodology-list mt-10">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 50}>
              <article className="methodology-row">
                <span className="methodology-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Planning() {
  return (
    <section id="calculadora" className="planning-section">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1fr_400px] lg:gap-16">
        <Reveal>
          <p className="section-eyebrow"><span /> Planejamento de mídia</p>
          <h2 className="section-title mt-5 max-w-xl">Comece com hipóteses claras, não com promessas.</h2>
          <p className="section-copy mt-5 max-w-xl">
            Use a simulação ao lado para entender a relação entre orçamento e custo hipotético por contato. Os valores
            reais dependem da campanha, da região, da oferta e do atendimento — por isso, servem para planejar, não
            para prever resultados.
          </p>
          <a href="#agendar" className="btn-secondary mt-7">
            Avaliar o cenário da minha clínica <ArrowRight size={15} />
          </a>
        </Reveal>
        <Reveal delay={100} className="mx-auto w-full max-w-[400px] lg:ml-auto">
          <Calculator />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const links = [
    { href: "#sobre", label: "Abordagem" },
    { href: "#processo", label: "Estratégia" },
    { href: "#servicos", label: "Serviços" },
    { href: "#landing-pages", label: "Landing pages" },
    { href: "#calculadora", label: "Simular investimento" },
    { href: "#agendar", label: "Agendar diagnóstico" },
  ];

  return (
    <footer className="site-footer">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <LogoMark />
          <p className="mt-5 max-w-xs text-sm leading-6 text-[#a4a4a4]">
            Marketing e captação para clínicas odontológicas com foco em estratégia, clareza e acompanhamento.
          </p>
        </div>
        <div>
          <h2 className="footer-heading">Navegação</h2>
          <ul className="mt-4 space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="footer-link">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">Fale com a LS</h2>
          <p className="mt-4 text-sm text-[#a4a4a4]">Telefone e WhatsApp</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-lg font-medium text-white hover:text-primary">
            {PHONE_DISPLAY}
          </a>
          <a href="/politica-de-privacidade" className="mt-5 block text-sm text-[#a4a4a4] hover:text-primary">
            Política de privacidade
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-[#262626] px-5 py-5 text-xs text-[#777] sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>© 2026 LS Agência de Marketing. Todos os direitos reservados.</p>
        <a href="#top" className="footer-link inline-flex items-center gap-1">Voltar ao topo <ArrowUpRight size={13} /></a>
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
      aria-label="Conversar com a LS pelo WhatsApp"
      className="floating-whatsapp"
    >
      <MessageCircle size={22} />
    </a>
  );
}

function Index() {
  return (
    <div className="site-shell">
      <Nav />
      <main>
        <Hero />
        <About />
        <Strategy />
        <Services />
        <LandingPages />
        <Methodology />
        <Planning />
        <Booking />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ExitIntentPopup />
    </div>
  );
}
