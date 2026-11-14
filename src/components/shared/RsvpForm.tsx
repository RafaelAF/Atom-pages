"use client";

import { useEffect, useState } from "react";
import { RsvpConfig } from "@/types/landing";

interface RsvpFormProps {
  rsvp: RsvpConfig;
  eventTitle?: string;
  onNotify?: (message: string) => void;
}

export function RsvpForm({ rsvp, eventTitle, onNotify }: RsvpFormProps) {
  const [name, setName] = useState("");
  const [companions, setCompanions] = useState("Vou sozinho(a)");
  const [notes, setNotes] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [previewData, setPreviewData] = useState<{
    message: string;
    whatsappUrl: string;
  } | null>(null);

  useEffect(() => {
    if (!rsvp.deadline) {
      setIsExpired(false);
      return;
    }

    const deadlineTimestamp = new Date(rsvp.deadline).getTime();
    if (isNaN(deadlineTimestamp)) {
      setIsExpired(false);
      return;
    }

    const checkDeadline = () => {
      setIsExpired(Date.now() >= deadlineTimestamp);
    };

    checkDeadline();
    // Revalida periodicamente para bloquear o formulário no momento exato do prazo
    const intervalId = window.setInterval(checkDeadline, 30_000);

    return () => window.clearInterval(intervalId);
  }, [rsvp.deadline]);

  const companionOptions = rsvp.companionOptions || [
    "Vou sozinho(a)",
    "+ 1 acompanhante",
    "+ 2 acompanhantes",
    "+ 3 acompanhantes",
    "+ 4 acompanhantes",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Bloqueia o envio caso a data limite tenha passado
    if (isExpired) {
      if (onNotify) {
        onNotify("O prazo para confirmação de presença já foi encerrado.");
      }
      return;
    }

    const prefix =
      rsvp.defaultMessagePrefix ||
      `Olá! Gostaria de confirmar minha presença no *${eventTitle || "Evento"}*! 🧸🎀`;

    let msg = `${prefix}\n\n`;
    msg += `*Nome:* ${name.trim()}\n`;
    msg += `*Presença:* ${companions}\n`;

    if (notes.trim()) {
      msg += `*Recado / Obs:* ${notes.trim()}\n`;
    }

    const cleanPhone = rsvp.whatsappNumber.replace(/\D/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;

    setPreviewData({
      message: msg,
      whatsappUrl: url,
    });

    if (onNotify) {
      onNotify("Mensagem de confirmação preparada!");
    }

    // Abre diretamente o WhatsApp para melhor UX no celular
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-xl mx-auto stitched-card p-7 sm:p-10">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
          {rsvp.subtitle || "RSVP"}
        </span>
        <h2 className="font-serif text-3xl font-bold text-text mt-1">
          {rsvp.title || "Confirme sua Presença"}
        </h2>
        <p className="text-xs sm:text-sm text-text/80 mt-2">
          {rsvp.description ||
            "Preencha os dados abaixo para enviar sua confirmação diretamente no WhatsApp!"}
        </p>
      </div>

      {/* Aviso de Prazo — visível antes e depois do encerramento */}
      {rsvp.deadline && !isExpired && (
        <div className="mb-6 bg-accent/10 border border-accent/40 rounded-2xl p-4 text-center">
          <span className="text-sm font-bold text-accent block mb-1">
            📅 Confirmações até {rsvp.deadlineDisplay || "a data limite"}
          </span>
          <p className="text-xs text-text/85 leading-relaxed">
            O envio do formulário será bloqueado automaticamente após esse prazo.
          </p>
        </div>
      )}

      {isExpired && (
        <div className="mb-6 bg-primary/15 border-2 border-primary/40 rounded-2xl p-4 text-center">
          <span className="text-sm font-bold text-primaryDark block mb-1">
            ⏳ Prazo de Confirmação Encerrado
          </span>
          <p className="text-xs text-text/85 leading-relaxed">
            As confirmações para este evento foram encerradas
            {rsvp.deadlineDisplay ? ` em ${rsvp.deadlineDisplay}` : ""}.
            O formulário não aceita mais envios. Caso precise de ajuda, entre em
            contato diretamente com os anfitriões.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div>
          <label
            htmlFor="rsvp-nome"
            className="block text-xs font-semibold uppercase tracking-wider text-text mb-1.5"
          >
            Seu Nome Completo *
          </label>
          <input
            type="text"
            id="rsvp-nome"
            required
            disabled={isExpired}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Ana Paula Silva"
            className={`w-full bg-bg border border-primary/50 rounded-xl px-4 py-3 text-sm text-text placeholder:text-text/40 focus:outline-none focus:border-primaryDark focus:ring-2 focus:ring-primary/20 ${
              isExpired ? "opacity-60 cursor-not-allowed bg-text/5" : ""
            }`}
          />
        </div>

        <div>
          <label
            htmlFor="rsvp-acompanhantes"
            className="block text-xs font-semibold uppercase tracking-wider text-text mb-1.5"
          >
            Quantidade de Acompanhantes
          </label>
          <select
            id="rsvp-acompanhantes"
            disabled={isExpired}
            value={companions}
            onChange={(e) => setCompanions(e.target.value)}
            className={`w-full bg-bg border border-primary/50 rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primaryDark focus:ring-2 focus:ring-primary/20 ${
              isExpired ? "opacity-60 cursor-not-allowed bg-text/5" : ""
            }`}
          >
            {companionOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="rsvp-obs"
            className="block text-xs font-semibold uppercase tracking-wider text-text mb-1.5"
          >
            Recadinho ou Restrição Alimentar (Opcional)
          </label>
          <textarea
            id="rsvp-obs"
            rows={2}
            disabled={isExpired}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Deixe um carinho ou avise se possui alguma restrição alimentar..."
            className={`w-full bg-bg border border-primary/50 rounded-xl px-4 py-3 text-sm text-text placeholder:text-text/40 focus:outline-none focus:border-primaryDark focus:ring-2 focus:ring-primary/20 ${
              isExpired ? "opacity-60 cursor-not-allowed bg-text/5" : ""
            }`}
          />
        </div>

        <button
          type="submit"
          disabled={isExpired}
          className={`w-full font-semibold py-3.5 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2 mt-2 ${
            isExpired
              ? "bg-text/30 text-white/80 cursor-not-allowed shadow-none"
              : "bg-primary hover:bg-primaryDark text-white cursor-pointer"
          }`}
        >
          {!isExpired ? (
            <>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
              </svg>
              <span>Confirmar pelo WhatsApp</span>
            </>
          ) : (
            <span>Confirmações Encerradas</span>
          )}
        </button>
      </form>

      {/* Caixa de Confirmação e Atalho do WhatsApp */}
      {previewData && !isExpired && (
        <div className="mt-6 bg-bg border border-accent/40 rounded-2xl p-4 relative z-10 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">
              ✓ Link do WhatsApp Gerado!
            </span>
            <button
              type="button"
              onClick={() => setPreviewData(null)}
              className="text-xs text-text/60 hover:text-text cursor-pointer"
            >
              Fechar
            </button>
          </div>
          <p className="text-xs text-text/80 mb-2">
            Mensagem formatada para o envio direto:
          </p>
          <pre className="bg-white p-3 rounded-xl text-xs text-text whitespace-pre-wrap font-sans border border-primary/30 mb-3">
            {previewData.message}
          </pre>
          <a
            href={previewData.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-accent hover:opacity-90 text-white text-xs font-medium py-2.5 px-4 rounded-xl transition-opacity cursor-pointer"
          >
            Abrir WhatsApp Agora ↗
          </a>
        </div>
      )}
    </div>
  );
}
