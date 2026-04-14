"use client";
import { UserCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import WebsiteMobileMenu from "./WebsiteMobileMenu";

export default function WebsiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const goLogin = () => {
    if (pathname === "/login") return;
    router.push("/login");
  };

  return (
    <>
      <header
        className="header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 9999,
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(15,23,42,.08)",
          boxShadow: "0 6px 18px rgba(2,6,23,.05)",
        }}
      >
        <div
          className="container headerRow"
          style={{
            minHeight: "84px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div
            className="headerLeft websiteHeaderLeft"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              minWidth: 0,
              flex: 1,
            }}
          >
            <button
              type="button"
              className="hamburger"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              style={{
                width: "54px",
                height: "54px",
                minWidth: "54px",
                minHeight: "54px",
                borderRadius: "18px",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(2,6,23,.06)",
              }}
            >
              <span style={{ width: "22px", margin: "2px 0" }} />
              <span style={{ width: "22px", margin: "2px 0" }} />
              <span style={{ width: "22px", margin: "2px 0" }} />
            </button>

            <Link
              href="/"
              className="brand brandWithLogo websiteBrand"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                minWidth: 0,
                flex: 1,
              }}
            >
              <Image
                className="brandLogo websiteBrandLogo"
                src="/logo/star-logo.png"
                alt="STAR Engineering"
                width={42}
                height={42}
                priority
                style={{
                  width: "42px",
                  height: "42px",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
              <span
                className="brandWord gradText websiteBrandWord"
                style={{
                  fontSize: "18px",
                  lineHeight: 1.05,
                  fontWeight: 800,
                  display: "block",
                }}
              >
                STAR Engineering
              </span>
            </Link>
          </div>

          <nav className="nav desktopOnly">
            <Link
              href="/"
              className={`navLink ${pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`navLink ${pathname === "/about" ? "active" : ""}`}
            >
              About
            </Link>
            <Link
              href="/shop"
              className={`navLink ${pathname === "/shop" ? "active" : ""}`}
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className={`navLink ${pathname === "/contact" ? "active" : ""}`}
            >
              Contact
            </Link>
          </nav>

          <div
            className="headerRight websiteHeaderRight"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              className="btn btnAnim btnLogin websiteLoginBtn"
              onClick={goLogin}
              aria-label="Login"
              title="Login"
              style={{
                width: "54px",
                height: "54px",
                minWidth: "54px",
                minHeight: "54px",
                borderRadius: "18px",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="websiteLoginText" style={{ display: "none" }}>
                Login
              </span>
              <span
                className="websiteLoginIcon"
                aria-hidden="true"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UserCircle2 size={20} strokeWidth={2.4} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <WebsiteMobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}