import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    setTimeout(() => setIsVisible(true), 100);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-background to-background" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* 404 */}
        <h1
          className={`text-[10rem] md:text-[12rem] font-bold leading-none tracking-tight text-primary/20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          404
        </h1>

        {/* Message */}
        <div
          className={`mb-10 -mt-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '200ms' }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Page not found
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        {/* Action buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '400ms' }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 btn-primary text-lg"
          >
            <Home size={20} />
            Return Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 btn-secondary text-lg"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Path hint */}
        <p
          className={`mt-12 text-sm text-muted-foreground transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          Attempted path: <code className="text-primary bg-muted px-2 py-1 rounded">{location.pathname}</code>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
