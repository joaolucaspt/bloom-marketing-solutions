import { ArrowRight, Gem } from "lucide-react";

const WA_LP =
  "https://wa.me/5531971169912?text=Ol%C3%A1%2C%20quero%20saber%20sobre%20a%20cria%C3%A7%C3%A3o%20de%20landing%20page%20para%20minha%20cl%C3%ADnica%20odontol%C3%B3gica";
const WA_PREMIUM =
  "https://wa.me/5531971169912?text=Ol%C3%A1%2C%20quero%20saber%20sobre%20o%20combo%20de%20landing%20page%20%2B%20campanha%20para%20minha%20cl%C3%ADnica%20odontol%C3%B3gica";
const WA_EXAMPLE =
  "https://wa.me/5531971169912?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20uma%20landing%20page%20adaptada%20%C3%A0%20minha%20cl%C3%ADnica%20odontol%C3%B3gica";

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="card-benefits-list">
      {items.map((i) => (
        <li key={i} className="text-sm leading-relaxed text-foreground">
          <Check />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LandingPages() {
  return (
    <section id="landing-pages" className="relative bg-[#050505]/40 pb-20 md:pb-28" style={{ paddingTop: 64 }}>
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <div className="mx-auto max-w-[620px] text-center">
          <p className="font-caption text-xs text-primary">Seu ponto de partida</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground">
            Sua página de captação, pensada para gerar oportunidades
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#a8a8a8]">
            Uma landing page é uma página direta, planejada para apresentar sua clínica, explicar os diferenciais
            e facilitar o contato. Ela pode apoiar a captação quando está alinhada às campanhas e ao
            atendimento da equipe.
          </p>
        </div>

        <p className="mt-10 text-center text-sm uppercase tracking-[0.12em] text-[#d5d5d5]">
          Como você quer começar?
        </p>

        <div className="mt-8 cards-container">
          {/* Card 1 — destaque */}
          <article
            className="card-landing-page relative bg-[#141414]"
            style={{
              borderRadius: 12,
              border: "1.5px solid #D4AF37",
              boxShadow: "0 0 24px rgba(212,175,55,0.25)",
            }}
          >
            <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              Mais completo
            </span>
            <div className="card-header">
              <Gem className="card-icon h-6 w-6 text-primary" strokeWidth={1.8} />
              <h3 className="card-title font-semibold text-foreground" style={{ fontSize: 19, lineHeight: "24px" }}>
                GESTÃO COMPLETA
              </h3>
            </div>
            <p className="card-description text-sm leading-relaxed text-[#a8a8a8]">
              Para clínicas que precisam conectar as campanhas, a página de captação e o acompanhamento em uma estratégia integrada.
            </p>
            <div className="spacer-top" />
            <List
              items={[
                "Landing page profissional inclusa",
                "Gestão de tráfego pago (Meta Ads e Google Ads)",
                "Relatórios semanais",
                "Suporte contínuo direto com os fundadores",
                "Estratégia personalizada para sua clínica",
              ]}
            />
            <div className="spacer-bottom" />
            <a
              href="#agendar"
              className="card-button block rounded-xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Quero a gestão completa
            </a>
          </article>

          {/* Card 2 */}
          <article
            className="card-landing-page relative bg-[#141414]"
            style={{
              borderRadius: 12,
              border: "1px solid #e8e8e8",
              boxShadow: "0 0 16px rgba(255,255,255,0.06)",
            }}
          >
            <span
              className="absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{ background: "#e8e8e8", color: "#050505" }}
            >
              Projeto pontual
            </span>
            <div className="card-header">
              <svg viewBox="0 0 24 24" className="card-icon h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              </svg>
              <h3 className="card-title font-semibold text-foreground" style={{ fontSize: 19, lineHeight: "24px" }}>
                SÓ A LANDING PAGE, RÁPIDO
              </h3>
            </div>
            <p className="card-description text-sm leading-relaxed text-[#a8a8a8]">
              Precisa de uma página pontual? Criamos uma experiência focada em apresentar a clínica e facilitar o contato.
            </p>
            <div className="spacer-top" />
            <List
              items={[
                "Design exclusivo, sem templates",
                "Copy focada em conversão",
                "Otimizada pra qualquer tela",
                "Prazo definido conforme o escopo",
                "Suporte direto durante a criação",
              ]}
            />
            <div className="spacer-bottom" />
            <a
              href={WA_LP}
              target="_blank"
              rel="noopener noreferrer"
              className="card-button block rounded-xl border border-primary py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Quero minha landing page
            </a>
          </article>

          {/* Card 3 */}
          <article
            className="card-landing-page relative bg-[#141414]"
            style={{
              borderRadius: 12,
              border: "1px solid #D4AF37",
              boxShadow: "0 0 14px rgba(212,175,55,0.15)",
            }}
          >
            <span
              className="absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{ background: "#D4AF37", color: "#050505" }}
            >
              Combo inicial
            </span>
            <div className="card-header">
              <svg viewBox="0 0 24 24" className="card-icon h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l6-6 4 4 7-7" />
                <path d="M14 8h6v6" />
              </svg>
              <h3 className="card-title font-semibold text-foreground" style={{ fontSize: 19, lineHeight: "24px" }}>
                LANDING PAGE + CAMPANHA PREMIUM
              </h3>
            </div>
            <p className="card-description text-sm leading-relaxed text-[#a8a8a8]">
              Página e campanha planejadas em conjunto, com o destino e os indicadores definidos antes da ativação.
            </p>
            <div className="spacer-top" />
            <List
              items={[
                "Landing page profissional completa",
                "Design exclusivo com copy focada em conversão",
                "Criação e configuração da campanha",
                "Entrega rápida",
                "Acompanhamento dos primeiros resultados",
              ]}
            />
            <div className="spacer-bottom" />
            <a
              href={WA_PREMIUM}
              target="_blank"
              rel="noopener noreferrer"
              className="card-button block rounded-xl py-3 text-center text-sm font-semibold transition hover:brightness-110"
              style={{ background: "#D4AF37", color: "#050505" }}
            >
              Quero o plano premium
            </a>
          </article>
        </div>


        <div className="mt-16 border-t border-[#2a2a2a] pt-10">
          <div className="grid gap-7 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="font-caption text-xs text-primary">Antes do layout</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-foreground">
                A página começa pela estratégia da clínica.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#a8a8a8]">
                A proposta é definida a partir da realidade do negócio, não de um template genérico ou de promessas prontas.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border-l border-primary pl-4">
                <p className="text-sm font-semibold text-foreground">01. Prioridade</p>
                <p className="mt-2 text-xs leading-relaxed text-[#a8a8a8]">Especialidade, região e serviço que a clínica quer destacar.</p>
              </div>
              <div className="border-l border-primary pl-4">
                <p className="text-sm font-semibold text-foreground">02. Mensagem</p>
                <p className="mt-2 text-xs leading-relaxed text-[#a8a8a8]">Informações úteis, diferenciais reais e próximo passo claro.</p>
              </div>
              <div className="border-l border-primary pl-4">
                <p className="text-sm font-semibold text-foreground">03. Conversão</p>
                <p className="mt-2 text-xs leading-relaxed text-[#a8a8a8]">Contato acessível e experiência pensada primeiro para o celular.</p>
              </div>
            </div>
          </div>
          <a
            href={WA_EXAMPLE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            Planejar uma página para minha clínica <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
