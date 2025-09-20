"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Linkedin,
  Mail,
  Github,
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  Contact,
  LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimatedChipProps {
  children: ReactNode;
  color?: "blue" | "purple" | "green" | "orange";
  delay?: number;
}

interface NavButtonProps {
  view: string;
  children: ReactNode;
  icon: LucideIcon;
}

export default function Portfolio() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState("home");

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Enhanced Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    currentMount.appendChild(renderer.domElement);

    // Enhanced particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1200;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    const sizesArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      // Position
      posArray[i * 3] = (Math.random() - 0.5) * 15;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 15;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 15;

      // Color gradient from blue to purple to cyan
      const t = Math.random();
      colorsArray[i * 3] = 0.2 + t * 0.4; // R
      colorsArray[i * 3 + 1] = 0.5 + t * 0.4; // G
      colorsArray[i * 3 + 2] = 0.9; // B

      // Size variation
      sizesArray[i] = Math.random() * 3 + 1;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorsArray, 3)
    );
    particlesGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(sizesArray, 1)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Add floating geometric shapes with glow effect
    const shapes: THREE.Mesh[] = [];
    const shapeGeometries = [
      new THREE.OctahedronGeometry(0.15, 0),
      new THREE.TetrahedronGeometry(0.15, 0),
      new THREE.IcosahedronGeometry(0.12, 0),
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
    ];

    for (let i = 0; i < 20; i++) {
      const geometry =
        shapeGeometries[Math.floor(Math.random() * shapeGeometries.length)];
      const hue = Math.random();
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.6 + hue * 0.3, 0.8, 0.6),
        transparent: true,
        opacity: 0.4,
        wireframe: true,
      });

      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      );
      shape.userData = {
        originalPosition: shape.position.clone(),
        rotationSpeed: Math.random() * 0.02 + 0.005,
        floatSpeed: Math.random() * 0.5 + 0.3,
        floatAmplitude: Math.random() * 0.3 + 0.1,
      };
      shapes.push(shape);
      scene.add(shape);
    }

    camera.position.z = 5;

    // Enhanced animation loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Enhanced particle rotation
      particlesMesh.rotation.y += 0.0008;
      particlesMesh.rotation.x += 0.0005;

      // Animate shapes with more complex movements
      shapes.forEach((shape, index) => {
        const userData = shape.userData;
        shape.rotation.x += userData.rotationSpeed;
        shape.rotation.y += userData.rotationSpeed;
        shape.rotation.z += userData.rotationSpeed * 0.5;

        // Float movement
        shape.position.y =
          userData.originalPosition.y +
          Math.sin(elapsedTime * userData.floatSpeed + index) *
            userData.floatAmplitude;
        shape.position.x =
          userData.originalPosition.x +
          Math.cos(elapsedTime * userData.floatSpeed * 0.7 + index) *
            userData.floatAmplitude *
            0.5;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Custom animated rectangle component for badges
  const AnimatedChip: React.FC<AnimatedChipProps> = ({
    children,
    color = "blue",
    delay = 0,
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.3,
        delay,
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className={`
        relative px-4 py-2 rounded-lg font-medium text-sm cursor-default inline-block
        bg-gradient-to-r backdrop-blur-sm border shadow-lg
        ${
          color === "blue"
            ? "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-200"
            : ""
        }
        ${
          color === "purple"
            ? "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-200"
            : ""
        }
        ${
          color === "green"
            ? "from-green-500/20 to-green-600/20 border-green-500/30 text-green-200"
            : ""
        }
        ${
          color === "orange"
            ? "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-200"
            : ""
        }
        hover:shadow-xl transition-shadow duration-300
      `}
    >
      <div
        className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${
            color === "blue"
              ? "rgba(59, 130, 246, 0.15)"
              : color === "purple"
              ? "rgba(147, 51, 234, 0.15)"
              : color === "green"
              ? "rgba(34, 197, 94, 0.15)"
              : "rgba(249, 115, 22, 0.15)"
          } 0%, transparent 70%)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );

  const experiences = [
    {
      title: "Senior Engineering Manager",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description:
        "Leading a team of 12 engineers across 3 product lines. Architected scalable microservices handling 1M+ daily users.",
      achievements: [
        "40% performance improvement",
        "Team growth from 6 to 12",
        "Zero-downtime deployments",
      ],
    },
    {
      title: "Lead Software Developer",
      company: "Digital Solutions Corp",
      period: "2020 - 2022",
      description:
        "Spearheaded full-stack development of customer-facing applications using React, Node.js, and AWS.",
      achievements: [
        "Led 8-person development team",
        "Reduced load times by 60%",
        "Mentored 5 junior developers",
      ],
    },
    {
      title: "Senior Full Stack Developer",
      company: "StartupName",
      period: "2018 - 2020",
      description:
        "Built MVP from ground up, scaling to 100K users. Implemented CI/CD pipelines and modern development practices.",
      achievements: [
        "0 to 100K users",
        "Built entire tech stack",
        "Established dev culture",
      ],
    },
  ];

  const viewVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 },
  };

  const NavButton: React.FC<NavButtonProps> = ({
    view,
    children,
    icon: Icon,
  }) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        className="border-white/20 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 rounded-full px-6 flex items-center gap-2"
        onClick={() => setActiveView(view)}
      >
        <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
        {children}
      </Button>
    </motion.div>
  );

  const BackButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
      onClick={() => setActiveView("home")}
    >
      <ArrowLeft className="w-5 h-5" />
    </Button>
  );

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden relative">
      <div ref={mountRef} className="fixed inset-0 z-0" />

      <main className="relative z-10 h-full w-full flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {activeView === "home" && (
            <motion.div
              key="home"
              variants={viewVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center max-w-4xl"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-200">
                  Available for new opportunities
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent"
              >
                Alex Johnson
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
              >
                Senior Engineering Manager & Full-Stack Developer
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                Leading high-performance engineering teams to build scalable,
                user-centric applications.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-3"
              >
                <NavButton view="experience" icon={Briefcase}>
                  Experience
                </NavButton>
                <NavButton view="education" icon={GraduationCap}>
                  Education
                </NavButton>
                <NavButton view="contact" icon={Contact}>
                  Contact
                </NavButton>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="text-gray-500 text-sm mt-16"
              >
                © 2024 Alex Johnson. Crafted with passion and Three.js magic.
              </motion.p>
            </motion.div>
          )}

          {activeView === "experience" && (
            <motion.div
              key="experience"
              variants={viewVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-4xl"
            >
              <Card className="relative bg-white/5 backdrop-blur-lg border-white/10 h-[70vh] flex flex-col">
                <div className="absolute top-6 left-6 z-30">
                  <BackButton />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center pt-4">
                    Leadership Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow overflow-y-auto px-8 pb-8 space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-blue-400 mb-2">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-semibold">{exp.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-3 leading-relaxed text-sm">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <AnimatedChip
                            key={achIndex}
                            color={achIndex % 2 === 0 ? "blue" : "purple"}
                            delay={achIndex * 0.1}
                          >
                            {achievement}
                          </AnimatedChip>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeView === "education" && (
            <motion.div
              key="education"
              variants={viewVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-4xl"
            >
              <Card className="relative bg-white/5 backdrop-blur-lg border-white/10 h-[70vh] flex flex-col">
                <div className="absolute top-6 left-6 z-30">
                  <BackButton />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center pt-4">
                    Education & Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow overflow-y-auto p-8 grid md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      Education
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">
                          Master of Computer Science
                        </h4>
                        <p className="text-blue-400 font-medium mb-1">
                          Stanford University
                        </p>
                        <p className="text-gray-400 text-sm">2016 - 2018</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">
                          Bachelor of Software Engineering
                        </h4>
                        <p className="text-blue-400 font-medium mb-1">
                          UC Berkeley
                        </p>
                        <p className="text-gray-400 text-sm">2012 - 2016</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      Core Skills
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-semibold mb-2">
                          Leadership
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <AnimatedChip color="purple" delay={0.1}>
                            Team Building
                          </AnimatedChip>
                          <AnimatedChip color="purple" delay={0.2}>
                            Mentoring
                          </AnimatedChip>
                          <AnimatedChip color="purple" delay={0.3}>
                            Agile
                          </AnimatedChip>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">
                          Technical Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <AnimatedChip color="blue" delay={0.4}>
                            React
                          </AnimatedChip>
                          <AnimatedChip color="blue" delay={0.5}>
                            Node.js
                          </AnimatedChip>
                          <AnimatedChip color="green" delay={0.6}>
                            Python
                          </AnimatedChip>
                          <AnimatedChip color="orange" delay={0.7}>
                            AWS
                          </AnimatedChip>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeView === "contact" && (
            <motion.div
              key="contact"
              variants={viewVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-5xl"
            >
              <Card className="relative bg-white/5 backdrop-blur-lg border-white/10">
                <div className="absolute top-6 left-6 z-30">
                  <BackButton />
                </div>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center pt-4">
                    Let&apos;s Connect
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 md:p-12">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-gray-300 mb-10 max-w-lg mx-auto"
                  >
                    Ready to discuss opportunities, collaborate, or just have a
                    chat about technology.
                  </motion.p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        href: "mailto:alex@example.com",
                        icon: Mail,
                        title: "Email",
                        subtitle: "alex@example.com",
                        color: "blue",
                      },
                      {
                        href: "https://linkedin.com/in/alexjohnson",
                        icon: Linkedin,
                        title: "LinkedIn",
                        subtitle: "/in/alexjohnson",
                        color: "purple",
                      },
                      {
                        href: "https://github.com",
                        icon: Github,
                        title: "GitHub",
                        subtitle: "/alexj",
                        color: "gray",
                      },
                    ].map((item, index) => (
                      <motion.a
                        key={item.title}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`
                          group relative block rounded-xl border border-white/10 bg-white/[.02] p-8 text-center transition-all duration-300 
                          hover:border-${item.color}-400/50 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-${item.color}-500/50
                        `}
                      >
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(circle at center, ${
                              item.color === "blue"
                                ? "rgba(59, 130, 246, 0.1)"
                                : item.color === "purple"
                                ? "rgba(147, 51, 234, 0.1)"
                                : "rgba(156, 163, 175, 0.1)"
                            } 0%, transparent 70%)`,
                          }}
                        />
                        <div className="relative">
                          <item.icon
                            className={`mx-auto mb-4 h-10 w-10 text-${item.color}-400 transition-transform duration-300 group-hover:scale-110`}
                          />
                          <h3 className="text-xl font-semibold text-white">
                            {item.title}
                          </h3>
                          <p className={`mt-1 text-sm text-${item.color}-300`}>
                            {item.subtitle}
                          </p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
