import { useRef, useEffect, useState } from 'react';
import { Trophy, Rocket, Star, Smartphone, Globe, Code } from 'lucide-react';
import { achievements } from '@/data/projects';

const iconMap: Record<string, React.ElementType> = {
  Trophy,
  Rocket,
  Star,
  Smartphone,
  Globe,
  Code,
};

const CountUp = ({ target, suffix = "", isVisible }: { target: number; suffix?: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(target * easeOut);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target]);

  return (
    <span>
      {Number.isInteger(target) ? Math.round(count) : count.toFixed(1)}
      {suffix}
    </span>
  );
};

const AchievementsSection = () => {
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
    <section id="achievements" className="section-calm relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <h2 className="fluid-section font-bold mb-4 text-foreground">
            Key <span className="text-primary">Achievements</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Milestones and accomplishments throughout my journey
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon] || Trophy;
            return (
              <div
                key={achievement.label}
                className={`calm-card p-5 text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center bg-primary/10">
                  <Icon size={24} className="text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1 text-primary">
                  <CountUp target={achievement.count} suffix={achievement.suffix || ""} isVisible={isVisible} />
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {achievement.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {achievement.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
