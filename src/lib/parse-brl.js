/**
 * Parse positive monetary values typed in Brazilian or international notation.
 *
 * Brazilian thousands + cents: "R$ 1.234,56"
 * International grouping + decimal: "1,234.56"
 * A correctly grouped separator followed by three digits is treated as a
 * thousands separator; otherwise the rightmost separator is decimal.
 *
 * @param {string} raw
 * @returns {number}
 */
export function parseBRL(raw) {
  let value = String(raw ?? "").trim().replace(/[^\d,.+-]/g, "");
  if (!value || !/\d/.test(value)) return NaN;
  if (value.startsWith("-")) return NaN;
  if (value.startsWith("+")) value = value.slice(1);
  if (!value || /[+-]/.test(value)) return NaN;

  const commaIndex = value.lastIndexOf(",");
  const dotIndex = value.lastIndexOf(".");
  let decimalSeparator = null;

  if (commaIndex !== -1 && dotIndex !== -1) {
    decimalSeparator = commaIndex > dotIndex ? "," : ".";
  } else if (commaIndex !== -1) {
    decimalSeparator = /^\d{1,3}(?:,\d{3})+$/.test(value) ? null : ",";
  } else if (dotIndex !== -1) {
    decimalSeparator = /^\d{1,3}(?:\.\d{3})+$/.test(value) ? null : ".";
  }

  let integerPart = value;
  let fractionalPart = "";
  if (decimalSeparator) {
    const decimalIndex = value.lastIndexOf(decimalSeparator);
    integerPart = value.slice(0, decimalIndex);
    fractionalPart = value.slice(decimalIndex + 1);
    if (fractionalPart.length > 2 || !/^\d*$/.test(fractionalPart)) return NaN;
  }

  const hasDot = integerPart.includes(".");
  const hasComma = integerPart.includes(",");
  if (hasDot && hasComma) return NaN;

  const groupingSeparator = hasDot ? "." : hasComma ? "," : null;
  let integerDigits = "";
  if (groupingSeparator) {
    const groups = integerPart.split(groupingSeparator);
    if (!/^\d{1,3}$/.test(groups[0] ?? "") || groups.slice(1).some((group) => !/^\d{3}$/.test(group))) {
      return NaN;
    }
    integerDigits = groups.join("");
  } else {
    if (!/^\d*$/.test(integerPart)) return NaN;
    integerDigits = integerPart;
  }

  if (!integerDigits && !fractionalPart) return NaN;
  const normalized = `${integerDigits || "0"}${decimalSeparator && fractionalPart ? `.${fractionalPart}` : ""}`;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : NaN;
}
