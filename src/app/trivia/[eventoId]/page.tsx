import type { Metadata } from "next";
import { TriviaProyeccion } from "@/components/trivia-proyeccion";

// Pantalla que se proyecta durante la trivia de un evento (la maneja Staff
// desde la app). No se indexa: es un link que solo se usa el día del evento.
export const metadata: Metadata = {
  title: "Trivia",
  robots: { index: false, follow: false },
};

export default async function TriviaPage({ params }: PageProps<"/trivia/[eventoId]">) {
  const { eventoId } = await params;
  return <TriviaProyeccion eventoId={eventoId} />;
}
