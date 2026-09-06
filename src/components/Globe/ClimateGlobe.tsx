import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { HotspotsPillarsManager, InteractiveEntity } from './HotspotsPillars';
import { LiveEventsLayerManager } from './LiveEventsLayer';
import {
  createThermalAnomalyTexture,
  createIceCapsTexture
} from '../../utils/textureGenerator';
import { latLngToVector3 } from '../../utils/geoHelpers';
import { audioController } from '../../utils/audioController';
import { 
  TimeDomain, 
  LiveEvent, 
  FireCluster, 
  FireDetectionPoint, 
  NOAACycloneEvent 
} from '../../types/climateIntelligence';

export type ClimateLayer = 'temperature' | 'emissions' | 'oceans' | 'ice' | 'forests';

interface ClimateGlobeProps {
  activeLayer: ClimateLayer;
  timeDomain: TimeDomain;
  selectedYear: number;
  autoRotate: boolean;
  focusTarget: { lat: number; lng: number; distance?: number } | null;
  onSelectEntity: (entity: InteractiveEntity | null) => void;
  onSelectLiveEvent: (event: LiveEvent | null) => void;
  onSelectCluster?: (cluster: FireCluster | null) => void;
  onSelectCyclone?: (cyclone: NOAACycloneEvent | null) => void;
  onSelectPoint?: (point: FireDetectionPoint | null) => void;
  liveEvents?: LiveEvent[];
  fireClusters?: FireCluster[];
  cyclones?: NOAACycloneEvent[];
  expandedCluster?: FireCluster | null;
}

export const ClimateGlobe: React.FC<ClimateGlobeProps> = ({
  activeLayer,
  timeDomain,
  selectedYear,
  autoRotate,
  focusTarget,
  onSelectEntity,
  onSelectLiveEvent,
  onSelectCluster,
  onSelectCyclone,
  onSelectPoint,
  liveEvents = [],
  fireClusters = [],
  cyclones = [],
  expandedCluster = null
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const hotspotsManagerRef = useRef<HotspotsPillarsManager | null>(null);
  const liveEventsManagerRef = useRef<LiveEventsLayerManager | null>(null);

  const thermalMeshRef = useRef<THREE.Mesh | null>(null);
  const iceMeshRef = useRef<THREE.Mesh | null>(null);

  const cameraTargetPos = useRef<THREE.Vector3 | null>(null);
  const isUserInteracting = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocity = useRef<{ x: number; y: number }>({ x: 0, y: 0.001 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.05, 4.8);
    cameraRef.current = camera;

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. NATURAL LIGHTING (No blown-out white glare)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffdfa, 1.6);
    sunLight.position.set(5, 3, 6);
    scene.add(sunLight);

    // 4. STARFIELD BACKGROUND
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1800;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 90;
      starPositions[i + 1] = (Math.random() - 0.5) * 90;
      starPositions[i + 2] = (Math.random() - 0.5) * 90;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.12,
      transparent: true,
      opacity: 0.65
    });
    const starfield = new THREE.Points(starGeo, starMat);
    scene.add(starfield);

    // 5. GLOBE GROUP
    const globeRadius = 1.95;
    const globeGroup = new THREE.Group();
    globeGroup.rotation.y = -Math.PI * 0.42;
    globeGroup.rotation.x = 0.22;
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // 6. REAL NASA EARTH TEXTURES (Crisp, High-Detail)
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load('/earth_atmos_2048.jpg');
    const earthNormal = textureLoader.load('/earth_normal_2048.jpg');
    const earthSpecular = textureLoader.load('/earth_specular_2048.jpg');

    const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthMap,
      normalMap: earthNormal,
      normalScale: new THREE.Vector2(0.65, 0.65),
      roughnessMap: earthSpecular,
      roughness: 0.55,
      metalness: 0.1
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 7. REALISTIC DYNAMIC CLOUD LAYER
    const cloudsMap = textureLoader.load('/earth_clouds_1024.png');
    const cloudsGeo = new THREE.SphereGeometry(globeRadius * 1.003, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsMap,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    globeGroup.add(cloudsMesh);
    cloudsMeshRef.current = cloudsMesh;

    // 8. COPERNICUS THERMAL ANOMALY OVERLAY (Clings tightly to Earth surface)
    const thermalGeo = new THREE.SphereGeometry(globeRadius * 1.002, 64, 64);
    const thermalTexture = createThermalAnomalyTexture(selectedYear);
    const thermalMat = new THREE.MeshBasicMaterial({
      map: thermalTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const thermalMesh = new THREE.Mesh(thermalGeo, thermalMat);
    globeGroup.add(thermalMesh);
    thermalMeshRef.current = thermalMesh;

    // 9. POLAR ICE CAPS OVERLAY
    const iceGeo = new THREE.SphereGeometry(globeRadius * 1.004, 64, 64);
    const iceTexture = createIceCapsTexture(selectedYear);
    const iceMat = new THREE.MeshStandardMaterial({
      map: iceTexture,
      transparent: true,
      opacity: 0.9,
      roughness: 0.25
    });
    const iceMesh = new THREE.Mesh(iceGeo, iceMat);
    globeGroup.add(iceMesh);
    iceMeshRef.current = iceMesh;

    // 10. CLIMATE HOTSPOTS & MONITORING STATIONS
    const hotspotsManager = new HotspotsPillarsManager(globeRadius * 1.005);
    globeGroup.add(hotspotsManager.getMeshGroup());
    hotspotsManagerRef.current = hotspotsManager;

    // 11. LIVE SATELLITE DISASTER EVENTS (NASA FIRMS, GDACS)
    const liveEventsManager = new LiveEventsLayerManager(globeRadius * 1.008);
    globeGroup.add(liveEventsManager.getMeshGroup());
    liveEventsManagerRef.current = liveEventsManager;

    // 12. MOUSE INTERACTION & ORBIT
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const onPointerDown = (e: MouseEvent) => {
      isUserInteracting.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      audioController.startAmbientDrone();
    };

    const onPointerMove = (e: MouseEvent) => {
      if (isUserInteracting.current && globeGroupRef.current) {
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;

        globeGroupRef.current.rotation.y += deltaX * 0.004;
        globeGroupRef.current.rotation.x += deltaY * 0.004;
        globeGroupRef.current.rotation.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, globeGroupRef.current.rotation.x));

        rotationVelocity.current = { x: deltaY * 0.0004, y: deltaX * 0.0004 };
        previousMousePosition.current = { x: e.clientX, y: e.clientY };
      }

      const rect = container.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerUp = () => {
      isUserInteracting.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const zoomSpeed = 0.002;
      const newDist = cameraRef.current.position.length() + e.deltaY * zoomSpeed;
      const clampedDist = Math.max(2.5, Math.min(7.5, newDist));
      cameraRef.current.position.setLength(clampedDist);
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!cameraRef.current) return;
      raycaster.setFromCamera(mouseCoord, cameraRef.current);

      // Check live events & telemetry clusters first
      if (liveEventsManagerRef.current && liveEventsManagerRef.current.getMeshGroup().visible) {
        const eventTargets = liveEventsManagerRef.current.interactiveObjects.map((o) => o.mesh);
        const eventHits = raycaster.intersectObjects(eventTargets, true);
        if (eventHits.length > 0) {
          const hit = eventHits[0].object;
          const found = liveEventsManagerRef.current.interactiveObjects.find((o) => o.mesh === hit);
          if (found) {
            audioController.playSelect();
            if (found.item.type === 'cluster') {
              onSelectCluster?.(found.item.data);
            } else if (found.item.type === 'cyclone') {
              onSelectCyclone?.(found.item.data);
            } else if (found.item.type === 'point') {
              onSelectPoint?.(found.item.data);
            } else if (found.item.type === 'event') {
              onSelectLiveEvent?.(found.item.data);
            }
            return;
          }
        }
      }

      // Check climate stations and tipping points
      if (hotspotsManagerRef.current) {
        const targets = hotspotsManagerRef.current.interactiveObjects.map((o) => o.mesh);
        const intersects = raycaster.intersectObjects(targets, true);

        if (intersects.length > 0) {
          const hitMesh = intersects[0].object;
          const found = hotspotsManagerRef.current.interactiveObjects.find((o) => o.mesh === hitMesh);
          if (found) {
            if (found.entity.type === 'tipping_point') {
              audioController.playAlarm();
            } else {
              audioController.playSelect();
            }
            onSelectEntity(found.entity);
          }
        }
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('click', onClick);

    // 13. ANIMATION LOOP
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      if (globeGroupRef.current) {
        if (!isUserInteracting.current) {
          if (autoRotate) {
            globeGroupRef.current.rotation.y += 0.0012;
          } else {
            globeGroupRef.current.rotation.y += rotationVelocity.current.y;
            rotationVelocity.current.y *= 0.94;
          }
        }
      }

      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += 0.0003;
      }

      if (cameraTargetPos.current && cameraRef.current) {
        cameraRef.current.position.lerp(cameraTargetPos.current, 0.05);
        if (cameraRef.current.position.distanceTo(cameraTargetPos.current) < 0.02) {
          cameraTargetPos.current = null;
        }
      }

      if (hotspotsManagerRef.current) hotspotsManagerRef.current.update(elapsedTime);
      if (liveEventsManagerRef.current) liveEventsManagerRef.current.animate();

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update textures on year change
  useEffect(() => {
    if (thermalMeshRef.current) {
      const newThermalTexture = createThermalAnomalyTexture(selectedYear);
      (thermalMeshRef.current.material as THREE.MeshBasicMaterial).map = newThermalTexture;
      (thermalMeshRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
    }
    if (iceMeshRef.current) {
      const newIceTexture = createIceCapsTexture(selectedYear);
      (iceMeshRef.current.material as THREE.MeshStandardMaterial).map = newIceTexture;
      (iceMeshRef.current.material as THREE.MeshStandardMaterial).needsUpdate = true;
    }
  }, [selectedYear]);

  // Update time domain visibility & live telemetry meshes
  useEffect(() => {
    if (liveEventsManagerRef.current) {
      liveEventsManagerRef.current.getMeshGroup().visible = (timeDomain === 'live');
      liveEventsManagerRef.current.renderTelemetry(
        fireClusters,
        cyclones,
        expandedCluster,
        liveEvents
      );
    }
  }, [timeDomain, fireClusters, cyclones, expandedCluster, liveEvents]);

  // Handle camera fly-to focusTarget
  useEffect(() => {
    if (!focusTarget || !cameraRef.current || !globeGroupRef.current) return;
    const distance = focusTarget.distance || 3.8;

    const targetYRot = -((focusTarget.lng + 90) * (Math.PI / 180));
    globeGroupRef.current.rotation.y = targetYRot;
    globeGroupRef.current.rotation.x = (focusTarget.lat * 0.45) * (Math.PI / 180);

    cameraTargetPos.current = new THREE.Vector3(0, 0.05, distance);
  }, [focusTarget]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
    />
  );
};
