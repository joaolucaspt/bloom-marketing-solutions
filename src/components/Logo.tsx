import lsLogo from "@/assets/ls-logo.png.asset.json";

type Props = { className?: string; scale?: number };

/**
 * Single reusable brand logo — "LS" gold mark + thin divider + stacked
 * "AGÊNCIA / DE MARKETING" (sans, light grey).
 */
export function LogoMark({ className = "", scale = 1 }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src={lsLogo.url}
        alt="LS Agência de Marketing"
        style={{ height: `${40 * scale}px`, width: "auto", display: "block" }}
      />
      <span
        aria-hidden
        style={{ width: 1, height: `${32 * scale}px`, backgroundColor: "#D4AF37", opacity: 0.8 }}
      />
      <span
        style={{
          fontFamily: '"Manrope", "Inter", system-ui, sans-serif',
          fontSize: `${11 * scale}px`,
          letterSpacing: "1.5px",
          lineHeight: 1.45,
          color: "#e8e8e8",
          textTransform: "uppercase",
          textAlign: "left",
          fontWeight: 500,
        }}
      >
        Agência
        <br />
        de Marketing
      </span>
    </span>
  );
}

export default LogoMark;
