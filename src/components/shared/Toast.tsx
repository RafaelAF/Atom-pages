"use client";

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-text text-bg text-xs sm:text-sm font-medium px-5 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 animate-bounce">
      <span className="text-primary">♥</span>
      <span>{message}</span>
    </div>
  );
}

