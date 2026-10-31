import type { SiteConfig } from "./publish-guard";

export function buildSchemaData(site: SiteConfig, siteUrl?: URL): Record<string, unknown> {
  const redes = site.footer.redesSociales.filter((r) => r.href);

  return {
    "@context": "https://schema.org",
    "@type": site.tipo === "dentista" ? "Dentist" : "MedicalBusiness",
    name: site.nombre,
    description: site.seo.descripcion,
    telephone: site.contacto.telefonoVisible,
    email: site.contacto.correo,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.ubicacion.direccion,
      addressLocality: site.ubicacion.distrito,
      addressRegion: site.ubicacion.ciudad,
      addressCountry: "PE",
    },
    ...(siteUrl ? { url: siteUrl.href } : {}),
    ...(redes.length ? { sameAs: redes.map((r) => r.href) } : {}),
    ...(site.ubicacion.horariosSchema.length
      ? {
          openingHoursSpecification: site.ubicacion.horariosSchema.map((h: { dias: string[]; abre: string; cierra: string }) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.dias,
            opens: h.abre,
            closes: h.cierra,
          })),
        }
      : {}),
  };
}