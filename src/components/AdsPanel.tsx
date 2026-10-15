import {
  ArrowRight,
  CalendarCheck,
  MousePointer2,
  PanelsTopLeft,
  Search,
  Sparkles,
} from "lucide-react";

const stages = [
  {
    number: "01",
    title: "Atrair",
    description: "Campanhas alinhadas à intenção e ao público.",
    icon: Search,
  },
  {
    number: "02",
    title: "Apresentar",
    description: "Mensagem e página com um próximo passo claro.",
    icon: PanelsTopLeft,
  },
  {
    number: "03",
    title: "Conversar",
    description: "Contato encaminhado para o atendimento.",
    icon: MousePointer2,
  },
  {
    number: "04",
    title: "Acompanhar",
    description: "Indicadores e aprendizados para otimização.",
    icon: CalendarCheck,
  },
];

export default function AdsPanel() {
  return (
    <div className="acquisition-board">
      <div className="acquisition-board-heading">
        <div>
          <p className="acquisition-board-kicker">LS / MAPA DE AQUISIÇÃO</p>
          <h2>Do primeiro clique ao próximo passo.</h2>
        </div>
        <span className="acquisition-board-badge">
          <Sparkles size={13} /> Estrutura conceitual
        </span>
      </div>
      <p className="acquisition-board-description">
        Um processo conectado para que anúncio, página e atendimento trabalhem com o mesmo objetivo.
      </p>
      <div className="acquisition-board-stages">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div className="acquisition-stage-wrap" key={stage.number}>
              <article className="acquisition-stage">
                <div className="acquisition-stage-top">
                  <span>{stage.number}</span>
                  <Icon size={17} />
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </article>
              {index < stages.length - 1 && (
                <ArrowRight size={16} className="acquisition-stage-arrow" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>
      <div className="acquisition-board-note">
        <span className="acquisition-note-mark" />
        <p>
          A estratégia é definida com base na realidade da clínica. Os indicadores são avaliados a partir de dados reais,
          não de números de demonstração.
        </p>
      </div>
    </div>
  );
}
