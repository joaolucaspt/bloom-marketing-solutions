import { responsivePexelsSrcSet } from "@/lib/responsive-pexels";

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
  eyebrow: string;
  caption: string;
};

// Fotografias editoriais reais de odontologia selecionadas para apoiar a mensagem de cada serviço.
const photos: Record<ServicePhotoVariant, PhotoContent> = {
  google: {
    src: "https://images.pexels.com/photos/5622234/pexels-photo-5622234.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Dentista realizando uma avaliação odontológica em paciente em um consultório profissional",
    eyebrow: "Aquisição",
    caption: "Alcance pessoas que já procuram atendimento",
  },
  meta: {
    src: "https://images.pexels.com/photos/6627354/pexels-photo-6627354.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Dentista conversando com paciente e apresentando informações durante a consulta",
    eyebrow: "Posicionamento",
    caption: "Comunique o valor das especialidades",
  },
  landing: {
    src: "https://images.pexels.com/photos/4269368/pexels-photo-4269368.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Paciente em cadeira odontológica conversando com profissional de saúde",
    eyebrow: "Conversão",
    caption: "Transforme interesse em um próximo passo claro",
  },
  presence: {
    src: "https://images.pexels.com/photos/4269264/pexels-photo-4269264.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Interior de consultório odontológico contemporâneo com cadeira e equipamento clínico",
    eyebrow: "Presença digital",
    caption: "Transmita profissionalismo em cada ponto de contato",
  },
  analytics: {
    src: "https://images.pexels.com/photos/6627466/pexels-photo-6627466.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Profissional odontológico trabalhando em consultório durante um atendimento",
    eyebrow: "Performance",
    caption: "Acompanhe os indicadores que orientam decisões",
  },
  journey: {
    src: "https://images.pexels.com/photos/5622000/pexels-photo-5622000.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Dentista realizando exame odontológico em paciente em cadeira clínica",
    eyebrow: "Jornada",
    caption: "Conecte o primeiro contato ao agendamento",
  },
};

export default function ServicePhoto({ variant }: { variant: ServicePhotoVariant }) {
  const photo = photos[variant];
  const srcSet = responsivePexelsSrcSet(photo.src, [480, 640, 960, 1280, 1600]);

  return (
    <figure className="group relative isolate aspect-[4/3] w-full overflow-hidden rounded-2xl border border-primary/25 bg-[#111] shadow-[0_24px_64px_rgba(0,0,0,0.34)]">
      <img
        src={photo.src}
        srcSet={srcSet}
        sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) 50vw, 560px"
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/24 to-[#050505]/4"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4 md:p-5">
        <span className="rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
          {photo.eyebrow}
        </span>
        <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_14px_rgba(212,175,55,0.65)]" aria-hidden="true" />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="mb-3 h-[2px] w-10 bg-primary transition-all duration-500 group-hover:w-16" />
        <p className="max-w-[28rem] text-xl font-semibold leading-tight text-white md:text-2xl">{photo.caption}</p>
      </figcaption>
    </figure>
  );
}
