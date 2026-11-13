"use client";

import { useState } from "react";
import { LandingConfig } from "@/types/landing";
import { Navbar } from "@/components/shared/Navbar";
import { Countdown } from "@/components/shared/Countdown";
import { PixCard } from "@/components/shared/PixCard";
import { RsvpForm } from "@/components/shared/RsvpForm";
import { Toast } from "@/components/shared/Toast";

interface TemplateProps {
  config: LandingConfig;
}

export function BabyShowerBohoTemplate({ config }: TemplateProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const themeVariables = {
    "--color-primary": config.theme.colors.primary,
    "--color-primary-dark": config.theme.colors.primaryDark || config.theme.colors.primary,
    "--color-bg": config.theme.colors.bg,
    "--color-surface": config.theme.colors.surface,
    "--color-text": config.theme.colors.text,
    "--color-accent": config.theme.colors.accent,
  } as React.CSSProperties;

  const isDotsPattern = config.theme.pattern !== "none";

  return (
    <div
      style={themeVariables}
      className={`min-h-screen bg-bg text-text ${isDotsPattern ? "pattern-dots" : ""}`}
    >
      <Navbar
        title={config.hero.title}
        hasStory={!!config.story}
        hasGifts={!!config.gifts}
      />

      {/* 1. HERO SECTION */}
      <section id="inicio" className="pt-10 pb-16 px-4 text-center overflow-hidden">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Estrelinhas decorativas superiores */}
          <div className="flex items-center gap-3 text-primary mb-4 animate-float">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
            </svg>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent">
              {config.hero.tagline}
            </span>
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
            </svg>
          </div>

          {/* Medalhão Central Artesanal */}
          <div className="stitched-badge w-72 h-72 sm:w-80 sm:h-80 rounded-full flex flex-col items-center justify-center p-6 mb-8 relative">
            {/* Laço Rosa no Topo do Medalhão */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
              <svg className="w-16 h-10 drop-shadow-sm" viewBox="0 0 100 60" fill="none">
                <path
                  d="M48 30C35 12 10 10 12 30C14 50 35 45 48 30Z"
                  fill="var(--color-primary)"
                  stroke="var(--color-primary-dark)"
                  strokeWidth="2"
                />
                <path
                  d="M52 30C65 12 90 10 88 30C86 50 65 45 52 30Z"
                  fill="var(--color-primary)"
                  stroke="var(--color-primary-dark)"
                  strokeWidth="2"
                />
                <path d="M44 34L32 54L42 50L48 36" fill="var(--color-primary-dark)" />
                <path d="M56 34L68 54L58 50L52 36" fill="var(--color-primary-dark)" />
                <rect x="44" y="23" width="12" height="14" rx="5" fill="var(--color-primary-dark)" />
              </svg>
            </div>

            {/* Ursinho Fofo Minimalista */}
            <svg className="w-14 h-14 mb-1 text-text" viewBox="0 0 64 64" fill="none">
              <circle cx="18" cy="18" r="8" fill="#D5B295" stroke="currentColor" strokeWidth="2" />
              <circle cx="46" cy="18" r="8" fill="#D5B295" stroke="currentColor" strokeWidth="2" />
              <circle cx="32" cy="34" r="18" fill="#E2C3A8" stroke="currentColor" strokeWidth="2" />
              <ellipse cx="32" cy="39" rx="7" ry="5.5" fill="var(--color-bg)" />
              <circle cx="26" cy="30" r="2" fill="currentColor" />
              <circle cx="38" cy="30" r="2" fill="currentColor" />
              <ellipse cx="32" cy="37" rx="2.5" ry="1.8" fill="currentColor" />
              <path d="M29 41Q32 43.5 35 41" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              {/* Lacinho do urso */}
              <path d="M32 52L25 48V56L32 52ZM32 52L39 48V56L32 52Z" fill="var(--color-primary)" />
            </svg>

            <h2 className="font-serif text-xl sm:text-2xl font-bold text-text tracking-wide">
              {config.hero.badgeSubtitle}
            </h2>

            {/* Nome com raminhos botânicos nas laterais */}
            <div className="flex items-center justify-center gap-2 my-1">
              {/* Raminho Esquerdo */}
              <svg className="w-7 h-7 text-accent" viewBox="0 0 32 32" fill="none">
                <path
                  d="M26 26C18 20 12 14 6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <ellipse cx="11" cy="14" rx="4" ry="2" transform="rotate(-30 11 14)" fill="currentColor" />
                <ellipse cx="17" cy="20" rx="4" ry="2" transform="rotate(-30 17 20)" fill="currentColor" />
                <ellipse cx="15" cy="9" rx="4" ry="2" transform="rotate(45 15 9)" fill="currentColor" />
                <ellipse cx="21" cy="15" rx="4" ry="2" transform="rotate(45 21 15)" fill="currentColor" />
              </svg>

              <h1 className="font-script text-6xl sm:text-7xl text-primaryDark leading-none pt-2">
                {config.hero.title}
              </h1>

              {/* Raminho Direito */}
              <svg className="w-7 h-7 text-accent scale-x-[-1]" viewBox="0 0 32 32" fill="none">
                <path
                  d="M26 26C18 20 12 14 6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <ellipse cx="11" cy="14" rx="4" ry="2" transform="rotate(-30 11 14)" fill="currentColor" />
                <ellipse cx="17" cy="20" rx="4" ry="2" transform="rotate(-30 17 20)" fill="currentColor" />
                <ellipse cx="15" cy="9" rx="4" ry="2" transform="rotate(45 15 9)" fill="currentColor" />
                <ellipse cx="21" cy="15" rx="4" ry="2" transform="rotate(45 21 15)" fill="currentColor" />
              </svg>
            </div>

            <p className="text-xs sm:text-sm font-medium text-text/90 tracking-wider mt-1">
              <span className="text-primary">♥</span> {config.hero.badgeFooter}{" "}
              <span className="text-primary">♥</span>
            </p>
          </div>

          {/* Contagem Regressiva */}
          <Countdown
            targetDate={config.hero.countdownTarget}
            label={config.hero.countdownLabel}
          />

          {/* Botões de Ação Rápida */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
            <a
              href="#rsvp"
              className="flex-1 bg-primary hover:bg-primaryDark text-white font-medium py-3.5 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{config.hero.quickLinks?.rsvpLabel || "Confirmar Presença"}</span>
              <span>♥</span>
            </a>
            <a
              href="#presentes"
              className="flex-1 bg-surface hover:bg-primary/20 text-text border border-primary font-medium py-3.5 px-6 rounded-full transition-all flex items-center justify-center gap-2"
            >
              <span>{config.hero.quickLinks?.giftsLabel || "Lista & PIX"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Divisor Botânico */}
      <div className="flex items-center justify-center gap-3 my-2 text-primary/60">
        <span className="h-px w-16 bg-primary/40"></span>
        <span>♥</span>
        <span className="h-px w-16 bg-primary/40"></span>
      </div>

      {/* 2. HISTÓRIA / MENSAGEM DOS PAIS */}
      {config.story && (
        <section id="historia" className="py-12 px-4">
          <div className="max-w-2xl mx-auto stitched-card p-8 sm:p-10 text-center">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">
              {config.story.subtitle}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-4">
              {config.story.title}
            </h2>
            {config.story.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="text-sm sm:text-base leading-relaxed text-text/90 mb-4 last:mb-0"
              >
                {p}
              </p>
            ))}
            <div className="mt-6 font-script text-3xl text-primaryDark">
              {config.story.signature}
            </div>
          </div>
        </section>
      )}

      {/* 3. INFORMAÇÕES DO EVENTO (ONDE E QUANDO) */}
      <section id="evento" className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              {config.event.subtitle || "Programe-se"}
            </span>
            <h2 className="font-serif text-3xl font-bold text-text mt-1">
              {config.event.title || "Onde e Quando"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Data e Hora */}
            <div className="stitched-card p-7 flex flex-col items-center text-center justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-bg border border-primary/40 flex items-center justify-center mx-auto mb-4 text-primaryDark">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-text mb-1">
                  Data & Horário
                </h3>
                <p className="text-base font-semibold text-primaryDark mb-1">
                  {config.event.dateDisplay}
                </p>
                <p className="text-sm text-text/80 mb-4">{config.event.timeDisplay}</p>
              </div>

              {config.event.dressCode && (
                <div className="w-full pt-3 border-t border-primary/30">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">
                    Traje Sugerido:
                  </span>
                  <p className="text-xs text-text/80 mt-0.5">{config.event.dressCode}</p>
                </div>
              )}
            </div>

            {/* Card Localização */}
            <div className="stitched-card p-7 flex flex-col items-center text-center justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-bg border border-primary/40 flex items-center justify-center mx-auto mb-4 text-primaryDark">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-text mb-1">
                  {config.event.locationName}
                </h3>
                <p className="text-sm text-text/80 mb-4 whitespace-pre-line">
                  {config.event.address}
                </p>
              </div>

              {/* Botões Diretos de Rota */}
              <div className="flex gap-2 w-full mt-2 z-10">
                {config.event.googleMapsUrl && (
                  <a
                    href={config.event.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-bg hover:bg-primary hover:text-white text-text border border-primary/50 text-xs font-medium py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Google Maps</span>
                  </a>
                )}
                {config.event.wazeUrl && (
                  <a
                    href={config.event.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-bg hover:bg-primary hover:text-white text-text border border-primary/50 text-xs font-medium py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Abrir Waze</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LISTA DE PRESENTES, GUIA DE FRALDAS & PIX */}
      {config.gifts && (
        <section id="presentes" className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                {config.gifts.subtitle || "Mimos"}
              </span>
              <h2 className="font-serif text-3xl font-bold text-text mt-1">
                {config.gifts.title || "Sugestões & PIX"}
              </h2>
              {config.gifts.description && (
                <p className="text-sm text-text/80 max-w-lg mx-auto mt-2">
                  {config.gifts.description}
                </p>
              )}
            </div>

            {/* Guia de Fraldas */}
            {config.gifts.diaperGuide && (
              <div className="stitched-card p-6 sm:p-8 mb-6">
                <h3 className="font-serif text-xl font-bold text-text text-center mb-4 flex items-center justify-center gap-2">
                  <span className="text-accent">🌿</span>
                  {config.gifts.diaperGuide.title || "Guia de Fraldas & Cuidados"}
                  <span className="text-accent">🌿</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  {config.gifts.diaperGuide.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`bg-bg/90 rounded-2xl p-4 ${
                        item.isHighlight
                          ? "border-2 border-primary relative"
                          : "border border-primary/30"
                      }`}
                    >
                      {item.isHighlight && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                          Mais pedido
                        </span>
                      )}
                      <span className="inline-block bg-primary/20 text-text font-bold text-xs px-3 py-1 rounded-full mb-2 mt-1">
                        Tamanho {item.size}
                      </span>
                      <p className="text-xs text-text/90 font-medium">
                        {item.quantity}
                      </p>
                      <p className="text-[11px] text-text/70 mt-1">{item.extra}</p>
                    </div>
                  ))}
                </div>
                {config.gifts.diaperGuide.brandsNote && (
                  <p className="text-[11px] text-center text-text/70 mt-4">
                    {config.gifts.diaperGuide.brandsNote}
                  </p>
                )}
              </div>
            )}

            {/* Bloco PIX + Lojas Externas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.gifts.pix && (
                <PixCard pix={config.gifts.pix} onNotify={showToast} />
              )}

              {config.gifts.externalLists && config.gifts.externalLists.length > 0 && (
                <div className="stitched-card p-6 sm:p-7 text-center flex flex-col items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-accent font-semibold">
                      Lojas Parceiras
                    </span>
                    <h3 className="font-serif text-xl font-bold text-text mt-1 mb-2">
                      Listas de Presentes
                    </h3>
                    <p className="text-xs text-text/80 mb-5">
                      Também deixamos algumas opções selecionadas com muito carinho nas lojas abaixo:
                    </p>
                  </div>

                  <div className="w-full space-y-3 z-10 my-auto">
                    {config.gifts.externalLists.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-bg hover:bg-primary hover:text-white text-text border border-primary/50 font-medium text-sm py-3.5 px-4 rounded-xl transition-all"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>

                  <p className="text-[11px] text-text/70 mt-4">
                    Os links abrem diretamente nas lojas oficiais.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. CONFIRMAÇÃO DE PRESENÇA (RSVP VIA WHATSAPP) */}
      <section id="rsvp" className="py-12 px-4 mb-10">
        <RsvpForm
          rsvp={config.rsvp}
          eventTitle={config.hero.title}
          onNotify={showToast}
        />
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-primary/30 py-8 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <p className="font-script text-4xl text-primaryDark mb-1">
            {config.footer?.title || config.hero.title}
          </p>
          <p className="text-xs text-text/70">
            {config.footer?.subtitle || "Feito com muito amor ♥"}
          </p>
        </div>
      </footer>

      {/* Toast de Feedback */}
      <Toast message={toastMessage} />
    </div>
  );
}

