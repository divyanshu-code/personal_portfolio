'use client';
import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Billboard } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const SKILLS = [
  // Frontend
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'React.js', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'GSAP', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },
  { name: 'Three.js', category: 'Frontend' },

  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },

  // Databases
  { name: 'MongoDB', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'Pinecone', category: 'Database' },
  { name: 'Redis', category: 'Database' },

  // AI & ML
  { name: 'RAG Systems', category: 'AI & ML' },
  { name: 'LLM Integration', category: 'AI & ML' },
  { name: 'Scikit-learn', category: 'AI & ML' },
  { name: 'XGBoost', category: 'AI & ML' },
  { name: 'SHAP', category: 'AI & ML' },
  { name: 'Pandas', category: 'AI & ML' },
  { name: 'NumPy', category: 'AI & ML' },
  { name: 'Streamlit', category: 'AI & ML' },

  // Tools
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'Vercel', category: 'Tools' },
  { name: 'Postman', category: 'Tools' },
  { name: 'GitHub Actions', category: 'Tools' },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Tools' , 'AI & ML'];

// 3D Globe Component
function Globe({ activeCategory }) {
  const groupRef = useRef();

  const displaySkills = activeCategory === 'All' ? SKILLS : SKILLS.filter(s => s.category === activeCategory);

  // Fibonacci sphere distribution for points
  const points = useMemo(() => {
    const pts = [];
    const n = displaySkills.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < n; i++) {
      const y = n > 1 ? 1 - (i / (n - 1)) * 2 : 0;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      pts.push([x * 5, y * 5, z * 5]);
    }
    return pts;
  }, [displaySkills]);

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial
          color="#00f5d4"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {displaySkills.map((skill, i) => (
        <Billboard key={skill.name} position={points[i]}>
          <Text
            fontSize={0.65}
            color={activeCategory === 'All' || skill.category === activeCategory ? '#00f5d4' : '#44445a'}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.04}
            outlineColor="#0a0a0f"
          >
            {skill.name}
          </Text>
        </Billboard>
      ))}
    </group>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);

  const filteredSkills = activeCategory === 'All' ? SKILLS : SKILLS.filter(s => s.category === activeCategory);

  // GSAP Ticker-based Marquee
  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    const marqueeContent = marqueeInnerRef.current;
    if (!marqueeContainer || !marqueeContent) return;

    // Clone the inner content for a seamless loop
    const clone = marqueeContent.cloneNode(true);
    marqueeContainer.appendChild(clone);

    let xPos = 0;
    const speed = 1.0;

    const tick = () => {
      xPos -= speed;
      // When the original content is completely out of view, reset
      if (Math.abs(xPos) >= marqueeContent.offsetWidth) {
        xPos = 0;
      }
      gsap.set([marqueeContent, clone], { x: xPos });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      if (marqueeContainer.contains(clone)) {
        marqueeContainer.removeChild(clone);
      }
    };
  }, []);

  return (
    <section id="skills" className="section" style={{ overflow: 'hidden' }}>

      {/* GSAP Ticker Marquee */}
      <div className="skills-marquee-wrap reveal visible" style={{ borderBottom: 'none', marginBottom: '40px' }}>
        <div
          ref={marqueeRef}
          style={{ display: 'flex', whiteSpace: 'nowrap', width: '100%', overflow: 'hidden' }}
          aria-hidden="true"
        >
          <div ref={marqueeInnerRef} style={{ display: 'flex', gap: '48px', paddingRight: '48px' }}>
            {SKILLS.map((s, i) => (
              <span key={i} className="skills-marquee-item">
                <span className="skills-marquee-dot" />
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="section-inner" style={{ paddingTop: '20px' }}>
        <div style={{ marginBottom: 40 }}>
          <span className="label reveal visible">— Expertise</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

          <div className="reveal visible" style={{ height: '500px', width: '80%', position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at center, rgba(0,245,212,0.08) 0%, transparent 60%)',
              pointerEvents: 'none'
            }} />
            <Canvas camera={{ position: [0, 0, 12], fov: 60 }} gl={{ alpha: true }}>
              <ambientLight intensity={1} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.5} />
              <Suspense fallback={null}>
                <Globe activeCategory={activeCategory} />
              </Suspense>
            </Canvas>
          </div>

          <div>
            <h2 className="display-md reveal visible" style={{ color: 'var(--text-primary)', marginBottom: 32 }}>
              My<br /><span style={{ color: 'var(--accent)' }}>toolkit</span>
            </h2>

            {/* Category Pills */}
            <div className="reveal visible" style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 24px',
                    borderRadius: '100px',
                    border: '1px solid',
                    borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border-lit)',
                    background: activeCategory === cat ? 'var(--accent-dim)' : 'transparent',
                    color: activeCategory === cat ? 'var(--accent)' : 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s var(--ease-out-expo)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Framer Motion Filtered Grid */}
            <motion.div layout style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <AnimatePresence mode="popLayout">
                {filteredSkills.map(skill => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
                    style={{
                      padding: '12px 24px',
                      background: 'var(--base-2)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500
                    }}
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Responsive overrides via inline style block for this grid specifically */}
      <style>{`
        @media (max-width: 1024px) {
          #skills .section-inner > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
