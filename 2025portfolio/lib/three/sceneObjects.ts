import * as THREE from "three";

export interface ObjectUserData {
  originalPosition: THREE.Vector3;
  rotationSpeed: number;
  floatSpeed: number;
  floatAmplitude: number;
  type: string;
  mouseInfluence: number;
}

export const createDataStream = (): THREE.Points => {
  const geometry = new THREE.BufferGeometry();
  const particleCount = 800;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  // Binary data stream effect
  for (let i = 0; i < particleCount; i++) {
    // Create flowing data streams
    positions[i * 3] = (Math.random() - 0.5) * 20; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z

    // Green/blue matrix-like colors
    const colorVariant = Math.random();
    if (colorVariant < 0.7) {
      // Green matrix colors
      colors[i * 3] = 0.1; // R
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G
      colors[i * 3 + 2] = 0.2; // B
    } else {
      // Blue circuit colors
      colors[i * 3] = 0.1; // R
      colors[i * 3 + 1] = 0.4; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
    }

    sizes[i] = Math.random() * 4 + 1;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });

  return new THREE.Points(geometry, material);
};

export const createCSObjects = (scene: THREE.Scene): THREE.Mesh[] => {
  const objects: THREE.Mesh[] = [];

  // Binary cubes (representing data)
  for (let i = 0; i < 15; i++) {
    const size = Math.random() * 0.3 + 0.1;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.3 + Math.random() * 0.2, 0.8, 0.6),
      transparent: true,
      opacity: 0.7,
      wireframe: true,
    });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15
    );

    cube.userData = {
      originalPosition: cube.position.clone(),
      rotationSpeed: Math.random() * 0.02 + 0.005,
      floatSpeed: Math.random() * 0.5 + 0.3,
      floatAmplitude: Math.random() * 0.5 + 0.2,
      type: "data",
      mouseInfluence: Math.random() * 2 + 1,
    };

    objects.push(cube);
    scene.add(cube);
  }

  // Network nodes (octahedrons)
  for (let i = 0; i < 10; i++) {
    const geometry = new THREE.OctahedronGeometry(0.2, 0);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.6, 0.9, 0.7),
      transparent: true,
      opacity: 0.8,
      wireframe: true,
    });

    const node = new THREE.Mesh(geometry, material);
    node.position.set(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12
    );

    node.userData = {
      originalPosition: node.position.clone(),
      rotationSpeed: Math.random() * 0.03 + 0.01,
      floatSpeed: Math.random() * 0.4 + 0.2,
      floatAmplitude: Math.random() * 0.3 + 0.1,
      type: "network",
      mouseInfluence: Math.random() * 3 + 2,
    };

    objects.push(node);
    scene.add(node);
  }

  // Algorithm trees (tetrahedrons)
  for (let i = 0; i < 8; i++) {
    const geometry = new THREE.TetrahedronGeometry(0.15, 0);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.8, 0.8, 0.6),
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    });

    const tree = new THREE.Mesh(geometry, material);
    tree.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );

    tree.userData = {
      originalPosition: tree.position.clone(),
      rotationSpeed: Math.random() * 0.025 + 0.01,
      floatSpeed: Math.random() * 0.6 + 0.4,
      floatAmplitude: Math.random() * 0.4 + 0.2,
      type: "algorithm",
      mouseInfluence: Math.random() * 2.5 + 1.5,
    };

    objects.push(tree);
    scene.add(tree);
  }

  return objects;
};
