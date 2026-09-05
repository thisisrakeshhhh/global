import * as THREE from 'three';

/**
 * Converts Latitude and Longitude to 3D Cartesian coordinates on a sphere.
 * Three.js coordinate system:
 * - Y is Up (North Pole)
 * - X and Z form the equatorial plane
 */
export function latLngToVector3(lat: number, lng: number, radius: number = 2.0): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

/**
 * Calculates a smooth curved 3D arc path between two lat/lng coordinates,
 * arched outward into space like Kaspersky Cybermap attack rays.
 */
export function createCurvedArcPoints(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  globeRadius: number = 2.0,
  altitudeFactor: number = 0.35,
  pointCount: number = 64
): THREE.Vector3[] {
  const startVec = latLngToVector3(startLat, startLng, globeRadius);
  const endVec = latLngToVector3(endLat, endLng, globeRadius);

  // Angular distance between start and end
  const distance = startVec.distanceTo(endVec);

  // Midpoint projected outward from center of sphere
  const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  const midLength = midPoint.length();
  
  // Height depends on distance between points
  const maxHeight = globeRadius + Math.max(0.15, distance * altitudeFactor);
  
  if (midLength > 0.0001) {
    midPoint.normalize().multiplyScalar(maxHeight);
  } else {
    // If antipodal, perturb slightly
    midPoint.set(0, maxHeight, 0);
  }

  // Quadratic / Cubic Bezier curve points
  const curve = new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec);
  return curve.getPoints(pointCount);
}
