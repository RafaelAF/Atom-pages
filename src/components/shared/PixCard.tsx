"use client";

import { useState } from "react";
import { PixConfig } from "@/types/landing";

interface PixCardProps {
  pix: PixConfig;
  onNotify?: (message: string) => void;
}

export function PixCard({ pix, onNotify }: PixCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(pix.key);
      } else {
        // Fallback para ambientes sem suporte à Clipboard API assíncrona
        const textArea = document.createElement("textarea");
        textArea.value = pix.key;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      if (onNotify) {
        onNotify("Chave PIX copiada para a área de transferência!");
      }

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Falha ao copiar PIX:", err);
    }
  };

  return (
    <div className="stitched-card p-6 sm:p-7 text-center flex flex-col items-center justify-between">
      <div>
        <span className="text-xs uppercase tracking-wider text-accent font-semibold">
          Praticidade
        </span>
        <h3 className="font-serif text-xl font-bold text-text mt-1 mb-2">
          {pix.title || "Operação Fralda via PIX"}
        </h3>
        <p className="text-xs text-text/80 mb-4">
          {pix.description ||
            "Prefere contribuir com qualquer valor para o enxoval? Escaneie o QR Code ou copie a chave abaixo:"}
        </p>

        {/* QR Code SVG Vetorial Estilizado */}
        <div className="w-32 h-32 mx-auto bg-white p-2.5 rounded-2xl border border-primary/40 shadow-inner mb-4 flex items-center justify-center">
          <svg
            className="w-full h-full text-text"
            viewBox="0 0 100 100"
            fill="currentColor"
            aria-label="QR Code PIX"
          >
            <rect x="10" y="10" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="5" />
            <rect x="17" y="17" width="11" height="11" />
            <rect x="65" y="10" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="5" />
            <rect x="72" y="17" width="11" height="11" />
            <rect x="10" y="65" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="5" />
            <rect x="17" y="72" width="11" height="11" />
            <rect x="45" y="12" width="8" height="8" />
            <rect x="45" y="28" width="8" height="16" />
            <rect x="12" y="45" width="16" height="8" />
            <rect x="36" y="45" width="8" height="8" />
            <rect x="52" y="45" width="16" height="8" />
            <rect x="76" y="45" width="12" height="8" />
            <rect x="45" y="62" width="8" height="14" />
            <rect x="62" y="62" width="14" height="8" />
            <rect x="82" y="62" width="8" height="26" />
            <rect x="60" y="80" width="16" height="8" />
          </svg>
        </div>
      </div>

      <div className="w-full z-10">
        <div
          className="bg-bg border border-primary/40 rounded-xl px-3 py-2 text-xs font-mono text-text truncate mb-2.5"
          title={pix.key}
        >
          {pix.key}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="w-full bg-primary hover:bg-primaryDark text-white font-medium text-sm py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>{copied ? "Chave Copiada! ✓" : "Copiar Chave PIX"}</span>
        </button>
      </div>
    </div>
  );
}

