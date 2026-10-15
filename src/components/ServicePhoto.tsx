export type ServicePhotoVariant =
  | "google"
  | "meta"
  | "landing"
  | "presence"
  | "analytics"
  | "journey";

type PhotoContent = {
  src: string;
  alt: string;
  caption: string;
};

// Fotografias reais de banco (Pexels), conferidas visualmente para evitar marcas e logotipos
// identificáveis. São referências ilustrativas, não clínicas atendidas nem cases da LS.
const photos: Record<ServicePhotoVariant, PhotoContent> = {
  google: {
    src: "https://images.pexels.com/photos/5622234/pexels-photo-5622234.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Dentista realizando uma avaliação odontológica em paciente, em consultório sem marca visível",
    caption: "Avaliação e confiança",
  },
  meta: {
    src: "https://images.pexels.com/photos/6627354/pexels-photo-6627354.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Dentista conversando com paciente e mostrando informações em uma tela durante consulta",
    caption: "Comunicação com o paciente",
  },
  landing: {
    src: "https://images.pexels.com/photos/4269368/pexels-photo-4269368.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Paciente sentada na cadeira odontológica enquanto conversa com a profissional",
    caption: "Informação antes do agendamento",
  },
  presence: {
    src: "https://images.pexels.com/photos/4269264/pexels-photo-4269264.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Interior de consultório odontológico contemporâneo, com cadeira e equipamento clínico",
    caption: "Um ambiente profissional",
  },
  analytics: {
    src: "https://images.pexels.com/photos/6627466/pexels-photo-6627466.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Profissional odontológico trabalhando em consultório durante atendimento",
    caption: "Acompanhamento contínuo",
  },
  journey: {
    src: "https://images.pexels.com/photos/5622000/pexels-photo-5622000.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Dentista realizando exame odontológico, com paciente em cadeira clínica",
    caption: "Da consulta ao acompanhamento",
  },
};

export default function ServicePhoto({ variant }: { variant: ServicePhotoVariant }) {
  const photo = photos[variant];

  return (
    <figure className="group relative isolate aspect-[4/3] w-full overflow-hidden rounded-2xl border border-primary/25 bg-[#111] shadow-[0_24px_64px_rgba(0,0,0,0.34)]">
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-[#050505]/10 to-[#050505]/5"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-5">
        <span className="rounded-full border border-white/25 bg-black/55 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
          Foto ilustrativa
        </span>
        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_14px_rgba(212,175,55,0.65)]" aria-hidden="true" />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="mb-3 h-[2px] w-10 bg-primary transition-all duration-500 group-hover:w-16" />
        <p className="text-xl font-semibold leading-tight text-white md:text-2xl">{photo.caption}</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.11em] text-white/60">
          Banco fotográfico · não representa cliente da LS
        </p>
      </figcaption>
    </figure>
  );
}
