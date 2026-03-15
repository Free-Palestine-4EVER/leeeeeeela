'use client';

import dynamic from 'next/dynamic';

const ARTryOn = dynamic(() => import('@/components/ARTryOn'), {
  ssr: false,
  loading: () => (
    <div className="aspect-[4/3] max-w-4xl mx-auto bg-[#0a0a0a] rounded-2xl border border-[#2a2a2a] flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function TryOnClient() {
  return (
    <section className="min-h-screen bg-[#0A0A0A] pt-28 pb-20 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E] text-xs font-semibold uppercase tracking-wider mb-4">
          ✨ AI Virtualno Isprobavanje
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Isprobajte Frizure <span className="text-[#C9A96E]">AI Tehnologijom</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Postavite svoju fotografiju i pogledajte kako biste izgledali s različitim frizurama.
          AI tehnologija će realistično primijeniti odabranu frizuru na vašu sliku.
        </p>
      </div>

      {/* AR Try-On Component */}
      <ARTryOn />

      {/* How it works */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
          Kako Funkcioniše?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              icon: '📸',
              title: 'Pokrenite Kameru',
              desc: 'Dozvolite pristup kameri i naš AI sistem će automatski detektovati vaše lice.',
            },
            {
              step: '02',
              icon: '💇‍♀️',
              title: 'Odaberite Periku',
              desc: 'Izaberite između naših premium modela perika i pogledajte kako izgleda na vama.',
            },
            {
              step: '03',
              icon: '📥',
              title: 'Uslikajte & Podijelite',
              desc: 'Napravite screenshot, preuzmite sliku ili je podijelite direktno na društvene mreže.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-[#111] border border-[#2a2a2a] rounded-xl p-6 text-center hover:border-[#C9A96E]/30 transition-colors"
            >
              <div className="text-[#C9A96E]/20 text-5xl font-bold mb-2">{item.step}</div>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <div className="bg-gradient-to-r from-[#C9A96E]/10 to-[#A88B4A]/10 border border-[#C9A96E]/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Sviđa vam se perika? 💛
          </h3>
          <p className="text-gray-400 mb-6">
            Kontaktirajte nas putem WhatsApp-a za narudžbu ili dodatne informacije.
          </p>
          <a
            href="https://wa.me/387671497444?text=Zdravo!%20Zanima%20me%20perika%20koju%20sam%20isprobala%20na%20va%C5%A1oj%20stranici.%20%F0%9F%92%87%E2%80%8D%E2%99%80%EF%B8%8F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors hover:shadow-[0_0_25px_rgba(37,211,102,0.3)]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Naručite Periku
          </a>
        </div>
      </div>
    </section>
  );
}
