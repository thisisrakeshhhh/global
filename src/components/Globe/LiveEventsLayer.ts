import * as THREE from 'three';
import { 
  FireCluster, 
  FireDetectionPoint, 
  NOAACycloneEvent, 
  LiveEvent 
} from '../../types/climateIntelligence';
import { latLngToVector3 } from '../../utils/geoHelpers';

export type InteractiveItem = 
  | { type: 'cluster'; data: FireCluster }
  | { type: 'point'; data: FireDetectionPoint; cluster?: FireCluster }
  | { type: 'cyclone'; data: NOAACycloneEvent }
  | { type: 'event'; data: LiveEvent };

export class LiveEventsLayerManager {
  private group: THREE.Group;
  private globeRadius: number;
  private rotatingStorms: THREE.Mesh[] = [];
  public interactiveObjects: { mesh: THREE.Object3D; item: InteractiveItem }[] = [];

  constructor(globeRadius: number = 1.95) {
    this.group = new THREE.Group();
    this.globeRadius = globeRadius;
  }

  public getMeshGroup(): THREE.Group {
    return this.group;
  }

  /**
   * Clears all existing meshes
   */
  public clear() {
    while (this.group.children.length > 0) {
      const obj = this.group.children[0];
      this.group.remove(obj);
    }
    this.rotatingStorms = [];
    this.interactiveObjects = [];
  }

  /**
   * Renders scientific fire clusters and NOAA cyclones
   */
  public renderTelemetry(
    clusters: FireCluster[],
    cyclones: NOAACycloneEvent[],
    expandedCluster: FireCluster | null = null,
    generalEvents: LiveEvent[] = []
  ) {
    this.clear();

    // 1. Render Fire Clusters
    clusters.forEach(cl => {
      // If this cluster is expanded into individual child points, render points instead
      if (expandedCluster && expandedCluster.id === cl.id && expandedCluster.points && expandedCluster.points.length > 0) {
        this.renderChildPoints(expandedCluster.points, cl);
        return;
      }

      const surfacePos = latLngToVector3(cl.lat, cl.lng, this.globeRadius);
      const normal = surfacePos.clone().normalize();

      // Cluster size scaled by log(totalFRP)
      const baseRadius = 0.016 + Math.min(0.024, Math.log10(Math.max(10, cl.totalFRP)) * 0.008);

      // Core cluster beacon
      const clusterGeo = new THREE.SphereGeometry(baseRadius, 12, 12);
      const clusterMat = new THREE.MeshBasicMaterial({
        color: cl.totalFRP > 500 ? 0xff3700 : cl.totalFRP > 150 ? 0xff6600 : 0xffa600,
        transparent: true,
        opacity: 0.92
      });
      const clusterMesh = new THREE.Mesh(clusterGeo, clusterMat);
      clusterMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.008)));
      this.group.add(clusterMesh);

      // Compact thermal radiance halo (no giant hula-hoops)
      const auraGeo = new THREE.RingGeometry(baseRadius * 1.2, baseRadius * 1.8, 16);
      const auraMat = new THREE.MeshBasicMaterial({
        color: 0xff4500,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const auraMesh = new THREE.Mesh(auraGeo, auraMat);
      auraMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.009)));
      auraMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      this.group.add(auraMesh);

      // Invisible Raycaster Hitbox
      const hitGeo = new THREE.SphereGeometry(baseRadius * 2.2, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(clusterMesh.position);
      this.group.add(hitMesh);

      this.interactiveObjects.push({
        mesh: hitMesh,
        item: { type: 'cluster', data: cl }
      });
    });

    // 2. Render NOAA NHC Tropical Cyclones & Forecast Tracks
    cyclones.forEach(cy => {
      const surfacePos = latLngToVector3(cy.currentLat, cy.currentLng, this.globeRadius);
      const normal = surfacePos.clone().normalize();

      // Rotating Cyclone Torus
      const stormGeo = new THREE.TorusGeometry(0.035, 0.009, 8, 24);
      const stormMat = new THREE.MeshBasicMaterial({
        color: cy.category.includes('Hurricane') ? 0x00ffff : 0x38bdf8,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
      });
      const stormMesh = new THREE.Mesh(stormGeo, stormMat);
      stormMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.015)));
      stormMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      this.group.add(stormMesh);
      this.rotatingStorms.push(stormMesh);

      // Eye of the storm
      const eyeGeo = new THREE.SphereGeometry(0.012, 8, 8);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const eyeMesh = new THREE.Mesh(eyeGeo, eyeMat);
      eyeMesh.position.copy(stormMesh.position);
      this.group.add(eyeMesh);

      // Forecast Track Vector Line
      if (cy.forecastTrack && cy.forecastTrack.length > 0) {
        const trackPoints = [surfacePos.clone().add(normal.clone().multiplyScalar(0.012))];
        cy.forecastTrack.forEach(tp => {
          const ptPos = latLngToVector3(tp.lat, tp.lng, this.globeRadius);
          const ptNorm = ptPos.clone().normalize();
          trackPoints.push(ptPos.add(ptNorm.multiplyScalar(0.012)));
        });

        const trackGeo = new THREE.BufferGeometry().setFromPoints(trackPoints);
        const trackMat = new THREE.LineDashedMaterial({
          color: 0x00e5ff,
          dashSize: 0.02,
          gapSize: 0.015,
          transparent: true,
          opacity: 0.75
        });
        const trackLine = new THREE.Line(trackGeo, trackMat);
        trackLine.computeLineDistances();
        this.group.add(trackLine);
      }

      // Hitbox
      const hitGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(stormMesh.position);
      this.group.add(hitMesh);

      this.interactiveObjects.push({
        mesh: hitMesh,
        item: { type: 'cyclone', data: cy }
      });
    });

    // 3. Render General Events (EONET Floods, Volcanoes)
    generalEvents.forEach(ev => {
      if (ev.type === 'wildfire') return; // Handled by FIRMS clusters
      const surfacePos = latLngToVector3(ev.lat, ev.lng, this.globeRadius);
      const normal = surfacePos.clone().normalize();

      const glyphGeo = new THREE.SphereGeometry(0.016, 8, 8);
      const glyphMat = new THREE.MeshBasicMaterial({
        color: ev.type === 'flood' ? 0x0ea5e9 : ev.type === 'volcano' ? 0xd97706 : 0x10b981
      });
      const glyphMesh = new THREE.Mesh(glyphGeo, glyphMat);
      glyphMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.01)));
      this.group.add(glyphMesh);

      const hitGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(glyphMesh.position);
      this.group.add(hitMesh);

      this.interactiveObjects.push({
        mesh: hitMesh,
        item: { type: 'event', data: ev }
      });
    });
  }

  /**
   * Renders individual child points when a cluster is expanded / zoomed in
   */
  private renderChildPoints(points: FireDetectionPoint[], parentCluster: FireCluster) {
    points.forEach(pt => {
      const surfacePos = latLngToVector3(pt.lat, pt.lng, this.globeRadius);
      const normal = surfacePos.clone().normalize();

      // Point size scaled directly by FRP
      const pointRadius = 0.007 + Math.min(0.016, (pt.frp / 200) * 0.012);

      // Brightness scaled by confidence
      const pointColor = pt.confidence.level === 'high' ? 0xff2a00 : 0xff8000;
      const pointOpacity = pt.confidence.level === 'high' ? 0.98 : 0.75;

      const ptGeo = new THREE.SphereGeometry(pointRadius, 8, 8);
      const ptMat = new THREE.MeshBasicMaterial({
        color: pointColor,
        transparent: true,
        opacity: pointOpacity
      });
      const ptMesh = new THREE.Mesh(ptGeo, ptMat);
      ptMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.007)));
      this.group.add(ptMesh);

      // Hitbox
      const hitGeo = new THREE.SphereGeometry(0.035, 6, 6);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(ptMesh.position);
      this.group.add(hitMesh);

      this.interactiveObjects.push({
        mesh: hitMesh,
        item: { type: 'point', data: pt, cluster: parentCluster }
      });
    });
  }

  public animate() {
    // Subtle cyclone rotation
    this.rotatingStorms.forEach(mesh => {
      mesh.rotation.z += 0.035;
    });
  }
}
