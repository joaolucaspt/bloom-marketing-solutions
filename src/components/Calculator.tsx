import { useState } from "react";

const WA_CALC =
  "https://wa.me/5531971169912?text=" +
  encodeURIComponent("Olá! Quero avaliar uma estratégia de captação de pacientes para minha clínica odontológica.");

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });

const parseNum = (s: string) => {
  let clean = s.trim().replace(/[^\d,.-]/g, "");
  if (clean.includes(",")) {
    // Brazilian format: 2.000,50 -> 2000.50
    clean = clean.replace(/\./g, "").replace(",", ".");
  } else if (/^\d{1,3}(?:\.\d{3})+$/.test(clean)) {
    // Brazilian thousands separator without decimal cents: 2.000 -> 2000
    clean = clean.replace(/\./g, "");
  }
  const n = Number(clean);
  return Number.isFinite(n) && n > 0 ? n : NaN;
};

export default function Calculator() {
  const [budget, setBudget] = useState("");
  const [cpl, setCpl] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ budget: number; cpl: number; contacts: number } | null>(null);

  const simulate = () => {
    const monthlyBudget = parseNum(budget);
    const costPerContact = parseNum(cpl);
    if (!Number.isFinite(monthlyBudget) || !Number.isFinite(costPerContact)) {
      setError("Informe valores válidos e maiores que zero nos dois campos.");
      setResult(null);
      return;
    }
    setError("");
    setResult({
      budget: monthlyBudget,
      cpl: costPerContact,
      contacts: Math.floor(monthlyBudget / costPerContact),
    });
  };

  const field =
    "w-full rounded-lg bg-[#0d0d0d] border border-[#333] px-3 py-2.5 text-sm text-foreground placeholder:text-[#666] outline-none focus:border-primary transition-colors";

  return (
    <div
      id="calculadora"
      className="w-full rounded-2xl border border-primary/60 bg-[#141414]/95 backdrop-blur-sm"
      style={{ maxWidth: 400, padding: 24 }}
    >
      <p className="font-caption text-[11px] text-primary">Simulação de mídia</p>
      <h2 className="mt-2 text-xl font-semibold leading-snug text-foreground">
        Planeje um cenário para sua clínica
      </h2>
      <p className="mt-2.5 text-[13px] leading-relaxed text-[#a8a8a8]">
        Informe o investimento mensal e o custo por contato que deseja usar como hipótese. A simulação
        faz apenas uma estimativa matemática para ajudar no planejamento.
      </p>

      <div className="mt-5 space-y-3.5">
        <div>
          <label htmlFor="calc-budget" className="block text-[13px] font-medium text-foreground mb-1.5">
            Investimento mensal em anúncios (R$)
          </label>
          <input id="calc-budget" inputMode="decimal" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="2.000" className={field} />
        </div>
        <div>
          <label htmlFor="calc-cpl" className="block text-[13px] font-medium text-foreground mb-1.5">
            Custo estimado por contato (R$)
          </label>
          <input id="calc-cpl" inputMode="decimal" value={cpl} onChange={(e) => setCpl(e.target.value)} placeholder="25" className={field} />
        </div>
      </div>

      {error && <p className="mt-3 text-[13px] text-[#e07070]" role="alert">{error}</p>}

      <button
        type="button"
        onClick={simulate}
        className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
      >
        Simular cenário
      </button>

      {result && (
        <div className="mt-4 rounded-xl border border-primary bg-[#0d0d0d] p-4 fade-up" aria-live="polite">
          <p className="text-[13px] text-[#a8a8a8]">Estimativa matemática no cenário informado</p>
          <p className="mt-1 text-2xl font-bold text-primary">
            {result.contacts.toLocaleString("pt-BR")} contatos
          </p>
          <p className="mt-2 text-xs leading-relaxed text-[#a8a8a8]">
            {brl(result.budget)} de investimento ÷ {brl(result.cpl)} por contato. Contatos não equivalem
            necessariamente a pacientes ou agendamentos.
          </p>
        </div>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-[#858585]">
        Simulação informativa, não promessa de desempenho. Os custos e volumes reais variam conforme
        região, concorrência, oferta, campanha e atendimento.
      </p>

      <a
        href={WA_CALC}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3.5 block w-full rounded-lg border border-primary py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
      >
        Avaliar a estratégia com a LS
      </a>
    </div>
  );
}
