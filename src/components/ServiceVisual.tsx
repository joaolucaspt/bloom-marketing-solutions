import type { ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarCheck,
  Check,
  ClipboardCheck,
  MapPin,
  MessageCircle,
  MousePointer2,
  PanelsTopLeft,
  Search,
  Target,
} from "lucide-react";

export type ServiceVisualVariant =
  | "google"
  | "meta"
  | "landing"
  | "presence"
  | "analytics"
  | "journey";

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="service-visual-frame" role="img" aria-label={label}>
      <div className="service-visual-topbar">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#565656]" />
          <span className="h-2 w-2 rounded-full bg-[#565656]" />
          <span className="h-2 w-2 rounded-full bg-[#565656]" />
        </div>
        <span className="truncate text-xs text-[#a7a7a7]">{label}</span>
        <span className="visual-demo-label">ESTRATÉGIA</span>
      </div>
      <div className="service-visual-canvas">{children}</div>
    </div>
  );
}

function GoogleVisual() {
  return (
    <Frame label="Pesquisa e intenção">
      <div className="mx-auto max-w-md">
        <div className="flex items-center gap-3 rounded-full border border-[#343434] bg-[#101010] px-4 py-3 text-sm text-[#bababa]">
          <Search aria-hidden="true" size={16} className="shrink-0 text-primary" />
          <span>dentista na minha região</span>
        </div>
        <div className="mt-5 rounded-xl border border-[#343434] bg-[#111111] p-5">
          <div className="flex items-center gap-2 text-[11px] text-[#b0b0b0]">
            <span className="rounded border border-primary/60 px-2 py-1 text-primary">ANÚNCIO</span>
            <span>Pesquisa patrocinada · intenção local</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold leading-snug text-white">
            Clínica odontológica | Conheça a proposta
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#b9b9b9]">
            Informações claras sobre especialidades, localização e como falar com a equipe.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-primary">
            Ver página de destino <ArrowRight aria-hidden="true" size={14} />
          </div>
        </div>
        <div className="mt-3 flex items-start gap-3 rounded-xl border border-dashed border-[#363636] p-4">
          <Target aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={18} />
          <div>
            <p className="text-sm font-medium text-white">Intenção de busca</p>
            <p className="mt-1 text-xs leading-relaxed text-[#9f9f9f]">
              Palavras-chave, região e página precisam trabalhar em conjunto.
            </p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function MetaVisual() {
  return (
    <Frame label="Criativo e mensagem">
      <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-[#343434] bg-[#111111]">
        <div className="flex items-center gap-3 border-b border-[#2a2a2a] px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#202020] text-primary">
            <MessageCircle aria-hidden="true" size={17} />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Clínica odontológica</p>
            <p className="text-[11px] text-[#999]">Criativo e mensagem · Meta Ads</p>
          </div>
        </div>
        <div className="relative overflow-hidden bg-[#e9e3d7] px-6 py-8 text-[#201f1b]">
          <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full border border-[#b7a16d]/70" />
          <div className="absolute -right-1 -top-5 h-24 w-24 rounded-full border border-[#b7a16d]/70" />
          <p className="relative text-[10px] font-semibold uppercase tracking-[0.2em] text-[#755f32]">
            Comunicação da clínica
          </p>
          <h3 className="relative mt-4 max-w-[230px] text-2xl font-semibold leading-tight">
            Clareza para escolher o próximo passo.
          </h3>
          <p className="relative mt-3 max-w-[225px] text-xs leading-relaxed text-[#56534c]">
            Uma mensagem que informa, orienta e convida à conversa.
          </p>
          <div className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-[#1d1c19] px-4 py-2 text-[11px] font-semibold text-white">
            Conheça a clínica <ArrowRight aria-hidden="true" size={13} />
          </div>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs leading-relaxed text-[#a9a9a9]">
            Criativo, público e destino devem contar a mesma história.
          </p>
        </div>
      </div>
    </Frame>
  );
}

function LandingVisual() {
  return (
    <Frame label="Exemplo de landing page odontológica">
      <div className="overflow-hidden rounded-xl border border-[#343434] bg-[#0e0e0e]">
        <img
          src="/images/bonassi-landing-page.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="block h-auto w-full object-contain"
        />
      </div>
    </Frame>
  );
}

function PresenceVisual() {
  const points = [
    "Informações institucionais consistentes",
    "Serviços e diferenciais bem explicados",
    "Contato acessível em todos os dispositivos",
    "Mensagem alinhada às campanhas",
  ];
  return (
    <Frame label="Presença digital">
      <div className="mx-auto max-w-md rounded-2xl border border-[#343434] bg-[#111111] p-5">
        <div className="flex items-start gap-3 border-b border-[#292929] pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#242019] text-primary">
            <MapPin aria-hidden="true" size={22} />
          </div>
          <div>
            <p className="text-base font-semibold text-white">Pontos de contato da clínica</p>
            <p className="mt-1 text-xs text-[#a1a1a1]">Consistência entre canais e pontos de contato</p>
          </div>
        </div>
        <ul className="mt-5 space-y-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-[#d0d0d0]">
              <Check aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={16} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

function AnalyticsVisual() {
  const rows = [
    { label: "Investimento", width: "w-4/5" },
    { label: "Contatos gerados", width: "w-3/5" },
    { label: "Custo por contato", width: "w-2/5" },
    { label: "Agendamentos atribuídos", width: "w-1/2" },
  ];
  return (
    <Frame label="Mensuração">
      <div className="mx-auto max-w-md rounded-2xl border border-[#343434] bg-[#111111] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-white">Indicadores da operação</p>
            <p className="mt-1 text-xs text-[#9a9a9a]">Leitura integrada de desempenho</p>
          </div>
          <ClipboardCheck aria-hidden="true" size={21} className="shrink-0 text-primary" />
        </div>
        <div className="mt-6 space-y-4">
          {rows.map((row) => (
            <div key={row.label}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-xs text-[#d2d2d2]">{row.label}</span>
                <span className="text-[10px] text-[#858585]">a acompanhar</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#2a2a2a]">
                <div className={["h-full rounded-full bg-[#8e7738]", row.width].join(" ")} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 border-t border-[#292929] pt-4 text-[11px] leading-relaxed text-[#8e8e8e]">
          Investimento, contatos e agendamentos orientam decisões e otimização contínua.
        </p>
      </div>
    </Frame>
  );
}

function JourneyVisual() {
  const steps = [
    { title: "Contato recebido", detail: "Origem identificada", icon: MessageCircle },
    { title: "Primeira resposta", detail: "Equipe dá continuidade", icon: MousePointer2 },
    { title: "Acompanhamento", detail: "Próximo passo registrado", icon: ClipboardCheck },
    { title: "Agendamento", detail: "Resultado acompanhado", icon: CalendarCheck },
  ];
  return (
    <Frame label="Jornada do contato">
      <div className="mx-auto max-w-md space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title}>
              <div className="flex items-center gap-4 rounded-xl border border-[#343434] bg-[#111111] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#272216] text-primary">
                  <Icon aria-hidden="true" size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">{step.title}</p>
                  <p className="mt-1 text-xs text-[#9c9c9c]">{step.detail}</p>
                </div>
                <span className="text-xs tabular-nums text-[#858585]">0{index + 1}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex h-5 items-center pl-8 text-[#776638]" aria-hidden="true">
                  <ArrowDownRight aria-hidden="true" size={15} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

export default function ServiceVisual({ variant }: { variant: ServiceVisualVariant }) {
  switch (variant) {
    case "google":
      return <GoogleVisual />;
    case "meta":
      return <MetaVisual />;
    case "landing":
      return <LandingVisual />;
    case "presence":
      return <PresenceVisual />;
    case "analytics":
      return <AnalyticsVisual />;
    case "journey":
      return <JourneyVisual />;
  }
}
