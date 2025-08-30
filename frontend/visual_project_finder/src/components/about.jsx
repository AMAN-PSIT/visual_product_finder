import { useEffect } from "react";
import "./about.css";

export default function AboutPage() {
  // Neural background (canvas) + resize cleanup
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      zIndex: "-1",
      pointerEvents: "none",
    });

    document.body.appendChild(canvas);

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // node field
    const N = 32;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 3 + 2,
      p: Math.random() * Math.PI * 2,
    }));

    let raf;
    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // lines
      for (let i = 0; i < N; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < N; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const op = ((120 - dist) / 120) * 0.35;
            ctx.strokeStyle = `rgba(139,92,246,${op})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (let i = 0; i < N; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.p += 0.05;

        if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1;
        if (n.y < 0 || n.y > window.innerHeight) n.vy *= -1;

        const pr = n.r + Math.sin(n.p) * 2;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pr);
        g.addColorStop(0, "rgba(139,92,246,0.85)");
        g.addColorStop(1, "rgba(139,92,246,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };
    step();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);

  // Scroll-in animations
  useEffect(() => {
    const items = document.querySelectorAll("[data-animate]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const techStack = [
    {
      icon: "⚛️",
      title: "Frontend (React)",
      text:
        "Component-driven UI with hooks, predictable state, and smooth interactions.",
      points: ["Reusable Components", "Hooks", "Client-side Routing"],
    },
    {
      icon: "🚀",
      title: "Backend (FastAPI)",
      text:
        "High-performance async API for fast inference calls and search endpoints.",
      points: ["Async I/O", "OpenAPI Docs", "Validation"],
    },
    {
      icon: "🗄️",
      title: "Database (Supabase/Postgres)",
      text:
        "Vector-friendly storage, authentication, and scalable relational layer.",
      points: ["Vectors", "Auth", "Row Level Security"],
    },
    {
      icon: "🧠",
      title: "AI Engine (CLIP)",
      text:
        "Vision-language model for embeddings and semantic similarity search.",
      points: ["Image Embeddings", "Zero-shot", "Cosine Similarity"],
    },
  ];

  const features = [
    {
      icon: "🔍",
      title: "Visual Search",
      text:
        "Upload an image to find visually similar products with neural embeddings.",
    },
    {
      icon: "⚡",
      title: "Realtime Feel",
      text:
        "Async requests + optimized queries keep searches snappy and responsive.",
    },
    {
      icon: "📊",
      title: "Actionable Insights",
      text: "Category hints, confidence scores, and similarity breakdowns.",
    },
    {
      icon: "📈",
      title: "Scalable",
      text: "Designed to scale with vector indices and cloud infra.",
    },
  ];

  const architecture = [
    {
      step: "1",
      title: "Upload",
      text: "User provides an image via the web interface.",
    },
    {
      step: "2",
      title: "Embed",
      text:
        "Backend extracts CLIP embeddings and normalizes vectors for search.",
    },
    {
      step: "3",
      title: "Search",
      text:
        "Vector similarity (cosine) finds nearest neighbors in the index.",
    },
    {
      step: "4",
      title: "Display",
      text:
        "Results rendered with names, categories, and similarity scores.",
    },
  ];

  const workflow = [
    {
      n: 1,
      title: "Upload",
      text: "User selects image and sends to API.",
    },
    {
      n: 2,
      title: "Analyze",
      text: "Model extracts multi-modal embedding.",
    },
    {
      n: 3,
      title: "Match",
      text: "Nearest vectors retrieved from the database.",
    },
    {
      n: 4,
      title: "Present",
      text: "Cards show results with confidence.",
    },
  ];

  return (
    <div className="about-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">
            <span className="grad grad-a">VISUAL</span>
            <span className="grad grad-b">Product Finder</span>
          </h1>
          <p className="hero-sub">
            Revolutionizing product discovery through image-based search
          </p>
        </div>
        <div className="hero-glow" aria-hidden="true" />
      </section>

      {/* TECH STACK */}
      <section className="section">
        <header className="section-head">
          <h2 className="section-title">🛠️ TECH ARSENAL</h2>
          <p className="section-sub">
            The stack powering fast, accurate, visual search
          </p>
        </header>

        <div className="grid grid-2">
          {techStack.map((t, i) => (
            <article
              key={t.title}
              className="card tech-card"
              data-animate="up"
            >
              <div className="icon">{t.icon}</div>
              <h3 className="card-title">{t.title}</h3>
              <p className="card-text">{t.text}</p>
              <ul className="bullets">
                {t.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

    
      

      {/* ARCHITECTURE */}
      <section className="section">
        <header className="section-head">
          <h2 className="section-title">🏗️ ARCHITECTURE</h2>
          <p className="section-sub">
            A clear flow from image to insights
          </p>
        </header>

        <div className="grid grid-4 arch-grid">
          {architecture.map((a) => (
            <article key={a.step} className="card arch-card" data-animate="up">
              <div className="pill">{a.step}</div>
              <h3 className="card-title">{a.title}</h3>
              <p className="card-text">{a.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="section">
        <header className="section-head">
          <h2 className="section-title">🔄 WORKFLOW</h2>
          <p className="section-sub">
            From upload to similar results — step by step
          </p>
        </header>

        <div className="timeline" data-animate="up">
          {workflow.map((w) => (
            <div key={w.n} className="t-item">
              <div className="t-bullet">{w.n}</div>
              <div className="t-body">
                <h4 className="t-title">{w.title}</h4>
                <p className="t-text">{w.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
