import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 border-t border-border/50 relative">
      {/* Gradient fade at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <motion.a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="text-2xl font-bold gradient-text inline-block mb-2"
              whileHover={{ scale: 1.05 }}
            >
              VK
            </motion.a>
            <p className="text-sm text-muted-foreground">
              © 2025 Venkata Kartheek. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Home', 'Projects', 'About', 'Contact'].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection(`#${link.toLowerCase() === 'home' ? 'hero' : link.toLowerCase()}`); 
                }}
                whileHover={{ y: -2 }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Built with */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Built with
            <span className="flex items-center gap-1">
              React, Three.js &
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={14} className="text-destructive fill-destructive" />
              </motion.span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
