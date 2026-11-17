"use client";

// Pantalla grande de la trivia (proyector / TV). Solo lee de la base: sigue
// el estado en vivo que maneja Staff desde la app (eventos/{id}/trivia/vivo)
// y muestra la pregunta, la cuenta regresiva, cuánta gente respondió, el
// resultado de cada opción, el ranking y el ganador.
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "@/lib/firebase";

type Fase = "espera" | "pregunta" | "revelada" | "ranking" | "ganador";
type Vivo = {
  ronda: string | null;
  fase: Fase;
  preguntaId?: string | null;
  texto?: string | null;
  opciones?: string[] | null;
  numero?: number;
  total?: number;
  inicio?: number;
  duracion?: number;
  puntos?: number;
  resta?: number;
  correcta?: number | null;
  conteo?: number[] | null;
  ganador?: { key: string; nombre: string; puntos: number } | null;
};
type Puntaje = { key: string; nombre: string; grupo?: string | null; puntos: number; tiempo: number };
type Finalista = { key: string; nombre: string; grupo?: string | null; puntos: number };

const FORMAS = ["▲", "●", "■", "★"];

// Estilo gráfico Y-TEC / YPF: negro azulado con brillo turquesa y letras
// blancas. Mismos colores que utils/triviaTemas.ts de la app: si se cambia
// uno, cambiar el otro.
const t = {
  marca: "Y-TEC", fondo: "#03080C",
  brillo: "radial-gradient(ellipse 70% 60% at 85% 0%, rgba(0,178,198,0.5), transparent 70%), radial-gradient(ellipse 50% 50% at 100% 100%, rgba(31,91,216,0.4), transparent 70%)",
  texto: "#E6F4F6", titulo: "#FFFFFF", suave: "#9BC3CC", acento: "#00B2C6", destacado: "#5FE3F0", mal: "#FF2E63",
  primero: "#00B2C6", opciones: ["#00B2C6", "#1F5BD8", "#F2A900", "#7A3DFF"],
};

const nombreRonda = (r: string) => (r === "final" ? "Final" : "Ronda general");

function useValor<T>(path: string | null, inicial: T): T {
  const [valor, setValor] = useState<{ path: string | null; v: T }>({ path, v: inicial });
  useEffect(() => {
    if (!path) return;
    return onValue(ref(database, path), (s) => setValor({ path, v: (s.val() ?? inicial) as T }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
  return valor.path === path ? valor.v : inicial;
}

export function TriviaProyeccion({ eventoId }: { eventoId: string }) {
  const base = `eventos/${eventoId}`;
  const vivo = useValor<Vivo | null>(`${base}/trivia/vivo`, null);
  const finalistas = useValor<Record<string, Finalista>>(`${base}/trivia/finalistas`, {});
  const offset = useValor<number>(".info/serverTimeOffset", 0);
  const respuestas = useValor<Record<string, unknown>>(
    vivo?.ronda && vivo.preguntaId ? `${base}/trivia/respuestas/${vivo.ronda}/${vivo.preguntaId}` : null,
    {},
  );
  const puntajesData = useValor<Record<string, Omit<Puntaje, "key">>>(
    vivo?.ronda && vivo.fase === "ranking" ? `${base}/trivia/puntajes/${vivo.ronda}` : null,
    {},
  );

  const [ahora, setAhora] = useState(() => Date.now());
  useEffect(() => {
    if (vivo?.fase !== "pregunta") return;
    const id = setInterval(() => setAhora(Date.now()), 200);
    return () => clearInterval(id);
  }, [vivo?.fase]);

  const restante =
    vivo?.fase === "pregunta" && vivo.inicio && vivo.duracion
      ? Math.max(0, vivo.inicio + vivo.duracion - (ahora + offset))
      : 0;

  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col overflow-hidden"
      style={{ backgroundColor: t.fondo, backgroundImage: t.brillo, color: t.texto }}
    >
      <header className="flex items-center justify-between px-[4vw] py-[2.5vh] text-[2.2vh] font-semibold uppercase tracking-[0.3em]" style={{ color: t.suave }}>
        <span className="text-[4.5vh] font-black tracking-[0.12em] text-white normal-case">{t.marca}</span>
        <span>{vivo?.ronda ? `Trivia · ${nombreRonda(vivo.ronda)}` : "Trivia"}</span>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-[4vw] pb-[4vh]">
        <Contenido
          vivo={vivo}
          restante={restante}
          respondieron={Object.keys(respuestas).length}
          finalistas={Object.values(finalistas)}
          puntajes={Object.entries(puntajesData)
            .map(([key, v]) => ({ key, ...v }))
            .sort((a, b) => b.puntos - a.puntos || a.tiempo - b.tiempo)}
        />
      </main>
    </div>
  );
}

function Contenido({ vivo, restante, respondieron, finalistas, puntajes }: {
  vivo: Vivo | null; restante: number; respondieron: number; finalistas: Finalista[]; puntajes: Puntaje[];
}) {
  if (!vivo?.ronda) {
    return (
      <div className="text-center">
        <p className="mb-[2vh] text-[20vh] font-black leading-none tracking-[0.08em] text-white" style={{ textShadow: `0 0 6vh ${t.acento}` }}>{t.marca}</p>
        <p className="text-[8vh] font-bold leading-none tracking-[0.3em]" style={{ color: t.acento }}>TRIVIA</p>
        <p className="mt-[3vh] text-[3.5vh]">Abrí la app, entrá a tu pase y tocá <b>TRIVIA</b> para ver tu grupo.</p>
      </div>
    );
  }

  if (vivo.fase === "ganador") {
    return (
      <div className="text-center">
        <p className="text-[16vh] leading-none">🏆</p>
        <p className="mt-[2vh] text-[3.5vh] uppercase tracking-[0.3em]" style={{ color: t.suave }}>Ganador de la trivia</p>
        <p className="mt-[2vh] animate-pulse text-[11vh] font-bold leading-tight text-white" style={{ textShadow: `0 0 5vh ${t.acento}` }}>{vivo.ganador?.nombre ?? "—"}</p>
        {vivo.ganador && <p className="mt-[2vh] text-[4vh]">{vivo.ganador.puntos} puntos</p>}
      </div>
    );
  }

  if (vivo.fase === "espera") {
    const esFinal = vivo.ronda === "final";
    return (
      <div className="w-full text-center">
        <p className="text-[4vh] uppercase tracking-[0.3em]" style={{ color: t.acento }}>{esFinal ? "Llegó la" : "¡Arranca la trivia!"}</p>
        <p className="text-[18vh] font-bold leading-none text-white">{esFinal ? "Final" : "Juegan todos"}</p>
        {esFinal ? (
          <div className="mx-auto mt-[4vh] grid max-w-[80vw] grid-cols-2 gap-x-[4vw] gap-y-[1.2vh] text-left text-[3.2vh]">
            {[...finalistas].sort((a, b) => b.puntos - a.puntos).map((f) => (
              <p key={f.key} className="truncate">• {f.nombre} <span style={{ color: t.suave }}>({f.grupo})</span></p>
            ))}
          </div>
        ) : (
          <p className="mt-[3vh] text-[4vh]">Abran la app, entren a su pase y toquen <b>TRIVIA</b>. ¡La primera pregunta está por salir!</p>
        )}
      </div>
    );
  }

  if (vivo.fase === "ranking") {
    return (
      <div className="w-full max-w-[70vw]">
        <p className="mb-[3vh] text-center text-[6vh] font-bold text-white">Ranking · {nombreRonda(vivo.ronda)}</p>
        <ol className="space-y-[1vh]">
          {puntajes.slice(0, 10).map((p, i) => (
            <li
              key={p.key}
              className={`flex items-center gap-[2vw] rounded-[1.5vh] px-[2vw] py-[1.2vh] text-[3.4vh] ${i === 0 ? "text-white" : "bg-white/10"}`}
              style={i === 0 ? { backgroundColor: t.primero } : undefined}
            >
              <span className="w-[4vw] font-bold">{i + 1}</span>
              <span className="flex-1 truncate">{p.nombre}</span>
              {vivo.ronda === "final" ? null : <span className="text-[2.6vh]" style={{ color: t.suave }}>{p.grupo}</span>}
              <span className="font-bold">{p.puntos}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  // Pregunta abierta o revelada.
  const opciones = vivo.opciones ?? [];
  const revelada = vivo.fase === "revelada";
  const total = (vivo.conteo ?? []).reduce((a, b) => a + b, 0);
  const segs = Math.ceil(restante / 1000);
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="flex items-center justify-between text-[3vh]">
        <span>Pregunta {vivo.numero}/{vivo.total}</span>
        {revelada ? (
          <span>{total} respuestas</span>
        ) : (
          <span>{respondieron} respondieron</span>
        )}
      </div>
      <div className="flex flex-1 items-center justify-center gap-[4vw] py-[3vh]">
        <div className="max-w-[75vw] text-center">
          <p className="text-[6.5vh] font-bold leading-tight text-white">{vivo.texto}</p>
          <p className="mt-[1.5vh] text-[3vh] font-semibold" style={{ color: t.destacado }}>
            Vale {vivo.puntos ?? 100} pts{vivo.resta ? ` · si errás o no respondés, restás ${vivo.resta}` : ""}
          </p>
        </div>
        {!revelada && (
          <div
            className="flex h-[16vh] w-[16vh] shrink-0 items-center justify-center rounded-full text-[8vh] font-bold text-white"
            style={{ backgroundColor: segs <= 5 ? t.mal : t.acento, boxShadow: `0 0 5vh ${segs <= 5 ? t.mal : t.acento}` }}
          >
            {segs}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-[2vh]">
        {opciones.map((op, i) => {
          const esCorrecta = revelada && vivo.correcta === i;
          const n = vivo.conteo?.[i] ?? 0;
          return (
            <div
              key={i}
              className="relative flex items-center gap-[2vw] overflow-hidden rounded-[2vh] px-[2.5vw] py-[3.5vh] text-[4vh] font-bold text-white transition-opacity duration-500"
              style={{ backgroundColor: t.opciones[i], opacity: revelada && !esCorrecta ? 0.3 : 1 }}
            >
              {revelada && total > 0 && (
                <div className="absolute inset-y-0 left-0 bg-black/20" style={{ width: `${(n / total) * 100}%` }} />
              )}
              <span className="relative">{FORMAS[i]}</span>
              <span className="relative flex-1">{op}</span>
              {revelada && <span className="relative">{esCorrecta ? `✓ ${n}` : n}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
