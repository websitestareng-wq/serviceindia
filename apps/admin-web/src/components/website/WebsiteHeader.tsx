"use client";

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

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="header websiteHeader">
        <div className="container headerRow">
          <div className="leftRow">
            <button
              type="button"
              className="hamburger"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <Link href="/" className="brand brandWithLogo">
              <Image
                className="brandLogo"
                src="/logo/star-logo.png"
                alt="STAR ENGINEERING"
                width={50}
                height={50}
                priority
              />
              <span className="brandWord gradText">STAR ENGINEERING</span>
            </Link>
          </div>

          <nav className="nav desktopOnly">
            <Link href="/" className={`navLink ${isActive("/") ? "active" : ""}`}>
              Home
            </Link>
            <Link
              href="/about"
              className={`navLink ${isActive("/about") ? "active" : ""}`}
            >
              About
            </Link>
            <Link
              href="/shop"
              className={`navLink ${isActive("/shop") ? "active" : ""}`}
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className={`navLink ${isActive("/contact") ? "active" : ""}`}
            >
              Contact
            </Link>
          </nav>

          <button
            type="button"
            className="btn btnAnim btnLogin"
            onClick={goLogin}
          >
            Login
          </button>
        </div>
      </header>

      <WebsiteMobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}