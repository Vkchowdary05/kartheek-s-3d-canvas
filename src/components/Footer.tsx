import { Heart } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 border-t border-border relative bg-card/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="text-2xl font-bold text-primary inline-block mb-2 soft-hover"
            >
              VK
            </a>
            <p className="text-sm text-muted-foreground">
              © 2025 Venkata Kartheek. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Home', 'Projects', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(`#${link.toLowerCase() === 'home' ? 'hero' : link.toLowerCase()}`);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Built with */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Built with React &
            <Heart size={14} className="text-primary fill-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
