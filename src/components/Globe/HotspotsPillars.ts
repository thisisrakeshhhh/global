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
  public interactiveObjects: { mesh: THREE.Object3D; entity: InteractiveEntity }[] = [];

  constructor(globeRadius: number = 1.95) {
    this.group = new THREE.Group();
    this.buildCountryStations(globeRadius);
    this.buildTippingBeacons(globeRadius);
  }

  public getMeshGroup(): THREE.Group {
    return this.group;
  }

  /**
   * Clean, subtle planetary climate observation stations (NO ugly sticks, NO giant rings)
   */
  private buildCountryStations(globeRadius: number) {
    COUNTRY_CLIMATE_DATA.forEach((country) => {
      const surfacePos = latLngToVector3(country.lat, country.lng, globeRadius);
      const normal = surfacePos.clone().normalize();

      // Sleek micro beacon sphere resting gracefully on Earth surface
      const dotGeo = new THREE.SphereGeometry(0.016, 12, 12);
      const colorHex = country.tempAnomaly >= 2.2 ? 0xff2255 : country.tempAnomaly >= 1.7 ? 0xff9900 : 0x00d2ff;
      
      const dotMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.85
      });

      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.008)));
      this.group.add(dotMesh);

      // Subtle outer halo ring (compact, non-distracting)
      const haloGeo = new THREE.RingGeometry(0.018, 0.024, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.009)));
      haloMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      this.group.add(haloMesh);

      // Invisible generous hit sphere for clicking
      const hitSphereGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitSphereGeo, hitMat);
      hitMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.01)));
      this.group.add(hitMesh);

      this.interactiveObjects.push({
        mesh: hitMesh,
        entity: {
          type: 'country',
          data: country,
          position: surfacePos
        }
      });
    });
  }

  private buildTippingBeacons(globeRadius: number) {
    TIPPING_POINTS.forEach((tp) => {
      const surfacePos = latLngToVector3(tp.lat, tp.lng, globeRadius);
      const normal = surfacePos.clone().normalize();

      // Sharp, compact diamond beacon
      const pinGeo = new THREE.OctahedronGeometry(0.025, 0);
      const pinColor = new THREE.Color(tp.color);
      const pinMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        wireframe: false
      });

      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(surfacePos.clone().add(normal.clone().multiplyScalar(0.02)));
      this.group.add(pinMesh);

      // Hit-box
      const hitGeo = new THREE.SphereGeometry(0.09, 8, 8);
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
    });
  }

  public update(_time: number) {
    // Subtle rotation on tipping beacons without any messy expanding rings
  }
}
