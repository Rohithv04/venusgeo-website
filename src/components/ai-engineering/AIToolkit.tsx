import React, { useEffect, useRef } from 'react';
import { Cpu, Terminal, FileCode, Wrench, Layers } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/animations';

interface TechCategory {
  title: string;
  icon: React.ElementType;
  description: string;
  technologies: string[];
}

export const AIToolkit: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const categories: TechCategory[] = [
    {
      title: 'AI PLATFORMS',
      icon: Cpu,
      description: 'Foundational model backbones, proprietary weights & enterprise cloud instances',
      technologies: ['Azure OpenAI', 'Gemini', 'Vertex AI', 'Hugging Face']
    },
    {
      title: 'AI APPLICATION LAYER',
      icon: Terminal,
      description: 'High-concurrency model routing, vector indexers & semantic orchestration',
      technologies: ['Python', 'FastAPI', 'LangChain', 'Vector search']
    },
    {
      title: 'DOCUMENT AI',
      icon: FileCode,
      description: 'Deep optical recognition, coordinate boundary parsing & tabular extractors',
      technologies: ['ABBYY', 'Azure AI Document Intelligence']
    },
    {
      title: 'AI-ASSISTED DEVELOPMENT',
      icon: Wrench,
      description: 'Next-generation agentic programming, spec compilation & review tooling',
      technologies: ['Claude Code', 'Cursor', 'Kiro', 'GitHub Copilot', 'BMAD']
    },
    {
      title: 'ENTERPRISE ENGINEERING',
      icon: Layers,
      description: 'Battle-tested backends, scalable datastores & mission-critical infrastructures',
      technologies: ['Java', '.NET', 'React', 'TypeScript', 'PostgreSQL', 'AWS', 'Azure', 'SharePoint']
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.toolkit-card', {
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="toolkit" ref={sectionRef} className="section ai-toolkit-section" aria-label="Technology Toolkit">
      <div className="container">
        {/* Section Header */}
        <div className="toolkit-header">
          <div className="eyebrow">TECHNOLOGY TOOLKIT</div>
          <h2 className="section-heading toolkit-heading">
            We choose the technology around your problem,<br />
            <span className="text-red">not the other way around.</span>
          </h2>
          <p className="toolkit-copy">
            We avoid vendor lock-in and dogmatic stacks. Every model, framework, database, and
            deployment target is chosen strictly to satisfy your operational constraints, governance,
            latency, and security boundaries.
          </p>
        </div>

        {/* 5 Clean Categories with Thin Dividers and Refined Tags */}
        <div ref={categoriesRef} className="toolkit-cards-list">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="toolkit-card card-panel">
                <div className="cat-header-col">
                  <div className="icon-red-outline">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="cat-title">{cat.title}</h3>
                    <p className="cat-desc">{cat.description}</p>
                  </div>
                </div>

                <div className="cat-tech-pills">
                  {cat.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .ai-toolkit-section {
          background-color: var(--surface-soft);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }

        .toolkit-header {
          max-width: 760px;
          margin-bottom: 48px;
        }

        .toolkit-heading {
          font-size: var(--font-section-heading);
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .toolkit-copy {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        .toolkit-cards-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .toolkit-card {
          padding: 24px 28px;
          background-color: var(--surface-white);
          border: 1px solid var(--border-card);
          border-radius: var(--panel-radius);
          display: grid;
          grid-template-columns: 1.2fr 1.8fr;
          gap: 24px;
          align-items: center;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }

        .toolkit-card:hover {
          border-color: #d1d1d8;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        .cat-header-col {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cat-title {
          font-size: 1.0625rem;
          font-weight: 700;
          letter-spacing: var(--tracking-title);
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .cat-desc {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .cat-tech-pills {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tech-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.8125rem;
          font-weight: 600;
          padding: 6px 14px;
          background-color: var(--surface-soft);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          color: var(--text-primary);
          transition: background-color 140ms ease, border-color 140ms ease;
        }

        .tech-badge:hover {
          background-color: #ffffff;
          border-color: var(--brand-red);
          color: var(--brand-red);
        }

        @media (max-width: 992px) {
          .toolkit-card {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 20px;
          }
        }

        @media (max-width: 640px) {
          .toolkit-header {
            margin-bottom: 28px;
          }
          .toolkit-copy {
            font-size: 0.95rem;
            line-height: 1.55;
          }
          .toolkit-card {
            padding: 18px 16px;
            gap: 14px;
          }
          .cat-header-col {
            gap: 12px;
          }
          .cat-title {
            font-size: 0.95rem;
          }
          .cat-desc {
            font-size: 0.75rem;
          }
          .cat-tech-pills {
            gap: 6px;
          }
          .tech-badge {
            font-size: 0.75rem;
            padding: 5px 10px;
          }
        }
      `}</style>
    </section>
  );
};
