'use client';
import { useEffect, useRef, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Persist & apply theme
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    if (next === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', next);
    setIsDark(!isDark);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header ref={navRef} className={`nav ${scrolled ? 'scrolled' : ''}`} role="banner">
        <a href="#" className="nav-logo" id="nav-logo">
          DB<span>.</span>
        </a>

        <nav className="flex items-center justify-center gap-6" aria-label="Primary navigation">
          {/* Desktop links */}
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} id={`nav-link-${l.label.toLowerCase()}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme Toggle (Desktop) */}
          <button
            className="theme-toggle desktop-only"
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {/* Sun icon */}
            <svg className="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            {/* Moon icon */}
            <svg className="icon-moon" width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>

          {/* Hamburger / Close — mobile only */}
          <button
            className="hamburger md:hidden"
            id="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{ zIndex: 1000 }}
          >
            {menuOpen ? (
              <IoClose size={24} color="var(--text-primary)" />
            ) : (
              <RxHamburgerMenu size={22} color="var(--text-primary)" />
            )}
          </button>
        </nav>
      </header>

      {/* Backdrop (click to close) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Nav Drawer (Half Screen) */}
      <div
        className={`fixed top-0 right-0 h-full w-[60vw] max-w-xs bg-[var(--base)] z-50 flex flex-col p-6 shadow-2xl transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{ borderLeft: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
          <span className="font-[var(--font-display)] text-xl font-bold">
            Menu<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
        </div>

        <ul className="flex flex-col gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={closeMenu}
                className="font-[var(--font-body)] text-[16px] text-[var(--text-secondary)] font-light hover:text-[var(--accent)] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme Toggle inside Sidebar */}
        <div className="mt-auto pt-6 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-sm font-semibold tracking-widest uppercase text-[var(--text-muted)]">
            Theme
          </span>
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'var(--accent-dim)',
              border: '1px solid var(--border-lit)',
              borderRadius: '50%',
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent)',
            }}
          >
            {isDark
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>
        </div>
      </div>
    </>
  );
}
