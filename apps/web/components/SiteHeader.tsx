import Link from "next/link";

const NAV = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
];

export default function SiteHeader() {
  return (
    <header className="z-header">
      <div className="z-container">
        <div className="z-header-inner">
          <Link href="/home" className="z-brand" aria-label="Zebrand home">
            <span className="z-dot" aria-hidden="true" />
            <span>Zebrand</span>
          </Link>

          <div className="z-header-right">
            <nav className="z-nav-shell" aria-label="Primary navigation">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="z-nav-link">
                  {n.label}
                </Link>
              ))}
            </nav>

            <Link className="z-btn z-btn-primary" href="/services">
              Get a free audit
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
