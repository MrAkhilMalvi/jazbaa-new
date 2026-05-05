import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, FacebookIcon } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-20">
        <div className="grid gap-10 md:gap-12 sm:grid-cols-2 md:grid-cols-4">
          {/* =========================================
              BRAND COLUMN
              ========================================= */}
          <div className="sm:col-span-2 md:pr-10">
            {/* Responsive Logo */}
            <Link
              to="/"
              className="relative block w-[130px] sm:w-[150px] h-12 mb-6 md:mb-8 shrink-0 group"
              aria-label="JAZBAA home"
            >
              <img
                src="/jazbaalogo.png"
                alt="Jazbaa Logo"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[100px] sm:h-[120px] w-auto max-w-none object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            {/* Increased font size for better readability */}
            <p className="mt-4 max-w-md text-base md:text-lg text-slate-600 dark:text-white/70 leading-relaxed font-medium">
              A vibrant community where music, movement, mindfulness, and
              meaningful connections come together.
            </p>
            <p className="mt-4 text-sm md:text-base text-slate-400 dark:text-white/40 font-semibold tracking-wide uppercase">
              By NAVIRA LIFE ESSENTIALS PVT. LTD.
            </p>
          </div>

          {/* =========================================
              EXPLORE LINKS
              ========================================= */}
          <div className="mt-4 sm:mt-0">
            <h4 className="font-bold text-xl md:text-2xl text-slate-900 dark:text-white mb-5 md:mb-6">
              Explore
            </h4>
            <ul className="space-y-3 md:space-y-4 text-base md:text-lg font-medium text-slate-600 dark:text-white/70">
              {/* Explicitly mapping out links to handle the anchor tag */}
              <li>
                <Link
                  to="/#about"
                  className="inline-block hover:text-[#ff6a3d] dark:hover:text-[#ff6a3d] sm:hover:translate-x-1 transition-all duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="inline-block hover:text-[#ff6a3d] dark:hover:text-[#ff6a3d] sm:hover:translate-x-1 transition-all duration-300"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="inline-block hover:text-[#ff6a3d] dark:hover:text-[#ff6a3d] sm:hover:translate-x-1 transition-all duration-300"
                >
                  Join
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-block hover:text-[#ff6a3d] dark:hover:text-[#ff6a3d] sm:hover:translate-x-1 transition-all duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="inline-block hover:text-[#ff6a3d] dark:hover:text-[#ff6a3d] sm:hover:translate-x-1 transition-all duration-300"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================================
              CONNECT LINKS
              ========================================= */}
          <div>
            <h4 className="font-bold text-xl md:text-2xl text-slate-900 dark:text-white mb-5 md:mb-6">
              Connect
            </h4>
            <ul className="space-y-4 md:space-y-5 text-base md:text-lg font-medium text-slate-600 dark:text-white/70">
              <li>
                <a
                  href="mailto:hello@jazbaa.life"
                  className="flex items-center gap-3 hover:text-[#ff6a3d] dark:hover:text-[#ff6a3d] hover:translate-x-1 transition-all duration-300 group"
                >
                  <Mail className="h-5 w-5 text-slate-400 group-hover:text-[#ff6a3d] transition-colors" />
                  hello@jazbaa.life
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/jazbaa.events/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#ff6a3d] dark:hover:text-[#ff6a3d] hover:translate-x-1 transition-all duration-300 group"
                >
                  <Instagram className="h-5 w-5 text-slate-400 group-hover:text-[#ff6a3d] transition-colors" />
                  @Jazbaa.Events
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@Jazbaa.Events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#ff6a3d] dark:hover:text-[#ff6a3d] hover:translate-x-1 transition-all duration-300 group"
                >
                  <Youtube className="h-5 w-5 text-slate-400 group-hover:text-[#ff6a3d] transition-colors" />
                  JAZBAA Community
                </a>
              </li>

              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61588994383834" // update if your URL is different
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#ff6a3d] hover:translate-x-1 transition-all duration-300 group"
                >
                  <FacebookIcon className="h-5 w-5 text-slate-400 group-hover:text-[#ff6a3d] transition-colors" />
                  Jazbaa Events
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* =========================================
            BOTTOM BAR (Copyright, Legal, Tagline)
            ========================================= */}
        <div className="mt-5 md:mt-5 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Left: Copyright & Legal Links */}
          <div className="flex flex-col gap-3 items-center lg:items-start">
            <p className="text-sm md:text-base text-slate-500 dark:text-white/50 font-medium">
              © {new Date().getFullYear()} JAZBAA. Live Your Passion. | NAVIRA
              LIFE ESSENTIALS PVT.LTD.
            </p>

            {/* Privacy & Terms Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm md:text-base font-medium text-slate-400 dark:text-white/40">
              <Link
                to="/privacy-policy"
                className="hover:text-[#ff6a3d] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
              <Link
                to="/terms-conditions"
                className="hover:text-[#ff6a3d] transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Right: Premium Tagline Design */}
          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white cursor-default">
            Don't just live.{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#ff6a3d] to-[#ff9e80] relative inline-block group">
              Feel alive.
              {/* Subtle underline hover effect */}
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-[#ff6a3d]/40 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
