import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
const EMAIL = "contato@lsagenciademarketing.com.br";

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-3 ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-black text-primary-foreground text-lg">
        LS
      </div>
      <div className="hidden sm:flex flex-col leading-tight">
        <span className="text-sm font-black tracking-widest">LS</span>
        <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Agência de Marketing
        </span>
      </div>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#metodologia", label: "Metodologia" },
    { href: "#contato", label: "Contato" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary hover:[&]:btn-primary-hover">
            Falar com especialista
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
            aria-label="Menu"
          >
            <div className="w-6 h-0.5 bg-foreground mb-1.5" />
            <div className="w-6 h-0.5 bg-foreground mb-1.5" />
            <div className="w-6 h-0.5 bg-foreground" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  const words = ["Marketing", "Branding", "Vendas", "Crescimento", "Marketing"];
  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-4xl fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 text-xs uppercase tracking-widest text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            LS Agência de Marketing
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight">
            Nós somos <br />
            especialistas em{" "}
            <span className="words-slider">
              {words.map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Seu crescimento não pode esperar — e você sabe disso. Na LS Agência de Marketing,
            transformamos desafios em resultados concretos e sustentáveis.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary hover:[&]:btn-primary-hover">
              Falar com especialista →
            </a>
            <a href="#servicos" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-semibold hover:bg-card transition">
              Ver serviços
            </a>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
          {[
            ["+120", "Projetos entregues"],
            ["+8", "Anos de mercado"],
            ["+50", "Marcas atendidas"],
            ["4.9★", "Avaliação média"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-3xl md:text-4xl font-black text-primary">{n}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Sobre nós</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black leading-tight">
            O que impede o seu <span className="text-primary">crescimento?</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Muitas empresas lutam para conectar estratégias de marketing e vendas de maneira eficaz.
            Nós entendemos esses desafios e temos a solução para estruturar o seu marketing,
            melhorar o posicionamento, a experiência do usuário e acelerar suas vendas.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary hover:[&]:btn-primary-hover mt-8">
            Vamos conversar
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { t: "Estratégia", d: "Planos que unem marketing e vendas" },
            { t: "Criatividade", d: "Ideias que constroem marcas fortes" },
            { t: "Performance", d: "Resultados mensuráveis e sustentáveis" },
            { t: "Tecnologia", d: "Ferramentas de ponta para escalar" },
          ].map((c) => (
            <div key={c.t} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <div className="w-4 h-4 rounded-sm bg-primary" />
              </div>
              <h3 className="font-bold text-lg">{c.t}</h3>
              <p className="text-sm text-muted-foreground mt-2">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      t: "Identidade Visual e Branding",
      d: "Naming, logotipo, personalidade, tom de voz, manifesto, arquétipo e posicionamento.",
    },
    { t: "Redes Sociais", d: "Gestão completa, planejamento, conteúdo, lives, podcasts e colabs." },
    { t: "Produção Audiovisual", d: "Captação e edição de fotos, shooting, vídeos, motions e filmes." },
    { t: "Tech", d: "Sites, landing pages, e-commerce, aplicativos e UX Design." },
    { t: "Educação", d: "Consultoria estratégica, treinamentos e mentorias." },
    { t: "Performance", d: "Campanhas patrocinadas, SEO, mídia programática e merchandising." },
  ];
  return (
    <section id="servicos" className="py-24 md:py-32 border-t border-border relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">O que oferecemos</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
            Soluções integradas com resultados concretos.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            A LS Agência de Marketing ajuda empresas a se posicionarem de forma profissional no mercado.
            Nosso ecossistema inclui presença digital, branding, performance, audiovisual, jornada do
            cliente, vendas, treinamentos e mentorias.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.t}
              className="group p-8 rounded-2xl bg-card border border-border hover:bg-primary hover:border-primary transition-all duration-300 cursor-pointer"
            >
              <div className="text-xs font-mono text-muted-foreground group-hover:text-primary-foreground/70">
                0{i + 1}
              </div>
              <h3 className="mt-4 text-2xl font-bold">{s.t}</h3>
              <p className="mt-3 text-muted-foreground group-hover:text-primary-foreground/90 leading-relaxed">
                {s.d}
              </p>
              <div className="mt-6 text-sm font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                Saiba mais →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const pillars = [
    { t: "Marketing Digital", d: "Posicionamento profissional no mercado com um ecossistema completo de serviços." },
    { t: "Vendas", d: "Melhoramos a eficiência entre o comercial e o marketing do seu negócio." },
    { t: "Tecnologia", d: "Experiência incrível com acesso às melhores tecnologias do mercado." },
    { t: "Negócios", d: "Estruturamos e aceleramos produtos com dados, processos e treinamentos." },
  ];
  return (
    <section className="py-24 md:py-32 border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Ecossistema</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black">Como ajudamos sua empresa a crescer</h2>
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <div key={p.t} className="p-8 rounded-2xl border border-border bg-background relative overflow-hidden">
              <div className="absolute top-0 right-0 text-8xl font-black text-primary/10">{i + 1}</div>
              <div className="relative">
                <h3 className="text-xl font-bold">{p.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
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
    <section id="metodologia" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Metodologia</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black">Como funciona nossa metodologia</h2>
          <p className="mt-6 text-muted-foreground text-lg">
            Não acreditamos em hacks milagrosos. Nossa cultura vem da mentalidade Growth: experimentação,
            dados e resultados sustentáveis.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.t} className="relative">
              <div className="text-5xl font-black text-primary">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 -right-3 w-6 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const text = `Olá! Sou ${form.name}.%0AEmail: ${form.email}%0A%0A${form.message}`;
    const url = `https://wa.me/5531971169912?text=${text}`;
    setTimeout(() => {
      window.open(url, "_blank");
      setState("sent");
    }, 400);
  }

  return (
    <section id="contato" className="py-24 md:py-32 border-t border-border relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[150px]" />
      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-16">
        <div>
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Contato</span>
          <h2 className="mt-4 text-5xl md:text-7xl font-black leading-none">
            Vamos <br />
            <span className="text-primary">conversar?</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            Entre em contato agora e descubra como podemos transformar seu marketing. Oferecemos uma
            consulta gratuita para entender suas necessidades.
          </p>

          <div className="mt-10 space-y-5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary transition"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-xl">
                📱
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">WhatsApp / Telefone</div>
                <div className="font-bold text-lg">{PHONE_DISPLAY}</div>
              </div>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary transition"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-xl">
                ✉
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">E-mail</div>
                <div className="font-bold text-lg">{EMAIL}</div>
              </div>
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-8 md:p-10 rounded-3xl bg-card border border-border">
          <h3 className="text-2xl font-bold">Envie sua mensagem</h3>
          <p className="text-sm text-muted-foreground mt-2">Responderemos direto no seu WhatsApp.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Nome</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">E-mail</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition"
                placeholder="voce@email.com"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Mensagem</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition resize-none"
                placeholder="Conte um pouco sobre o seu projeto..."
              />
            </div>
            <button type="submit" className="btn-primary hover:[&]:btn-primary-hover w-full">
              {state === "sending" ? "Enviando..." : state === "sent" ? "Enviado ✓" : "Enviar mensagem"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} LS Agência de Marketing. Todos os direitos reservados.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="text-sm text-muted-foreground hover:text-primary transition">
          {PHONE_DISPLAY}
        </a>
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
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/50 hover:scale-110 transition"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-primary-foreground">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
        <Services />
        <Pillars />
        <Methodology />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
