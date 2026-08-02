const metrics = [
  { label: "Alcance", value: "128.400" },
  { label: "Cliques no link", value: "6.230" },
  { label: "Taxa de cliques (CTR)", value: "4,8%" },
  { label: "Custo por resultado", value: "R$ 3,20" },
  { label: "Leads gerados", value: "412" },
  { label: "ROAS", value: "5,4x" },
];

const points = [8, 14, 12, 22, 28, 26, 38, 46, 44, 58, 70, 82, 96];

export default function AdsPanel() {
  const w = 320;
  const h = 110;
  const max = 100;
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * w} ${h - (p / max) * h}`)
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="w-full rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-5 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-caption text-[10px] text-primary">Gerenciador de anúncios</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">Resultados da campanha</h3>
        </div>
        <span className="rounded-full border border-primary/50 px-2.5 py-1 text-[10px] text-primary">
          Últimos 30 dias
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-[#242424] bg-[#141414] px-3 py-3">
            <p className="text-[11px] leading-tight text-[#8f8f8f]">{m.label}</p>
            <p className="mt-1 text-lg font-bold text-primary">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-[#242424] bg-[#141414] px-3 py-3">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-[#8f8f8f]">Conversões nos últimos 30 dias</p>
          <p className="text-[11px] font-semibold text-primary">+248%</p>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="adsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#adsGrad)" />
          <path d={path} fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
