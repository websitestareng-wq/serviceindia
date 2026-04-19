"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";

const CTA_TEXT = "Send Requirement →";

const WORK_TYPES = [
  { key: "ALL", label: "All / Not sure" },
  { key: "FABRICATION", label: "Fabrication Work" },
  { key: "INSTALLATION", label: "Installation Work" },
  { key: "ERECTION", label: "Erection / Site Work" },
  { key: "PAINTING", label: "Wall Painting Work" },
  { key: "REPAIR", label: "Repair / Maintenance" },
  { key: "LABOUR", label: "Labour Support" },
  { key: "CUSTOM", label: "Custom Job Work" },
];

const WHATSAPP_NUMBER = "919702485922";
const DEFAULT_SUBJECT = "SERVICE INDIA – Work Requirement Enquiry";

function cleanPhone(v: string) {
  return String(v || "")
    .replace(/[^\d+]/g, "")
    .replace(/^00/, "+")
    .trim();
}

function isValidEmail(v: string) {
  const s = String(v || "").trim();
  if (!s) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function buildEmailBody(payload: {
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  workType: string;
  details: string;
  subject: string;
  preferred: string;
}) {
  const workLabel =
    WORK_TYPES.find((m) => m.key === payload.workType)?.label || payload.workType;

  return [
    `SERVICE INDIA – New Work Requirement`,
    ``,
    `Name: ${payload.name}`,
    `Company: ${payload.company || "-"}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || "-"}`,
    `City / Location: ${payload.city}`,
    `Work Type: ${workLabel}`,
    `Preferred Contact: ${payload.preferred}`,
    `Subject: ${payload.subject || DEFAULT_SUBJECT}`,
    ``,
    `Requirement Details:`,
    `${payload.details}`,
    ``,
    `Kindly review the requirement and share feasibility, execution approach, timeline and quotation.`,
  ].join("\n");
}

function buildWhatsAppMessage(payload: {
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  workType: string;
  details: string;
  subject: string;
  preferred: string;
}) {
  const workLabel =
    WORK_TYPES.find((m) => m.key === payload.workType)?.label || payload.workType;

  return [
    `*SERVICE INDIA – New Work Requirement*`,
    ``,
    `*Name:* ${payload.name}`,
    `*Company:* ${payload.company || "-"}`,
    `*Phone:* ${payload.phone}`,
    `*Email:* ${payload.email || "-"}`,
    `*City / Location:* ${payload.city}`,
    `*Work Type:* ${workLabel}`,
    `*Preferred Contact:* ${payload.preferred}`,
    `*Subject:* ${payload.subject || DEFAULT_SUBJECT}`,
    ``,
    `*Requirement Details:*`,
    `${payload.details}`,
    ``,
    `Kindly review the requirement and share feasibility, execution approach, timeline and quotation.`,
  ].join("\n");
}

export default function ContactPageClient() {
  const searchParams = useSearchParams();
  const preSubject = searchParams.get("subject") || "";

  const [draftReady, setDraftReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    city: "",
    workType: "ALL",
    details: "",
    subject: preSubject || DEFAULT_SUBJECT,
    preferred: "Call",
  });

  const canSend = useMemo(() => {
    const nameOk = String(form.name).trim().length >= 2;
    const phoneOk = cleanPhone(form.phone).replace(/\D/g, "").length >= 10;
    const cityOk = String(form.city).trim().length >= 2;
    const detailsOk = String(form.details).trim().length >= 10;
    const emailOk = isValidEmail(form.email);
    return nameOk && phoneOk && cityOk && detailsOk && emailOk;
  }, [form]);

  function setField<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");

    if (!canSend) {
      setErr("Please fill required fields properly (Name, Phone, City, Details).");
      return;
    }

    setLoading(true);

    try {
      setDraftReady(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setErr(message);
    } finally {
      setLoading(false);
    }
  }

  const draftPayload = {
    name: form.name.trim(),
    company: form.company.trim(),
    phone: String(form.phone || "").replace(/\D/g, ""),
    email: form.email.trim(),
    city: form.city.trim(),
    workType: form.workType,
    details: form.details.trim(),
    subject: (form.subject || DEFAULT_SUBJECT).trim(),
    preferred: form.preferred,
  };

  const whatsappPreviewLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(draftPayload),
  )}`;

  const emailDraftLink = `mailto:corporate@serviceind.co.in?subject=${encodeURIComponent(
    draftPayload.subject || DEFAULT_SUBJECT,
  )}&body=${encodeURIComponent(buildEmailBody(draftPayload))}`;

  return (
    <div className="site">
      <WebsiteHeader />

      <main className="main">
        <section className="aboutBand aboutBand--blueprint">
          <div className="aboutBandBg" aria-hidden="true">
            <div className="abBlob a1" />
            <div className="abBlob a2" />
            <div className="abBlob a3" />
            <div className="abGrid" />
          </div>

          <div className="container aboutBandInner">
            <div className="contactHero">
              <div className="heroBadge" style={{ marginBottom: 10 }}>
                <span className="dot" />
                SERVICE INDIA • Work Requirement Enquiry
              </div>

              <h1 className="contactTitle">
                Let’s discuss your <span className="gradText">requirement</span>
              </h1>

              <p className="sub">
                Submit your details and work requirement. We will respond with
                feasibility, execution approach and quotation.
                <b> For urgent support, please call directly.</b>
              </p>
            </div>

            {draftReady ? (
              <div className="contactThanks contactCard">
                <div className="successWrap">
                  <div className="successIcon">
                    <div className="successPulse" />
                    <div className="successRing" />
                    <div className="successCheck">✓</div>
                  </div>

                  <div className="successText">
                    <div className="successTitle">Your message draft is ready</div>
                    <div className="successSub">
                      Choose the method to send message. You can open an
                      <b> email draft</b> or continue with <b>WhatsApp draft</b>.
                    </div>
                  </div>
                </div>

                <div className="thanksActions">
                  <a className="btn" href={emailDraftLink}>
                    Open Email Draft →
                  </a>

                  <a
                    className="btnGhost contactGhostBtn"
                    href={whatsappPreviewLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open WhatsApp Draft →
                  </a>

                  <button
                    type="button"
                    className="btnGhost contactGhostBtn"
                    onClick={() => setDraftReady(false)}
                  >
                    Edit Details →
                  </button>
                </div>
              </div>
            ) : (
              <div className="contactGrid">
                <div className="contactCard contactInfo">
                  <div className="h2" style={{ marginBottom: 10 }}>
                    SERVICE INDIA
                  </div>

                  <div className="infoRow">
                    <div className="infoLabel">Phone</div>
                    <div className="infoVal">
                      <a className="link" href="tel:+919702485922">
                        +91 9702485922
                      </a>
                    </div>
                  </div>

                  <div className="infoRow">
                    <div className="infoLabel">Email</div>
                    <div className="infoVal">
                      <a className="link" href="mailto:corporate@serviceind.co.in">
                        corporate@serviceind.co.in
                      </a>
                    </div>
                  </div>

                  <div className="infoRow">
                    <div className="infoLabel">Business Type</div>
                    <div className="infoVal">
                      Fabrication, installation, repair, painting, labour support and custom on-site work services.
                    </div>
                  </div>

                  <div className="infoRow">
                    <div className="infoLabel">Working Hours</div>
                    <div className="infoVal">10:00 am to 5:00 pm</div>
                  </div>

                  <div className="infoRow" style={{ borderBottom: "0" }}>
                    <div className="infoLabel">Quick Note</div>
                    <div className="infoVal">
                      Share work type, size, location and details clearly for faster discussion and quotation.
                    </div>
                  </div>

                  <div className="infoActions">
                    <a className="btn" href="tel:+919702485922">
                      Call Now →
                    </a>

                    <a
                      className="btnGhost contactGhostBtn"
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp →
                    </a>

                    <a
                      className="btnGhost contactGhostBtn"
                      href="mailto:corporate@serviceind.co.in"
                    >
                      Email Us →
                    </a>
                  </div>
                </div>

                <div className="contactCard contactFormCard">
                  <div className="h2" style={{ marginBottom: 6 }}>
                    Send Requirement
                  </div>

                  <div className="sub" style={{ marginBottom: 14 }}>
                    Fill the details and we’ll connect with you. For urgent support, call directly.
                  </div>

                  {err ? <div className="contactErr">{err}</div> : null}

                  <form onSubmit={onSubmit} className="contactForm">
                    <div className="row2">
                      <div>
                        <div className="label">Full Name *</div>
                        <input
                          className="input"
                          value={form.name}
                          onChange={(e) => setField("name", e.target.value)}
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <div className="label">Company</div>
                        <input
                          className="input"
                          value={form.company}
                          onChange={(e) => setField("company", e.target.value)}
                          placeholder="Company name (optional)"
                        />
                      </div>
                    </div>

                    <div className="row2">
                      <div>
                        <div className="label">Phone *</div>
                        <input
                          className="input"
                          value={form.phone}
                          onChange={(e) => setField("phone", e.target.value)}
                          placeholder="+91 9XXXXXXXXX"
                        />
                      </div>

                      <div>
                        <div className="label">Email</div>
                        <input
                          className="input"
                          value={form.email}
                          onChange={(e) => setField("email", e.target.value)}
                          placeholder="you@company.com (optional)"
                        />
                      </div>
                    </div>

                    <div className="row2">
                      <div>
                        <div className="label">City / Location *</div>
                        <input
                          className="input"
                          value={form.city}
                          onChange={(e) => setField("city", e.target.value)}
                          placeholder="Mumbai / Navi Mumbai / Thane..."
                        />
                      </div>

                      <div>
                        <div className="label">Work Type</div>
                        <select
                          className="input"
                          value={form.workType}
                          onChange={(e) => setField("workType", e.target.value)}
                        >
                          {WORK_TYPES.map((m) => (
                            <option key={m.key} value={m.key}>
                              {m.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row2">
                      <div>
                        <div className="label">Preferred Contact</div>
                        <select
                          className="input"
                          value={form.preferred}
                          onChange={(e) => setField("preferred", e.target.value)}
                        >
                          <option value="Call">Call</option>
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Email">Email</option>
                        </select>
                      </div>

                      <div>
                        <div className="label">Subject</div>
                        <input
                          className="input"
                          value={form.subject}
                          onChange={(e) => setField("subject", e.target.value)}
                          placeholder={DEFAULT_SUBJECT}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="label">Requirement Details *</div>
                      <textarea
                        className="input contactTextarea"
                        rows={5}
                        value={form.details}
                        onChange={(e) => setField("details", e.target.value)}
                        placeholder="Example: Gate fabrication work, approx size 12x7 ft, site at Bhiwandi, need visit and quotation..."
                      />
                      <div className="hint">
                        Tip: Mention work type, dimensions, quantity, site location, timeline and any drawing/photo reference.
                      </div>
                    </div>

                    <div className="formActions">
                      <button
                        className="btn btnAnim"
                        disabled={loading}
                        type="submit"
                      >
                        {loading ? "Sending..." : CTA_TEXT}
                      </button>

                      <button
                        type="button"
                        className="btnGhost contactGhostBtn"
                        onClick={() =>
                          window.open(
                            `https://wa.me/${WHATSAPP_NUMBER}`,
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                      >
                        WhatsApp Now →
                      </button>

                      <a
                        className="btnGhost contactGhostBtn"
                        href="tel:+919702485922"
                      >
                        Call Now →
                      </a>
                    </div>

                    {!canSend ? (
                      <div className="hint" style={{ marginTop: 10 }}>
                        Required: Name, Phone, City, Details (min 10 chars). Email optional.
                      </div>
                    ) : null}
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <WebsiteFooter />
    </div>
  );
}