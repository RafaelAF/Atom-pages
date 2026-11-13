import Link from "next/link";

interface NavbarProps {
  title: string;
  hasStory?: boolean;
  hasGifts?: boolean;
}

export function Navbar({ title, hasStory = true, hasGifts = true }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-md border-b border-primary/20">
      <nav className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="#inicio"
          className="font-script text-3xl text-text hover:text-primary transition-colors"
        >
          {title} ♥
        </a>
        <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm font-medium text-text">
          {hasStory && (
            <a href="#historia" className="hover:text-primary transition-colors py-1">
              A História
            </a>
          )}
          <a href="#evento" className="hover:text-primary transition-colors py-1">
            O Evento
          </a>
          {hasGifts && (
            <a href="#presentes" className="hover:text-primary transition-colors py-1">
              Presentes & PIX
            </a>
          )}
          <a
            href="#rsvp"
            className="bg-primary text-white px-3.5 py-2 rounded-full shadow-sm hover:bg-primaryDark transition-all"
          >
            Confirmar
          </a>
        </div>
      </nav>
    </header>
  );
}

