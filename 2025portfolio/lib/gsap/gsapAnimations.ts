import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin, DrawSVGPlugin, SplitText);
}

// Magnetic button effect
export const createMagneticEffect = (element: HTMLElement, strength: number = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// Staggered text reveal with split text
export const animateTextReveal = (element: HTMLElement, delay: number = 0) => {
  const split = new SplitText(element, { type: "chars,words,lines" });
  
  gsap.from(split.chars, {
    opacity: 0,
    y: 50,
    rotateX: -90,
    stagger: 0.02,
    duration: 0.8,
    delay,
    ease: "back.out(1.7)",
  });

  return split;
};

// Glitch text effect
export const createGlitchEffect = (element: HTMLElement) => {
  const originalText = element.textContent || "";
  const glitchChars = "!<>-_\\/[]{}—=+*^?#________";

  const glitch = () => {
    let iterations = 0;
    const maxIterations = originalText.length;

    const interval = setInterval(() => {
      element.textContent = originalText
        .split("")
        .map((char, index) => {
          if (index < iterations) {
            return originalText[index];
          }
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        })
        .join("");

      iterations += 1 / 3;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        element.textContent = originalText;
      }
    }, 30);
  };

  return glitch;
};

// Parallax scroll effect
export const createParallaxScroll = (
  element: HTMLElement,
  speed: number = 0.5,
  direction: "vertical" | "horizontal" = "vertical"
) => {
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * speed;

    if (direction === "vertical") {
      gsap.to(element, {
        y: rate,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        x: rate,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
};

// 3D card tilt effect
export const create3DTilt = (card: HTMLElement) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  card.addEventListener("mousemove", handleMouseMove);
  card.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    card.removeEventListener("mousemove", handleMouseMove);
    card.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// Morphing blob background
export const createMorphingBlob = (svgPath: SVGPathElement, paths: string[]) => {
  let currentIndex = 0;

  const morph = () => {
    const nextIndex = (currentIndex + 1) % paths.length;
    
    gsap.to(svgPath, {
      duration: 2,
      morphSVG: paths[nextIndex],
      ease: "power1.inOut",
      onComplete: () => {
        currentIndex = nextIndex;
        morph();
      },
    });
  };

  morph();
};

// Liquid cursor trail
export const createLiquidCursor = (container: HTMLElement) => {
  const cursor = document.createElement("div");
  cursor.className = "liquid-cursor";
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59,130,246,0.8), rgba(147,51,234,0.4));
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
    filter: blur(3px);
  `;
  container.appendChild(cursor);

  const handleMouseMove = (e: MouseEvent) => {
    gsap.to(cursor, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  document.addEventListener("mousemove", handleMouseMove);

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
    container.removeChild(cursor);
  };
};

// Stagger fade in cards
export const staggerFadeIn = (elements: HTMLElement[], options = {}) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 60,
    scale: 0.9,
    rotation: -5,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out",
    ...options,
  });
};

// Wave text animation
export const createWaveText = (element: HTMLElement) => {
  const split = new SplitText(element, { type: "chars" });
  
  gsap.to(split.chars, {
    y: -10,
    stagger: {
      each: 0.05,
      repeat: -1,
      yoyo: true,
    },
    duration: 0.5,
    ease: "sine.inOut",
  });

  return split;
};

// Infinite scroll ticker
export const createInfiniteScroll = (container: HTMLElement, speed: number = 50) => {
  const clone = container.cloneNode(true) as HTMLElement;
  container.parentElement?.appendChild(clone);

  const tl = gsap.timeline({ repeat: -1 });
  tl.to([container, clone], {
    x: `-=${container.offsetWidth}`,
    duration: speed,
    ease: "none",
  });

  return tl;
};

// Button ripple effect
export const createRippleEffect = (button: HTMLElement, color: string = "rgba(255,255,255,0.5)") => {
  const handleClick = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
    `;

    button.appendChild(ripple);

    gsap.to(ripple, {
      scale: 2,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => ripple.remove(),
    });
  };

  button.addEventListener("click", handleClick);
  return () => button.removeEventListener("click", handleClick);
};

// Elastic scale on hover
export const createElasticHover = (element: HTMLElement) => {
  const handleMouseEnter = () => {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  element.addEventListener("mouseenter", handleMouseEnter);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mouseenter", handleMouseEnter);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};
