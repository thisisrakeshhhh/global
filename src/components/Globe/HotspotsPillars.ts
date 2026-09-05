import * as THREE from 'three';
import { COUNTRY_CLIMATE_DATA, CountryClimateProfile } from '../../data/climateData';
import { TIPPING_POINTS, TippingPoint } from '../../data/tippingPoints';
import { latLngToVector3 } from '../../utils/geoHelpers';

export interface InteractiveEntity {
  type: 'country' | 'tipping_point';
  data: CountryClimateProfile | TippingPoint;
  position: THREE.Vector3;
}

export class HotspotsPillarsManager {
  private group: THREE.Group;
  private rippleRings: { mesh: THREE.Mesh; initialScale: number; speed: number }[] = [];
  public interactiveObjects: { mesh: THREE.Object3D; entity: InteractiveEntity }[] = [];

  constructor(globeRadius: number = 1.95) {
    this.group = new THREE.Group();
    this.buildCountryPillars(globeRadius);
    this.buildTippingPointPins(globeRadius);
  }

  public getMeshGroup(): THREE.Group {
    return this.group;
  }

  private buildCountryPillars(globeRadius: number) {
    COUNTRY_CLIMATE_DATA.forEach((country) => {
      const surfacePos = latLngToVector3(country.lat, country.lng, globeRadius);
      const normal = surfacePos.clone().normalize();

      // Slender cybernetic pillar
      const height = Math.min(0.45, 0.08 + (country.emissionsGt / 13) * 0.35);
      const pillarGeo = new THREE.CylinderGeometry(0.008, 0.016, height, 8);
      pillarGeo.translate(0, height / 2, 0);

      const colorHex = country.tempAnomaly >= 2.2 ? 0xff0055 : country.tempAnomaly >= 1.7 ? 0xff7700 : 0x00f0ff;
      const pillarMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });

      const pillarMesh = new THREE.Mesh(pillarGeo, pillarMat);
      pillarMesh.position.copy(surfacePos);
      pillarMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      this.group.add(pillarMesh);

      // Glowing tip sphere
      const tipGeo = new THREE.SphereGeometry(0.024, 8, 8);
      const tipMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        blending: THREE.AdditiveBlending
      });
      const tipMesh = new THREE.Mesh(tipGeo, tipMat);
      tipMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(height)));
      this.group.add(tipMesh);

      // Interactive hit sphere
      const hitSphereGeo = new THREE.SphereGeometry(0.09, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitSphereGeo, hitMat);
      hitMesh.position.copy(tipMesh.position);
      this.group.add(hitMesh);

      this.interactiveObjects.push({
        mesh: hitMesh,
        entity: {
          type: 'country',
          data: country,
          position: surfacePos
        }
      });

      // Subtle base concentric pulse ring
      const ringGeo = new THREE.RingGeometry(0.02, 0.035, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.003)));
      ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      this.group.add(ringMesh);

      this.rippleRings.push({
        mesh: ringMesh,
        initialScale: 1.0,
        speed: 0.015
      });
    });
  }

  private buildTippingPointPins(globeRadius: number) {
    TIPPING_POINTS.forEach((tp) => {
      const surfacePos = latLngToVector3(tp.lat, tp.lng, globeRadius);
      const normal = surfacePos.clone().normalize();

      // Sharp glowing octahedron diamond
      const pinGeo = new THREE.OctahedronGeometry(0.04, 0);
      const pinColor = new THREE.Color(tp.color);
      const pinMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        wireframe: true
      });

      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      const pinAltitude = 0.1;
      pinMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(pinAltitude)));
      this.group.add(pinMesh);

      // Hit-box
      const hitGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(pinMesh.position);
      this.group.add(hitMesh);

      this.interactiveObjects.push({
        mesh: hitMesh,
        entity: {
          type: 'tipping_point',
          data: tp,
          position: surfacePos
        }
      });

      // Pulsing radar ring
      const rippleGeo = new THREE.RingGeometry(0.03, 0.05, 20);
      const rippleMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      const rippleMesh = new THREE.Mesh(rippleGeo, rippleMat);
      rippleMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.004)));
      rippleMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      this.group.add(rippleMesh);

      this.rippleRings.push({
        mesh: rippleMesh,
        initialScale: 1.0,
        speed: 0.02
      });
    });
  }

  public update(time: number) {
    this.rippleRings.forEach((ring, idx) => {
      const phase = (time * 1.8 + idx * 0.3) % 2.0;
      const scale = 1.0 + phase * 2.0;
      ring.mesh.scale.set(scale, scale, 1);
      (ring.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.7 - phase * 0.35);
    });
  }
}
