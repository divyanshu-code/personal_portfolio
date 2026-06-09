'use client';

import dynamic from 'next/dynamic';
import Nav      from './components/Nav';
import About    from './components/About';

import Hero   from './components/Hero';

// Cursor, Skills, Projects, and Contact require browser APIs (GSAP/Three.js)
const Cursor   = dynamic(() => import('./components/Cursor'),   { ssr: false });
const Skills   = dynamic(() => import('./components/Skills'),   { ssr: false });
const Projects = dynamic(() => import('./components/Projects'), { ssr: false });
const Contact  = dynamic(() => import('./components/Contact'),  { ssr: false });

export default function Page() {
  return (
    <>
      <Cursor />
      <Nav />

      <main id="main-content">
        <Hero />

        {/* Divider */}
        <div className="h-line" aria-hidden="true" />

        <About />

        <div className="h-line" aria-hidden="true" />

        <Projects />

        <div className="h-line" aria-hidden="true" />

        <Skills />

        <Contact />
      </main>
    </>
  );
}