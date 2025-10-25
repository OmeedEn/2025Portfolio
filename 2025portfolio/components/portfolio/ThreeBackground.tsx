"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { createDataStream, createCSObjects } from "@/lib/three/sceneObjects";
import {
  animateDataStream,
  animateCSObjects,
  MouseRef,
} from "@/lib/three/animations";

interface ThreeBackgroundProps {
  mouseRef: React.MutableRefObject<MouseRef>;
  raycasterRef: React.MutableRefObject<THREE.Raycaster>;
  intersectedObjectRef: React.MutableRefObject<THREE.Object3D | null>;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  mouseRef,
  raycasterRef,
  intersectedObjectRef,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

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

    // Initialize raycaster and mouse
    const raycaster = new THREE.Raycaster();
    raycasterRef.current = raycaster;
    const mouse = new THREE.Vector2();

    // Create scene objects
    const dataStream = createDataStream();
    scene.add(dataStream);

    const csObjects = createCSObjects(scene);
    camera.position.z = 5;

    // Mouse interaction handlers
    const onMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      mouseRef.current = { x: mouse.x, y: mouse.y };

      // Update raycaster
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections
      const intersects = raycaster.intersectObjects(csObjects);

      if (intersects.length > 0) {
        const intersected = intersects[0].object;

        if (intersectedObjectRef.current !== intersected) {
          // Reset previous object
          if (intersectedObjectRef.current) {
            intersectedObjectRef.current.scale.setScalar(1);
          }

          // Scale up new intersected object
          intersected.scale.setScalar(1.2);
          intersectedObjectRef.current = intersected;
          currentMount.style.cursor = "pointer";
        }
      } else {
        // Reset if no intersection
        if (intersectedObjectRef.current) {
          intersectedObjectRef.current.scale.setScalar(1);
          intersectedObjectRef.current = null;
          currentMount.style.cursor = "default";
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Enhanced animation loop with mouse interaction
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate scene objects
      animateDataStream(dataStream, elapsedTime);
      animateCSObjects(csObjects, elapsedTime, mouseRef.current);

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
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();

      // Reset cursor
      if (currentMount) {
        currentMount.style.cursor = "default";
      }
    };
  }, [mouseRef, raycasterRef, intersectedObjectRef]);

  return <div ref={mountRef} className="fixed inset-0" style={{ zIndex: 2 }} />;
};
