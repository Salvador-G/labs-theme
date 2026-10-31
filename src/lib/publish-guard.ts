import type siteData from "../data/site.json";

export type SiteConfig = typeof siteData;
export type Imagen = { src: string; alt: string; placeholder: string };

const hayMarcadores = (v: unknown): boolean =>
  typeof v === "string"
    ? /\[[^\]]+\]/.test(v)
    : Array.isArray(v)
      ? v.some(hayMarcadores)
      : v && typeof v === "object"
        ? Object.entries(v).some(([k, x]) => k !== "placeholder" && hayMarcadores(x))
        : false;

export function verifyPublishReadiness(site: SiteConfig, isDemo: boolean, isProd: boolean): void {
  const visible = {
    ...site,
    casosAntesDespues: site.mostrarAntesDespues ? site.casosAntesDespues : [],
    testimonios: site.mostrarTestimonios ? site.testimonios : [],
  };

  const imagenes: Imagen[] = [
    site.hero.imagen,
    ...site.equipo.map((m) => m.foto),
    ...visible.casosAntesDespues.flatMap((c) => [c.antes, c.despues]),
  ];

  const pendientes: string[] = [];
  if (hayMarcadores(visible)) pendientes.push("quedan [marcadores] sin reemplazar");
  if (imagenes.some((i) => !i.src)) pendientes.push("faltan fotos reales");
  if (!site.ubicacion.mapaEmbedUrl) pendientes.push("falta la URL del mapa");

  if (isProd && !isDemo && pendientes.length > 0) {
    throw new Error(`No se puede publicar: ${pendientes.join("; ")}.`);
  }
}