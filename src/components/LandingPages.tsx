import exampleAsset from "@/assets/produzquality-hq.png.asset.json";

const WA_LP =
  "https://wa.me/5531971169912?text=Ol%C3%A1%2C%20quero%20saber%20sobre%20o%20servi%C3%A7o%20de%20cria%C3%A7%C3%A3o%20de%20landing%20page";
const WA_PREMIUM =
  "https://wa.me/5531971169912?text=Ol%C3%A1%2C%20quero%20saber%20sobre%20o%20plano%20de%20landing%20page%20%2B%20campanha%20premium";
const WA_EXAMPLE =
  "https://wa.me/5531971169912?text=Ol%C3%A1%2C%20vi%20o%20exemplo%20de%20p%C3%A1gina%20que%20voc%C3%AA%20fez%20e%20quero%20uma%20assim%20pra%20mim";

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5 text-sm text-foreground">
          <Check />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LandingPages() {
  return (
    <section id="landing-pages" className="relative bg-[#050505] pb-20 md:pb-28" style={{ paddingTop: 40 }}>
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <div className="mx-auto max-w-[620px] text-center">
          <p className="font-caption text-xs text-primary">Seu ponto de partida</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground">
            Sua página de vendas, pronta pra vender
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#a8a8a8]">
            No mercado, isso é chamado de landing page — uma página única e direta, feita pra transformar
            visitante em cliente, sem distrações. É o primeiro passo de qualquer estratégia de marketing
            que funciona.
          </p>
        </div>

        <p className="mt-10 text-center text-sm uppercase tracking-[0.12em] text-[#d5d5d5]">
          Como você quer começar?
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3 items-stretch">
          {/* Card 1 */}
          <article
            className="flex h-full flex-col rounded-xl border-[0.5px] border-[#333] bg-[#141414]"
            style={{ padding: 36, borderRadius: 12 }}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="8" y="3" width="13" height="13" rx="2" />
              <path d="M16 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" />
            </svg>
            <h3 className="mt-5 font-semibold text-foreground" style={{ fontSize: 19 }}>
              Parte da gestão completa
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#a8a8a8]">
              Todo cliente que fecha a gestão de marketing com a LS recebe uma landing page profissional
              como parte do serviço.
            </p>
            <List
              items={[
                "Landing page profissional inclusa",
                "Gestão de tráfego pago",
                "Relatórios semanais",
                "Suporte contínuo",
              ]}
            />
            <a
              href="#agendar"
              className="mt-auto block w-full rounded-xl border border-primary py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              style={{ marginTop: 28 }}
            >
              Quero a gestão completa
            </a>
          </article>

          {/* Card 2 */}
          <article
            className="relative flex h-full flex-col border border-primary bg-[#141414]"
            style={{ padding: 36, borderRadius: 12 }}
          >
            <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              Entrega rápida
            </span>
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            </svg>
            <h3 className="mt-5 font-semibold text-foreground" style={{ fontSize: 19 }}>
              Só a landing page, rápido
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#a8a8a8]">
              Precisa sair do zero agora? Criamos sua página de vendas sem precisar contratar o pacote
              completo.
            </p>
            <List
              items={[
                "Design exclusivo, sem templates",
                "Copy focada em conversão",
                "Otimizada pra qualquer tela",
                "Pronta em poucos dias",
              ]}
            />
            <a
              href={WA_LP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              style={{ marginTop: 28 }}
            >
              Quero minha landing page
            </a>
          </article>

          {/* Card 3 */}
          <article
            className="relative flex h-full flex-col border border-primary bg-[#141414]"
            style={{ padding: 36, borderRadius: 12 }}
          >
            <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              Mais completo
            </span>
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 3h12l4 6-10 12L2 9l4-6z" strokeLinejoin="round" />
              <path d="M2 9h20M12 21 8 9l4-6 4 6-4 12z" strokeLinejoin="round" />
            </svg>
            <h3 className="mt-5 font-semibold text-foreground" style={{ fontSize: 19 }}>
              Landing page + campanha premium
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#a8a8a8]">
              Sua página de vendas pronta e já rodando com uma campanha estratégica pra trazer os
              primeiros leads desde o primeiro dia.
            </p>
            <List
              items={[
                "Landing page profissional completa",
                "Criação e configuração da campanha",
                "Entrega rápida",
                "Acompanhamento dos primeiros resultados",
              ]}
            />
            <a
              href={WA_PREMIUM}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              style={{ marginTop: 28 }}
            >
              Quero o plano premium
            </a>
          </article>
        </div>

        {/* Parte 2 — exemplo real */}
        <div style={{ marginTop: 64 }} className="text-center">
          <p className="font-caption text-xs text-primary">Exemplo real</p>
          <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-foreground">
            Isso poderia ser a sua página, hoje mesmo
          </h3>
          <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-relaxed text-[#a8a8a8]">
            Um projeto real feito pela LS, com hero de impacto e calculadora interativa capturando o lead
            logo na primeira dobra.
          </p>

          <div className="mx-auto mt-8 max-w-[900px] overflow-hidden rounded-xl border border-primary">
            <div className="flex items-center gap-2 bg-[#141414] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#555]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#555]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#555]" />
              <span className="ml-3 text-xs text-[#888]">produzquality.company</span>
            </div>
            <img
              src={exampleAsset.url}
              alt="Exemplo real de landing page criada pela LS Agência de Marketing"
              loading="lazy"
              className="block w-full"
            />
          </div>

          <a
            href={WA_EXAMPLE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Quero uma página assim
          </a>
        </div>
      </div>
    </section>
  );
}
