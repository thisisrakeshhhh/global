import * as THREE from 'three';
import { LiveEvent } from '../../types/climateIntelligence';
import { latLngToVector3 } from '../../utils/geoHelpers';

export class LiveEventsLayerManager {
  private group: THREE.Group;
  private globeRadius: number;
  private rotatingStorms: THREE.Mesh[] = [];
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
    // Clear existing meshes
    while (this.group.children.length > 0) {
      const obj = this.group.children[0];
      this.group.remove(obj);
    }
    this.rotatingStorms = [];
    this.interactiveObjects = [];

    events.forEach((ev) => {
      const surfacePos = latLngToVector3(ev.lat, ev.lng, this.globeRadius);
      const normal = surfacePos.clone().normalize();

      if (ev.type === 'wildfire') {
        // Crisp NASA FIRMS Active Fire Ember Point
        const fireDotGeo = new THREE.SphereGeometry(0.014, 10, 10);
        const fireDotMat = new THREE.MeshBasicMaterial({
          color: 0xff3b00, // Luminous flame orange
          transparent: true,
          opacity: 0.95
        });
        const fireDotMesh = new THREE.Mesh(fireDotGeo, fireDotMat);
        fireDotMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.007)));
        this.group.add(fireDotMesh);

        // Subtle glowing fire aura (compact, no giant rings)
        const auraGeo = new THREE.RingGeometry(0.016, 0.024, 12);
        const auraMat = new THREE.MeshBasicMaterial({
          color: 0xff8800,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending
        });
        const auraMesh = new THREE.Mesh(auraGeo, auraMat);
        auraMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.008)));
        auraMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        this.group.add(auraMesh);

        // Clickable hitbox
        const hitGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitMesh = new THREE.Mesh(hitGeo, hitMat);
        hitMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.01)));
        this.group.add(hitMesh);

        this.interactiveObjects.push({ mesh: hitMesh, event: ev });
      } else if (ev.type === 'cyclone') {
        // Sleek rotating cyclone vortex
        const stormGeo = new THREE.TorusGeometry(0.03, 0.008, 8, 20);
        const stormMat = new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending
        });
        const stormMesh = new THREE.Mesh(stormGeo, stormMat);
        stormMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.015)));
        stormMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        this.group.add(stormMesh);
        this.rotatingStorms.push(stormMesh);

        // Center eye
        const eyeGeo = new THREE.SphereGeometry(0.012, 8, 8);
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const eyeMesh = new THREE.Mesh(eyeGeo, eyeMat);
        eyeMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.016)));
        this.group.add(eyeMesh);

        // Hitbox
        const hitGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitMesh = new THREE.Mesh(hitGeo, hitMat);
        hitMesh.position.copy(stormMesh.position);
        this.group.add(hitMesh);

        this.interactiveObjects.push({ mesh: hitMesh, event: ev });
      } else {
        // Flood / Geohazard
        const pointGeo = new THREE.SphereGeometry(0.016, 8, 8);
        const pointMat = new THREE.MeshBasicMaterial({
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.9
        });
        const pointMesh = new THREE.Mesh(pointGeo, pointMat);
        pointMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.008)));
        this.group.add(pointMesh);

        const hitGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitMesh = new THREE.Mesh(hitGeo, hitMat);
        hitMesh.position.copy(pointMesh.position);
        this.group.add(hitMesh);

        this.interactiveObjects.push({ mesh: hitMesh, event: ev });
      }
    });
  }

  public update(_time: number) {
    this.rotatingStorms.forEach((storm) => {
      storm.rotation.z += 0.03;
    });
  }

  public setVisible(visible: boolean) {
    this.group.visible = visible;
  }
}
