'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let mouseX = -100, mouseY = -100;
    let outerX = -100, outerY = -100;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Inner follows exactly
      inner.style.left = mouseX + 'px';
      inner.style.top  = mouseY + 'px';
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      outerX = lerp(outerX, mouseX, 0.1);
      outerY = lerp(outerY, mouseY, 0.1);
      outer.style.left = outerX + 'px';
      outer.style.top  = outerY + 'px';
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMouseMove);

    // Magnetic hover detection
    const magneticEls = () =>
      document.querySelectorAll('a, button, .about-tag, .contact-social-btn, .skill-cell');

    let currentTarget = null;

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .about-tag, .contact-social-btn, .skill-cell');
      if (target) {
        outer.classList.add('hovering');
        inner.classList.add('hovering');
        currentTarget = target;

        // Magnetic pull — subtle shift toward center of element
        const moveMag = (ev) => {
          const rect = target.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (ev.clientX - cx) * 0.15;
          const dy = (ev.clientY - cy) * 0.15;
          target.style.transform = `translate(${dx}px, ${dy}px)`;
        };
        target.addEventListener('mousemove', moveMag);
        target._moveMag = moveMag;
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, .about-tag, .contact-social-btn, .skill-cell');
      if (target) {
        outer.classList.remove('hovering');
        inner.classList.remove('hovering');
        target.style.transform = '';
        if (target._moveMag) {
          target.removeEventListener('mousemove', target._moveMag);
          target._moveMag = null;
        }
        currentTarget = null;
      }
    };

    const handleMouseDown = () => outer.classList.add('clicking');
    const handleMouseUp   = () => outer.classList.remove('clicking');

    document.addEventListener('mouseover',  handleMouseOver);
    document.addEventListener('mouseout',   handleMouseOut);
    document.addEventListener('mousedown',  handleMouseDown);
    document.addEventListener('mouseup',    handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover',  handleMouseOver);
      document.removeEventListener('mouseout',   handleMouseOut);
      document.removeEventListener('mousedown',  handleMouseDown);
      document.removeEventListener('mouseup',    handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor-outer" aria-hidden="true" />
      <div ref={innerRef} className="cursor-inner" aria-hidden="true" />
    </>
  );
}
