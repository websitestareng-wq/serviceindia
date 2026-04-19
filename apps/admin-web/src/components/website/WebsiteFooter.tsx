import Link from "next/link";

export default function WebsiteFooter() {
  return (
    <footer className="footer">
      <div className="container footerGrid">
        <div>
          <div className="footerBrand">SERVICE INDIA</div>
          <div className="muted">
           Fabrication, construction and on-site labour services you can trust.
          </div>
        </div>

        <div className="footerLinks">
          <Link href="/about">About</Link>
          <Link href="/work">Work</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </div>

      <div className="container footBottom">
        <span className="muted">
          © {new Date().getFullYear()} Service India
        </span>
      </div>
    </footer>
  );
}