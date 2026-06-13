'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// const PROJECTS = [

//   {
//     num: '01',
//     title: 'NebulaOS',
//     desc: 'A browser-based operating system shell with real-time file management, terminal emulation, and a plugin marketplace.',
//     tags: ['React', 'WebSockets', 'Node.js', 'Redis'],
//     color: '#00f5d4',
//     href: '#',
//     gradient: 'linear-gradient(135deg, #0a1628 0%, #0d2b3e 50%, #0a1e2e 100%)',
//     details: 'NebulaOS redefines the browser experience by bringing a full-fledged OS environment to the web. Built with React and Node.js, it supports a window manager, virtual file system, and a marketplace for installing web-apps as native-feeling windows.',
//   },
//   {
//     num: '02',
//     title: 'Prism CMS',
//     desc: 'Headless CMS with AI-assisted content generation, real-time collaboration, and multi-channel publishing.',
//     tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'OpenAI'],
//     color: '#00f5d4',
//     href: '#',
//     gradient: 'linear-gradient(135deg, #12100a 0%, #2a1f0d 50%, #1a1505 100%)',
//     details: 'Prism CMS is a modern headless content management system that integrates deeply with OpenAI to assist writers with generation and optimization. Features a collaborative editor similar to Notion.',
//   },
//   {
//     num: '03',
//     title: 'Flux Analytics',
//     desc: 'Real-time analytics dashboard processing 10M+ events/day with live heatmaps, funnels, and cohort analysis.',
//     tags: ['Python', 'ClickHouse', 'D3.js', 'FastAPI'],
//     color: '#00f5d4',
//     href: '#',
//     gradient: 'linear-gradient(135deg, #0e0a1a 0%, #1a0d2e 50%, #120a20 100%)',
//     details: 'A blazing fast analytics dashboard powered by ClickHouse and FastAPI. It processes millions of events per day and visualizes them using custom D3.js charts for live heatmaps and cohort analysis.',
//   },
//   {
//     num: '04',
//     title: 'Terrarium',
//     desc: 'Multiplayer 3D world builder with procedural terrain generation and WebRTC voice chat.',
//     tags: ['Three.js', 'WebRTC', 'Rust', 'WASM'],
//     color: '#00f5d4',
//     href: '#',
//     gradient: 'linear-gradient(135deg, #0a1a0f 0%, #0d2e1a 50%, #0a1f13 100%)',
//     details: 'Terrarium brings multiplayer terrain editing to the browser using Three.js and a Rust/WASM physics engine. Users can shape the world collaboratively while talking via WebRTC voice channels.',
//   },
//   {
//     num: '05',
//     title: 'Vaultify',
//     desc: 'End-to-end encrypted password manager with biometric auth, breach monitoring, and team vaults.',
//     tags: ['React Native', 'Golang', 'AES-256', 'HaveIBeenPwned'],
//     color: '#00f5d4',
//     href: '#',
//     gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2e0d0d 50%, #200a0a 100%)',
//     details: 'A secure, end-to-end encrypted password manager. The Golang backend acts as a zero-knowledge sync server, while the React Native app uses native biometric APIs for seamless unlocking.',
//   },
// ];

// Mini Three.js preview for hovered card

const PROJECTS = [
  {
    num: '01',
    title: 'ImpactSenseAI',
    desc: 'A predictive model that can find the impact of earthquakes. This can help in early disaster planning , emergency response , and awerness campaigns.',
    tags: ['Python', 'Scikit-learn', 'XGBoost', 'Streamlit', 'Jupyter'],
    color: '#00f5d4',
    github: 'https://github.com/divyanshu-code/ImpactSense',
    live: 'https://impactsense-ai.streamlit.app/',
    image: '/ImpactSenseAi.png',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #0d2b3e 50%, #0a1e2e 100%)',
    details: 'Built an earthquake impact prediction system using XGBoost and Random Forest classifiers on geophysical data — achieving 75% F1-score on risk zone classification. Deployed as an interactive Streamlit dashboard for real-time disaster response visualization.',
  },
  {
    num: '02',
    title: 'FuelFit',
    desc: 'FuelFit is a full stack app where user can track their meal and lifestyle based on their fitness goals . Fuelfit gives a meal suggestion based on user preferences, also provide a nutrition and calorie tracking.',
    tags: ['MERN', 'GSAP', 'TailwindCSS', 'lucide-react'],
    color: '#00f5d4',
    github: 'https://github.com/divyanshu-code/FuelFit',
    live: 'https://fuel-fit.onrender.com/',
    image: '/FuelFit.png',
    gradient: 'linear-gradient(135deg, #12100a 0%, #2a1f0d 50%, #1a1505 100%)',
    details: 'A personalized meal-planning platform generating diet recommendations across fitness goals, dietary preferences, and activity level. Built with MERN stack, featuring JWT authentication and a GSAP-animated dashboard achieving 90+ Lighthouse performance score.',
  },
  {
    num: '03',
    title: 'Jodo.Ai',
    desc: 'Jodo.AI is an advanced, responsive AI-powered personal assistant that combines Retrieval-Augmented Generation (RAG) with dynamic Tool Calling (real-time web search) and streams answers using Server-Sent Events (SSE).',
    tags: ['React.js', 'Node.js', 'Express.js', 'TailwindCSS', 'Groq API', 'RAG', 'Pinecone', 'Redis'],
    color: '#00f5d4',
    github: 'https://github.com/divyanshu-code/Jodo.AI',
    live: 'https://jodo-ai.vercel.app/',
    image: '/jodo.png',
    gradient: 'linear-gradient(135deg, #0e0a1a 0%, #1a0d2e 50%, #120a20 100%)',
    details: 'A production RAG-based knowledge assistant with Hybrid Search (BM25 + Vector Search merged via RRF), Cohere reranking, Redis caching, and real-time streaming via SSE. Powered by Groq LLM with Tavily web search fallback for queries beyond document context.',
  },
  {
    num: '04',
    title: 'Food Paradise',
    desc: 'A full-stack restaurant ordering platform with customer UI, admin panel, and JWT-secured order management — built and deployed end-to-end in under 10 weeks. Currently used in production by a live business.',
    tags: ['React.js', 'Node.js', 'Express.js', 'TailwindCSS', 'MongoDB', 'GSAP', 'Multer', 'React Toastify'],
    color: '#00f5d4',
    github: 'https://github.com/divyanshu-code/Food_Paradise',
    live: 'https://food-paradise-front-end.onrender.com/',
    image: '/Food Paradise.png',
    gradient: 'linear-gradient(135deg, #0a1a0f 0%, #0d2e1a 50%, #0a1f13 100%)',
    details: 'Food Paradise is a full-stack web app that lets customers browse food items, add them to a cart, and place orders. Administrators can add, update, and remove menu items and manage orders.',
  },
];


export default function Projects() {
  const sectionRef = useRef(null);
  const trackWrapperRef = useRef(null);
  const trackRef = useRef(null);

  const [hoveredId, setHoveredId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  useEffect(() => {
    // Reveal animation for static headers
    const els = sectionRef.current?.querySelectorAll('.reveal') ?? [];
    const io = new IntersectionObserver(
      (e) => e.forEach((en) => { if (en.isIntersecting) en.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));

    // GSAP Horizontal Scroll Pinning
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const trackWrapper = trackWrapperRef.current;

      if (!track || !trackWrapper) return;

      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        let paddingOffset = window.innerWidth < 768 ? 40 : 96;
        return -(trackWidth - window.innerWidth + paddingOffset);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none'
      });

      ScrollTrigger.create({
        trigger: trackWrapper,
        start: 'top 10%', // Pin a bit down to leave room for the header
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

    }, sectionRef);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="pt-[80px] md:pt-[120px] relative bg-[var(--base-2)] border-t border-[var(--border)]"
        aria-label="Projects"
      >
        <div className="px-5 md:px-12">
          <div className="projects-header reveal flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-2 md:gap-0">
            <div>
              <span className="label mb-2 block text-[12px] lg:text-[15px]"> — Selected Work</span>
              <h2 className="display-md text-[var(--text-primary)] m-0">
                Things I've<br />
                <span style={{ color: 'var(--accent)' }}>built</span>
              </h2>
            </div>
            <div className="projects-count absolute right-0 top-20 text-[50px] lg:text-[90px]" aria-hidden="true">0{PROJECTS.length}</div>
          </div>
          <p className="reveal text-[var(--text-muted)] text-[11px] md:text-[13px] tracking-[0.1em] mb-8 md:mb-12 uppercase">
            ← scroll to explore →
          </p>
        </div>

        {/* Horizontal track wrapper pinned by GSAP */}
        <div ref={trackWrapperRef} className="w-full overflow-hidden pb-[60px] md:pb-[100px]">
          <div
            ref={trackRef}
            className="flex gap-5 md:gap-10 px-5 md:px-12 w-max will-change-transform"
          >
            {PROJECTS.map((p) => {
              const isHovered = hoveredId === p.num;
              const isSiblingHovered = hoveredId !== null && hoveredId !== p.num;

              return (
                <motion.article
                  key={p.num}
                  className="project-card w-[70vw] sm:w-[280px] md:w-[480px] shrink-0 relative"
                  animate={{
                    opacity: isSiblingHovered ? 0.3 : 1
                  }}
                  onHoverStart={() => setHoveredId(p.num)}
                  onHoverEnd={() => setHoveredId(null)}
                >
                  {/* Card Visual — Project Screenshot */}
                  <div
                    className="project-card-img rounded-2xl overflow-hidden relative cursor-pointer h-[200px] lg:h-[250px]"
                    style={{ background: p.gradient }}
                    onClick={() => setSelectedProject(p)}
                  >
                    {/* Screenshot */}
                    <img
                      src={p.image}
                      alt={`${p.title} screenshot`}
                      className="absolute inset-0 w-full lg:h-full h-[250px]  object-cover"
                    />

                    {/* Gradient overlay so bottom text stays readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.65)] via-[rgba(0, 0, 0, 0.12)] to-transparent pointer-events-none" />

                    {/* Project number watermark */}
                    <span className="watermark absolute bottom-4 right-6 font-display text-[60px] md:text-[80px] font-extrabold text-[rgba(255,255,255,0.18)] leading-none pointer-events-none ">
                      {p.num}
                    </span>

                    {/* Accent hover glow ring */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none transition-shadow duration-300"
                      style={{ boxShadow: isHovered ? `inset 0 0 0 1px ${p.color}55` : 'none' }}
                    />
                  </div>

                  <div className="px-5 mt-2 md:mt-4">
                    <div className="project-card-num text-[var(--accent)] text-[12px] md:text-[13px] font-bold mb-2">{p.num}</div>
                    <h3 className="project-card-title font-display lg:text-[25px] text-[18px] font-bold text-[var(--text-primary)] mb-2 md:mb-3">{p.title}</h3>
                    <p className="project-card-desc text-[var(--text-secondary)] leading-[1.6] mb-4 md:mb-5 text-[13px] lg:text-[15px] line-clamp-4 md:line-clamp-none">{p.desc}</p>
                    <div className="project-card-tags flex gap-2 flex-wrap mb-6">
                      {p.tags.map((t) => (
                        <span key={t} className="project-tag px-3 py-1 bg-[rgba(255,255,255,0.03)] border border-[var(--border)] rounded-full text-[11px] md:text-[12px] text-[var(--text-muted)]">{t}</span>
                      ))}
                    </div>
                    <button
                      className="project-card-link bg-transparent border-none text-[var(--text-primary)] flex items-center gap-2 text-[10px]  font-semibold cursor-pointer p-0"
                      onClick={() => setSelectedProject(p)}
                    >
                      View details
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fullscreen Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 md:p-10"
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(10, 10, 15, 0.95)',
              backdropFilter: 'blur(10px)',
              zIndex: 100,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={(e) => {
              // Close if backdrop is clicked
              if (e.target === e.currentTarget) setSelectedProject(null);
            }}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
              style={{
                background: 'var(--base)',
                border: '1px solid var(--border-lit)',
                borderRadius: '24px',
                width: '100%', maxWidth: '900px',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                display: 'flex', flexDirection: 'column',
                boxShadow: '0 24px 64px rgba(0,0,0,0.6)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute', top: '24px', right: '24px',
                  background: 'var(--base-2)', border: '1px solid var(--border)',
                  width: '40px', height: '40px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 10, color: 'var(--text-primary)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Overlay Content */}

              <div className="p-6 md:p-12">
                <div style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Project {selectedProject.num}</div>
                <h2 className="text-[32px] md:text-[48px]" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', lineHeight: 1 }}>{selectedProject.title}</h2>
                <p className="text-[15px] md:text-[18px]" style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '40px' }}>
                  {selectedProject.details}
                </p>

                <div style={{ marginBottom: '48px' }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '16px', marginBottom: '16px', fontWeight: 600 }}>Tech Stack</h4>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {selectedProject.tags.map((t) => (
                      <span key={t} style={{ padding: '8px 16px', background: 'var(--base-2)', border: '1px solid var(--border)', borderRadius: '100px', fontSize: '14px', color: 'var(--text-secondary)' }}>{t}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    View Live Site
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '16px 32px', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '100px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    GitHub Repo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
