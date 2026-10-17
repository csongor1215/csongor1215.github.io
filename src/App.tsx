import { useEffect, useState } from 'react';
import {
  Calendar,
  MapPin,
  Ticket,
  ExternalLink,
  Music,
  Disc3,
  Skull,
} from 'lucide-react';

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9" fill="currentColor" />
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  is_sold_out: boolean;
}

function App() {
  const [tourDates, setTourDates] = useState<TourDate[]>([]);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    fetch(`/tourDates.json?t=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Nem tölthető be a turnédátum');
        return res.json();
      })
      .then((data) => setTourDates(data))
      .catch((err) => console.error(err));

    const handleScroll = () => {
      const sections = ['home', 'about', 'music', 'tour'];
      const scrollPos = window.scrollY + 100;
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#050000' }}>
      {/* Navigáció */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: 'rgba(5,0,0,0.92)',
          backdropFilter: 'blur(10px)',
          borderColor: '#3d0000',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="flex items-center">
            <img
              src="/slamtendre_logo.png"
              alt="Slamtendrectomy"
              className="h-10 logo-inverted"
            />
          </button>
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', label: 'Kezdőlap' },
              { id: 'about', label: 'A Zenekarról' },
              { id: 'music', label: 'Zene' },
              { id: 'tour', label: 'Turnédátumok' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-bold uppercase tracking-widest transition-colors"
                style={{
                  color: activeSection === item.id ? '#cc0000' : '#888',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#cc0000')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    activeSection === item.id ? '#cc0000' : '#888')
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1920')",
              filter: 'grayscale(100%) brightness(0.25) contrast(1.4)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, #050000 90%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-64"
            style={{
              background: 'linear-gradient(to top, #050000 60%, rgba(139,0,0,0.15))',
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-32"
            style={{
              background: 'linear-gradient(to bottom, #050000, transparent)',
            }}
          />
        </div>

        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background:
              'linear-gradient(90deg, transparent, #8b0000 20%, #cc0000 50%, #8b0000 80%, transparent)',
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div
            className="mb-8 inline-flex items-center gap-3 px-5 py-2 border"
            style={{
              backgroundColor: 'rgba(139,0,0,0.15)',
              borderColor: '#8b0000',
            }}
          >
            <Skull className="w-4 h-4" style={{ color: '#cc0000' }} />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: '#cc0000' }}
            >
              Új Album Megjelent
            </span>
          </div>

          <div className="mb-8 flex justify-center">
            <img
              src="/slamtendre_logo.png"
              alt="Slamtendrectomy"
              className="w-full max-w-2xl drip-text"
              style={{
                filter:
                  'invert(1) sepia(1) saturate(6) hue-rotate(320deg) drop-shadow(0 0 40px rgba(180,0,0,0.7))',
              }}
            />
          </div>

          <p
            className="text-lg md:text-xl uppercase tracking-widest mb-10"
            style={{ color: '#888', letterSpacing: '0.25em' }}
          >
            Brutális&nbsp;&nbsp;•&nbsp;&nbsp;Könyörtelen&nbsp;&nbsp;•&nbsp;&nbsp;Megsemmisülés
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('music')}
              className="group px-8 py-4 font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300"
              style={{
                backgroundColor: '#8b0000',
                border: '1px solid #cc0000',
                color: '#fff',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#aa0000')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#8b0000')}
            >
              <Music className="w-5 h-5" />
              Hallgasd Meg
            </button>
            <button
              onClick={() => scrollTo('tour')}
              className="px-8 py-4 font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #3d0000',
                color: '#999',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#8b0000';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#3d0000';
                e.currentTarget.style.color = '#999';
              }}
            >
              <Calendar className="w-5 h-5" />
              Turnédátumok
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="text-xs font-bold tracking-widest uppercase mb-4 block"
                style={{ color: '#8b0000' }}
              >
                A Zenekar
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase leading-tight">
                Tűzben Edzett,{' '}
                <span style={{ color: '#cc0000' }}>Pusztításra Született</span>
              </h2>
              <div className="space-y-5 leading-relaxed" style={{ color: '#888' }}>
                <p>
                  A Slamtendrectomy a föld mélyéről tört elő, azzal az egyetlen céllal,
                  hogy a legdurvább, legkegyetlenebb brutális death metalt hozza létre,
                  amit valaha emberi fül hallott.
                </p>
                <p>
                  Budapest mélyéről indult útjára a zenekar, ahol a romlott,
                  izzadt underground helyszíneken csiszolódott egyedi
                  hangjuk. Minden riff egy tomboló viharkard. Minden breakdown
                  egy irgalmatlan robbantás.
                </p>
                <p>
                  Három kritikusok által ünnepelt albummal és megszámolhatatlan
                  arcletépő fellépéssel a hátuk mögött a Slamtendrectomy tovább tolja
                  a szélsőséges zene határait.
                </p>
              </div>
              <div
                className="grid grid-cols-3 gap-6 mt-10 border-t pt-8"
                style={{ borderColor: '#1a0000' }}
              >
                {[
                  { num: '3', label: 'Albumok' },
                  { num: '200+', label: 'Koncertek' },
                  { num: '50E', label: 'Rajongók' },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-3xl font-black mb-1" style={{ color: '#cc0000' }}>
                      {num}
                    </div>
                    <div className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div
                className="aspect-square overflow-hidden"
                style={{ border: '1px solid #3d0000' }}
              >
                <img
                  src="https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Slamtendrectomy"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(60%) contrast(1.2) brightness(0.7)' }}
                />
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{ backgroundColor: 'rgba(100,0,0,0.3)' }}
                />
              </div>
              <div
                className="absolute -bottom-3 -right-3 w-24 h-24"
                style={{ border: '2px solid #8b0000', opacity: 0.5 }}
              />
              <div
                className="absolute -top-3 -left-3 w-16 h-16"
                style={{ border: '2px solid #3d0000', opacity: 0.4 }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Music Section */}
      <section
        id="music"
        className="py-24 md:py-32 px-6"
        style={{
          background: 'linear-gradient(180deg, #050000 0%, #0d0000 50%, #050000 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: '#8b0000' }}
            >
              Diszkográfia
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">
              A <span style={{ color: '#cc0000' }}>Pusztítás</span> Hangjai
            </h2>
            <p style={{ color: '#666' }} className="max-w-xl mx-auto">
              Három album. Könyörtelen hangi erőszak. Minden egyes dal a teljes megsemmisülés felé vezet.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Bemetszések',
                year: '2024',
                image:
                  'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=600',
                tracks: '12 szám',
                isLatest: true,
              },
              {
                title: 'Vérveszteség',
                year: '2022',
                image:
                  'https://images.pexels.com/photos/1695934/pexels-photo-1695934.jpeg?auto=compress&cs=tinysrgb&w=600',
                tracks: '10 szám',
                isLatest: false,
              },
              {
                title: 'Első Csapás',
                year: '2020',
                image:
                  'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
                tracks: '8 szám',
                isLatest: false,
              },
            ].map((album) => (
              <div
                key={album.title}
                className="group relative overflow-hidden transition-all duration-300"
                style={{ border: '1px solid #1a0000' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8b0000')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1a0000')}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: 'grayscale(80%) contrast(1.3) brightness(0.6)' }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"
                    style={{ backgroundColor: '#8b0000' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(5,0,0,0.95) 0%, transparent 60%)',
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2" style={{ color: '#666' }}>
                    <Disc3 className="w-4 h-4" style={{ color: '#8b0000' }} />
                    <span className="text-xs uppercase tracking-wider">{album.year}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase mb-1">{album.title}</h3>
                  <p className="text-xs uppercase tracking-wider" style={{ color: '#555' }}>
                    {album.tracks}
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="px-6 py-3 font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
                    style={{ backgroundColor: '#8b0000', border: '1px solid #cc0000' }}
                  >
                    <Music className="w-4 h-4" />
                    Lejátszás
                  </button>
                </div>
                {album.isLatest && (
                  <div
                    className="absolute top-4 left-4 text-xs font-bold px-3 py-1 uppercase tracking-widest"
                    style={{ backgroundColor: '#8b0000' }}
                  >
                    Legújabb
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Tour Section */}
      <section id="tour" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: '#8b0000' }}
            >
              Turné
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">
              Láss Minket <span style={{ color: '#cc0000' }}>Élőben</span>
            </h2>
            <p style={{ color: '#666' }} className="max-w-xl mx-auto">
              Ha eddig túlélted, most itt az alkalom megbizonyosodni róla, hogy soha nem felejted el.
            </p>
          </div>
          <div className="space-y-2">
            {tourDates.map((show, i) => (
              <div
                key={show.id}
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(139,0,0,0.04)',
                  borderBottom: '1px solid #1a0000',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(139,0,0,0.12)';
                  (e.currentTarget as HTMLElement).style.borderBottomColor = '#8b0000';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(139,0,0,0.04)';
                  (e.currentTarget as HTMLElement).style.borderBottomColor = '#1a0000';
                }}
              >
                <div className="flex-shrink-0 text-center w-16" style={{ color: '#cc0000' }}>
                  <div className="text-3xl font-black leading-none">
                    {String(new Date(show.date).getDate()).padStart(2, '0')}
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest mt-1"
                    style={{ color: '#555' }}
                  >
                    {new Date(show.date).toLocaleDateString('hu-HU', {
                      month: 'short',
                    })}
                  </div>
                </div>
                <div
                  className="hidden md:block w-px self-stretch"
                  style={{ backgroundColor: '#1a0000' }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold uppercase tracking-wide">{show.venue}</h3>
                  <div className="flex items-center gap-2 mt-1" style={{ color: '#666' }}>
                    <MapPin className="w-3 h-3" />
                    <span className="text-sm">
                      {show.city}, {show.country}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono" style={{ color: '#333' }}>
                    #{String(i + 1).padStart(2, '0')}
                  </span>
                  {show.is_sold_out ? (
                    <span
                      className="px-4 py-2 text-xs font-bold uppercase tracking-widest"
                      style={{
                        border: '1px solid #333',
                        color: '#555',
                      }}
                    >
                      Elfogyott
                    </span>
                  ) : show.ticket_url ? (
                    <a
                      href={show.ticket_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn px-5 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300"
                      style={{
                        backgroundColor: '#8b0000',
                        border: '1px solid #cc0000',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#aa0000')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#8b0000')}
                    >
                      <Ticket className="w-3 h-3" />
                      Jegy
                      <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span
                      className="px-4 py-2 text-xs font-bold uppercase tracking-widest"
                      style={{
                        border: '1px solid #1a0000',
                        color: '#555',
                      }}
                    >
                      Hamarosan
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {tourDates.length === 0 && (
            <div className="text-center py-16 border" style={{ borderColor: '#1a0000' }}>
              <Skull className="w-10 h-10 mx-auto mb-4" style={{ color: '#3d0000' }} />
              <p style={{ color: '#555' }}>Jelenleg nincs meghirdetett koncert.</p>
              <p className="text-sm mt-2" style={{ color: '#333' }}>
                Gyere vissza hamarosan.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="py-16 px-6"
        style={{
          background: 'linear-gradient(180deg, #050000, #0d0000 50%, #050000)',
          borderTop: '1px solid #1a0000',
          borderBottom: '1px solid #1a0000',
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <Skull className="w-8 h-8 mx-auto mb-6" style={{ color: '#8b0000' }} />
          <h3 className="text-2xl font-black uppercase tracking-wider mb-3">
            Maradj a <span style={{ color: '#cc0000' }}>Körben</span>
          </h3>
          <p style={{ color: '#666' }} className="mb-8 text-sm">
            Exkluzív előzetes jegyek, új kiadások és hírek közvetlenül a postaládádba.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Feliratkozva!');
            }}
          >
            <input
              type="email"
              placeholder="email@cimed.hu"
              className="flex-1 px-6 py-4 text-sm focus:outline-none transition-colors"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #3d0000',
                color: '#fff',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#8b0000')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#3d0000')}
              required
            />
            <button
              type="submit"
              className="px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300"
              style={{ backgroundColor: '#8b0000', border: '1px solid #cc0000' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#aa0000')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#8b0000')}
            >
              Feliratkozás
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8"
            style={{ borderBottom: '1px solid #1a0000' }}
          >
            <img
              src="/slamtendre_logo.png"
              alt="Slamtendrectomy"
              className="h-12 logo-inverted"
              style={{ opacity: 0.6 }}
            />
            <div className="flex items-center gap-4">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Youtube, label: 'YouTube' },
                { Icon: Facebook, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-300"
                  style={{ border: '1px solid #1a0000', color: '#555' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#8b0000';
                    e.currentTarget.style.color = '#cc0000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1a0000';
                    e.currentTarget.style.color = '#555';
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div
            className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs uppercase tracking-widest"
            style={{ color: '#333' }}
          >
            <p>&copy; 2026 Slamtendrectomy. Minden jog fenntartva.</p>
            <div className="flex items-center gap-6">
              {['Adatvédelem', 'Feltételek', 'Kapcsolat'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#cc0000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#333')}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;