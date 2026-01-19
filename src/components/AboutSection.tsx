import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, GraduationCap, Download, User } from 'lucide-react';
import { skills } from '@/data/projects';
import About3D from './3d/about/About3D';

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, hsl(239 84% 67%), hsl(189 94% 43%))`,
          }}
        />
      </div>
    </div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden min-h-[700px]" ref={ref}>
      {/* 3D Background */}
      <About3D />

      {/* Gradient decorations */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate full-stack developer crafting scalable applications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <User size={48} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Venkata Kartheek</h3>
                <p className="text-primary font-medium mb-2">B.Tech CSE Student | Full-Stack Developer</p>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    Hyderabad, Telangana
                  </span>
                  <span className="flex items-center gap-1">
                    <GraduationCap size={14} />
                    VJIT Hyderabad | CGPA: 8.5
                  </span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Passionate full-stack developer with expertise in building scalable web and mobile
              applications. Proven track record with <span className="text-foreground font-medium">10+ production-ready projects</span> and
              <span className="text-foreground font-medium"> 2× Smart India Hackathon finalist</span>.
              Specialized in React, Node.js, Flutter, and AI integration.
            </p>

            <motion.a
              href="https://res.cloudinary.com/dbtvbnqjt/raw/upload/kartheek_frontendintern_xzobdm"
              target="_blank"
              rel="noopener noreferrer"
              download
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(239 84% 67% / 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium w-full sm:w-auto justify-center"
            >
              <Download size={18} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <div key={category} className="glass-card p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {category}
                </h4>
                {items.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.1 * (categoryIndex * 4 + index)}
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
