import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Download, ArrowRight } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="perspective-1000 h-[450px]"
    >
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden">
          <div 
            className="h-full glass-card p-6 flex flex-col overflow-hidden group"
            style={{
              borderColor: `${project.colors.primary}20`,
            }}
          >
            {/* Glow effect */}
            <div 
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
              style={{ background: project.colors.primary }}
            />

            {/* Category badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.category.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-1 text-xs font-medium rounded-full"
                  style={{
                    background: `${project.colors.primary}20`,
                    color: project.colors.primary,
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Project name */}
            <h3 className="text-xl font-bold text-foreground mb-2">{project.name}</h3>
            <p className="text-sm font-medium mb-4" style={{ color: project.colors.accent }}>
              {project.tagline}
            </p>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-md font-mono"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-md">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Click hint */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-auto pt-4 border-t border-border/50">
              <span>Click for details</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div 
            className="h-full glass-card p-6 flex flex-col"
            style={{
              borderColor: `${project.colors.primary}20`,
            }}
          >
            <h3 className="text-xl font-bold text-foreground mb-4">{project.name}</h3>

            {/* Highlights */}
            <div className="flex-grow mb-4">
              <h4 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Key Features
              </h4>
              <ul className="space-y-2">
                {project.highlights.slice(0, 4).map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span 
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: project.colors.primary }}
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Full tech stack */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs bg-muted/50 text-muted-foreground rounded font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-auto pt-4 border-t border-border/50">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                  style={{
                    background: project.colors.primary,
                    color: '#fff',
                  }}
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-muted text-foreground text-sm font-medium transition-all hover:bg-muted/80"
                >
                  <Github size={14} />
                  GitHub
                </a>
              )}
              {project.links.apk && (
                <a
                  href={project.links.apk}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium transition-all hover:opacity-90"
                >
                  <Download size={14} />
                  APK
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
