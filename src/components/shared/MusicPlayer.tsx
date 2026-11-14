"use client";

import { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
  musicUrl?: string;
}

export function MusicPlayer({ musicUrl = "/recording-03_13.mp3" }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const audioEl = audio;

    audioEl.volume = 0.4; // Volume agradável de fundo

    let cancelled = false;

    const interactionEvents = ["pointerdown", "touchend", "keydown", "click"] as const;
    const onInteraction = () => startPlayback();
    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, onInteraction)
      );
    };

    function startPlayback() {
      audioEl
        .play()
        .then(() => {
          if (cancelled) return;
          setIsPlaying(true);
          setNeedsInteraction(false);
          removeInteractionListeners();
        })
        .catch(() => {
          if (cancelled) return;
          // Autoplay bloqueado pelo navegador: aguarda a primeira interação
          setIsPlaying(false);
          setNeedsInteraction(true);
        });
    }

    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, onInteraction, { passive: true })
    );

    // Tenta tocar imediatamente ao acessar a página
    startPlayback();

    return () => {
      cancelled = true;
      removeInteractionListeners();
      audioEl.pause();
    };
  }, [musicUrl]);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setNeedsInteraction(false);
        })
        .catch((err) => {
          console.warn("[MusicPlayer] Falha ao reproduzir áudio:", err);
          setNeedsInteraction(true);
        });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        autoPlay
        preload="auto"
        onError={() => {
          setHasError(true);
          setNeedsInteraction(false);
        }}
      />

      {/* Aviso quando o navegador bloqueia o autoplay */}
      {needsInteraction && !isPlaying && !hasError && (
        <button
          type="button"
          onClick={toggleSound}
          className="fixed bottom-6 right-20 z-40 max-w-[190px] bg-surface text-text text-[11px] font-medium px-3.5 py-2 rounded-full border border-primary/50 shadow-lg leading-snug text-left hover:bg-bg transition-colors animate-pulse"
        >
          🎵 Toque para ativar a música
        </button>
      )}

      {/* Botão Flutuante Fixo para Mute / Unmute */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isPlaying ? "Desativar música de fundo" : "Ativar música de fundo"}
          title={isPlaying ? "Mudo (Desativar Som)" : "Tocar Música"}
          className={`relative group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer ${isPlaying
              ? "bg-surface text-primaryDark border-2 border-primary shadow-primary/20 scale-100 hover:scale-110"
              : "bg-surface/90 text-text/60 border border-primary/40 hover:text-text hover:scale-105"
            }`}
        >
          {isPlaying ? (
            /* Ícone de Som Ativo com ondas sonoras */
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primaryDark"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"
                />
              </svg>
              {/* Onda sonora animada sutil */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primaryDark"></span>
              </span>
            </div>
          ) : (
            /* Ícone de Mute (Som Desativado) com barra */
            <svg
              className="w-5 h-5 text-text/60 group-hover:text-text"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

