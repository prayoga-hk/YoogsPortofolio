'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ChromaGrid = ({ items, className = '', radius = 300, damping = 0.45, ease = 'power3.out' }) => {
  const rootRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#ef4444',
      gradient: 'linear-gradient(145deg, #131820, #0a0e16)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: '@jordanchen',
      borderColor: '#ef4444',
      gradient: 'linear-gradient(145deg, #131820, #0a0e16)',
      url: 'https://linkedin.com/in/'
    },
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
  };

  const handleCardClick = url => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove = e => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      className={`relative w-full grid justify-center gap-6 ${className}`}
      style={{
        '--r': `${radius}px`,
        '--x': '50%',
        '--y': '50%',
        gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`,
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '1rem',
        boxSizing: 'border-box'
      }}
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          className="
            group relative flex flex-col w-full aspect-square
            rounded-[20px] overflow-hidden
            border-2 border-[#2d3342]
            transition-all duration-500
            cursor-pointer
            hover:border-[#ef4444]
            hover:shadow-[0_0_40px_-12px_rgba(239,68,68,0.5)]
          "
          style={{
            '--card-border': c.borderColor || '#ef4444',
            background: c.gradient || 'linear-gradient(145deg, #131820, #0a0e16)',
            '--spotlight-color': 'rgba(239, 68, 68, 0.15)'
          }}
        >
          {/* Efek Spotlight yang mengikuti kursor (merah) */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
            }}
          />

          {/* Area Gambar */}
          <div className="relative z-10 flex-1 p-6 box-border flex items-center justify-center">
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              className="
                max-w-[65%] max-h-[65%] object-contain rounded-[10px]
                transition-all duration-500 ease-out
                grayscale opacity-50
                group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110
              "
            />
          </div>

          {/* Footer Teks */}
          <footer className="
            relative z-10 p-4 text-white font-sans
            grid grid-cols-[1fr_auto] gap-x-3 gap-y-1
            bg-[#0a0e16]/80 backdrop-blur-sm
            border-t border-[#2d3342]
            transition-colors duration-300
            group-hover:border-[#ef4444]/40
          ">
            <h3 className="m-0 text-[1.05rem] font-semibold transition-colors duration-300 group-hover:text-[#ef4444]">
              {c.title}
            </h3>
            {c.handle && <span className="text-[0.95rem] opacity-80 text-right">{c.handle}</span>}
            <p className="m-0 text-[0.85rem] text-[#64748b] font-mono">{c.subtitle}</p>
            {c.location && <span className="text-[0.85rem] opacity-85 text-right">{c.location}</span>}
          </footer>
        </article>
      ))}
    </div>
  );
};

export default ChromaGrid;
