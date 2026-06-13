'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ROLES = [
  'Full-Stack Developer',
  'AI Engineer',
  'UI/UX Designer',
  'Problem Solver',
];

export default function Hero() {
  const sectionRef = useRef(null);
  const scrollIndRef = useRef(null);
  const roleRef = useRef(null);
  const roleIdxRef = useRef(0);

  /* ── GSAP stagger reveal on mount ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [
        '.h-eyebrow',
        '.h-name',
        '.h-role-line',
        '.h-intro',
        '.h-cta-row',
        '.h-stats',
      ];

      gsap.set(targets, { y: 48, opacity: 0 });

      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.11,
        delay: 0.15,
      });

      /* Scroll indicator bounce */
      gsap.to(scrollIndRef.current, {
        y: 12,
        duration: 1.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── ScrollTrigger: shift + fade on scroll ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        opacity: 0,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Typewriter role cycler ── */
  useEffect(() => {
    const el = roleRef.current;
    if (!el) return;
    let timeout;
    let charIdx = 0;
    let deleting = false;

    const tick = () => {
      const word = ROLES[roleIdxRef.current];
      if (!deleting) {
        el.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) {
          deleting = true;
          timeout = setTimeout(tick, 2200);
          return;
        }
      } else {
        el.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdxRef.current = (roleIdxRef.current + 1) % ROLES.length;
        }
      }
      timeout = setTimeout(tick, deleting ? 36 : 70);
    };
    timeout = setTimeout(tick, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(100px, 10vh, 140px) clamp(24px, 5vw, 80px) clamp(80px, 8vh, 120px)',
        overflow: 'hidden',
        background: 'var(--base)',
      }}
    >
      {/* ── Ambient glow orbs ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-15%', right: '-8%',
        width: 800, height: 800,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 245, 212, 0.1) 0%, transparent 65%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        animation: 'heroOrbFloat 10s ease-in-out infinite',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '5%', left: '-12%',
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 245, 212, 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        animation: 'heroOrbFloat 14s ease-in-out infinite reverse',
      }} />

      {/* ── Subtle grid ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          'linear-gradient(rgba(0, 245, 212, 0.04) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(0,245,212,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div className="h-eyebrow" style={{
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
      }}>
        <span className="lg:w-[3vw] w-[7vw]" style={{ height: 1, background: 'var(--accent)', display: 'block', flexShrink: 0 }} />
        <span className="label lg:text-[10px] text-[8px]">Available for work</span>
        <span style={{
          marginLeft: 0,
          width: 7, height: 7,
          borderRadius: '50%',
          background: 'var(--accent)',
          display: 'inline-block',
          animation: 'pulseDot 2s ease-in-out infinite',
        }} />
      </div>

      {/* ── Content ── */}
      <div className='flex flex-col  md:items-center justify-center ml-0 md:ml-40 text-center md:text-center' style={{ maxWidth: 1000, width: '100%', zIndex: 2 }}>

        {/* Role typewriter */}
        <div className="h-role-line lg:mt-20 mt-10" style={{
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10, flexWrap: 'wrap',
        }}>
          <span className="label lg:text-[13px] text-[10px] ml-10 lg:ml-0" style={{ color: 'var(--text-muted)' }}>I am a</span>
          <span
            ref={roleRef}
            className='lg:text-[22px] text-[16px]'
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: 'var(--accent)',
              borderRight: '2px solid var(--accent)',
              paddingRight: 5,
              minWidth: 200,
              animation: 'caretBlink 0.8s step-end infinite',
              display: 'inline-block',
            }}
          />
        </div>

        {/* Name */}
        <h1
          className="h-name lg:text-[65px] text-[40px]"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 0.91,
            letterSpacing: '-0.05em', 
            color: 'var(--text-primary)',
            margin: '0 0 10px',
          }}
        >
          Divyanshu<span style={{ color: 'var(--accent)' }}>.</span>
        </h1>

        {/* Intro */}
        <p
          className="h-intro lg:text-[17px] text-[10px]"
          style={{
            maxWidth: 520,
            lineHeight: 1.85,
            color: 'var(--text-secondary)',
            fontWeight: 300,
            margin: '0 0 52px',
          }}
        >
          I build full-stack web apps and AI-powered systems — 
          from production RAG pipelines to responsive React frontends. <br /> Every detail matters.
        </p>

        {/* CTA row */}
        <div className="h-cta-row flex flex-wrap items-center justify-center md:justify-start gap-4">
          <a
            href="#projects"
            id="hero-cta-projects"
            className="btn-primary lg:text-[10px] text-[8px] rounded-full"
            style={{ fontFamily: 'var(--font-display)', textDecoration: 'none' }}
          >
            View Projects
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Resume CTA */}
          <a
            href="/resume.pdf"
            id="hero-cta-resume"
            target="_blank"
            rel="noopener noreferrer"
            download="Divyanshu_Bisht_Resume.pdf"
            className="lg:text-[10px] text-[8px]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: 'var(--accent)',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '10px 20px',
              border: '1px solid var(--border-lit)',
              borderRadius: 100,
              transition: 'background 0.3s, color 0.3s, border-color 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--accent-dim)';
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border-lit)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Download icon */}
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Resume
          </a>
        </div>

        {/* Stats */}
        <div
          className="h-stats flex flex-wrap justify-center md:justify-start gap-8 md:gap-16 mt-16 pt-12"
          style={{
            borderTop: '1px solid var(--border)',
          }}
        >
          {[
            { n: '3', s: '+', label: 'Production Apps' },
            { n: '∞', s: '', label: 'Curiosity' },
          ].map(({ n, s, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                lineHeight: 1,
              }}
              className="lg:text-[35px] text-[25px]"
              >
                {n}<span style={{ color: 'var(--accent)' }}>{s}</span>
              </div>
              <div className='lg:text-[11px] text-[9px]' style={{
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginTop: 8,
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollIndRef}
        aria-label="Scroll down"
        style={{
          position: 'absolute',
          bottom: 40,
          right: 'clamp(24px, 5vw, 80px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          willChange: 'transform',
        }}
      >
        <span style={{
          fontSize: 9,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          writingMode: 'vertical-rl',
        }}>
          Scroll
        </span>
        <svg width="20" height="34" viewBox="0 0 20 34" fill="none" aria-hidden="true">
          <line x1="10" y1="0" x2="10" y2="18"
            stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 20L10 28L16 20"
            stroke="var(--accent)" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 25L10 33L16 25"
            stroke="var(--accent)" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
            opacity="0.3" />
        </svg>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes caretBlink {
          0%, 100% { border-color: var(--accent); }
          50%       { border-color: transparent;  }
        }
        @keyframes heroOrbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-30px) scale(1.04); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
      `}</style>
    </section>
  );
}
