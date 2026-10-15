const metrics = [
  { label: "Investimento em mídia", detail: "Distribuição de verba" },
  { label: "Custo por contato", detail: "Eficiência da aquisição" },
  { label: "Qualidade dos contatos", detail: "Aderência ao público" },
  { label: "Agendamentos", detail: "Avanço na jornada" },
  { label: "Custo por agendamento", detail: "Eficiência comercial" },
  { label: "Retorno atribuído", detail: "Quando mensurável" },
];

const points = [49, 45, 51, 48, 52, 47, 50, 48, 53, 46, 51, 48, 50];

export default function AdsPanel() {
  const w = 320;
  const h = 110;
  const max = 100;
  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${(index / (points.length - 1)) * w} ${h - (point / max) * h}`)
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

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

      <div className="mt-5 rounded-xl border border-[#242424] bg-[#141414] px-3 py-3">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] text-[#8f8f8f]">Leitura por período</p>
          <p className="text-[11px] font-semibold text-primary">Análise e otimização</p>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 w-full" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="adsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[25, 50, 75].map((line) => (
            <line key={line} x1="0" x2={w} y1={h - (line / max) * h} y2={h - (line / max) * h} stroke="#303030" strokeDasharray="3 5" />
          ))}
          <path d={area} fill="url(#adsGrad)" />
          <path d={path} fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
