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

export default function AboutPage() {
  const router = useRouter();
  useReveal();

  const aboutRef = useRef<HTMLElement | null>(null);
  const [par, setPar] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = aboutRef.current;
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
      ["--px" as string]: `${x * 14}px`,
      ["--py" as string]: `${y * 10}px`,
    } as React.CSSProperties;
  }, [par]);

  return (
    <div className="site">
      <WebsiteHeader />

      <main className="main">
        <section
          ref={aboutRef}
          className="aboutBand aboutBand--blueprint"
          style={blobStyle}
        >
          <div className="aboutBandBg" aria-hidden="true">
            <div className="abBlob a1" />
            <div className="abBlob a2" />
            <div className="abBlob a3" />
            <div className="abGrid" />
          </div>

          <div className="container aboutBandInner">
            <div className="aboutHeroBlock" data-reveal>
              <div className="heroBadge">
                <span className="dot" />
                Fabrication • Installation • Site Execution
              </div>

              <h1 className="aboutH1">
                About <span className="gradText">SERVICE INDIA</span>
              </h1>

              <p className="aboutLead">
                SERVICE INDIA provides fabrication, installation, repair,
                maintenance and on-site execution services. We support homes,
                workshops, warehouses and project sites with practical work,
                skilled labour and reliable coordination.
              </p>

              <div className="aboutHeroActions">
                <button
                  type="button"
                  className="btn btnAnim"
                  onClick={() => router.push("/contact")}
                >
                  Send Requirement
                </button>

                <button
                  type="button"
                  className="btnGhost btnGhost--cta"
                  onClick={() => router.push("/")}
                >
                  View Services
                </button>
              </div>
            </div>

            <div className="aboutStats" data-reveal>
              <div className="statBox">
                <div className="statK">Fabrication Work</div>
                <div className="statS">Gates • Grills • Structures</div>
              </div>
              <div className="statBox">
                <div className="statK">Site Execution</div>
                <div className="statS">Installation • fitting • work</div>
              </div>
              <div className="statBox">
                <div className="statK">Repair Support</div>
                <div className="statS">Maintenance • modification</div>
              </div>
              <div className="statBox">
                <div className="statK">Custom Jobs</div>
                <div className="statS">As per site requirement</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <section className="aboutSection" data-reveal>
            <div className="sectionHead">
              <h2 className="h2">Company Overview</h2>
              <p className="sub">
                We work as a practical execution partner for fabrication and
                construction-related jobs — focused on proper work, timely
                completion and clear coordination.
              </p>
            </div>

            <div className="aboutTwoCol">
              <div className="aboutCardX">
                <h3 className="aboutH3">What we do</h3>
                <p className="aboutP">
                  SERVICE INDIA handles gate fabrication, grills, ladders,
                  metal structures, wall painting, and basic construction work.
                  We also provide labour support for on-site execution.
                </p>
                <p className="aboutP">
                  Work is carried out as per drawing, size, site condition and
                  requirement — whether small job or full project support.
                </p>
              </div>

              <div className="aboutCardX">
                <h3 className="aboutH3">Our working approach</h3>

                <div className="timeline">
                  <div className="tlItem">
                    <div className="tlDot" />
                    <div>
                      <div className="tlTitle">Understanding requirement</div>
                      <div className="tlSub">
                        Work is understood based on site condition, size and need.
                      </div>
                    </div>
                  </div>

                  <div className="tlItem">
                    <div className="tlDot" />
                    <div>
                      <div className="tlTitle">Planning</div>
                      <div className="tlSub">
                        Execution method, manpower and work flow decided practically.
                      </div>
                    </div>
                  </div>

                  <div className="tlItem">
                    <div className="tlDot" />
                    <div>
                      <div className="tlTitle">Execution</div>
                      <div className="tlSub">
                        Fabrication, installation or labour work completed properly.
                      </div>
                    </div>
                  </div>

                  <div className="tlItem">
                    <div className="tlDot" />
                    <div>
                      <div className="tlTitle">Completion</div>
                      <div className="tlSub">
                        Work delivered with coordination and follow-up if needed.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="aboutSection" data-reveal>
            <div className="sectionHead">
              <h2 className="h2">Why clients choose us?</h2>
              <p className="sub">
                We focus on actual work execution, not just basic labour supply.
              </p>
            </div>

            <div className="aboutGrid3">
              {[
                {
                  t: "Requirement understanding",
                  s: "Work is planned based on actual site condition and need.",
                },
                {
                  t: "Practical execution",
                  s: "Fabrication and work is done as per real usage requirement.",
                },
                {
                  t: "Flexible work type",
                  s: "Small jobs, repairs or full project work handled.",
                },
                {
                  t: "Labour support",
                  s: "Skilled and general labour available for site work.",
                },
                {
                  t: "Repair & modification",
                  s: "Old structures can be repaired or modified.",
                },
                {
                  t: "Clear communication",
                  s: "Simple and direct discussion throughout the work.",
                },
              ].map((x, i) => (
                <div className="whyCard" data-reveal key={i}>
                  <div className="whyTop">
                    <span className="whyDot" />
                    <div className="whyTitle">{x.t}</div>
                  </div>
                  <div className="whySub">{x.s}</div>
                  <div className="whyBar" />
                </div>
              ))}
            </div>
          </section>

          <section className="ctaBand" data-reveal>
            <div className="ctaLeft">
              <h2 className="ctaTitle">
                Need fabrication or site work?
              </h2>
              <p className="ctaSub">
                Share your requirement and SERVICE INDIA will connect with you.
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
                onClick={() => router.push("/")}
              >
                Back to Home
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