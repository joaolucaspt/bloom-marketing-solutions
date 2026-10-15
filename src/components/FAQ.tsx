const faqs = [
  {
    question: "A LS garante uma quantidade de pacientes ou agendamentos?",
    answer:
      "Não trabalhamos com números garantidos. O desempenho depende de fatores como região, especialidades, concorrência, investimento e atendimento dos contatos. O trabalho é planejar, acompanhar os indicadores disponíveis e ajustar a estratégia com base no que os dados mostram.",
  },
  {
    question: "Preciso anunciar no Google e no Meta ao mesmo tempo?",
    answer:
      "Não necessariamente. A escolha dos canais depende da procura pelos serviços, dos objetivos da clínica, da região e do orçamento disponível. A recomendação deve fazer sentido para o cenário da sua operação.",
  },
  {
    question: "Já tenho site e redes sociais. Ainda preciso de uma landing page?",
    answer:
      "Depende da jornada atual. Uma landing page pode ajudar quando a campanha precisa de uma página focada em uma especialidade, tratamento ou objetivo de contato. Primeiro avaliamos o que você já tem e onde estão as oportunidades de melhoria.",
  },
  {
    question: "Como vocês avaliam se a estratégia está funcionando?",
    answer:
      "Acompanhamos os indicadores disponíveis, como investimento, custo por contato, qualidade dos leads e agendamentos quando há dados para isso. Assim, a análise considera não só o volume de contatos, mas também o avanço da jornada.",
  },
  {
    question: "Como é o primeiro passo para trabalhar com a LS?",
    answer:
      "Começamos com uma conversa para entender as especialidades, a região de atendimento, os objetivos e a estrutura atual da clínica. A partir desse contexto, alinhamos quais ações fazem sentido e os próximos passos.",
  },
];

export default function FAQ() {
  return (
    <section id="perguntas-frequentes" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-caption text-xs text-primary">Perguntas frequentes</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Clareza antes de dar o próximo passo.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#a8a8a8] md:text-base">
            As decisões de marketing precisam partir da realidade da sua clínica, não de promessas genéricas.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-border bg-card/70 transition-colors open:border-primary/50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-5 font-semibold text-foreground marker:content-none md:p-6">
                <span>{item.question}</span>
                <span aria-hidden="true" className="shrink-0 text-2xl font-light text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-[#a8a8a8] md:px-6 md:pb-6 md:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#agendar" className="btn-primary">
            Conversar com a LS
          </a>
        </div>
      </div>
    </section>
  );
}
