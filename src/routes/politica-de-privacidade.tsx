import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/Logo";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | LS Agência de Marketing" },
      {
        name: "description",
        content:
          "Entenda como a LS Agência de Marketing trata dados enviados por contato e agendamento, armazenamento local e serviços de terceiros usados neste site.",
      },
      { property: "og:title", content: "Política de Privacidade | LS Agência de Marketing" },
      {
        property: "og:description",
        content:
          "Informações sobre os dados tratados neste site, o agendamento online e os canais de contato da LS Agência de Marketing.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://lsagenciademarketing.com/politica-de-privacidade" },
    ],
    links: [{ rel: "canonical", href: "https://lsagenciademarketing.com/politica-de-privacidade" }],
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
    <>
      <a href="#main-content" className="skip-to-content">
        Pular para o conteúdo principal
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#050505] px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[760px]">
        <LogoMark scale={0.85} />

        <h1 className="mt-10 text-3xl font-semibold text-foreground md:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[#a8a8a8]">
          Esta política explica como a LS Agência de Marketing trata as informações relacionadas ao
          uso deste site e aos contatos que você decide iniciar. O tratamento considera a Lei Geral
          de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
        </p>

        <Section title="1. Informações tratadas">
          <p>
            As informações dependem da forma como você utiliza o site e entra em contato conosco.
            Elas podem incluir:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Dados fornecidos voluntariamente ao falar com a LS por WhatsApp ou e-mail, ou ao
              solicitar uma reunião pelo agendamento online, como nome, meios de contato, mensagem
              e detalhes do horário escolhido.
            </li>
            <li>
              Informações técnicas necessárias para carregar, manter e proteger o site, como dados
              da requisição, navegador e registros de diagnóstico, conforme os recursos da
              infraestrutura utilizada.
            </li>
            <li>
              Uma preferência armazenada no navegador para lembrar que o aviso de tecnologias de
              terceiros foi fechado.
            </li>
          </ul>
          <p>
            A calculadora de cenário de captação executa os cálculos no próprio navegador. Os valores
            digitados nessa ferramenta não são enviados à LS por meio dela.
          </p>
        </Section>

        <Section title="2. Como usamos as informações">
          <p>
            Utilizamos as informações recebidas para responder a solicitações, organizar reuniões,
            conversar sobre os serviços da LS, manter o site funcionando e seguro e atender
            obrigações legais ou solicitações relacionadas à proteção de dados.
          </p>
          <p>
            Não vendemos nem alugamos dados pessoais. O compartilhamento é limitado ao necessário
            para disponibilizar as funcionalidades escolhidas por você e operar o site.
          </p>
        </Section>

        <Section title="3. Armazenamento local e tecnologias de terceiros">
          <p>
            O site usa armazenamento local do navegador para lembrar que este aviso foi fechado.
            Essa preferência é mantida no dispositivo e não equivale a um consentimento para
            rastreamento publicitário.
          </p>
          <p>
            O agendamento online é incorporado por meio do Cal.com, que pode utilizar cookies ou
            tecnologias semelhantes para disponibilizar sua própria funcionalidade. Imagens e fontes
            carregadas de serviços externos, como Pexels e Google Fonts, também podem gerar requisições
            técnicas aos respectivos fornecedores.
          </p>
          <p>
            A implementação atual do site não inicializa scripts de Google Analytics, Google Tag
            Manager ou Meta Pixel. Caso sejam incorporadas novas ferramentas de análise ou publicidade,
            as informações sobre sua finalidade e funcionamento deverão ser atualizadas antes de sua
            utilização.
          </p>
          <p>
            Você pode gerenciar ou apagar cookies e dados locais nas configurações do navegador. As
            políticas dos serviços externos também se aplicam quando você utiliza suas funcionalidades.
          </p>
        </Section>

        <Section title="4. Serviços externos">
          <p>
            Para oferecer os recursos do site, utilizamos fornecedores técnicos e serviços de terceiros,
            incluindo o Cal.com para agendamento e recursos externos para carregamento de fontes e
            imagens. Ao clicar em links para WhatsApp, Instagram ou e-mail, você passa a interagir com
            o serviço de destino, sujeito às respectivas políticas e condições.
          </p>
          <p>
            Esses fornecedores podem tratar dados técnicos necessários à entrega de seus serviços.
            Consulte as políticas de privacidade de cada fornecedor para entender suas próprias práticas
            de tratamento e armazenamento.
          </p>
        </Section>

        <Section title="5. Seus direitos e como falar conosco">
          <p>
            Nos termos da legislação aplicável, você pode solicitar confirmação sobre o tratamento de
            dados, acesso, correção, anonimização, bloqueio ou exclusão quando cabível, informações
            sobre compartilhamento e revogação de consentimento quando o tratamento se basear nele.
          </p>
          <p>
            Para fazer uma solicitação relacionada aos dados tratados pela LS, entre em contato pelo
            WhatsApp{" "}
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
            . Solicitações serão tratadas nos prazos aplicáveis. Para informações sobre dados tratados
            diretamente por um fornecedor externo, também poderá ser necessário contatar esse fornecedor.
          </p>
        </Section>

        <Section title="6. Retenção, segurança e atualizações">
          <p>
            As informações são mantidas pelo período necessário às finalidades descritas nesta política
            e pelo tempo adicional exigido por obrigações legais ou pelo exercício regular de direitos,
            quando aplicável. Adotamos medidas técnicas e organizacionais razoáveis para proteger as
            informações sob nossa responsabilidade.
          </p>
          <p>
            Esta política pode ser atualizada para refletir mudanças no site, nos serviços utilizados ou
            nas obrigações aplicáveis. A versão vigente ficará disponível nesta página.
          </p>
        </Section>

        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
      </main>
    </> 
  );
}
