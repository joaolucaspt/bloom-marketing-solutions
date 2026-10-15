import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/Logo";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | LS Agência de Marketing" },
      {
        name: "description",
        content:
          "Saiba quais dados a LS Agência de Marketing coleta, como usamos cookies e pixels de rastreamento e como solicitar a remoção dos seus dados.",
      },
      { property: "og:title", content: "Política de Privacidade | LS Agência de Marketing" },
      {
        property: "og:description",
        content:
          "Como a LS Agência de Marketing coleta, usa e protege os dados de navegação dos visitantes do site.",
      },
      { property: "og:type", content: "article" },
    ],
    links: [
    ],
  }),
  component: PrivacyPage,
});

const WHATSAPP_URL = "https://wa.me/5531971169912";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#a8a8a8]">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[760px]">
        <LogoMark scale={0.85} />

        <h1 className="mt-10 text-3xl font-semibold text-foreground md:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[#a8a8a8]">
          Esta política explica como a LS Agência de Marketing trata as informações coletadas
          durante a sua navegação neste site, em conformidade com a Lei Geral de Proteção de Dados
          (Lei nº 13.709/2018 — LGPD).
        </p>

        <Section title="1. Quais dados coletamos">
          <p>
            Coletamos apenas dados de navegação e dados que você nos envia voluntariamente:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Dados de navegação: páginas visitadas, tempo de permanência, origem do acesso, tipo de dispositivo e navegador.</li>
            <li>Dados armazenados em cookies e tecnologias semelhantes (identificadores anônimos de sessão e de campanha).</li>
            <li>Dados de contato que você escolhe informar ao falar conosco por WhatsApp, e-mail ou ao agendar uma reunião.</li>
          </ul>
          <p>
            As simulações feitas na calculadora do site são processadas apenas no seu navegador e
            não são armazenadas por nós.
          </p>
        </Section>

        <Section title="2. Finalidade do uso dos dados">
          <p>
            Utilizamos os dados para: entender o desempenho do site e das nossas campanhas,
            melhorar a experiência de navegação, mensurar resultados de marketing e tráfego pago,
            e responder ao seu contato com propostas e informações sobre nossos serviços.
          </p>
          <p>Não vendemos, alugamos ou comercializamos seus dados com terceiros.</p>
        </Section>

        <Section title="3. Cookies e tecnologias de terceiros">
          <p>
            Este site utiliza armazenamento local para lembrar preferências de interface e pode carregar
            tecnologias de terceiros necessárias a funcionalidades incorporadas, como o agendamento online.
            Esses serviços podem utilizar seus próprios cookies, conforme as políticas dos respectivos
            fornecedores.
          </p>
          <p>
            Ferramentas de análise de audiência e publicidade devem ser descritas conforme as integrações
            efetivamente habilitadas na versão publicada. A disponibilidade dessas ferramentas pode variar
            de acordo com a configuração do ambiente.
          </p>
          <p>
            Você pode bloquear ou apagar cookies a qualquer momento nas configurações do seu navegador.
            Algumas funcionalidades incorporadas podem ser afetadas por essa escolha.
          </p>
        </Section>

        <Section title="4. Compartilhamento com terceiros">
          <p>
            Podemos compartilhar dados estritamente necessários com plataformas parceiras de
            tecnologia e publicidade (como Google, Meta e ferramentas de agendamento), sempre
            limitados às finalidades descritas acima.
          </p>
        </Section>

        <Section title="5. Seus direitos e remoção de dados">
          <p>
            Você pode solicitar a qualquer momento a confirmação, correção, portabilidade ou
            exclusão dos seus dados, bem como revogar consentimentos concedidos.
          </p>
          <p>
            Para isso, entre em contato pelo WhatsApp{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              (31) 97116-9912
            </a>{" "}
            ou pelo e-mail{" "}
            <a href="mailto:contato@lsagenciademarketing.com.br" className="text-primary underline">
              contato@lsagenciademarketing.com.br
            </a>
            . Responderemos em até 15 dias.
          </p>
        </Section>

        <Section title="6. Segurança e alterações">
          <p>
            Adotamos medidas técnicas razoáveis para proteger as informações tratadas. Esta política
            pode ser atualizada periodicamente; a versão vigente estará sempre disponível nesta
            página.
          </p>
        </Section>

        <div className="mt-12">
          <Link
            to="/"
            className="inline-block rounded-xl border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
