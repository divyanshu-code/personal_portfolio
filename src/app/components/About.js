'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BIO_LINES = [
  "I'm Divyanshu — a final-year CSE student who builds full - stack web apps and AI - integrated systems.",
  "I'm genuinely interested in how AI and software engineering come together to solve real - world problems — not just in theory, but in production.",
  "That's why I build things like RAG pipelines, ML prediction models, and full - stack platforms — problems that are hard enough to be interesting.",
  "I care about clean architecture, and real-world impact , and building things that actually work."
];

export default function About() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const linesRef = useRef([]);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Clip-path reveal for the image using ScrollTrigger scrub
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );

      // 2. Stacked lines reveal (overflow hidden + y transform)
      gsap.fromTo(
        linesRef.current,
        { y: '100%' },
        {
          y: '0%',
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          }
        }
      );

      // 3. Floating stat bubbles counters
      statsRef.current.forEach((statEl) => {
        if (!statEl) return;
        const target = parseInt(statEl.getAttribute('data-target') || '0', 10);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
          onUpdate: () => {
            statEl.textContent = Math.ceil(counter.val);
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      id="about"
      className="section"
      ref={sectionRef}
      aria-label="About me"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="section-inner">
        {/* Section label */}
        <div style={{ marginBottom: 'clamp(32px, 6vw, 80px)' }}>
          <span className="label text-[12px] lg:text-[15px]"> — About</span>
        </div>

        <div className="about-grid">
          {/* Left — image with clip-path and floating stats */}
          <div style={{ position: 'relative', minWidth: 0 }}>
            <div
              ref={imageWrapRef}
              className="about-image-wrap"
              style={{
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                willChange: 'clip-path'
              }}
            >
              <div className="about-image-frame">
                {/* Real portrait photo */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src="/photo.jpeg"
                    alt="Divyanshu — portrait"
                    fill
                    priority
                    sizes=" width: 100%, height: 100%"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                  {/* Subtle teal gradient overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 55%, rgba(0,245,212,0.07) 100%)',
                    pointerEvents: 'none',
                  }} />
                  {/* Monogram watermark */}
                  <span style={{
                    position: 'absolute',
                    fontFamily: 'var(--font-display)',
                    fontSize: 96,
                    fontWeight: 800,
                    letterSpacing: '-0.05em',
                    color: 'rgba(0,245,212,0.06)',
                    userSelect: 'none',
                    bottom: 16, right: 16,
                    pointerEvents: 'none',
                  }}>D</span>
                </div>
              </div>
              <div className="about-image-accent" aria-hidden="true" />
            </div>

            {/* Floating stat bubbles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
              className="absolute top-[15%] left-[-15px] md:left-[-50px]"
              style={{
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                padding: 'clamp(8px, 2vw, 16px) clamp(20px, 2.5vw, 20px)', borderRadius: '12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                zIndex: 10
              }}
            >
              <div className='text-[18px] lg:text-[26px]' style={{ fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                <span ref={(el) => { if (el) statsRef.current[0] = el; }} data-target="7.9">7</span>+
              </div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', marginTop: 4 }}>CGPA</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
              className="absolute bottom-[25%] right-[-15px] md:right-[70px]"
              style={{
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                padding: 'clamp(8px, 2vw, 16px) clamp(10px, 2.5vw, 20px)', borderRadius: '12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                zIndex: 10
              }}
            >
              <div className='text-[18px] lg:text-[26px]' style={{ fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                <span ref={(el) => { if (el) statsRef.current[1] = el; }} data-target="3">3</span>+
              </div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', marginTop: 4 }}>Projects</div>
            </motion.div>

          </div>

          {/* Right — content */}
          <div className="about-content">
            <div style={{ marginBottom: 32 }}>
              <span className="label text-[10px] lg:text-[13px]">THE PERSON BEHIND THE CODE</span>
            </div>
            <h2 className="about-title" style={{ margin: '0 0 20px' }}>
              Developer<br />
              by <span style={{ color: 'var(--accent)' }}>craft</span>
            </h2>

            <div className='w-[100%] mb-10' style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {BIO_LINES.map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', paddingBottom: '2px' }}>
                  <div
                    ref={(el) => { if (el) linesRef.current[i] = el; }}
                    className='text-[15px] lg:text-[18px] '
                    style={{
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                      fontWeight: 300,
                      willChange: 'transform'
                    }}
                  >
                    {line}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
