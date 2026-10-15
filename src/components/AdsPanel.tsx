const metrics = [
  { label: "Investimento em mídia", value: "A mensurar" },
  { label: "Contatos recebidos", value: "A mensurar" },
  { label: "Custo por contato", value: "A mensurar" },
  { label: "Agendamentos atribuídos", value: "A mensurar" },
  { label: "Taxa de conversão", value: "A mensurar" },
  { label: "Retorno do investimento", value: "A mensurar" },
];

export default function AdsPanel() {
  return (
    <div className="w-full rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-caption text-[10px] text-primary">Demonstração visual</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">Painel de acompanhamento</h3>
          <p className="mt-1 text-xs leading-relaxed text-[#8f8f8f]">
            Indicadores para acompanhar a aquisição de pacientes
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-primary/50 px-2.5 py-1 text-[10px] text-primary">
          Modelo ilustrativo
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-[#242424] bg-[#141414] px-3 py-3">
            <p className="text-[11px] leading-tight text-[#8f8f8f]">{m.label}</p>
            <p className="mt-2 text-sm font-semibold text-primary">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-primary/25 bg-[#141414] px-4 py-4">
        <p className="text-sm font-semibold text-foreground">Decisões orientadas por dados</p>
        <p className="mt-2 text-xs leading-relaxed text-[#a8a8a8]">
          Os dados são preenchidos e analisados conforme as campanhas e as ferramentas de mensuração
          efetivamente utilizadas em cada projeto. Não são resultados de uma clínica específica.
        </p>
      </div>
    </div>
  );
}
