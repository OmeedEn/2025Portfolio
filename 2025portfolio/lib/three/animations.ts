import * as THREE from "three";
import { ObjectUserData } from "./sceneObjects";

export interface MouseRef {
  x: number;
  y: number;
}

export const animateDataStream = (
  dataStream: THREE.Points,
  elapsedTime: number
): void => {
  dataStream.rotation.y += 0.003;
  dataStream.rotation.x += 0.001;

  const positions = dataStream.geometry.attributes.position.array as Float32Array;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] += Math.sin(elapsedTime * 0.001 + positions[i]) * 0.02;
    positions[i] += Math.cos(elapsedTime * 0.0005 + positions[i + 2]) * 0.01;
  }
  dataStream.geometry.attributes.position.needsUpdate = true;
};

export const animateCSObjects = (
  csObjects: THREE.Mesh[],
  elapsedTime: number,
  mouseRef: MouseRef
): void => {
  csObjects.forEach((object: THREE.Mesh, index: number) => {
    const userData = object.userData as ObjectUserData;

    // Basic rotation
    object.rotation.x += userData.rotationSpeed;
    object.rotation.y += userData.rotationSpeed;
    object.rotation.z += userData.rotationSpeed * 0.5;

    // Floating movement
    const baseY =
      userData.originalPosition.y +
      Math.sin(elapsedTime * userData.floatSpeed + index) *
        userData.floatAmplitude;
    const baseX =
      userData.originalPosition.x +
      Math.cos(elapsedTime * userData.floatSpeed * 0.7 + index) *
        userData.floatAmplitude *
        0.5;

    // Mouse interaction - objects are attracted to mouse
    const mouseInfluence = userData.mouseInfluence;
    const mouseStrength = 0.4;

    // Convert mouse position to 3D world coordinates
    const mouseVector = new THREE.Vector3(
      mouseRef.x * 4,
      mouseRef.y * 4,
      0
    );

    // Calculate distance to mouse
    const distance = object.position.distanceTo(mouseVector);
    const maxDistance = 7;

    if (distance < maxDistance) {
      // Create attraction effect
      const attraction = (maxDistance - distance) / maxDistance;
      const direction = mouseVector
        .clone()
        .sub(object.position)
        .normalize();

      object.position.x =
        baseX + direction.x * attraction * mouseInfluence * mouseStrength;
      object.position.y =
        baseY + direction.y * attraction * mouseInfluence * mouseStrength;
    } else {
      // Return to original floating position
      object.position.x += (baseX - object.position.x) * 0.03;
      object.position.y += (baseY - object.position.y) * 0.03;
    }
  });
};
