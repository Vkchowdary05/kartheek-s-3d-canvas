export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string[];
  techStack: string[];
  highlights: string[];
  links: {
    live: string | null;
    github: string | null;
    apk: string | null;
  };
  colors: {
    primary: string;
    accent: string;
  };
}

export const projects: Project[] = [
  {
    id: "exam-ready-web",
    name: "Exam Ready",
    tagline: "AI-Powered Exam Paper Platform",
    description: "Full-stack web app enabling students to upload, search, and analyze past exam papers with OCR text extraction and AI-powered topic frequency analysis.",
    category: ["Web", "Full-Stack", "AI-Powered"],
    techStack: ["Next.js", "TypeScript", "MongoDB", "Tesseract.js", "Groq AI", "Cloudinary"],
    highlights: [
      "OCR text extraction from images",
      "AI topic analysis with Groq LLM",
      "Gamification with badges & leaderboards",
      "4 theme system",
      "Real-time search & filtering"
    ],
    links: {
      live: "https://exam-ready-15-jvzs-hrk28xuy1-venakata-kartheeks-projects.vercel.app/",
      github: "https://github.com/Vkchowdary05/Exam-ready-15",
      apk: null
    },
    colors: { primary: "#6366F1", accent: "#8B5CF6" }
  },
  {
    id: "exam-ready-mobile",
    name: "Exam Ready Mobile",
    tagline: "AI-Powered Exam Prep Flutter App",
    description: "Multi-platform Flutter app for uploading, searching & analyzing past exam papers. Features on-device OCR, Groq LLM topic extraction, and Firebase backend.",
    category: ["Mobile", "AI-Powered", "Full-Stack"],
    techStack: ["Flutter", "Dart", "Firebase", "Google ML Kit", "Groq AI", "Cloudinary", "Riverpod"],
    highlights: [
      "On-device OCR with Google ML Kit",
      "AI topic extraction via Groq LLM",
      "Cross-platform (Android, iOS, Web)",
      "Real-time Firestore search",
      "Automated question paper pipeline"
    ],
    links: {
      live: null,
      github: "https://github.com/Vkchowdary05/exam-ready-13",
      apk: "https://github.com/Vkchowdary05/exam-ready-13/releases/download/v1.0.0/app-release.apk"
    },
    colors: { primary: "#02569B", accent: "#6366F1" }
  },
  {
    id: "gym-remo",
    name: "Gym Remo",
    tagline: "Muscle-Based Fitness Tracker",
    description: "Production-ready fitness tracking app aggregating workouts into muscle group progress with intelligent strength calculations and recovery status.",
    category: ["Web", "Full-Stack"],
    techStack: ["Next.js", "TypeScript", "Firebase", "Recharts", "Tailwind CSS"],
    highlights: [
      "7 muscle groups tracked",
      "Strength level calculations",
      "Nike-inspired UI with 5 themes",
      "Push/pull balance detection",
      "Workout history & personal records"
    ],
    links: {
      live: "https://gym-remo.vercel.app/",
      github: "https://github.com/Vkchowdary05/gym_remo",
      apk: null
    },
    colors: { primary: "#10B981", accent: "#3B82F6" }
  },
  {
    id: "marketplace-api",
    name: "Marketplace API",
    tagline: "Multi-Role E-Commerce Backend",
    description: "Production-style Node.js backend with 4 user roles, JWT authentication, and AI-powered seller recommendations.",
    category: ["Full-Stack", "AI-Powered"],
    techStack: ["Node.js", "Express.js", "MySQL", "Sequelize", "JWT", "Swagger"],
    highlights: [
      "4 user roles (Seller, Customer, Delivery, Salesman)",
      "15+ secure JWT routes",
      "AI seller recommendations",
      "Delivery route optimization",
      "Complaint categorization AI"
    ],
    links: {
      live: null,
      github: "https://github.com/Vkchowdary05/node-mysql-marketplace-api",
      apk: null
    },
    colors: { primary: "#F59E0B", accent: "#EF4444" }
  },
  {
    id: "quote-builder",
    name: "Quote Builder System",
    tagline: "Dynamic Quotation Generator",
    description: "Flutter app with Node.js backend for creating professional quotes with real-time calculations, PDF preview, and offline persistence.",
    category: ["Mobile", "Full-Stack"],
    techStack: ["Flutter", "BLoC", "Node.js", "Express.js", "Material 3"],
    highlights: [
      "Multi-item quote builder",
      "Tax/discount automation",
      "PDF preview generation",
      "Material 3 UI with dark mode",
      "Offline JSON storage"
    ],
    links: {
      live: null,
      github: "https://github.com/Vkchowdary05/quote-builder-backend",
      apk: "https://github.com/Vkchowdary05/quote-builder-backend/releases/download/v1.0.0/app-release.apk"
    },
    colors: { primary: "#8B5CF6", accent: "#EC4899" }
  },
  {
    id: "grievance-system",
    name: "Grievance Redressal",
    tagline: "Citizen-Officer Platform",
    description: "Flutter app with Firebase backend enabling citizens to raise complaints with real-time tracking, push notifications, and AI-based spam detection.",
    category: ["Mobile", "AI-Powered"],
    techStack: ["Flutter", "Firebase", "Supabase", "Gemini API"],
    highlights: [
      "Grievance lifecycle tracking",
      "Real-time status updates",
      "AI spam detection",
      "Auto-location & image uploads",
      "Upvote system"
    ],
    links: {
      live: null,
      github: "https://github.com/Vkchowdary05/grievance-redressal-system",
      apk: null
    },
    colors: { primary: "#0EA5E9", accent: "#10B981" }
  },
  {
    id: "text-editor",
    name: "Text Editor",
    tagline: "Offline-Capable Android App",
    description: "Lightweight Flutter text editor supporting create, edit, save, and view operations with optimized memory usage and fast load times.",
    category: ["Mobile"],
    techStack: ["Flutter", "Local Storage"],
    highlights: [
      "Complete CRUD operations",
      "Offline-first architecture",
      "Optimized memory usage",
      "Fast load times",
      "Material design"
    ],
    links: {
      live: null,
      github: "https://github.com/Vkchowdary05/text-editor",
      apk: "https://github.com/Vkchowdary05/text-editor/releases/download/v1.0.0/app-release.apk"
    },
    colors: { primary: "#64748B", accent: "#3B82F6" }
  },
  {
    id: "library-manager",
    name: "Library Manager",
    tagline: "Complete Library Workflow System",
    description: "Python-based library management system with book tracking, borrowing cycles, fine calculations, and optimized SQL queries.",
    category: ["Full-Stack"],
    techStack: ["Python", "MySQL", "SQL"],
    highlights: [
      "Book management CRUD",
      "Borrowing cycle tracking",
      "Automated fine calculations",
      "Optimized SQL queries",
      "Reporting system"
    ],
    links: {
      live: null,
      github: "https://github.com/Vkchowdary05/library-manager",
      apk: null
    },
    colors: { primary: "#059669", accent: "#F59E0B" }
  },
  {
    id: "cancer-awareness",
    name: "Cancer Awareness",
    tagline: "Educational Health Platform",
    description: "Informative website raising cancer awareness with educational content, prevention tips, and resource links.",
    category: ["Web"],
    techStack: ["React", "Next.js", "Tailwind CSS"],
    highlights: [
      "Comprehensive cancer information",
      "Prevention & treatment guides",
      "Responsive design",
      "Accessible UI",
      "Fast performance"
    ],
    links: {
      live: "https://cancer-awareness-gilt-psi.vercel.app/",
      github: "https://github.com/Vkchowdary05/cancer-awareness",
      apk: null
    },
    colors: { primary: "#EC4899", accent: "#8B5CF6" }
  }
];

export const skills = {
  Languages: [
    { name: "JavaScript/TypeScript", level: 75 },
    { name: "Java", level: 70 },
    { name: "Python", level: 70 },
    { name: "Dart", level: 75 }
  ],
  Frontend: [
    { name: "React/Next.js", level: 80 },
    { name: "Flutter", level: 85 },
    { name: "HTML/CSS", level: 90 },
    { name: "Tailwind CSS", level: 85 }
  ],
  Backend: [
    { name: "Node.js/Express", level: 80 },
    { name: "REST APIs", level: 85 },
    { name: "Firebase", level: 80 },
    { name: "MongoDB", level: 70 }
  ],
  "Tools & Cloud": [
    { name: "Git/GitHub", level: 85 },
    { name: "Cloudinary", level: 75 },
    { name: "Postman", level: 80 },
    { name: "Vercel/Render", level: 75 }
  ]
};

export const achievements = [
  { icon: "Trophy", count: 2, label: "SIH Finalist", description: "Smart India Hackathon", color: "#F59E0B" },
  { icon: "Rocket", count: 10, suffix: "+", label: "Production Apps", description: "Deployed to Web & Mobile", color: "#6366F1" },
  { icon: "Star", count: 8.5, label: "CGPA", description: "Academic Excellence", color: "#10B981" },
  { icon: "Smartphone", count: 6, label: "Flutter Apps", description: "Published & Live", color: "#02569B" },
  { icon: "Globe", count: 3, label: "Web Apps", description: "Full-Stack Projects", color: "#8B5CF6" },
  { icon: "Code", count: 8, suffix: "+", label: "Tech Stacks", description: "Mastered", color: "#EC4899" }
];

export const timeline = [
  { year: "2022", title: "Started B.Tech CSE", description: "Began Computer Science Engineering at Vidya Jyothi Institute of Technology, Hyderabad", icon: "GraduationCap", color: "#6366F1" },
  { year: "2023", title: "Smart India Hackathon Finalist", description: "First-time finalist in India's largest hackathon with innovative solution", icon: "Trophy", color: "#10B981" },
  { year: "2024", title: "Smart India Hackathon Finalist (2nd)", description: "Second consecutive year as SIH finalist, showcasing consistent excellence", icon: "Award", color: "#F59E0B" },
  { year: "2024", title: "10+ Production Apps Built", description: "Developed and deployed diverse portfolio of web and mobile applications", icon: "Rocket", color: "#8B5CF6" },
  { year: "2025", title: "Seeking Internship", description: "Looking for full-stack development internship to apply skills in real-world scenarios", icon: "Briefcase", color: "#EC4899" }
];
