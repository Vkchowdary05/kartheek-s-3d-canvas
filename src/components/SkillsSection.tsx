import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Skills3D from './3d/skills/Skills3D';

const skillCategories = [
  {
    name: "Languages",
    color: "#F59E0B",
    skills: ["JavaScript", "TypeScript", "Java", "Python", "Dart"]
  },
  {
    name: "Frontend",
    color: "#06B6D4",
    skills: ["React", "Next.js", "Flutter", "HTML5", "CSS3", "Tailwind"]
  },
  {
    name: "Backend",
    color: "#10B981",
    skills: ["Node.js", "Express.js", "REST APIs", "Firebase"]
  },
  {
    name: "Databases",
    color: "#8B5CF6",
    skills: ["MongoDB", "MySQL", "Supabase", "Firestore"]
  },
  {
    name: "Tools",
    color: "#EC4899",
    skills: ["Git", "GitHub", "Postman", "Cloudinary", "Vercel"]
  },
  {
    name: "AI/ML",
    color: "#EF4444",
    skills: ["Tesseract.js", "Groq API", "Gemini API", "Ollama"]
  }
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative overflow-hidden min-h-[700px]" ref={ref}>
      {/* 3D Background */}
      <Skills3D />

      {/* Gradient overlays */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass-card p-6 group hover:border-opacity-50 transition-all"
              style={{ borderColor: `${category.color}20` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: category.color }}
                />
                <h3 className="text-lg font-semibold text-foreground">
                  {category.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + index * 0.05 }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: `0 0 20px ${category.color}40`,
                    }}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-default transition-all"
                    style={{
                      background: `${category.color}15`,
                      color: category.color,
                      border: `1px solid ${category.color}30`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
