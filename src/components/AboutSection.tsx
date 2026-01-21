import { useRef, useEffect, useState } from 'react';
import { MapPin, GraduationCap, Download, User } from 'lucide-react';
import { skills } from '@/data/projects';

const SkillBar = ({ name, level, isVisible, delay }: { name: string; level: number; isVisible: boolean; delay: number }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${level}%` : '0%',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-calm relative overflow-hidden" ref={ref}>
      {/* Subtle decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <h2 className="fluid-section font-bold mb-4 text-foreground">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate full-stack developer crafting scalable applications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Profile Card */}
          <div
            className={`calm-card p-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="w-20 h-20 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <User size={40} className="text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Venkata Kartheek</h3>
                <p className="text-primary font-medium mb-3">B.Tech CSE Student | Full-Stack Developer</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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

            <p className="text-muted-foreground leading-relaxed mb-8">
              Passionate full-stack developer with expertise in building scalable web and mobile
              applications. Proven track record with <span className="text-foreground font-medium">10+ production-ready projects</span> and
              <span className="text-foreground font-medium"> 2× Smart India Hackathon finalist</span>.
              Specialized in React, Node.js, Flutter, and AI integration.
            </p>

            <a
              href="https://drive.google.com/uc?export=download&id=1JCteJi8sQjZp1yxHO812nNoKuTmlVPKE"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center gap-2 btn-primary w-full sm:w-auto justify-center"
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>

          {/* Skills */}
          <div
            className={`space-y-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            style={{ transitionDelay: '400ms' }}
          >
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <div key={category} className="calm-card p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {category}
                </h4>
                {items.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    isVisible={isVisible}
                    delay={200 + (categoryIndex * 4 + index) * 100}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
