"use client";

import { useEffect, useState, useMemo } from "react";

export default function Page() {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onShare = async () => {
    try {
      const url = window.location.href;
      if (navigator.share) {
        await navigator.share({ title: document.title, text: "An inspirational story.", url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // ignore
    }
  };

  const paragraphs = useMemo(() => [
    "In a crowded city wrapped in noise and hurry, lived a 15-year-old girl named Tara. She was quiet, gentle, and full of dreams? but life didn?t treat her gently.",
    "Her father had passed away when she was young. Her mother worked long, tiring hours as a maid. Sometimes Tara ate only once a day, but she never complained.",
    "Despite everything, Tara had a strange gift: She could see hope where others saw darkness. Every morning, before going to school, she stood on the rooftop of her small broken house and watched the sunrise. She called it ?sending sunlight to my heart.?",
    "But at school, things were different. Her uniform was old, her shoes were torn, and other students made fun of her. ?Poor girl with poor dreams,? they laughed. Tara kept quiet. She hid her tears until she got home.",
    "One day, a competition was announced: A sch?"
  ], []);

  return (
    <div className="page-root">
      <div className="progress" style={{ width: `${progress}%` }} />

      <header className="hero">
        <div className="hero-inner">
          <h1>?? The Girl Who Held the Sunlight</h1>
          <p className="tag">A short, heartfelt tale of courage and light.</p>
        </div>
      </header>

      <main className="container">
        <article className="story">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </article>
      </main>

      <button className="share" onClick={onShare} aria-label="Share this story">
        {copied ? "Copied" : "Share"}
      </button>

      <footer className="footer">
        <p>Made with love and sunlight.</p>
      </footer>
    </div>
  );
}
