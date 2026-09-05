import * as THREE from 'three';
import { LiveEvent } from '../../types/climateIntelligence';
import { latLngToVector3 } from '../../utils/geoHelpers';

export class LiveEventsLayerManager {
  private group: THREE.Group;
  private globeRadius: number;
  private animatedElements: { mesh: THREE.Mesh; type: string; baseScale: number; speed: number }[] = [];
  public interactiveObjects: { mesh: THREE.Object3D; event: LiveEvent }[] = [];

  constructor(globeRadius: number = 1.95, initialEvents: LiveEvent[] = []) {
    this.group = new THREE.Group();
    this.globeRadius = globeRadius;
    if (initialEvents.length > 0) {
      this.updateEvents(initialEvents);
    }
  }

  public getMeshGroup(): THREE.Group {
    return this.group;
  }

  public updateEvents(events: LiveEvent[]) {
    // Clear existing children
    while (this.group.children.length > 0) {
      const obj = this.group.children[0];
      this.group.remove(obj);
    }
    this.animatedElements = [];
    this.interactiveObjects = [];

    events.forEach((ev) => {
      const surfacePos = latLngToVector3(ev.lat, ev.lng, this.globeRadius);
      const normal = surfacePos.clone().normalize();

      let pinColor = 0xff5500; // Wildfire orange-red
      if (ev.type === 'cyclone') pinColor = 0x00f0ff; // Cyclone electric cyan
      if (ev.type === 'flood') pinColor = 0x3b82f6; // Flood marine blue
      if (ev.type === 'extreme_heat') pinColor = 0xff0055; // Wet-bulb magenta
      if (ev.type === 'volcano') pinColor = 0xe11d48; // Volcano crimson

      // 1. PIN MESH
      let pinGeo: THREE.BufferGeometry;
      if (ev.type === 'cyclone') {
        pinGeo = new THREE.TorusGeometry(0.045, 0.012, 12, 24);
      } else if (ev.type === 'wildfire') {
        pinGeo = new THREE.ConeGeometry(0.025, 0.08, 8);
        pinGeo.translate(0, 0.04, 0);
      } else {
        pinGeo = new THREE.OctahedronGeometry(0.035, 0);
      }

      const pinMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        blending: THREE.AdditiveBlending
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);

      if (ev.type === 'cyclone') {
        pinMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.04)));
        pinMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      } else if (ev.type === 'wildfire') {
        pinMesh.position.copy(surfacePos);
        pinMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      } else {
        pinMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.05)));
      }

      this.group.add(pinMesh);

      // 2. RADAR DETECTION PULSE RING
      const pulseGeo = new THREE.RingGeometry(0.03, 0.05, 24);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.005)));
      pulseMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      this.group.add(pulseMesh);

      this.animatedElements.push({
        mesh: pulseMesh,
        type: 'pulse',
        baseScale: 1.0,
        speed: 0.02
      });

      if (ev.type === 'cyclone') {
        this.animatedElements.push({
          mesh: pinMesh,
          type: 'cyclone_spin',
          baseScale: 1.0,
          speed: 0.05
        });
      }

      // 3. RAYCAST HIT BOX
      const hitGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.06)));
      this.group.add(hitMesh);

      this.interactiveObjects.push({
        mesh: hitMesh,
        event: ev
      });
    });
  }

  public update(time: number) {
    this.animatedElements.forEach((elem, idx) => {
      if (elem.type === 'pulse') {
        const phase = (time * 2.0 + idx * 0.4) % 2.0;
        const scale = 1.0 + phase * 2.2;
        elem.mesh.scale.set(scale, scale, 1);
        (elem.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.85 - phase * 0.42);
      } else if (elem.type === 'cyclone_spin') {
        elem.mesh.rotation.z += 0.04;
      }
    });
  }

  public setVisible(visible: boolean) {
    this.group.visible = visible;
  }
}
