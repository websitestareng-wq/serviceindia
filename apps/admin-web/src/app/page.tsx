"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function HomePage() {
  const router = useRouter();
  useReveal();

  const heroRef = useRef<HTMLElement | null>(null);
  const [par, setPar] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      setPar({ x: dx, y: dy });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const blobStyle = useMemo(() => {
    const x = Math.max(-1, Math.min(1, par.x));
    const y = Math.max(-1, Math.min(1, par.y));

    return {
      ["--px" as string]: `${x * 16}px`,
      ["--py" as string]: `${y * 12}px`,
    } as React.CSSProperties;
  }, [par]);

  return (
    <div className="site">
      <WebsiteHeader />

      <main className="main">
        <section ref={heroRef} className="heroFull" style={blobStyle}>
          <div className="heroBg" aria-hidden="true">
            <div className="heroBlob b1" />
            <div className="heroBlob b2" />
            <div className="heroBlob b3" />
            <div className="heroGrid" />
          </div>

          <div className="container heroFullInner">
            <div className="heroFullGrid">
              <div className="heroLeft" data-reveal>
                <div className="heroBadge">
                  <span className="dot" />
                  Trusted Fabrication & Construction Service Partner
                </div>

                <h1 className="heroTitle">
                  Professional <span className="gradText">Fabrication • Civil Work • Site Support</span>
                  <br />
                  Solutions for Residential and Commercial Projects
                </h1>

                <p className="heroLead">
                  SERVICE INDIA delivers reliable fabrication and on-site execution
                  services including gates, grills, ladders, wall painting,
                  labour support, and building construction work with practical
                  planning, timely coordination, and dependable workmanship.
                </p>

                <div className="heroCtas">
                  <button
                    type="button"
                    className="btn btnAnim"
                    onClick={() => router.push("/contact")}
                  >
                    Request Service
                  </button>

                  <button
                    type="button"
                    className="btnGhost heroGhost"
                    onClick={() => router.push("/about")}
                  >
                    Know More
                  </button>
                </div>
              </div>

              <div className="heroRight" data-reveal>
                <div className="heroPanel">
                  <div className="panelHead">
                    <div className="panelTitle">What we do</div>
                    <div className="panelSub">Practical on-site service categories</div>
                  </div>

                  <div className="pillGrid">
                    <div className="pill">Gate Fabrication Work</div>
                    <div className="pill">Grill Design & Installation</div>
                    <div className="pill">Ladder Fabrication</div>
                    <div className="pill">Wall Painting Services</div>
                    <div className="pill">Building Construction Work</div>
                    <div className="pill">Site Labour Support</div>
                    <div className="pill">Repair & Maintenance Jobs</div>
                    <div className="pill">Custom Project Work</div>
                  </div>

                  <div className="panelFoot">
                    <div className="muted">Need work as per site requirement?</div>
                    <button
                      type="button"
                      className="btnLink"
                      onClick={() => router.push("/contact")}
                    >
                      Talk to Us →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <section className="trustStrip trustStrip--underHero" data-reveal>
              <div className="trustItem">
                <div className="trustBig">Execution</div>
                <div className="muted">Practical site work support</div>
              </div>
              <div className="trustItem">
                <div className="trustBig">Fabrication</div>
                <div className="muted">Custom metal work solutions</div>
              </div>
              <div className="trustItem">
                <div className="trustBig">Labour</div>
                <div className="muted">Reliable manpower assistance</div>
              </div>
              <div className="trustItem">
                <div className="trustBig">Commitment</div>
                <div className="muted">Clear communication and delivery</div>
              </div>
            </section>
          </div>
        </section>

        <div className="container">
          <section className="section">
            <div className="sectionHead" data-reveal>
              <h2 className="h2">Services We Handle</h2>
              <p className="sub">
                We support homes, commercial spaces, renovation sites and project-based work with dependable execution.
              </p>
            </div>

            <div className="tiles">
              {[
                {
                  t: "Gate & Grill Fabrication",
                  s: "Custom fabrication, fitting and finishing work for residential and commercial needs.",
                },
                {
                  t: "Ladder & Metal Structure Work",
                  s: "Practical fabrication for ladders and utility metal structures.",
                },
                {
                  t: "Wall Painting Services",
                  s: "Neat painting work for fresh sites, repairs and renovation jobs.",
                },
                {
                  t: "Building Construction Support",
                  s: "Execution support for selected construction and site-based requirements.",
                },
                {
                  t: "Skilled & General Labour",
                  s: "On-site manpower support for fabrication, fitting and related tasks.",
                },
                {
                  t: "Custom Site Requirement",
                  s: "Work handled as per client requirement, drawing, size and job condition.",
                },
              ].map((x, i) => (
                <div className="tile" data-reveal key={i}>
                  <div className="tileTitle">{x.t}</div>
                  <div className="tileSub">{x.s}</div>
                  <div className="tileLine" />
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="sectionHead" data-reveal>
              <h2 className="h2">Simple and Reliable Work Process</h2>
              <p className="sub">
                Clear discussion, site understanding and proper execution from requirement to completion.
              </p>
            </div>

            <div className="steps">
              {[
                {
                  n: "01",
                  t: "Share your requirement",
                  s: "Tell us the work type, size, location, quantity or site condition.",
                },
                {
                  n: "02",
                  t: "Inspection & discussion",
                  s: "We understand scope, measurements and expected work output.",
                },
                {
                  n: "03",
                  t: "Execution starts",
                  s: "Fabrication, labour, painting or site work is carried out properly.",
                },
                {
                  n: "04",
                  t: "Completion & support",
                  s: "Work is completed with coordination and follow-up where needed.",
                },
              ].map((x, i) => (
                <div className="step" data-reveal key={i}>
                  <div className="stepNo">{x.n}</div>
                  <div className="stepTitle">{x.t}</div>
                  <div className="stepSub">{x.s}</div>
                  <div className="stepGlow" aria-hidden="true" />
                </div>
              ))}
            </div>
          </section>

          <section className="ctaBand" data-reveal>
            <div className="ctaLeft">
              <h2 className="ctaTitle">
                Planning a fabrication or site work requirement?
              </h2>
              <p className="ctaSub">
                Share your job details and SERVICE INDIA will connect with you for discussion and execution support.
              </p>
            </div>

            <div className="ctaRight">
              <button
                type="button"
                className="btn btnAnim"
                onClick={() => router.push("/contact")}
              >
                Contact Now
              </button>

              <button
                type="button"
                className="btnGhost btnGhost--cta"
                onClick={() => router.push("/about")}
              >
                View Company Profile
              </button>
            </div>
          </section>

          <div style={{ height: 18 }} />
        </div>
      </main>

      <WebsiteFooter />
    </div>
  );
}