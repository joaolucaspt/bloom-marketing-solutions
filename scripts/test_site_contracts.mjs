import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const checks = [];
const check = (name, condition, detail = "") => {
  checks.push({ name, pass: Boolean(condition), detail });
};

const home = read("src/routes/index.tsx");
const rootRoute = read("src/routes/__root.tsx");
const booking = read("src/components/Booking.tsx");
const servicePhoto = read("src/components/ServicePhoto.tsx");
const responsiveHelper = read("src/lib/responsive-pexels.ts");
const styles = read("src/styles.css");
const sitemap = read("src/routes/sitemap[.]xml.ts");
const robots = read("public/robots.txt");
const privacy = read("src/routes/politica-de-privacidade.tsx");

const structuredMatch = home.match(/const SITE_STRUCTURED_DATA\s*=\s*([\s\S]*?)\s+as const;/);
let structuredData = null;
let structuredDataError = "";
try {
  assert.ok(structuredMatch, "SITE_STRUCTURED_DATA constant must exist");
  // The source is a TypeScript object literal, so strip only legal trailing commas
  // before parsing its data as strict JSON. Runtime still serializes with JSON.stringify.
  const jsonCompatibleSource = structuredMatch[1].replace(/,\\s*([}\\]])/g, "$1");
  structuredData = JSON.parse(jsonCompatibleSource);
} catch (error) {
  structuredDataError = error instanceof Error ? error.message : String(error);
}

const graph = structuredData?.["@graph"] ?? [];
const organizations = graph.filter((entry) => entry["@type"] === "Organization");
const websites = graph.filter((entry) => entry["@type"] === "WebSite");
const organization = organizations[0];
const website = websites[0];

check("JSON-LD exists and parses as JSON", Boolean(structuredData), structuredDataError);
check("JSON-LD graph contains one Organization", organizations.length === 1);
check("JSON-LD graph contains one WebSite", websites.length === 1);
check(
  "WebSite publisher references the Organization",
  Boolean(organization && website?.publisher?.["@id"] === organization["@id"]),
);
check(
  "Organization identity matches the current site",
  organization?.name === "LS Agência de Marketing" &&
    organization?.url === "https://lsagenciademarketing.com/",
);
check(
  "Organization contact details match the implemented contact channels",
  String(organization?.telephone ?? "").replace(/\D/g, "") === "5531971169912" &&
    organization?.email === "contato@lsagenciademarketing.com.br" &&
    organization?.sameAs?.includes("https://www.instagram.com/ls.agenciademarketing"),
);
check(
  "Organization schema does not invent address, logo or review proof",
  Boolean(organization) &&
    !("address" in organization) &&
    !("logo" in organization) &&
    !("review" in organization) &&
    !("aggregateRating" in organization),
);

const canonical = home.match(/rel: "canonical",\s*href: "([^"]+)"/)?.[1];
const ogUrl = home.match(/property: "og:url",\s*content: "([^"]+)"/)?.[1];
check("Homepage canonical and og:url agree", canonical === ogUrl && canonical === "https://lsagenciademarketing.com/");
check("Privacy policy canonical uses the same production domain", privacy.includes('href: "https://lsagenciademarketing.com/politica-de-privacidade"'));
check("robots.txt points to the canonical sitemap", robots.includes("Sitemap: https://lsagenciademarketing.com/sitemap.xml"));
check(
  "Sitemap uses the canonical domain and includes the privacy page",
  sitemap.includes('const baseUrl = "https://lsagenciademarketing.com"') &&
    sitemap.includes('{ path: "/politica-de-privacidade"'),
);

const ogImage = rootRoute.match(/property: "og:image", content: "([^"]+)"/)?.[1];
const twitterImage = rootRoute.match(/name: "twitter:image", content: "([^"]+)"/)?.[1];
check(
  "Social share images use the selected real dental photograph consistently",
  Boolean(ogImage && ogImage === twitterImage && ogImage.startsWith("https://images.pexels.com/photos/3881423/")),
);

check(
  "Hero and About images declare responsive srcSet/sizes",
  /src=\{dentalHeroImage\}\s+srcSet=\{dentalHeroSrcSet\}\s+sizes=/.test(home) &&
    /src=\{dentalAboutImage\}\s+srcSet=\{dentalAboutSrcSet\}\s+sizes=/.test(home),
);
check("Hero keeps high-priority loading", /fetchPriority="high"/.test(home) && /decoding="async"/.test(home));
check(
  "Service photos expose responsive candidates",
  /const srcSet = responsivePexelsSrcSet\(photo\.src, \[480, 640, 960, 1280, 1600\]\)/.test(servicePhoto) &&
    /srcSet=\{srcSet\}/.test(servicePhoto) &&
    /sizes="/.test(servicePhoto) &&
    /loading="lazy"/.test(servicePhoto),
);
const photoUrls = [...servicePhoto.matchAll(/src:\s*"(https:\/\/images\.pexels\.com\/photos\/[^"]+)"/g)].map((match) => match[1]);
const photoAlts = [...servicePhoto.matchAll(/alt:\s*"([^"]+)"/g)].map((match) => match[1]);
check("Six service cards use six unique Pexels photographs", photoUrls.length === 6 && new Set(photoUrls).size === 6);
check("Each service photograph has a unique descriptive alt", photoAlts.length === 6 && photoAlts.every(Boolean) && new Set(photoAlts).size === 6);
check(
  "Service imagery has no visible client-disclaimer copy",
  !/(não representa cliente|foto ilustrativa|banco fotográfico)/i.test(servicePhoto),
);
check(
  "Responsive Pexels helper changes requested width candidates",
  /src\.replace\(\/w=\\d\+\//.test(responsiveHelper) &&
    /\.join\(", "\)/.test(responsiveHelper),
);

check(
  "Phone click-to-call uses the official number and an accessible label",
  booking.includes('href="tel:+5531971169912"') &&
    booking.includes("aria-label={`Ligar para a LS pelo número ${PHONE_DISPLAY}`}"),
);
const whatsappNumbers = [...booking.matchAll(/wa\.me\/(\d+)/g)].map((match) => match[1]);
check("Booking WhatsApp links keep the official number", whatsappNumbers.length > 0 && whatsappNumbers.every((number) => number === "5531971169912"));
check("Booking keeps the existing Cal.com diagnostic", booking.includes('calLink="ls.agenciademarketing/diagnostico-gratuito"'));
check("Booking keeps the existing public email and Instagram", booking.includes('mailto:contato@lsagenciademarketing.com.br') && booking.includes("https://www.instagram.com/ls.agenciademarketing"));

check(
  "Mobile navigation exposes state and control relationship",
  home.includes('aria-expanded={open}') &&
    home.includes('aria-controls="mobile-navigation"') &&
    home.includes('id="mobile-navigation"'),
);
check(
  "Rotating headings expose readable text and hide animated duplicates",
  home.includes('<span className="sr-only">{words[0]}</span>') &&
    home.includes('aria-hidden="true"') &&
    home.includes("prefers-reduced-motion") &&
    styles.includes("@media (prefers-reduced-motion: reduce)"),
);

const failures = checks.filter((result) => !result.pass);
for (const result of checks) {
  const suffix = result.detail ? ` — ${result.detail}` : "";
  console.log(`${result.pass ? "PASS" : "FAIL"} ${result.name}${suffix}`);
}
console.log(`\nSite integrity contracts: ${checks.length - failures.length}/${checks.length} passed.`);

if (failures.length > 0) {
  console.error("\nFailed contracts:");
  for (const failure of failures) console.error(`- ${failure.name}`);
  process.exitCode = 1;
}
