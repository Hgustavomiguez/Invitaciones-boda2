import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Gift, Camera, Send, Heart, Clock } from 'lucide-react';

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    diet: 'Ninguna'
  });

  useEffect(() => {
    const targetDate = new Date("2026-11-14T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "5491100000000"; // Reemplazar con el número real
    const text = `¡Hola! Soy ${formData.name}. ${formData.attending === 'yes' ? 'Confirmo mi asistencia' : 'Lamentablemente no podré asistir'} a la boda. Restricción alimentaria: ${formData.diet}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const Section = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="mb-8"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-accent selection:text-white flex justify-center">
      <div className="w-full max-w-md bg-brand-bg shadow-2xl relative overflow-hidden pb-20">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[70vh] bg-gray-200 mb-12"
        >
          <img 
            src="https://picsum.photos/seed/wedding123/800/1200" 
            alt="Novios" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 text-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl font-light tracking-widest mb-3"
            >
              A & B
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-sm tracking-[0.3em] uppercase text-brand-accent font-semibold"
            >
              14 . 11 . 2026
            </motion.p>
          </div>
        </motion.div>

        <div className="px-6">
          {/* Countdown */}
          <Section>
            <div className="origami-card p-6 text-center">
              <div className="origami-fold"></div>
              <Clock className="mx-auto text-brand-accent mb-4" size={24} strokeWidth={1.5} />
              <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-6">Faltan</h2>
              <div className="flex justify-center gap-4 text-center">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="flex flex-col">
                    <span className="text-3xl font-light text-brand-accent">{value.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">{unit === 'd' ? 'Días' : unit === 'h' ? 'Hs' : unit === 'm' ? 'Min' : 'Seg'}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Locations */}
          <Section>
            <h2 className="text-2xl font-light text-center mb-6">Ubicaciones</h2>
            
            <div className="origami-card p-6 mb-4">
              <div className="origami-fold"></div>
              <MapPin className="text-brand-accent mb-4" size={24} strokeWidth={1.5} />
              <h3 className="text-lg font-medium mb-1">Ceremonia</h3>
              <p className="text-sm text-gray-500 mb-4">Parroquia San José<br/>Av. Siempre Viva 123, Ciudad</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-accent border-b border-brand-accent pb-1 hover:opacity-80 transition-opacity">
                Ver en mapa
              </a>
            </div>

            <div className="origami-card p-6">
              <div className="origami-fold"></div>
              <MapPin className="text-brand-accent mb-4" size={24} strokeWidth={1.5} />
              <h3 className="text-lg font-medium mb-1">Fiesta</h3>
              <p className="text-sm text-gray-500 mb-4">Estancia El Paraíso<br/>Ruta 4 Km 12, Afueras</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-accent border-b border-brand-accent pb-1 hover:opacity-80 transition-opacity">
                Ver en mapa
              </a>
            </div>
          </Section>

          {/* Gallery */}
          <Section>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Camera className="text-brand-accent" size={20} strokeWidth={1.5} />
              <h2 className="text-2xl font-light text-center">Nosotros</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="origami-card aspect-square p-1">
                  <img 
                    src={`https://picsum.photos/seed/wed${i}/400/400`} 
                    alt={`Galería ${i}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </Section>

          {/* Logistics */}
          <Section>
            <div className="origami-card p-8 text-center">
              <div className="origami-fold"></div>
              <Calendar className="mx-auto text-brand-accent mb-4" size={24} strokeWidth={1.5} />
              <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">Valor de Tarjeta</p>
              <p className="text-3xl font-light mb-8">$50.000</p>
              <a 
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+A+%26+B&dates=20261114T200000Z/20261115T040000Z&details=¡Nos+casamos!&location=Estancia+El+Paraíso" 
                target="_blank"
                rel="noreferrer"
                className="bg-brand-text text-white px-6 py-4 text-sm font-medium w-full flex items-center justify-center gap-2 hover:bg-black transition-colors"
              >
                <Calendar size={18} /> Agendar en Google Calendar
              </a>
            </div>
          </Section>

          {/* Gift */}
          <Section>
            <div className="origami-card p-8 text-center">
              <div className="origami-fold"></div>
              <Gift className="mx-auto text-brand-accent mb-4" size={24} strokeWidth={1.5} />
              <h3 className="text-xl font-light mb-3">Mesa de Regalos</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                El mejor regalo es tu presencia, pero si deseas ayudarnos con nuestra luna de miel, puedes hacerlo aquí:
              </p>
              <div className="bg-brand-bg/50 border border-gray-100 p-4 text-sm text-left">
                <p className="mb-2"><strong className="font-medium text-gray-900">CBU:</strong> <span className="text-gray-600 font-mono text-xs">0000000000000000000000</span></p>
                <p><strong className="font-medium text-gray-900">Alias:</strong> <span className="text-gray-600 font-mono text-xs">BODA.AMOR.VIAJE</span></p>
              </div>
            </div>
          </Section>

          {/* RSVP Form */}
          <Section>
            <form onSubmit={handleWhatsApp} className="origami-card p-8">
              <div className="origami-fold"></div>
              <h3 className="text-2xl font-light mb-8 text-center">RSVP</h3>
              
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-accent bg-transparent transition-colors" 
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3">¿Asistirás?</label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 text-sm cursor-pointer">
                    <input 
                      type="radio" 
                      name="attending" 
                      value="yes" 
                      required 
                      onChange={(e) => setFormData({...formData, attending: e.target.value})}
                      className="accent-brand-accent w-4 h-4"
                    /> 
                    Sí, confirmo asistencia
                  </label>
                  <label className="flex items-center gap-3 text-sm cursor-pointer">
                    <input 
                      type="radio" 
                      name="attending" 
                      value="no" 
                      required 
                      onChange={(e) => setFormData({...formData, attending: e.target.value})}
                      className="accent-brand-accent w-4 h-4"
                    /> 
                    No podré asistir
                  </label>
                </div>
              </div>

              <div className="mb-10">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Menú Especial</label>
                <select 
                  value={formData.diet}
                  onChange={(e) => setFormData({...formData, diet: e.target.value})}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-accent bg-transparent text-sm cursor-pointer"
                >
                  <option>Ninguna</option>
                  <option>Celiaquía</option>
                  <option>Vegetariana</option>
                  <option>Vegana</option>
                  <option>Otra</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="bg-brand-accent text-white px-6 py-4 text-sm font-medium w-full flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20 hover:bg-blue-700 transition-colors"
              >
                <Send size={18} /> Confirmar por WhatsApp
              </button>
            </form>
          </Section>
          
          <div className="text-center pb-8 pt-4">
            <Heart className="mx-auto text-gray-300 mb-2" size={20} />
            <p className="text-xs text-gray-400 uppercase tracking-widest">¡Te esperamos!</p>
          </div>

        </div>
      </div>
    </div>
  );
}
