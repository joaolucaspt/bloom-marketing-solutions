type Props = { className?: string; scale?: number };

/**
 * Single reusable brand logo — "LS" (serif, gold) + thin divider + stacked
 * "AGÊNCIA / DE MARKETING" (sans, light grey). Pure typography, no effects.
 */
export function LogoMark({ className = "", scale = 1 }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 select-none ${className}`}>
      <span
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 600,
          fontSize: `${32 * scale}px`,
          lineHeight: 1,
          color: "#C9A227",
          letterSpacing: "0.02em",
        }}
      >
        LS
      </span>
      <span
        aria-hidden
        style={{ width: 1, height: `${32 * scale}px`, backgroundColor: "#C9A227", opacity: 0.8 }}
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
