import { useRef, useEffect, useState } from 'react';

const skillCategories = [
  {
    name: "Languages",
    skills: ["JavaScript", "TypeScript", "Java", "Python", "Dart"]
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "Flutter", "HTML5", "CSS3", "Tailwind"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "Firebase"]
  },
  {
    name: "Databases",
    skills: ["MongoDB", "MySQL", "Supabase", "Firestore"]
  },
  {
    name: "Tools",
    skills: ["Git", "GitHub", "Postman", "Cloudinary", "Vercel"]
  },
  {
    name: "AI/ML",
    skills: ["Tesseract.js", "Groq API", "Gemini API", "Ollama"]
  }
];

const SkillsSection = () => {
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
    <section id="skills" className="section-calm relative overflow-hidden" ref={ref}>
      {/* Subtle decorative elements */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <h2 className="fluid-section font-bold mb-4 text-foreground">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className={`calm-card p-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: `${200 + categoryIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  {category.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium bg-muted text-foreground border border-border soft-hover transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                    style={{ transitionDelay: `${300 + categoryIndex * 100 + index * 50}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
