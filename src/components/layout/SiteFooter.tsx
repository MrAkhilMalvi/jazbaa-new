import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-16 md:mt-24">
      <div className="container-editorial py-10 md:py-16">
        <div className="grid gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Brand Column */}
          <div className="sm:col-span-2">
            {/* Same responsive logo trick from the header */}
            <Link to="/" className="relative block w-[110px] sm:w-[130px] h-10 mb-4 md:mb-6 shrink-0" aria-label="JAZBAA home">
               {/* Soft background glow for dark mode readability */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-white/40 dark:bg-white/10 blur-[12px] rounded-full pointer-events-none"></div>
              <img
                src="/jazbaalogo.png"
                alt="Jazbaa Logo"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[90px] sm:h-[110px] w-auto max-w-none object-contain logo-premium"
              />
            </Link>
            
            <p className="mt-4 max-w-md text-sm md:text-base text-muted-foreground leading-relaxed">
              A vibrant community where music, movement, mindfulness, and
              meaningful connections come together.
            </p>
            <p className="mt-3 text-xs text-muted-foreground font-medium">
              By NAVIRA LIFE Essentials Pvt. Ltd.
            </p>
          </div>

          {/* Explore Links */}
          <div className="mt-2 sm:mt-0">
            <h4 className="font-display text-lg mb-3 md:mb-4">Explore</h4>
            <ul className="space-y-2 md:space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link to="/events" className="hover:text-accent transition-colors">Events</Link></li>
              <li><Link to="/join" className="hover:text-accent transition-colors">Join</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              <li><Link to="/login" className="hover:text-accent transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Connect Links */}
          <div className="mt-2 sm:mt-0">
            <h4 className="font-display text-lg mb-3 md:mb-4">Connect</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:hello@jazbaa.life" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Mail className="h-4 w-4" /> hello@jazbaa.life
                </a>
              </li>
              <li>
                <a href="https://instagram.com/jazbaa.life" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Instagram className="h-4 w-4" /> @jazbaa.life
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Youtube className="h-4 w-4" /> JAZBAA Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Banner */}
        <div className="mt-10 md:mt-14 pt-6 md:pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} JAZBAA. Live Your Passion.
          </p>
          <p className="text-xs text-muted-foreground italic font-display">
            Don't just live. Feel alive.
          </p>
        </div>
      </div>
    </footer>
  );
}