import { useState } from "react";

const WA_CALC =
  "https://wa.me/5531971169912?text=Ol%C3%A1%2C%20vim%20pela%20calculadora%20do%20site%20e%20quero%20saber%20mais";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const parseNum = (s: string) => {
  const clean = s.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  const n = Number(clean);
  return Number.isFinite(n) && n > 0 ? n : NaN;
};

export default function Calculator() {
  const [fat, setFat] = useState("");
  const [ticket, setTicket] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ min: number; max: number; potencial: number } | null>(null);

  const calc = () => {
    const f = parseNum(fat);
    const t = parseNum(ticket);
    if (Number.isNaN(f) || Number.isNaN(t)) {
      setError("Preencha os dois valores pra calcular.");
      setResult(null);
      return;
    }
    setError("");
    const atuais = f / t;
    let min = Math.round(atuais * 0.15);
    let max = Math.round(atuais * 0.25);
    if (min < 3) {
      min = 3;
      max = 6;
    }
    const media = (min + max) / 2;
    setResult({ min, max, potencial: Math.round(media * t) });
  };

  const field =
    "w-full rounded-lg bg-[#0d0d0d] border border-[#333] px-3 py-2.5 text-sm text-foreground placeholder:text-[#666] outline-none focus:border-primary transition-colors";

  return (
    <div
      id="calculadora"
      className="w-full rounded-2xl border border-primary/60 bg-[#141414]/95 backdrop-blur-sm"
      style={{ maxWidth: 400, padding: 24 }}
    >
      <p className="font-caption text-[11px] text-primary">Descubra seu potencial</p>
      <h2 className="mt-2 text-xl font-semibold leading-snug text-foreground">
        Você já ouviu falar em tráfego pago?
      </h2>
      <p className="mt-2.5 text-[13px] leading-relaxed text-[#a8a8a8]">
        É pagar pra aparecer pro cliente certo, na hora certa. Veja quanto isso pode representar pro seu
        negócio.
      </p>

      <div className="mt-5 space-y-3.5">
        <div>
          <label htmlFor="calc-fat" className="block text-[13px] font-medium text-foreground mb-1.5">
            Quanto seu negócio fatura por mês?
          </label>
          <input id="calc-fat" inputMode="numeric" value={fat} onChange={(e) => setFat(e.target.value)} placeholder="R$ 8.000" className={field} />
        </div>
        <div>
          <label htmlFor="calc-ticket" className="block text-[13px] font-medium text-foreground mb-1.5">
            Valor médio que cada cliente gasta?
          </label>
          <input id="calc-ticket" inputMode="numeric" value={ticket} onChange={(e) => setTicket(e.target.value)} placeholder="R$ 150" className={field} />
        </div>
      </div>

      {error && <p className="mt-3 text-[13px] text-[#e07070]">{error}</p>}

      <button
        onClick={calc}
        className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
      >
        Calcular meu potencial
      </button>

      {result && (
        <div className="mt-4 rounded-xl border border-primary bg-[#0d0d0d] p-4 fade-up">
          <p className="text-[13px] text-[#a8a8a8]">Com uma campanha básica, você pode trazer</p>
          <p className="mt-1 text-base font-semibold text-foreground">
            {result.min} a {result.max} clientes novos por mês
          </p>
          <p className="mt-3 text-[13px] text-[#a8a8a8]">Isso representa um potencial de</p>
          <p className="mt-1 text-2xl font-bold text-primary">+ {brl(result.potencial)}/mês</p>
        </div>
      )}

      <a
        href={WA_CALC}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3.5 block w-full rounded-lg border border-primary py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
      >
        Fale com a gente, é gratuito
      </a>
    </div>
  );
}
