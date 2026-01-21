import { useState } from 'react';
import { ExternalLink, Github, Download, ArrowRight, ArrowLeft } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

const ProjectCard = ({ project, index, isVisible }: ProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`h-[420px] transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      style={{ transitionDelay: `${200 + index * 100}ms` }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ${isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card */}
        <div
          className="absolute inset-0 backface-hidden cursor-pointer"
          onClick={() => setIsFlipped(true)}
        >
          <div className="h-full calm-card p-6 flex flex-col">
            {/* Category badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.category.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Project name */}
            <h3 className="text-xl font-bold text-foreground mb-2">{project.name}</h3>
            <p className="text-sm font-medium text-primary mb-4">
              {project.tagline}
            </p>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md font-mono"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Click hint */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-auto pt-4 border-t border-border">
              <span>Click for details</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] cursor-pointer"
          onClick={() => setIsFlipped(false)}
        >
          <div className="h-full calm-card p-6 flex flex-col">
            {/* Back button */}
            <button
              className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-primary transition-colors"
              onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <h3 className="text-lg font-bold text-foreground mb-4">{project.name}</h3>

            {/* Highlights */}
            <div className="flex-grow mb-4">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Key Features
              </h4>
              <ul className="space-y-2">
                {project.highlights.slice(0, 4).map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
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
                    className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-auto pt-4 border-t border-border">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground soft-hover"
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
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-foreground text-sm font-medium soft-hover"
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
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium soft-hover"
                >
                  <Download size={14} />
                  APK
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
