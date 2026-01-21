import { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Soft gradient background - no 3D */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-background to-background" />

      {/* Subtle decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className={`mb-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/50 border border-border text-foreground text-sm font-medium">
            <Sparkles size={14} className="text-primary" />
            2× Smart India Hackathon Finalist
            <Sparkles size={14} className="text-primary" />
          </span>
        </div>

        {/* Main Title */}
        <h1
          className={`fluid-hero font-bold mb-6 tracking-tight text-foreground transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '400ms' }}
        >
          Venkata Kartheek
        </h1>

        {/* Subtitle */}
        <h2
          className={`fluid-subtitle font-medium mb-6 text-primary transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          Full-Stack Developer
        </h2>

        {/* Description */}
        <p
          className={`fluid-body text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '800ms' }}
        >
          Building Production-Ready Applications with{' '}
          <span className="text-primary font-medium">React</span>,{' '}
          <span className="text-primary font-medium">Node.js</span>,{' '}
          <span className="text-primary font-medium">Flutter</span> &{' '}
          <span className="text-primary font-medium">AI</span>
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 mb-14 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary text-lg"
          >
            View My Work
          </a>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-secondary text-lg"
          >
            Get In Touch
          </a>
        </div>

        {/* Social Links */}
        <div
          className={`flex items-center justify-center gap-4 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '1200ms' }}
        >
          {[
            { icon: Github, href: "https://github.com/Vkchowdary05", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/kartheek-chowdhary", label: "LinkedIn" },
            { icon: Mail, href: "mailto:papasanikarthik@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary soft-hover"
              aria-label={label}
            >
              <Icon size={22} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        style={{ transitionDelay: '1500ms' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={24} className="animate-gentle-pulse" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
