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
    "w-full rounded-xl bg-[#141414] border border-[#333] px-4 py-3 text-foreground placeholder:text-[#666] outline-none focus:border-primary transition-colors";

  return (
    <section id="calculadora" className="relative bg-[#050505] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[520px] px-5 md:px-6">
        <p className="font-caption text-xs text-primary">Descubra seu potencial</p>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-foreground">
          Você já ouviu falar em tráfego pago?
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[#a8a8a8]">
          Tráfego pago é pagar pra aparecer pro cliente certo, na hora certa, no Instagram, Facebook ou
          Google — em vez de esperar ele passar na frente da sua loja por acaso. Veja abaixo quanto isso
          pode representar pro seu negócio.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label htmlFor="calc-fat" className="block text-sm font-medium text-foreground mb-2">
              Quanto seu negócio fatura hoje por mês? (aproximado)
            </label>
            <input id="calc-fat" inputMode="numeric" value={fat} onChange={(e) => setFat(e.target.value)} placeholder="R$ 8.000" className={field} />
          </div>
          <div>
            <label htmlFor="calc-ticket" className="block text-sm font-medium text-foreground mb-2">
              Qual o valor médio que cada cliente gasta com você?
            </label>
            <input id="calc-ticket" inputMode="numeric" value={ticket} onChange={(e) => setTicket(e.target.value)} placeholder="R$ 150" className={field} />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-[#e07070]">{error}</p>}

        <button
          onClick={calc}
          className="mt-6 w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
        >
          Calcular meu potencial
        </button>

        {result && (
          <div className="mt-6 rounded-2xl border border-primary bg-[#141414] p-6 fade-up">
            <p className="text-sm text-[#a8a8a8]">
              Com uma campanha básica, negócios do seu porte costumam trazer
            </p>
            <p className="mt-1 text-xl font-semibold text-foreground">
              {result.min} a {result.max} clientes novos por mês
            </p>
            <p className="mt-4 text-sm text-[#a8a8a8]">Isso representa um potencial de</p>
            <p className="mt-1 text-3xl font-bold text-primary">+ {brl(result.potencial)}/mês</p>
          </div>
        )}

        <p className="mt-6 text-sm leading-relaxed text-[#a8a8a8]">
          E o melhor: isso é dinheiro que você não está vendo hoje simplesmente porque ainda ninguém fora
          do seu bairro sabe que você existe.
        </p>

        <a
          href={WA_CALC}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 block w-full rounded-xl border border-primary py-3.5 text-center font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          Fale com a gente, é gratuito
        </a>
      </div>
    </section>
  );
}
