import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container-editorial py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-full bg-gradient-ember shadow-glow grid place-items-center">
                <span className="font-display text-accent-foreground text-base font-bold">J</span>
              </span>
              <span className="font-display text-2xl font-semibold">JAZBAA</span>
            </Link>
            <p className="mt-5 max-w-md text-muted-foreground leading-relaxed">
              A vibrant community where music, movement, mindfulness, and
              meaningful connections come together.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              By NAVIRA LIFE Essentials Pvt. Ltd.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-accent">About</Link></li>
              <li><Link to="/events" className="hover:text-accent">Events</Link></li>
              <li><Link to="/join" className="hover:text-accent">Join</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
              <li><Link to="/login" className="hover:text-accent">Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Connect</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@jazbaa.life</li>
              <li className="flex items-center gap-2"><Instagram className="h-4 w-4" /> @jazbaa.life</li>
              <li className="flex items-center gap-2"><Youtube className="h-4 w-4" /> JAZBAA Community</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
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
