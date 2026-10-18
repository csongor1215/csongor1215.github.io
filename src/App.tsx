import { useEffect, useState } from 'react';
import tourDatesData from './tourDates.json';

const Instagram = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <rect width="20" height="20" x="2" y="2" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

interface TourDate {
  id: string;
  venue: string;
  city: string;
  country: string;
  date: string;
  ticket_url: string | null;
  facebook_url?: string | null;
  is_sold_out: boolean;
}

function App() {
  const [tourDates] = useState<TourDate[]>(tourDatesData);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'music', 'tour'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <div className="min-h-screen text-[#d8c8c8] selection:bg-[#8b0000] selection:text-white">
      {/* Navigáció */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#120000] border-b-4 border-double border-[#660000] shadow-[0_6px_20px_rgba(0,0,0,0.9)]">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="flex items-center">
            <img
              src="/slamtendre_logo.png"
              alt="Slamtendrectomy"
              className="h-11 logo-blood"
            />
          </button>

          <div className="hidden md:flex items-center gap-2">
            {[
              { id: 'home', label: 'Kezdőlap' },
              { id: 'about', label: 'A Zenekarról' },
              { id: 'music', label: 'Zene' },
              { id: 'tour', label: 'Koncertek' },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-1 text-sm font-bold uppercase tracking-[0.15em] border ${
                    isActive
                      ? 'bg-[#660000] text-white border-[#a30000]'
                      : 'bg-transparent text-[#9e8282] border-transparent hover:border-[#4a0000] hover:bg-[#240000] hover:text-[#d8c8c8]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden border-b-4 border-[#4a0000]"
        style={{
          background:
            'radial-gradient(circle at center, #4a0000 0%, #1f0000 45%, #080000 90%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-25 mix-blend-multiply bg-cover bg-center"
          style={{
            backgroundImage: "url('/borisz.jpg')",
            filter: 'grayscale(100%) contrast(2.5) brightness(0.4)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0, rgba(0,0,0,0.4) 4px, rgba(90,0,0,0.2) 8px)',
          }}
        />

        <div className="relative z-10 w-full text-center px-4 max-w-4xl">
          <div className="mb-6 flex justify-center">
            <img
              src="/slamtendre_logo.png"
              alt="Slamtendrectomy"
              className="w-full max-w-2xl drip-text logo-blood"
            />
          </div>

          <div className="inline-block bg-[#120000] border-y-2 border-[#660000] px-6 py-2 mb-10 shadow-[0_0_20px_rgba(0,0,0,0.9)]">
            <p className="font-zine text-sm sm:text-lg md:text-xl uppercase tracking-[0.25em] text-[#b88686] break-words">
              fasz brutal shit didy
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => scrollTo('music')}
              className="brutal-btn px-8 py-3.5 text-base"
            >
              Hallgasd Meg
            </button>
            <button
              onClick={() => scrollTo('tour')}
              className="brutal-btn-secondary px-8 py-3.5 text-base"
            >
              Koncertek
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 bg-[#1c0000]"
        style={{
          backgroundImage:
            'linear-gradient(180deg, #120000 0%, #290000 50%, #120000 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="brutal-box p-6 md:p-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="font-zine text-xs font-bold tracking-[0.2em] uppercase mb-2 inline-block bg-[#4a0000] text-[#e5d5d5] px-2 py-0.5 border border-[#8b0000]">
                A Zenekar
              </span>
              <h2 className="font-metal text-4xl md:text-5xl mb-6 uppercase leading-none text-[#e5d5d5] tracking-wider">
                Igazából csak{' '}
                <span className="text-[#a30000] underline decoration-[#5c0000] decoration-wavy">
                  verjük a faszunkat
                </span>
              </h2>
              <div className="border-l-4 border-[#7a0000] pl-4 py-2 bg-[#0d0000] font-zine text-[#b09898]">
                <p>Igen, ez a szitu.</p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square overflow-hidden border-4 border-double border-[#7a0000] bg-[#080000] shadow-[8px_8px_0px_#050000]">
                <img
                  src="/borisz.jpg"
                  alt="Slamtendrectomy"
                  className="w-full h-full object-cover gore-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Music Section */}
      <section
        id="music"
        className="py-20 px-4"
        style={{
          background:
            'radial-gradient(ellipse at center, #380000 0%, #140000 70%, #090000 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-zine text-xs font-bold tracking-[0.2em] uppercase mb-2 inline-block bg-[#4a0000] text-[#e5d5d5] px-2 py-0.5 border border-[#8b0000]">
              Diszkográfia
            </span>
            <h2 className="font-metal text-4xl md:text-5xl mb-3 uppercase tracking-wider text-[#e5d5d5]">
              A <span className="text-[#a30000]">FITYMACSATTOGÁS</span> Hangjai
            </h2>
            <p className="font-zine text-sm text-[#9e8282] max-w-xl mx-auto">
              Még mindig csak a faszunkat verjük.
            </p>
          </div>

          <div className="max-w-sm mx-auto">
            {[
              {
                title: 'SLAMTENDRECTOMY',
                year: '2025',
                image: '/slamtendre_albumcover.jpg',
                url: 'https://open.spotify.com/album/7odCXdgmX0ffG3WS1gbQgc?si=aA7iz9voSLS9Izi22Smq-g',
                isLatest: true,
              },
            ].map((album) => (
              <div key={album.title} className="brutal-box p-4">
                <div className="relative aspect-square overflow-hidden border-2 border-[#4a0000] mb-4">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover contrast-125 brightness-90"
                  />
                  {album.isLatest && (
                    <div className="absolute top-0 left-0 bg-[#7a0000] text-white font-zine text-xs font-bold px-3 py-1 uppercase tracking-widest border-b-2 border-r-2 border-[#090000]">
                      Legújabb
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t-2 border-[#3d0000] pt-3">
                  <div>
                    <span className="font-zine text-xs uppercase tracking-widest text-[#9e8282] block">
                      {album.year}
                    </span>
                    <h3 className="font-metal text-2xl uppercase tracking-wider text-[#e5d5d5]">
                      {album.title}
                    </h3>
                  </div>

                  <a
                    href={album.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn px-5 py-2 text-xs"
                  >
                    Lejátszás
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Tour Section */}
      <section
        id="tour"
        className="py-20 px-4"
        style={{
          backgroundImage:
            'linear-gradient(180deg, #120000 0%, #260000 50%, #0d0000 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-zine text-xs font-bold tracking-[0.2em] uppercase mb-2 inline-block bg-[#4a0000] text-[#e5d5d5] px-2 py-0.5 border border-[#8b0000]">
              Turné
            </span>
            <h2 className="font-metal text-4xl md:text-5xl mb-3 uppercase tracking-wider text-[#e5d5d5]">
              koncertek <span className="text-[#a30000]">vagy mi a fasz</span>
            </h2>
            <p className="font-zine text-sm text-[#9e8282] max-w-xl mx-auto">
              Verjük együtt a faszunkat.
            </p>
          </div>

          <div className="brutal-box divide-y-2 divide-[#4a0000]">
            {tourDates.map((show) => (
              <div
                key={show.id}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-4 md:p-5 bg-[#160000] hover:bg-[#290000]"
              >
                <div className="flex-shrink-0 text-center w-20 bg-[#3d0000] border-2 border-[#7a0000] py-2 shadow-[3px_3px_0px_#050000]">
                  <div className="font-metal text-3xl leading-none text-white">
                    {String(new Date(show.date).getDate()).padStart(2, '0')}
                  </div>
                  <div className="font-zine text-xs uppercase tracking-widest mt-1 text-[#d8b4b4]">
                    {new Date(show.date).toLocaleDateString('hu-HU', {
                      month: 'short',
                    })}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-[#e5d5d5]">
                    {show.venue}
                  </h3>
                  <div className="font-zine text-xs uppercase tracking-wider mt-1 text-[#9e8282]">
                    {show.city}, {show.country}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {show.facebook_url && (
                    <a
                      href={show.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutal-btn-secondary px-4 py-2 text-xs flex items-center gap-2"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                      Facebook esemény
                    </a>
                  )}
                  {show.is_sold_out ? (
                    <span className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-[#0a0000] border-2 border-[#331111] text-[#664444] line-through">
                      Elfogyott
                    </span>
                  ) : show.ticket_url ? (
                    <a
                      href={show.ticket_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutal-btn px-5 py-2 text-xs"
                    >
                      Jegyvásárlás
                    </a>
                  ) : (
                    <span className="font-zine px-4 py-2 text-xs font-bold uppercase tracking-widest bg-[#0d0000] border-2 border-[#4a0000] text-[#9e8282]">
                      Csak a helyszínen lehet jegyet venni
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {tourDates.length === 0 && (
            <div className="brutal-box text-center py-12">
              <p className="font-zine text-[#9e8282]">
                Jelenleg nincs meghirdetett koncert.
              </p>
              <p className="font-zine text-sm mt-2 text-[#664444]">
                Gyere vissza hamarosan.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-[#0a0000] border-t-4 border-double border-[#520000]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src="/slamtendre_logo.png"
            alt="Slamtendrectomy"
            className="h-12 logo-blood"
          />

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/slamtendrectomy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="brutal-btn-secondary w-10 h-10 flex items-center justify-center"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;