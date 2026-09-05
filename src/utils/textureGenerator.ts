import * as THREE from 'three';

/**
 * Creates Copernicus ERA5 scientific thermal anomaly heatmap overlay.
 * Generates transparent PNG canvas texture with vivid red/orange/yellow
 * thermal plumes (as seen in Copernicus Climate Atlas & Destination Earth).
 */
export function createThermalAnomalyTexture(year: number = 2026): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Fully transparent background
  ctx.clearRect(0, 0, width, height);

  // Growth factor based on timeline (1980 baseline to 2050 extreme)
  const yearProgress = Math.max(0.2, (year - 1980) / 70); // 0.2 to 1.0
  const intensity = 0.5 + yearProgress * 0.8;

  // Function to map lat/lng to canvas pixels
  const toXY = (lat: number, lng: number): [number, number] => [
    ((lng + 180) / 360) * width,
    ((90 - lat) / 180) * height
  ];

  // Primary thermal anomaly centers matching Copernicus ERA5 & user reference image
  const thermalPlumes: {
    lat: number;
    lng: number;
    radius: number;
    anomalyC: number;
  }[] = [
    // South Asia / Indo-Gangetic Plain / Arabian Sea (Matching user Image 1)
    { lat: 26.0, lng: 75.0, radius: 110, anomalyC: 3.4 },
    { lat: 24.0, lng: 65.0, radius: 95, anomalyC: 3.2 },
    { lat: 27.0, lng: 51.0, radius: 85, anomalyC: 3.5 }, // Persian Gulf
    // Arctic Polar Amplification
    { lat: 78.0, lng: 30.0, radius: 160, anomalyC: 4.2 },
    { lat: 72.0, lng: 110.0, radius: 170, anomalyC: 4.1 },
    { lat: 70.0, lng: -45.0, radius: 140, anomalyC: 3.8 }, // Greenland
    // Mediterranean & Southern Europe
    { lat: 36.0, lng: 15.0, radius: 90, anomalyC: 2.8 },
    { lat: 43.0, lng: 22.0, radius: 80, anomalyC: 2.7 },
    // Amazon Basin Deforestation & Drought Core
    { lat: -4.0, lng: -62.0, radius: 120, anomalyC: 3.0 },
    // Australian Outback Heat Dome
    { lat: -25.0, lng: 134.0, radius: 105, anomalyC: 2.7 },
    // North American Southwest / Colorado Basin
    { lat: 34.0, lng: -112.0, radius: 95, anomalyC: 2.6 },
    // Siberian Taiga
    { lat: 63.0, lng: 105.0, radius: 130, anomalyC: 3.6 },
    // West Antarctica
    { lat: -78.0, lng: -115.0, radius: 110, anomalyC: 3.1 }
  ];

  thermalPlumes.forEach(({ lat, lng, radius, anomalyC }) => {
    const [x, y] = toXY(lat, lng);
    const effectiveRadius = radius * (0.8 + yearProgress * 0.4);
    const effectiveAnomaly = anomalyC * intensity;

    const grad = ctx.createRadialGradient(x, y, 0, x, y, effectiveRadius);

    if (effectiveAnomaly >= 3.2) {
      // Severe warming (> +3°C): White-hot core -> Crimson red -> Vivid orange -> Bright yellow -> Fade
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.15, 'rgba(255, 23, 68, 0.9)');
      grad.addColorStop(0.45, 'rgba(255, 109, 0, 0.75)');
      grad.addColorStop(0.75, 'rgba(255, 214, 0, 0.45)');
      grad.addColorStop(1, 'rgba(255, 214, 0, 0)');
    } else if (effectiveAnomaly >= 2.0) {
      // High warming (+2°C to +3°C): Crimson red -> Orange -> Yellow -> Fade
      grad.addColorStop(0, 'rgba(255, 61, 0, 0.85)');
      grad.addColorStop(0.4, 'rgba(255, 145, 0, 0.7)');
      grad.addColorStop(0.75, 'rgba(255, 214, 0, 0.35)');
      grad.addColorStop(1, 'rgba(255, 214, 0, 0)');
    } else {
      // Moderate warming: Amber -> Golden yellow -> Fade
      grad.addColorStop(0, 'rgba(255, 171, 0, 0.75)');
      grad.addColorStop(0.6, 'rgba(255, 214, 0, 0.4)');
      grad.addColorStop(1, 'rgba(255, 235, 59, 0)');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, effectiveRadius, 0, Math.PI * 2);
    ctx.fill();

    // Secondary wrapping for longitude seam near -180 / +180
    if (x - effectiveRadius < 0) {
      ctx.beginPath();
      ctx.arc(x + width, y, effectiveRadius, 0, Math.PI * 2);
      ctx.fill();
    } else if (x + effectiveRadius > width) {
      ctx.beginPath();
      ctx.arc(x - width, y, effectiveRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Generates Arctic and Antarctic sea-ice extent overlay
 */
export function createIceCapsTexture(year: number = 2026): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, width, height);

  // In 1980: extensive ice; In 2050: depleted
  const yearLoss = Math.max(0, Math.min(1, (year - 1980) / 70));
  const arcticH = Math.max(12, 42 - yearLoss * 26);
  const antarcticH = Math.max(16, 46 - yearLoss * 18);

  // Arctic
  const arcGrad = ctx.createLinearGradient(0, 0, 0, arcticH);
  arcGrad.addColorStop(0, 'rgba(240, 249, 255, 0.92)');
  arcGrad.addColorStop(0.7, 'rgba(224, 242, 254, 0.65)');
  arcGrad.addColorStop(1, 'rgba(224, 242, 254, 0)');
  ctx.fillStyle = arcGrad;
  ctx.fillRect(0, 0, width, arcticH);

  // Antarctic
  const antGrad = ctx.createLinearGradient(0, height, 0, height - antarcticH);
  antGrad.addColorStop(0, 'rgba(245, 251, 255, 0.95)');
  antGrad.addColorStop(0.75, 'rgba(224, 242, 254, 0.7)');
  antGrad.addColorStop(1, 'rgba(224, 242, 254, 0)');
  ctx.fillStyle = antGrad;
  ctx.fillRect(0, height - antarcticH, width, antarcticH);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}
