import React, { useState, useEffect, useRef } from 'react';
import { 
  Cloud, Server, Code, GitBranch, Database, Shield, 
  Award, Terminal, Cpu, HardDrive, Network, Zap,
  Github, Linkedin, Mail, ExternalLink, ChevronRight,
  Monitor, Activity, Lock, Layers, Box, BookOpen,
  Calendar, TrendingUp, Users, Clock, CheckCircle
} from 'lucide-react';

export default function EnhancedPortfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const [metrics, setMetrics] = useState({});
  const [skills, setSkills] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('cloud');
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [timelineItems, setTimelineItems] = useState([]);
  
  // 3D tilt effect refs
  const tiltRefs = useRef([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In production, replace with actual API URL
        setMetrics({
          projects_completed: 20,
          uptime_percentage: 99.9,
          tickets_resolved: 15000,
          automation_scripts: 50,
          lines_of_code: 125000,
          containers_deployed: 200,
          time_saved_weekly: 40,
          portfolio_views: 1234
        });
        
        setSkills({
          cloud: {
            category: "Cloud Platforms",
            skills: [
              {name: "AWS", level: 90, years: 4},
              {name: "Google Cloud", level: 85, years: 3},
              {name: "Azure", level: 88, years: 5}
            ]
          },
          automation: {
            category: "Automation",
            skills: [
              {name: "Python", level: 95, years: 6},
              {name: "Ansible", level: 90, years: 5},
              {name: "Terraform", level: 88, years: 4}
            ]
          },
          infrastructure: {
            category: "Infrastructure",
            skills: [
              {name: "Kubernetes", level: 92, years: 4},
              {name: "Docker", level: 94, years: 5},
              {name: "VMware", level: 90, years: 6}
            ]
          }
        });
        
        setTimelineItems([
          { date: "2024-01", type: "award", title: "Innovation Award", description: "Power monitoring solution" },
          { date: "2023-07", type: "certification", title: "Google Cloud Professional Architect", description: "Achieved GCP certification" },
          { date: "2022-03", type: "career", title: "Joined Dell Technologies", description: "Lab Support Engineer 2" }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Advanced typing animation
  useEffect(() => {
    const texts = [
      "Automating Infrastructure at Scale",
      "Building Resilient Cloud Solutions",
      "Optimizing Enterprise Storage",
      "Deploying Kubernetes Clusters",
      "Creating Monitoring Dashboards"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeInterval = setInterval(() => {
      const currentText = texts[textIndex];
      
      if (!isDeleting) {
        setTypedText(currentText.substring(0, charIndex + 1));
        charIndex++;
        
        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(() => {}, 1500);
        }
      } else {
        setTypedText(currentText.substring(0, charIndex - 1));
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }
    }, isDeleting ? 50 : 100);
    
    // Cursor blink
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3D Tilt Effect
  const handleTilt = (e, index) => {
    const card = tiltRefs.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const resetTilt = (index) => {
    const card = tiltRefs.current[index];
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
  };

  // Animated counter component
  const AnimatedCounter = ({ value, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = parseFloat(value);
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start > end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(parseFloat(start.toFixed(1)));
            }
          }, 16);
        }
      });
      
      if (countRef.current) {
        observer.observe(countRef.current);
      }
      
      return () => observer.disconnect();
    }, [value]);
    
    return (
      <span ref={countRef}>
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  // Skill bar animation component
  const SkillBar = ({ skill }) => {
    const [width, setWidth] = useState(0);
    const barRef = useRef(null);
    
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setWidth(skill.level), 100);
        }
      });
      
      if (barRef.current) {
        observer.observe(barRef.current);
      }
      
      return () => observer.disconnect();
    }, [skill.level]);
    
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{skill.name}</span>
          <span className="text-sm text-gray-400">{skill.years} years</span>
        </div>
        <div ref={barRef} className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${width}%` }}
          >
            <span className="sr-only">{skill.level}%</span>
          </div>
        </div>
      </div>
    );
  };

  const projects = [
    {
      id: 1,
      title: "Security Vulnerability Tracker",
      description: "JavaScript application automating vulnerability tracking, reducing manual tagging time by 80%",
      impact: "Saved 20 hours weekly",
      tech: ["JavaScript", "REST API", "Automation"],
      icon: <Shield className="w-8 h-8" />,
      gradient: "from-red-500 to-orange-500",
      metrics: { time_saved: "80%", assets_tracked: 500 }
    },
    {
      id: 2,
      title: "Power Monitoring Stack",
      description: "Real-time power monitoring for 100+ server racks with alerting capabilities",
      impact: "25% reduction in planning time",
      tech: ["Grafana", "Prometheus", "Python", "API Integration"],
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-yellow-500 to-orange-500",
      metrics: { racks_monitored: 100, cost_savings: "$50K/year" }
    },
    {
      id: 3,
      title: "Infrastructure Monitoring Platform",
      description: "Centralized React & Flask app for automation and monitoring critical systems",
      impact: "Unified 10+ tools into one platform",
      tech: ["React", "Flask", "InfluxDB", "REST API"],
      icon: <Monitor className="w-8 h-8" />,
      gradient: "from-blue-500 to-purple-500",
      metrics: { tools_integrated: 10, mttr_improvement: "60%" }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <Server className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      )}

      {/* Parallax Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          style={{
            right: `${mousePosition.x * -0.05}px`,
            bottom: `${mousePosition.y * -0.05}px`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-xl z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Terminal className="w-6 h-6 text-blue-400" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Aman Patel
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {['Skills', 'Projects', 'Timeline', 'Blog', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-300 hover:text-white transition-colors group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <a
                href="https://github.com/yourgithub"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Typing Effect */}
      <section className="min-h-screen flex items-center justify-center relative px-4">
        <div className="max-w-6xl mx-auto text-center z-10">
          <div className="mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/30 mb-6 hover:scale-110 transition-transform">
              <Cpu className="w-16 h-16 text-blue-400" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Automation & Infrastructure
              </span>
            </h1>
            
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-2xl md:text-3xl text-gray-300">
                {typedText}
                <span className={`ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
              </h2>
            </div>
          </div>

          {/* Live Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-blue-500/50 transition-all">
              <TrendingUp className="w-6 h-6 text-blue-400 mb-2" />
              <div className="text-2xl font-bold">
                <AnimatedCounter value={metrics.uptime_percentage || 99.9} suffix="%" />
              </div>
              <div className="text-xs text-gray-400">Uptime</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-all">
              <Code className="w-6 h-6 text-purple-400 mb-2" />
              <div className="text-2xl font-bold">
                <AnimatedCounter value={metrics.lines_of_code || 125000} />
              </div>
              <div className="text-xs text-gray-400">Lines of Code</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-green-500/50 transition-all">
              <Clock className="w-6 h-6 text-green-400 mb-2" />
              <div className="text-2xl font-bold">
                <AnimatedCounter value={metrics.time_saved_weekly || 40} suffix="h" />
              </div>
              <div className="text-xs text-gray-400">Hours Saved/Week</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-pink-500/50 transition-all">
              <Box className="w-6 h-6 text-pink-400 mb-2" />
              <div className="text-2xl font-bold">
                <AnimatedCounter value={metrics.containers_deployed || 200} />
              </div>
              <div className="text-xs text-gray-400">Containers</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#contact" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2 hover:scale-105">
              Get In Touch <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#projects" className="px-6 py-3 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition-all flex items-center gap-2 hover:scale-105">
              View Projects <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section with Animated Bars */}
      <section id="skills" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Technical Expertise</h2>
          
          <div className="flex justify-center gap-4 mb-8">
            {Object.keys(skills).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedSkillCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedSkillCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {skills[category]?.category || category}
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            {skills[selectedSkillCategory]?.skills.map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section with 3D Tilt */}
      <section id="projects" className="py-20 px-4 bg-gray-800/30 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={el => tiltRefs.current[index] = el}
                className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all cursor-pointer"
                onMouseMove={(e) => handleTilt(e, index)}
                onMouseLeave={() => resetTilt(index)}
                style={{ transition: 'transform 0.1s ease-out' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 hover:opacity-10 transition-opacity`}></div>
                
                <div className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${project.gradient} rounded-xl`}>
                      {project.icon}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors transform group-hover:translate-x-1" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <Award className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">{project.impact}</span>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-bold text-white">{value}</span>
                        <div>{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs px-2 py-1 bg-gray-800 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section id="timeline" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Journey Timeline</h2>
          
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            {timelineItems.map((item, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all hover:scale-105">
                    <div className="text-sm text-gray-400 mb-2">{item.date}</div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ring-4 ring-gray-900"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-800/30 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-xl text-gray-300 mb-12">
            Ready to discuss infrastructure automation, cloud architecture, or exciting tech opportunities
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="mailto:Ahpat31@gmail.com"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            <a 
              href="https://linkedin.com/in/amanthepythonman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all hover:scale-105"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a 
              href="https://github.com/yourgithub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all hover:scale-105"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  );
}
