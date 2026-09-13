import { useState } from 'react';

interface NavbarProps {
  mounted?: boolean;
}

export function Navbar({ mounted = true }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 w-full z-10 px-5 sm:px-8 py-4 sm:py-5 flex row justify-between items-center transition-all duration-700 ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0px)' : 'translateY(-12px)',
        }}
      >
        {/* Logo (left) */}
        <div className="flex row items-center gap-3">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-white select-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none leading-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        {/* Desktop nav links (center, hidden below md) */}
        <nav
          aria-label="Desktop navigation"
          className="hidden md:flex row items-center text-[23px] text-white"
        >
          <a href="#labs" className="hover:opacity-60 transition-opacity">
            Labs
          </a>
          <span>,&nbsp;</span>
          <a href="#studio" className="hover:opacity-60 transition-opacity">
            Studio
          </a>
          <span>,&nbsp;</span>
          <a href="#openings" className="hover:opacity-60 transition-opacity">
            Openings
          </a>
          <span>,&nbsp;</span>
          <a href="#shop" className="hover:opacity-60 transition-opacity">
            Shop
          </a>
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex md:hidden flex-col justify-center items-center gap-[5px] p-2 focus:outline-none z-20 cursor-pointer"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 z-[9] bg-black/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <a
          href="#labs"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
        >
          Labs
        </a>
        <a
          href="#studio"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
        >
          Studio
        </a>
        <a
          href="#openings"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
        >
          Openings
        </a>
        <a
          href="#shop"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
        >
          Shop
        </a>
        <a
          href="#contact"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[32px] font-medium text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
