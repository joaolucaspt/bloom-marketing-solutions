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
const calculator = read("src/components/Calculator.tsx");
const cookieBanner = read("src/components/CookieBanner.tsx");
const exitIntent = read("src/components/ExitIntentPopup.tsx");
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
  const jsonCompatibleSource = structuredMatch[1].replace(/,\s*([}\]])/g, "$1");
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
check(
  "Privacy policy provides a keyboard skip link to a focusable main target",
  privacy.includes('<a href="#main-content" className="skip-to-content">') &&
    privacy.includes("Pular para o conteúdo principal") &&
    privacy.includes('<main id="main-content" tabIndex={-1}') &&
    styles.includes(".skip-to-content:focus") &&
    styles.includes(":where(a, button, input, textarea, select, summary):focus-visible"),
);
check(
  "Privacy policy home return link provides a 44px touch target",
  (() => {
    const label = "Voltar para a página inicial";
    const labelStart = privacy.indexOf(label);
    const linkStart = privacy.lastIndexOf("<Link", labelStart);
    const linkEnd = privacy.indexOf("</Link>", labelStart);
    const link = privacy.slice(linkStart, linkEnd);
    return labelStart >= 0 &&
      linkStart >= 0 &&
      linkEnd > labelStart &&
      link.includes('to="/"') &&
      link.includes("inline-flex") &&
      link.includes("min-h-[44px]");
  })(),
);

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
check(
  "Shared primary conversion CTA class guarantees a 44px touch target",
  (() => {
    const utilityStart = styles.indexOf("@utility btn-primary {");
    const utilityEnd = styles.indexOf("\n.btn-primary:hover", utilityStart);
    const utility = styles.slice(utilityStart, utilityEnd);
    const primaryActionLinks = [...home.matchAll(/className="[^"]*\bbtn-primary\b[^"]*"/g)];
    return utilityStart >= 0 &&
      utilityEnd > utilityStart &&
      primaryActionLinks.length >= 5 &&
      /min-height:\s*44px;/.test(utility);
  })(),
);

check(
  "Hero secondary CTA provides a 44px touch target",
  (() => {
    const heroStart = home.indexOf("function Hero()");
    const heroEnd = home.indexOf("\nfunction ", heroStart + 1);
    const hero = home.slice(heroStart, heroEnd < 0 ? undefined : heroEnd);
    const labelStart = hero.indexOf("Conheça a estratégia");
    const linkStart = hero.lastIndexOf('<a href="#servicos"', labelStart);
    const linkEnd = hero.indexOf("</a>", labelStart);
    const link = hero.slice(linkStart, linkEnd);
    return labelStart >= 0 &&
      linkStart >= 0 &&
      linkEnd > labelStart &&
      link.includes('href="#servicos"') &&
      link.includes('className="inline-flex min-h-[44px] items-center text-sm font-semibold text-foreground transition-colors hover:text-primary"');
  })(),
);
check(
  "Header logo link provides a 44px touch target",
  (() => {
    const logoStart = home.indexOf("function Logo({ className");
    const logoEnd = home.indexOf("\n/* Rotating words", logoStart);
    const logo = home.slice(logoStart, logoEnd);
    const linkStart = logo.indexOf('<a href="#top"');
    const linkEnd = logo.indexOf("</a>", linkStart);
    const link = logo.slice(linkStart, linkEnd);
    return logoStart >= 0 &&
      logoEnd > logoStart &&
      linkStart >= 0 &&
      linkEnd > linkStart &&
      link.includes('href="#top"') &&
      link.includes("min-h-[44px]") &&
      link.includes("<LogoMark scale={0.85} />");
  })(),
);
check(
  "Header logo has a concise accessible name for the home link",
  (() => {
    const logoStart = home.indexOf("function Logo({ className");
    const logoEnd = home.indexOf("\n/* Rotating words", logoStart);
    const logo = home.slice(logoStart, logoEnd);
    const linkStart = logo.indexOf('<a href="#top"');
    const linkEnd = logo.indexOf("</a>", linkStart);
    const link = logo.slice(linkStart, linkEnd);
    return logoStart >= 0 &&
      logoEnd > logoStart &&
      linkStart >= 0 &&
      linkEnd > linkStart &&
      link.includes('href="#top"') &&
      link.includes('aria-label="LS Agência de Marketing — voltar ao início"') &&
      link.includes("min-h-[44px]") &&
      link.includes("<LogoMark scale={0.85} />");
  })(),
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
  "Cookie notice is a named non-modal live region with an explicit action button",
  cookieBanner.includes('role="region"') &&
    cookieBanner.includes('aria-label="Aviso sobre cookies e serviços externos"') &&
    cookieBanner.includes('aria-live="polite"') &&
    cookieBanner.includes('aria-atomic="true"') &&
    cookieBanner.includes('type="button"') &&
    !cookieBanner.includes('role="dialog"'),
);
check(
  "Cookie notice dismiss action provides a 44px touch target",
  (() => {
    const buttonStart = cookieBanner.indexOf("<button");
    const buttonEnd = cookieBanner.indexOf("</button>", buttonStart);
    const button = cookieBanner.slice(buttonStart, buttonEnd);
    return buttonStart >= 0 &&
      buttonEnd > buttonStart &&
      button.includes('className="shrink-0 min-h-[44px] rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"');
  })(),
);

check(
  "Cookie notice dismissal persists only the notice preference",
  cookieBanner.includes('const STORAGE_KEY = "cookie-consent"') &&
    cookieBanner.includes('localStorage.setItem(STORAGE_KEY, "dismissed")') &&
    cookieBanner.includes('to="/politica-de-privacidade"'),
);
check(
  "Touch exit-intent rechecks scroll eligibility after the initial delay",
  exitIntent.includes("let eligibilityTimer: number | undefined;") &&
    exitIntent.includes("eligibilityTimer = window.setTimeout(") &&
    exitIntent.includes("if (!done) onScroll();") &&
    exitIntent.includes("window.clearTimeout(eligibilityTimer);"),
);

check(
  "Exit-intent close button provides a 44px touch target and accessible contrast",
  (() => {
    const closeStart = exitIntent.indexOf('aria-label="Fechar"');
    const closeEnd = exitIntent.indexOf("</button>", closeStart);
    const closeButton = exitIntent.slice(closeStart, closeEnd);
    return closeStart >= 0 &&
      closeEnd > closeStart &&
      closeButton.includes('className="absolute right-4 top-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[#a8a8a8] transition-colors hover:text-foreground"') &&
      !closeButton.includes('style={{ color: "#666" }}');
  })(),
);

check(
  "Exit-intent continue action provides a 44px touch target and accessible contrast",
  (() => {
    const textStart = exitIntent.indexOf("Continuar navegando");
    const buttonStart = exitIntent.lastIndexOf("<button", textStart);
    const buttonEnd = exitIntent.indexOf("</button>", textStart);
    const continueButton = exitIntent.slice(buttonStart, buttonEnd);
    return textStart >= 0 &&
      buttonStart >= 0 &&
      buttonEnd > textStart &&
      continueButton.includes('className="mt-4 flex min-h-[44px] w-full items-center justify-center text-center text-xs text-[#a8a8a8] underline transition-colors hover:text-foreground"') &&
      !continueButton.includes('style={{ color: "#666"');
  })(),
);

check(
  "Calculator inputs provide a 44px minimum touch target",
  (() => {
    const fieldClass = calculator.match(/const field =\s*([\s\S]*?);\n/)?.[1];
    const budgetId = calculator.indexOf('id="calc-budget"');
    const budgetStart = calculator.lastIndexOf("<input", budgetId);
    const budgetEnd = calculator.indexOf("/>", budgetStart);
    const cplId = calculator.indexOf('id="calc-cpl"');
    const cplStart = calculator.lastIndexOf("<input", cplId);
    const cplEnd = calculator.indexOf("/>", cplStart);
    const budgetInput = calculator.slice(budgetStart, budgetEnd);
    const cplInput = calculator.slice(cplStart, cplEnd);
    return Boolean(fieldClass?.includes("min-h-[44px]")) &&
      budgetId >= 0 && budgetEnd > budgetStart &&
      cplId >= 0 && cplEnd > cplStart &&
      budgetInput.includes("className={field}") &&
      cplInput.includes("className={field}");
  })(),
);

check(
  "Calculator associates validation state and error copy to the invalid field",
  (() => {
    const expectedFields = [
      { id: "calc-budget", invalidState: "budgetInvalid" },
      { id: "calc-cpl", invalidState: "costPerContactInvalid" },
    ];
    const eachFieldHasAssociatedError = expectedFields.every(({ id, invalidState }) => {
      const idIndex = calculator.indexOf(`id="${id}"`);
      const inputStart = calculator.lastIndexOf("<input", idIndex);
      const inputEnd = calculator.indexOf("/>", idIndex);
      const input = calculator.slice(inputStart, inputEnd);
      return idIndex >= 0 &&
        inputStart >= 0 &&
        inputEnd > inputStart &&
        input.includes(`aria-invalid={${invalidState}}`) &&
        input.includes(`aria-describedby={${invalidState} ? "calculator-error" : undefined}`);
    });
    const alertIndex = calculator.indexOf('role="alert"');
    const errorTagStart = calculator.lastIndexOf("<p", alertIndex);
    const errorTagEnd = calculator.indexOf(">", errorTagStart);
    const errorTag = calculator.slice(errorTagStart, errorTagEnd);
    return eachFieldHasAssociatedError &&
      alertIndex >= 0 &&
      errorTagStart >= 0 &&
      errorTagEnd > errorTagStart &&
      errorTag.includes('id="calculator-error"') &&
      errorTag.includes('role="alert"');
  })(),
);

check(
  "Calculator supports keyboard submission with the same validation path",
  calculator.includes("<form") &&
    calculator.includes("onSubmit={(event) => {") &&
    calculator.includes("event.preventDefault();") &&
    calculator.includes("calculate();") &&
    calculator.includes('type="submit"'),
);
check(
  "Phone click-to-call uses the official number and an accessible label",
  booking.includes('href="tel:+5531971169912"') &&
    booking.includes("aria-label={`Ligar para a LS pelo número ${PHONE_DISPLAY}`}"),
);
check(
  "Exit-intent modal stacks above the privacy notice",
  (() => {
    const overlayClass = exitIntent.match(/className="fixed inset-0 ([^"]+)"/)?.[1];
    const popupZIndex = overlayClass?.match(/(?:^|\s)z-\[(\d+)\]/)?.[1];
    const bannerZIndex = cookieBanner.match(/zIndex:\s*(\d+)/)?.[1];
    return exitIntent.includes('aria-modal="true"') &&
      popupZIndex !== undefined &&
      bannerZIndex !== undefined &&
      Number(popupZIndex) > Number(bannerZIndex);
  })(),
);

check(
  "Booking phone click-to-call provides a 44px touch target",
  (() => {
    const target = booking.indexOf('href="tel:+5531971169912"');
    const start = booking.lastIndexOf("<a", target);
    const end = booking.indexOf("</a>", target);
    const link = booking.slice(start, end);
    return target >= 0 &&
      start >= 0 &&
      end > target &&
      /min-h-\[44px\]/.test(link);
  })(),
);

const whatsappNumbers = [...booking.matchAll(/wa\.me\/(\d+)/g)].map((match) => match[1]);
check("Booking WhatsApp links keep the official number", whatsappNumbers.length > 0 && whatsappNumbers.every((number) => number === "5531971169912"));
check(
  "Booking contact social links provide 44px touch targets",
  (() => {
    const instagramLabel = 'aria-label="Instagram da LS Agência de Marketing"';
    const emailLabel = 'aria-label="Enviar e-mail para a LS Agência de Marketing"';
    const instagramText = booking.indexOf(instagramLabel);
    const emailText = booking.indexOf(emailLabel);
    const instagramStart = booking.lastIndexOf("<a", instagramText);
    const emailStart = booking.lastIndexOf("<a", emailText);
    const instagramEnd = booking.indexOf("</a>", instagramText);
    const emailEnd = booking.indexOf("</a>", emailText);
    const instagramLink = booking.slice(instagramStart, instagramEnd);
    const emailLink = booking.slice(emailStart, emailEnd);
    const targetClass = 'className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-primary p-2 text-primary transition hover:bg-primary hover:text-primary-foreground"';
    return instagramText >= 0 && emailText >= 0 &&
      instagramStart >= 0 && emailStart >= 0 &&
      instagramEnd > instagramText && emailEnd > emailText &&
      instagramLink.includes(targetClass) && emailLink.includes(targetClass);
  })(),
);
check("Booking keeps the existing Cal.com diagnostic", booking.includes('calLink="ls.agenciademarketing/diagnostico-gratuito"'));
check(
  "Cal.com fallback stays below the embed and fits the booking column on mobile",
  (() => {
    const start = booking.indexOf("{/* Coluna direita — Cal.com */");
    const end = booking.indexOf("{/* Card de contato", start);
    const layout = booking.slice(start, end < 0 ? undefined : end);
    return layout.includes('className="flex flex-col items-center md:items-end"') &&
      layout.includes('className="mt-4 w-full max-w-[420px] text-center text-sm text-[#a8a8a8] md:text-right"') &&
      layout.includes('href="https://cal.com/ls.agenciademarketing/diagnostico-gratuito"');
  })(),
);
check(
  "Cal.com fallback link provides a 44px touch target",
  (() => {
    const textStart = booking.indexOf("Abrir agendamento em nova aba");
    const start = booking.lastIndexOf("<a", textStart);
    const end = booking.indexOf("</a>", textStart);
    const link = booking.slice(start, end);
    return textStart >= 0 &&
      start >= 0 &&
      end > textStart &&
      link.includes('href="https://cal.com/ls.agenciademarketing/diagnostico-gratuito"') &&
      /min-h-\[44px\]/.test(link);
  })(),
);

check(
  "Booking copy avoids an unverified one-business-day response promise",
  !booking.includes("Resposta em até 1 dia útil"),
);

check("Booking keeps the existing public email and Instagram", booking.includes('mailto:contato@lsagenciademarketing.com.br') && booking.includes("https://www.instagram.com/ls.agenciademarketing"));

check(
  "Mobile navigation exposes state and control relationship",
  home.includes('aria-expanded={open}') &&
    home.includes('aria-controls="mobile-navigation"') &&
    home.includes('id="mobile-navigation"'),
);

check(
  "Mobile navigation links meet the 44px touch target minimum",
  home.includes("{links.map((l) => (") &&
    home.includes('className="min-h-[44px] inline-flex items-center text-sm text-foreground/80"') &&
    home.includes('className="btn-primary sm:hidden min-h-[44px] inline-flex items-center"'),
);

check(
  "Desktop navigation links meet the 44px touch target minimum",
  (() => {
    const navStart = home.indexOf('<nav className="hidden lg:flex items-center gap-10">');
    const navEnd = home.indexOf("</nav>", navStart);
    const desktopNav = home.slice(navStart, navEnd);
    return navStart >= 0 &&
      navEnd > navStart &&
      desktopNav.includes("{links.map((l) => (") &&
      desktopNav.includes('className="inline-flex min-h-[44px] items-center text-sm text-foreground/80 hover:text-primary transition-colors"');
  })(),
);

check(
  "Mobile menu is exposed as a named navigation landmark",
  (() => {
    const navStart = home.indexOf('<nav id="mobile-navigation" aria-label="Navegação principal móvel"');
    const navEnd = home.indexOf("</nav>", navStart);
    return navStart >= 0 &&
      navEnd > navStart &&
      home.includes('aria-controls="mobile-navigation"');
  })(),
);

check(
  "Mobile navigation closes on Escape and restores focus to its trigger",
  (() => {
    const navStart = home.indexOf("function Nav()");
    const navEnd = home.indexOf("/* Reusable ambient background", navStart);
    const nav = home.slice(navStart, navEnd < 0 ? undefined : navEnd);
    return /import \{[^}]*\buseRef\b[^}]*\} from "react";/.test(home) &&
      /const triggerRef = useRef<HTMLButtonElement>\(null\)/.test(nav) &&
      nav.includes("ref={triggerRef}") &&
      nav.includes("if (!open) return;") &&
      nav.includes('if (event.key !== "Escape") return;') &&
      nav.includes("setOpen(false);") &&
      nav.includes("triggerRef.current?.focus();") &&
      nav.includes('document.addEventListener("keydown", onKeyDown)') &&
      nav.includes('document.removeEventListener("keydown", onKeyDown)');
  })(),
);
check(
  "Rotating headings expose readable text and hide animated duplicates",
  home.includes('<span className="sr-only">{words[0]}</span>') &&
    home.includes('aria-hidden="true"') &&
    home.includes("prefers-reduced-motion") &&
    styles.includes("@media (prefers-reduced-motion: reduce)"),
);

const expectedServiceSlugs = [
  "google-ads",
  "meta-ads",
  "landing-pages",
  "presenca-digital",
  "acompanhamento",
  "jornada-paciente",
];
const actualServiceSlugs = [
  ...home.matchAll(/\bid: "(google-ads|meta-ads|landing-pages|presenca-digital|acompanhamento|jornada-paciente)"/g),
].map((match) => match[1]);
check(
  "Each service has one stable, unique navigation slug",
  actualServiceSlugs.length === expectedServiceSlugs.length &&
    new Set(actualServiceSlugs).size === expectedServiceSlugs.length &&
    expectedServiceSlugs.every((slug) => actualServiceSlugs.includes(slug)),
);

const footerStart = home.indexOf("function Footer()");
const footerEnd = home.indexOf("\nfunction FloatingWhatsApp", footerStart);
const footer = home.slice(footerStart, footerEnd < 0 ? undefined : footerEnd);
check(
  "Footer service shortcuts link to each specific service slug",
  footer.includes("const servicos = SERVICES.map(({ id, t }) => ({") &&
    footer.includes('href: `#servicos-${id}`') &&
    footer.includes("label: t"),
);

check(
  "Footer navigation and service links provide 44px touch targets",
  (() => {
    const navHeading = footer.indexOf(">Navegação</p>");
    const serviceHeading = footer.indexOf(">Serviços</p>");
    const contactHeading = footer.indexOf(">Contato</p>");
    const navigationGroup = footer.slice(navHeading, serviceHeading);
    const servicesGroup = footer.slice(serviceHeading, contactHeading);
    const expectedClass = 'className="flex min-h-[44px] items-center text-sm text-[#a8a8a8] hover:text-primary transition-colors"';
    return navHeading >= 0 &&
      serviceHeading > navHeading &&
      contactHeading > serviceHeading &&
      navigationGroup.includes("nav.map((l) => (") &&
      servicesGroup.includes("servicos.map((l) => (") &&
      navigationGroup.includes(expectedClass) &&
      servicesGroup.includes(expectedClass);
  })(),
);
check(
  "Each service tab provides the matching footer anchor",
  home.includes('id={`servicos-${s.id}`}'),
);
check(
  "Service selector exposes accessible tablist, selected tabs and a labelled panel",
  (() => {
    const selectorStart = home.indexOf("function Services()");
    const selectorEnd = home.indexOf("\nfunction Belief()", selectorStart);
    const selector = home.slice(selectorStart, selectorEnd < 0 ? undefined : selectorEnd);
    return selectorStart >= 0 &&
      selectorEnd > selectorStart &&
      selector.includes('<div role="tablist" aria-label="Frentes de crescimento odontológico"') &&
      selector.includes('role="tab"') &&
      selector.includes('aria-selected={active === i}') &&
      selector.includes('aria-controls="service-panel"') &&
      selector.includes('tabIndex={active === i ? 0 : -1}') &&
      selector.includes('id="service-panel"') &&
      selector.includes('role="tabpanel"') &&
      selector.includes('aria-labelledby={`servicos-${SERVICES[active].id}`}');
  })(),
);
check(
  "Service tabs support Arrow, Home and End keyboard navigation",
  (() => {
    const selectorStart = home.indexOf("function Services()");
    const selectorEnd = home.indexOf("\nfunction Belief()", selectorStart);
    const selector = home.slice(selectorStart, selectorEnd < 0 ? undefined : selectorEnd);
    return selectorStart >= 0 &&
      selectorEnd > selectorStart &&
      selector.includes("useRef<Array<HTMLButtonElement | null>>([])") &&
      selector.includes('case "ArrowRight":') &&
      selector.includes("nextIndex = (index + 1) % SERVICES.length;") &&
      selector.includes('case "ArrowLeft":') &&
      selector.includes("nextIndex = (index - 1 + SERVICES.length) % SERVICES.length;") &&
      selector.includes('case "Home":') &&
      selector.includes('case "End":') &&
      selector.includes("tabRefs.current[nextIndex]?.focus();") &&
      selector.includes("onKeyDown={(event) => handleServiceTabKeyDown(event, i)}");
  })(),
);

check(
  "Opening a service fragment selects its tab and tracks hash navigation",
  home.includes('const prefix = "#servicos-";') &&
    home.includes("const hash = window.location.hash;") &&
    home.includes("const slug = hash.slice(prefix.length)") &&
    home.includes("SERVICES.findIndex((service) => service.id === slug)") &&
    home.includes('window.addEventListener("hashchange", syncActiveFromHash)') &&
    home.includes('window.removeEventListener("hashchange", syncActiveFromHash)'),
);

check(
  "Direct service fragments clear the fixed header",
  styles.includes('[id^="servicos-"]') &&
    /section\[id\],[\s\S]*?\[id\^="servicos-"\],[\s\S]*?#main-content\s*\{\s*scroll-margin-top:\s*6rem;/.test(styles),
);

check(
  "Footer provides a persistent link to the privacy policy",
  footer.includes('href: "/politica-de-privacidade"') &&
    footer.includes('label: "Política de Privacidade"'),
);

check(
  "Footer exposes separate click-to-call and WhatsApp actions",
  footer.includes('href="tel:+5531971169912"') &&
    footer.includes("Falar no WhatsApp") &&
    footer.includes("href={WHATSAPP_URL}"),
);

check(
  "Footer WhatsApp link provides a 44px touch target",
  (() => {
    const label = footer.indexOf("Falar no WhatsApp");
    const linkStart = footer.lastIndexOf("<a", label);
    const linkEnd = footer.indexOf("</a>", label);
    const link = footer.slice(linkStart, linkEnd);
    return label >= 0 &&
      linkStart >= 0 &&
      linkEnd > label &&
      link.includes('href={WHATSAPP_URL}') &&
      link.includes('className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"');
  })(),
);
check(
  "Editing either calculator amount invalidates the previous estimate and validation error",
  (() => {
    const updater = calculator.match(
      /const updateInput = \(field: "budget" \| "costPerContact", value: string\) => \{([\s\S]*?)\n  \};/,
    )?.[1];
    return Boolean(updater) &&
      updater.includes("setBudget(value)") &&
      updater.includes("setCostPerContact(value)") &&
      updater.includes("setError(\"\")") &&
      updater.includes("setResult(null)") &&
      calculator.includes('updateInput("budget", event.target.value)') &&
      calculator.includes('updateInput("costPerContact", event.target.value)');
  })(),
);


const c31NotFoundStart = rootRoute.indexOf("function NotFoundComponent()");
const c31ErrorStart = rootRoute.indexOf("function ErrorComponent");
const c31RouteStart = rootRoute.indexOf("export const Route");
const c31NotFound = rootRoute.slice(c31NotFoundStart, c31ErrorStart);
const c31ErrorComponent = rootRoute.slice(c31ErrorStart, c31RouteStart);

check(
  "Not-found fallback provides a semantic main landmark and keeps its recovery action",
  c31NotFound.includes('<main className="flex min-h-screen items-center justify-center bg-background px-4">') &&
    c31NotFound.includes("</main>") &&
    c31NotFound.includes("Página não encontrada") &&
    c31NotFound.includes("Voltar ao início"),
);
check(
  "Application error fallback exposes a named main landmark and announces its summary",
  c31ErrorComponent.includes('<main aria-labelledby="error-title" aria-describedby="error-description"') &&
    c31ErrorComponent.includes('id="error-title"') &&
    c31ErrorComponent.includes('id="error-description" role="alert"') &&
    c31ErrorComponent.includes("router.invalidate();") &&
    c31ErrorComponent.includes("reset();"),
);

check(
  "404 recovery link provides a 44px touch target",
  (() => {
    const label = "Voltar ao início";
    const labelStart = c31NotFound.indexOf(label);
    const linkStart = c31NotFound.lastIndexOf("<Link", labelStart);
    const linkEnd = c31NotFound.indexOf("</Link>", labelStart);
    const link = c31NotFound.slice(linkStart, linkEnd);
    return labelStart >= 0 &&
      linkStart >= 0 &&
      linkEnd > labelStart &&
      link.includes("min-h-[44px]");
  })(),
);
check(
  "Error retry button provides a 44px touch target",
  (() => {
    const label = "Tentar novamente";
    const labelStart = c31ErrorComponent.indexOf(label);
    const buttonStart = c31ErrorComponent.lastIndexOf("<button", labelStart);
    const buttonEnd = c31ErrorComponent.indexOf("</button>", labelStart);
    const button = c31ErrorComponent.slice(buttonStart, buttonEnd);
    return labelStart >= 0 &&
      buttonStart >= 0 &&
      buttonEnd > labelStart &&
      button.includes("min-h-[44px]");
  })(),
);
check(
  "Error recovery link provides a 44px touch target",
  (() => {
    const label = "Voltar ao início";
    const labelStart = c31ErrorComponent.indexOf(label);
    const linkStart = c31ErrorComponent.lastIndexOf("<a", labelStart);
    const linkEnd = c31ErrorComponent.indexOf("</a>", labelStart);
    const link = c31ErrorComponent.slice(linkStart, linkEnd);
    return labelStart >= 0 &&
      linkStart >= 0 &&
      linkEnd > labelStart &&
      link.includes('href="/"') &&
      link.includes("min-h-[44px]");
  })(),
);

check(
  "Footer phone click-to-call provides a 44px touch target",
  (() => {
    const target = footer.indexOf('href="tel:+5531971169912"');
    const start = footer.lastIndexOf("<a", target);
    const end = footer.indexOf("</a>", target);
    const link = footer.slice(start, end);
    return target >= 0 &&
      start >= 0 &&
      end > target &&
      link.includes('href="tel:+5531971169912"') &&
      link.includes("min-h-[44px]") &&
      (link.includes("inline-flex") || link.includes(" flex ")) &&
      link.includes("items-center");
  })(),
);

const floatingWhatsAppStart = home.indexOf("function FloatingWhatsApp()");
const floatingWhatsAppEnd = home.indexOf("function Index()", floatingWhatsAppStart);
const floatingWhatsApp = home.slice(floatingWhatsAppStart, floatingWhatsAppEnd);

check(
  "Floating WhatsApp launcher stays above the responsive cookie notice",
  floatingWhatsAppStart >= 0 &&
    floatingWhatsAppEnd > floatingWhatsAppStart &&
    cookieBanner.includes("const bannerRef = useRef<HTMLDivElement>(null)") &&
    cookieBanner.includes("new ResizeObserver(updateHeight)") &&
    cookieBanner.includes("--ls-cookie-banner-height") &&
    floatingWhatsApp.includes('bottom: "calc(var(--ls-cookie-banner-height, 0px) + 1.5rem)"') &&
    !floatingWhatsApp.includes("bottom-6"),
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
