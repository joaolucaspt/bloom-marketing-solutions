import { useState } from "react";

const WA_CALC =
  "https://wa.me/5531971169912?text=" +
  encodeURIComponent(
    "Olá! Quero conversar sobre investimento em mídia e captação de pacientes para minha clínica odontológica."
  );

const brl = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

const parseBRL = (raw: string) => {
  const normalized = raw.trim().replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  const value = Number(normalized);
  return Number.isFinite(value) && value > 0 ? value : NaN;
};

export default function Calculator() {
  const [budget, setBudget] = useState("");
  const [costPerContact, setCostPerContact] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ budget: number; costPerContact: number; contacts: number } | null>(null);

  const calculate = () => {
    const monthlyBudget = parseBRL(budget);
    const estimatedCost = parseBRL(costPerContact);

    if (Number.isNaN(monthlyBudget) || Number.isNaN(estimatedCost)) {
      setError("Informe valores maiores que zero para o orçamento e o custo por contato.");
      setResult(null);
      return;
    }

    setError("");
    setResult({
      budget: monthlyBudget,
      costPerContact: estimatedCost,
      contacts: Math.floor(monthlyBudget / estimatedCost),
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
      <p className="font-caption text-[11px] text-primary">Planejamento de mídia</p>
      <h2 className="mt-2 text-xl font-semibold leading-snug text-foreground">
        Simule um cenário de captação
      </h2>
      <p className="mt-2.5 text-[13px] leading-relaxed text-[#a8a8a8]">
        Informe o investimento mensal em anúncios e um custo por contato hipotético para visualizar uma estimativa simples.
      </p>

      <div className="mt-5 space-y-3.5">
        <div>
          <label htmlFor="calc-budget" className="mb-1.5 block text-[13px] font-medium text-foreground">
            Orçamento mensal para anúncios
          </label>
          <input
            id="calc-budget"
            inputMode="decimal"
            autoComplete="off"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            placeholder="R$ 2.000"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="calc-cpl" className="mb-1.5 block text-[13px] font-medium text-foreground">
            Custo por contato que deseja simular
          </label>
          <input
            id="calc-cpl"
            inputMode="decimal"
            autoComplete="off"
            value={costPerContact}
            onChange={(event) => setCostPerContact(event.target.value)}
            placeholder="R$ 40"
            className={field}
          />
        </div>
      </div>

      {error && <p className="mt-3 text-[13px] text-[#e07070]" role="alert">{error}</p>}

      <button
        type="button"
        onClick={calculate}
        className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
      >
        Calcular cenário
      </button>

      {result && (
        <div className="mt-4 rounded-xl border border-primary bg-[#0d0d0d] p-4 fade-up" aria-live="polite">
          <p className="text-[13px] text-[#a8a8a8]">Estimativa matemática de contatos</p>
          <p className="mt-1 text-3xl font-bold text-primary">
            {result.contacts.toLocaleString("pt-BR")}
          </p>
          <p className="mt-1 text-sm text-foreground">contatos potenciais no cenário informado</p>
          <div className="mt-4 space-y-2 border-t border-[#333] pt-3 text-xs text-[#a8a8a8]">
            <div className="flex items-center justify-between gap-3">
              <span>Investimento mensal</span>
              <span className="font-semibold text-foreground">{brl(result.budget)}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Custo estimado por contato</span>
              <span className="font-semibold text-foreground">{brl(result.costPerContact)}</span>
            </div>
          </div>
        </div>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-[#858585]">
        Simulação baseada apenas nos valores informados. O custo real varia conforme região, especialidade, concorrência e campanha; contatos não equivalem automaticamente a pacientes ou agendamentos.
      </p>

      <a
        href={WA_CALC}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3.5 block w-full rounded-lg border border-primary py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
      >
        Conversar sobre a captação
      </a>
    </div>
  );
}
