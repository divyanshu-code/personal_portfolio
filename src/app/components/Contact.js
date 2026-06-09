'use client';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const [status, setStatus] = useState('idle');        // idle | sending | sent
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal') ?? [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.target;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      setStatus('sent');
      setShowSuccess(true);

      form.reset();
      toast.success("Message sent — I'll be in touch soon!");
    } catch (error) {
      setStatus('error');
      toast.error(error.message || 'Failed to send. Please try again.');
    }
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef} aria-label="Contact" style={{ paddingBottom: 25 }}>
      {/* Background orb */}
      <div style={{
        position: 'absolute', bottom: -200, right: -200,
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,212,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      <div className="contact-inner">
        {/* Left */}
        <div>
          <span className="label reveal" style={{ marginBottom: 24, display: 'block' }}>— Contact</span>
          <h2 className="contact-big reveal reveal-delay-1">
            Let's<br />build<br />
            <span>together.</span>
          </h2>

          <a
            href="mailto:divyanshubisht5734@gmail.com"
            className="contact-email reveal reveal-delay-2"
            id="contact-email-link"
          >
            divyanshubisht5734@gmail.com
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 16L16 4M16 4H8M16 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Social links */}
          <div className="contact-socials reveal reveal-delay-3">
            <a
              href="https://github.com/divyanshu-code"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn"
              id="contact-github"
              aria-label="GitHub"
            >
              {/* GitHub icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/divyanshu-bisht-92b974291/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn"
              id="contact-linkedin"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://x.com/divyanshu_9899"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn"
              id="contact-twitter"
              aria-label="Twitter / X"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right — Form */}
        <form
          className="contact-form reveal reveal-delay-2 "
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
        >
          <div className="form-group ">
            <label htmlFor="contact-name" className="form-label">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              className="form-input"
              placeholder="Your name"
              required
              disabled={status === 'sending' || status === 'sent'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-email" className="form-label">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              className="form-input"
              placeholder="your@email.com"
              required
              disabled={status === 'sending' || status === 'sent'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-message" className="form-label">Message</label>
            <textarea
              id="contact-message"
              name="message"
              className="form-textarea"
              placeholder="Tell me about your project…"
              required
              disabled={status === 'sending' || status === 'sent'}
            />
          </div>

          {status === 'sent' && showSuccess ? (
            <div style={{
              padding: '8px 28px',
              background: 'var(--accent-dim)',
              border: '1px solid var(--border-lit)',
              borderRadius: 4,
              color: 'var(--accent)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}>
              <span>✓ Message delivered!</span>
              <button
                type="button"
                onClick={() => {
                  setShowSuccess(false)
                  setStatus('idle')
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--accent)',
                  cursor: 'pointer',
                  fontSize: 20,
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="btn-primary text-xs"
              id="contact-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
              {status !== 'sending' && (
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          )}
        </form>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: 50,
        paddingTop: 32,
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 12,
          letterSpacing: '0.12em',
          color: 'var(--accent)',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          Built from scratch by Divyanshu Bisht
        </p>
        <p style={{
          fontSize: 10,
          color: 'var(--muted)',
          letterSpacing: '0.08em',
          margin: 0,
        }}>
          © {new Date().getFullYear()} Divyanshu Bisht. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
