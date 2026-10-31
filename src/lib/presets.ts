export type PresetName = "sereno" | "editorial" | "cercano";
export type HeroVariant = "dividido" | "centrado";
export type ServiciosVariant = "lista" | "rejilla";

const FONT_FAMILIES: Record<PresetName, string> = {
  sereno:
    "family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700",
  editorial:
    "family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700",
  cercano:
    "family=Nunito:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700",
};

const DEMO_ALL_FONTS =
  "family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Nunito:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700";

export function getGoogleFontsUrl(preset: PresetName = "sereno", isDemo = false): string {
  const query = isDemo ? DEMO_ALL_FONTS : (FONT_FAMILIES[preset] ?? FONT_FAMILIES.sereno);
  return `https://fonts.googleapis.com/css2?${query}&display=swap`;
}