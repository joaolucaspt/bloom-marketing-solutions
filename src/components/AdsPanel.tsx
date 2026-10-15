const metrics = [
  { label: "Investimento em mídia", detail: "Distribuição de verba" },
  { label: "Custo por contato", detail: "Eficiência da aquisição" },
  { label: "Qualidade dos contatos", detail: "Aderência ao público" },
  { label: "Agendamentos", detail: "Avanço na jornada" },
  { label: "Custo por agendamento", detail: "Eficiência comercial" },
  { label: "Retorno atribuído", detail: "Quando mensurável" },
];

const optimizationStages = ["Analisar", "Ajustar", "Medir", "Planejar"];

export default function AdsPanel() {

  return (
    <div className="w-full rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-caption text-[10px] text-primary">Gestão de campanhas</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">Painel de acompanhamento</h3>
        </div>
        <span className="rounded-full border border-primary/50 px-2.5 py-1 text-[10px] text-primary">
          Indicadores-chave
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-[#242424] bg-[#141414] px-3 py-3">
            <p className="text-[11px] leading-tight text-[#8f8f8f]">{metric.label}</p>
            <p className="mt-1 text-sm font-semibold text-primary">{metric.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-[#242424] bg-[#141414] px-3 py-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] text-[#8f8f8f]">Ciclo de otimização</p>
          <p className="text-[11px] font-semibold text-primary">Baseado em indicadores</p>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-2" aria-label="Etapas de acompanhamento de campanhas">
          {optimizationStages.map((stage, index) => (
            <div key={stage} className="min-w-0 text-center">
              <div className="flex items-center">
                <span className={`h-px flex-1 ${index === 0 ? "bg-transparent" : "bg-[#5b4b25]"}`} aria-hidden="true" />
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/70 bg-[#201b0e] text-[10px] font-semibold text-primary">
                  0{index + 1}
                </span>
                <span className={`h-px flex-1 ${index === optimizationStages.length - 1 ? "bg-transparent" : "bg-[#5b4b25]"}`} aria-hidden="true" />
              </div>
              <p className="mt-2 text-[10px] font-medium leading-tight text-[#c7c7c7] sm:text-[11px]">{stage}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 border-t border-[#292929] pt-3 text-[10px] leading-relaxed text-[#858585]">
          O acompanhamento considera os dados disponíveis em cada etapa da jornada.
        </p>
      </div>
    </div>
  );
}
