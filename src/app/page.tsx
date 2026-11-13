import Link from "next/link";
import { getAllClientSlugs, getClientConfig } from "@/lib/loader";

export default function HomePage() {
  const slugs = getAllClientSlugs();
  const clients = slugs
    .map((slug) => getClientConfig(slug))
    .filter((c) => c !== null);

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#5C3A31] flex flex-col items-center justify-center p-6 selection:bg-[#D89B9E] selection:text-white">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="inline-block px-4 py-1.5 bg-[#F3E8DC] rounded-full border border-[#D89B9E]/40 text-xs font-semibold tracking-widest text-[#7C7859] uppercase">
          Atom Pages • Plataforma Multi-Tenant
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#5C3A31]">
          Landing Pages de Celebração Sob Demanda
        </h1>

        <p className="text-sm sm:text-base text-[#5C3A31]/80 max-w-lg mx-auto leading-relaxed">
          Plataforma estática, leve e stateless para convites digitais, chás de bebê e eventos.
          Sem banco de dados e com confirmação via WhatsApp.
        </p>

        <div className="pt-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7C7859] mb-4">
            Páginas Ativas no Repositório
          </h2>

          <div className="grid gap-3 max-w-md mx-auto">
            {clients.map((client) => (
              <Link
                key={client.slug}
                href={`/landings/${client.slug}`}
                className="group p-5 bg-[#F3E8DC] hover:bg-[#D89B9E]/20 border border-[#D89B9E]/50 rounded-2xl shadow-sm transition-all flex items-center justify-between text-left"
              >
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#5C3A31] group-hover:text-[#C48185] transition-colors">
                    {client.hero.title}
                  </h3>
                  <p className="text-xs text-[#5C3A31]/70">
                    {client.hero.badgeSubtitle} • <code>/landings/{client.slug}</code>
                  </p>
                </div>
                <span className="text-[#C48185] font-serif text-xl group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

