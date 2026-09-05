import * as THREE from 'three';
import { EMISSION_FLOWS, EmissionFlow } from '../../data/emissionFlows';
import { createCurvedArcPoints } from '../../utils/geoHelpers';

interface ArcData {
  flow: EmissionFlow;
  points: THREE.Vector3[];
  lineMesh: THREE.Line;
  particleMesh: THREE.Mesh;
  particleProgress: number;
  speed: number;
}

export class EmissionArcsManager {
  private group: THREE.Group;
  private arcs: ArcData[] = [];

  constructor(globeRadius: number = 2.0) {
    this.group = new THREE.Group();
    this.initArcs(globeRadius);
  }

  public getMeshGroup(): THREE.Group {
    return this.group;
  }

  private initArcs(globeRadius: number) {
    // Shared geometry for traveling photon particles
    const particleGeo = new THREE.SphereGeometry(0.035, 12, 12);

    EMISSION_FLOWS.forEach((flow, index) => {
      const points = createCurvedArcPoints(
        flow.sourceLat,
        flow.sourceLng,
        flow.targetLat,
        flow.targetLng,
        globeRadius,
        flow.altitude,
        64
      );

      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

      // Arc curve line material (semi-transparent glowing strand)
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(flow.color),
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });

      const lineMesh = new THREE.Line(curveGeo, lineMat);
      this.group.add(lineMesh);

      // Traveling light particle on the arc
      const particleMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(flow.color),
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
      });

      const particleMesh = new THREE.Mesh(particleGeo, particleMat);
      particleMesh.position.copy(points[0]);
      this.group.add(particleMesh);

      this.arcs.push({
        flow,
        points,
        lineMesh,
        particleMesh,
        particleProgress: (index * 0.15) % 1.0, // Stagger particle starts
        speed: 0.004 + (flow.volumeMt / 5000) * 0.005
      });
    });
  }

  public update() {
    this.arcs.forEach((arc) => {
      arc.particleProgress += arc.speed;
      if (arc.particleProgress >= 1.0) {
        arc.particleProgress = 0.0;
      }

      // Sample position along the curve
      const totalPoints = arc.points.length - 1;
      const indexFloat = arc.particleProgress * totalPoints;
      const lowerIndex = Math.floor(indexFloat);
      const upperIndex = Math.min(totalPoints, lowerIndex + 1);
      const alpha = indexFloat - lowerIndex;

      arc.particleMesh.position.lerpVectors(
        arc.points[lowerIndex],
        arc.points[upperIndex],
        alpha
      );

      // Subtle pulse in particle scale
      const scale = 1.0 + 0.3 * Math.sin(arc.particleProgress * Math.PI * 4);
      arc.particleMesh.scale.set(scale, scale, scale);
    });
  }

  public setVisible(visible: boolean) {
    this.group.visible = visible;
  }
}
