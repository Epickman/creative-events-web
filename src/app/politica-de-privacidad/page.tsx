import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";

// Política de privacidad de la app Android "Creative Events". Google Play
// exige que esta URL sea pública, en HTML y sin nada que tape el contenido,
// así que la página es 100% estática (se genera en el build).
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de la app móvil Creative Events para Android: qué datos recopilamos, cómo los usamos y cuáles son tus derechos.",
  alternates: {
    canonical: "/politica-de-privacidad",
  },
};

const lastUpdated = "27 de octubre de 2026";

const linkClassName =
  "font-medium text-accent-strong underline underline-offset-4 hover:opacity-80 dark:text-accent";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {title}
      </h2>
      {children}
    </section>
  );
}

function List({ children }: { children: ReactNode }) {
  return (
    <ul className="flex list-disc flex-col gap-3 pl-5 marker:text-zinc-400">
      {children}
    </ul>
  );
}

export default function PoliticaDePrivacidadPage() {
  const email = siteConfig.contact.email;
  const mailLink = (
    <a href={`mailto:${email}`} className={linkClassName}>
      {email}
    </a>
  );

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-black/[.08] bg-[#0c0c0d] px-6 pb-16 pt-20 text-zinc-50 dark:border-white/[.1] sm:pb-20 sm:pt-28">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <span className="text-sm uppercase tracking-[0.3em] text-zinc-300">
            Legal
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Política de Privacidad – App Creative Events
          </h1>
          <p className="text-sm text-zinc-400">
            Última actualización: {lastUpdated}
          </p>
        </div>
      </section>

      <article className="px-6 py-16 sm:py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            {siteConfig.name} desarrolla la aplicación móvil {siteConfig.name}{" "}
            para Android (en adelante, “la App”). En esta política explicamos
            qué datos recopila la App, cómo los usamos, con quién los
            compartimos y qué derechos tenés sobre ellos.
          </p>

          <Section title="1. Datos que recopilamos">
            <List>
              <li>
                <strong className="text-zinc-950 dark:text-zinc-50">
                  Datos de invitados y eventos:
                </strong>{" "}
                nombre del invitado, evento, mesa asignada y estado de
                check-in. Estos datos son cargados por el organizador del
                evento.
              </li>
              <li>
                <strong className="text-zinc-950 dark:text-zinc-50">
                  Cámara:
                </strong>{" "}
                se usa únicamente para escanear los códigos QR de acceso al
                evento. La App no guarda fotos ni video.
              </li>
              <li>
                <strong className="text-zinc-950 dark:text-zinc-50">
                  Ubicación:
                </strong>{" "}
                se usa para funciones vinculadas al evento. No se comparte con
                fines publicitarios.
              </li>
              <li>
                <strong className="text-zinc-950 dark:text-zinc-50">
                  Datos técnicos:
                </strong>{" "}
                identificadores del dispositivo y registros (logs) de errores y
                de uso, recopilados a través de Google Firebase.
              </li>
            </List>
          </Section>

          <Section title="2. Para qué usamos los datos">
            <List>
              <li>Gestionar el acceso y la acreditación de invitados.</li>
              <li>
                Operar las funciones del evento, como sorteos, trivias y
                check-in.
              </li>
              <li>Mejorar la estabilidad y el funcionamiento de la App.</li>
            </List>
          </Section>

          <Section title="3. Servicios de terceros">
            <p>
              La App utiliza Google Firebase como proveedor de infraestructura,
              base de datos y diagnóstico de errores. Podés consultar cómo
              Google trata estos datos en su{" "}
              <a
                href="https://firebase.google.com/support/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                política de privacidad de Firebase
              </a>
              .
            </p>
          </Section>

          <Section title="4. Cómo compartimos los datos">
            <p>
              No vendemos datos personales. Solo los compartimos con el
              organizador del evento correspondiente y con los proveedores
              técnicos estrictamente necesarios para que la App funcione.
            </p>
          </Section>

          <Section title="5. Seguridad y conservación">
            <p>
              Los datos se transmiten de forma cifrada (HTTPS). Los conservamos
              mientras sean necesarios para las finalidades descriptas o hasta
              que se solicite su eliminación.
            </p>
          </Section>

          <Section title="6. Tus derechos">
            <p>
              Podés solicitar el acceso, la corrección o la eliminación de tus
              datos escribiendo a {mailLink}.
            </p>
            <p>
              La Agencia de Acceso a la Información Pública, en su carácter de
              órgano de control de la Ley N° 25.326 de Protección de Datos
              Personales (Argentina), tiene la atribución de atender las
              denuncias y reclamos que interpongan quienes resulten afectados
              en sus derechos por incumplimiento de las normas vigentes en
              materia de protección de datos personales.
            </p>
          </Section>

          <Section title="7. Menores de edad">
            <p>
              La App no está dirigida a menores de 13 años y no recopilamos
              intencionalmente datos de menores de esa edad.
            </p>
          </Section>

          <Section title="8. Cambios en esta política">
            <p>
              Podemos actualizar esta política. La versión vigente es siempre
              la publicada en esta página, con su fecha de última
              actualización.
            </p>
          </Section>

          <Section title="9. Contacto">
            <p>
              {siteConfig.name} – Polo Hudson, Au. Dr. Ricardo Balbín Km 30,
              Hudson, Buenos Aires, Argentina.
              <br />
              Email: {mailLink}
            </p>
          </Section>
        </div>
      </article>
    </div>
  );
}
