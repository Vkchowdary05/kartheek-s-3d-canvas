import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import Hero3D from './Hero3D';

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1e1b4b]/40 via-[#0f0f23] to-[#0a0a14]" />

      {/* 3D Background */}
      <Hero3D />

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/80 pointer-events-none z-10" />

      {/* Soft animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2.5s' }} />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
            <Sparkles size={14} className="animate-pulse" />
            2× Smart India Hackathon Finalist
            <Sparkles size={14} className="animate-pulse" />
          </span>
        </motion.div>

        {/* Main Title with soft gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
        >
          <span className="bg-gradient-to-r from-slate-100 via-primary/90 to-slate-100 bg-clip-text text-transparent">
            Venkata Kartheek
          </span>
        </motion.h1>

        {/* Subtitle with gentle glow */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4"
        >
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Full-Stack Developer
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Building Production-Ready Applications with{' '}
          <span className="text-[#93c5fd] font-medium">React</span>,{' '}
          <span className="text-[#86efac] font-medium">Node.js</span>,{' '}
          <span className="text-[#93c5fd] font-medium">Flutter</span> &{' '}
          <span className="text-[#f0abfc] font-medium">AI</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 35px rgba(167, 139, 250, 0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-lg transition-all overflow-hidden"
          >
            <span className="relative z-10">View My Work</span>
          </motion.a>

          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.03, borderColor: 'rgba(167, 139, 250, 0.6)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-2xl border-2 border-primary/30 text-foreground font-semibold text-lg hover:bg-primary/8 transition-all backdrop-blur-sm"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-5"
        >
          {[
            { icon: Github, href: "https://github.com/Vkchowdary05", label: "GitHub", color: "#e2e8f0" },
            { icon: Linkedin, href: "https://linkedin.com/in/kartheek-chowdhary", label: "LinkedIn", color: "#93c5fd" },
            { icon: Mail, href: "mailto:papasanikarthik@gmail.com", label: "Email", color: "#f0abfc" },
          ].map(({ icon: Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-2xl bg-muted/40 backdrop-blur-sm text-muted-foreground hover:text-white transition-all border border-white/5 hover:border-primary/25"
              aria-label={label}
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-muted-foreground hover:text-primary transition-colors"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest opacity-60">Scroll</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
