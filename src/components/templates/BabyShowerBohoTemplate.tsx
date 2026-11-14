"use client";

import { useEffect, useState } from "react";
import { LandingConfig } from "@/types/landing";
import { Navbar } from "@/components/shared/Navbar";
import { Countdown } from "@/components/shared/Countdown";
import { RsvpForm } from "@/components/shared/RsvpForm";
import { Toast } from "@/components/shared/Toast";
import { MusicPlayer } from "@/components/shared/MusicPlayer";

interface TemplateProps {
  config: LandingConfig;
}

export function BabyShowerBohoTemplate({ config }: TemplateProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDressCodeOpen, setIsDressCodeOpen] = useState(false);
  const dressCodeImage = config.event.dressCodeImage;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  useEffect(() => {
    if (!isDressCodeOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDressCodeOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDressCodeOpen]);

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
        hasDressCode={!!(config.event.dressCodeImage || config.event.dressCode)}
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
              <span>{config.hero.quickLinks?.giftsLabel || "Mimos & Fraldas"}</span>
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
                <p className="text-sm text-text/80">{config.event.timeDisplay}</p>
              </div>
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

      {/* 4. TRAJE SUGERIDO (DRESS CODE COM IMAGEM) */}
      {(dressCodeImage || config.event.dressCode) && (
        <section id="traje" className="pb-12 px-4">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              Dress Code
            </span>
            <h2 className="font-serif text-3xl font-bold text-text mt-1">
              Traje Sugerido
            </h2>
          </div>

          <div className="stitched-card p-5 sm:p-8 text-center max-w-xl mx-auto">
            {dressCodeImage ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsDressCodeOpen(true)}
                  aria-label="Ampliar a imagem do traje sugerido"
                  className="group relative block w-full max-w-sm mx-auto rounded-2xl border-2 border-primary/40 bg-white p-2 shadow-sm transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <img
                    src={dressCodeImage}
                    alt={`Traje sugerido para ${config.hero.title}`}
                    className="w-full h-auto object-contain rounded-xl"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 right-3 bg-bg/95 text-text text-[11px] font-medium px-3 py-1.5 rounded-full border border-primary/40 shadow-sm flex items-center gap-1">
                    🔍 Ampliar
                  </span>
                </button>
                <p className="text-[11px] text-text/60 mt-3">
                  Toque na imagem para visualizar em tela cheia
                </p>
              </>
            ) : (
              <p className="text-sm text-text/80">{config.event.dressCode}</p>
            )}

            {dressCodeImage && config.event.dressCode && (
              <p className="text-sm text-text/80 mt-4 leading-relaxed">
                {config.event.dressCode}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 5. LISTA DE PRESENTES & MIMOS (SEM PIX) */}
      {config.gifts && (
        <section id="presentes" className="py-12 px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Cabeçalho da Seção */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-primaryDark mb-1">
                <span>🧸</span>
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                  {config.gifts.subtitle || "Mimos para a Stela"}
                </span>
                <span>💗</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-text">
                {config.gifts.title || "Sugestões de Presentes"}
              </h2>
              {config.gifts.description && (
                <p className="text-sm text-text/85 max-w-xl mx-auto mt-2 leading-relaxed">
                  {config.gifts.description}
                </p>
              )}
            </div>

            {/* 1. Item Principal: Fraldas (M e G) */}
            {config.gifts.mainItem && (
              <div className="stitched-card p-6 sm:p-8 text-center">
                <h3 className="font-serif text-2xl font-bold text-text mb-2 flex items-center justify-center gap-2">
                  <span>🎀</span>
                  <span>{config.gifts.mainItem.title}</span>
                  <span>🎀</span>
                </h3>
                <p className="text-xs text-text/80 mb-6">
                  Cada convidado deverá escolher um tamanho de fralda (M ou G) e acrescentar um mimo de sua preferência:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  {config.gifts.mainItem.quotas?.map((quota, idx) => (
                    <div
                      key={idx}
                      className="bg-bg/95 border-2 border-primary/50 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-[1.02]"
                    >
                      <span className="text-3xl mb-2">👶</span>
                      <span className="font-serif text-lg font-bold text-primaryDark">
                        {quota}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-accent font-medium mt-1">
                        Item Principal
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Categorias de Mimos */}
            {config.gifts.mimosCategories && config.gifts.mimosCategories.length > 0 && (
              <div className="stitched-card p-6 sm:p-8">
                <div className="text-center mb-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                    Inspirações
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-text mt-1">
                    Sugestões de Mimos
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {config.gifts.mimosCategories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="bg-bg/90 border border-primary/30 rounded-2xl p-5 shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/20">
                        {cat.icon && <span className="text-xl">{cat.icon}</span>}
                        <h4 className="font-serif text-base font-bold text-text">
                          {cat.category}
                        </h4>
                      </div>
                      <ul className="space-y-1.5 text-xs text-text/85">
                        {cat.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-center gap-2">
                            <span className="text-primary text-[10px]">♥</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Mensagem de Carinho (Fralda é o pedido principal...) */}
            {config.gifts.notes && (
              <div className="bg-surface/90 border border-primary/50 rounded-2xl p-5 text-center max-w-2xl mx-auto shadow-sm">
                <p className="text-xs sm:text-sm font-medium text-text leading-relaxed">
                  💕 <strong className="text-primaryDark">A fralda é o nosso pedido principal, e o mimo fica a critério de cada convidado.</strong> {config.gifts.notes}
                </p>
              </div>
            )}

            {/* 4. Aviso Importante (BYOB) */}
            {config.gifts.byobNotice && (
              <div className="bg-bg border-2 border-primary/40 rounded-2xl p-5 text-center max-w-xl mx-auto shadow-sm">
                <div className="inline-block bg-primary/20 text-primaryDark text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                  ⚠️ ATENÇÃO! 🍸
                </div>
                <p className="text-xs sm:text-sm text-text/90 leading-relaxed font-medium">
                  {config.gifts.byobNotice}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6. CONFIRMAÇÃO DE PRESENÇA (RSVP VIA WHATSAPP COM DATA LIMITE) */}
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

      {/* Lightbox do Traje Sugerido */}
      {isDressCodeOpen && dressCodeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Imagem do traje sugerido ampliada"
          onClick={() => setIsDressCodeOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-text/85 backdrop-blur-sm p-4"
        >
          <button
            type="button"
            onClick={() => setIsDressCodeOpen(false)}
            aria-label="Fechar imagem ampliada"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-bg text-text text-lg font-bold shadow-md flex items-center justify-center hover:bg-surface transition-colors"
          >
            ✕
          </button>
          <img
            src={dressCodeImage}
            alt={`Traje sugerido para ${config.hero.title} ampliado`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-full w-auto h-auto object-contain rounded-2xl bg-white p-2 shadow-2xl"
          />
        </div>
      )}

      {/* Toast de Feedback */}
      <Toast message={toastMessage} />

      {/* Música de Fundo com Mute / Unmute Fixo */}
      <MusicPlayer musicUrl={config.musicUrl} />
    </div>
  );
}
