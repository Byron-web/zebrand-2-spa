import "./globals.css";
import Link from "next/link";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="z-link" href={href}>
      {children}
    </Link>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <header className="z-header">
          <div className="z-container">
            <div className="z-header-inner">
              <Link className="z-brand" href="/home" aria-label="Zebrand">
                <span className="z-dot" aria-hidden="true" />
                Zebrand
              </Link>

              <nav className="z-nav" aria-label="Primary">
                <div className="z-nav-shell">
                  <NavLink href="/home">Home</NavLink>
                  <NavLink href="/about">About</NavLink>
                  <NavLink href="/services">Services</NavLink>
                </div>

                <Link className="z-header-cta" href="/services">
                  Get a free audit
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {children}

        <footer className="z-footer">
          <div className="z-container">
            <div className="z-footer-top">
              <div className="z-footer-brand">
                <div className="z-brand" aria-label="Zebrand">
                  <span className="z-dot" aria-hidden="true" />
                  Zebrand
                </div>

                <p className="z-footer-lead">
                  Premium marketing sites built with conversion-first UX, clean structure, and performance-safe
                  implementation.
                </p>

                <p className="z-footer-note">
                  This website is a production-grade draft layout. Replace imagery and copy once final brand
                  messaging is approved.
                </p>
              </div>

              <div className="z-footer-col">
                <h3>Pages</h3>
                <ul className="z-footer-links">
                  <li>
                    <Link href="/home">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/services">Services</Link>
                  </li>
                </ul>
              </div>

              <div className="z-footer-col">
                <h3>Capabilities</h3>
                <ul className="z-footer-links">
                  <li>
                    <Link href="/services">Marketing websites</Link>
                  </li>
                  <li>
                    <Link href="/services">Landing pages &amp; CRO</Link>
                  </li>
                  <li>
                    <Link href="/services">CMS build &amp; handover</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="z-footer-small">
              <span>© Zebrand. All rights reserved.</span>
              <span>Built by Freelance IT Solutions.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}