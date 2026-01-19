import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
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

const CountUp = ({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

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
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {Number.isInteger(target) ? Math.round(count) : count.toFixed(1)}
      {suffix}
    </span>
  );
};

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Key <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Milestones and accomplishments throughout my journey
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon] || Trophy;
            return (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="glass-card p-6 text-center group"
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ 
                    background: `${achievement.color}20`,
                    boxShadow: `0 0 0 0 ${achievement.color}40`,
                  }}
                  whileHover={{
                    boxShadow: `0 0 30px ${achievement.color}40`,
                  }}
                >
                  <Icon size={28} style={{ color: achievement.color }} />
                </motion.div>
                <div 
                  className="text-3xl font-bold mb-1"
                  style={{ color: achievement.color }}
                >
                  <CountUp target={achievement.count} suffix={achievement.suffix || ""} />
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  {achievement.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {achievement.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
