# Global Climate Pulse // 3D Planetary Warming Atlas & Cybermap

An interactive 3D WebGL Earth visualization platform inspired by **Kaspersky Cybermap** and **Copernicus Climate Atlas / Destination Earth VizLab**. It visualizes the causes, severe impacts, emission flows, and tipping points of global warming across the globe.

---

## Key Features

- **Photorealistic 3D Earth Engine**: High-resolution NASA Blue Marble satellite imagery, 3D topographical relief mapping, ocean specular sunlight reflections, rotating cloud layers, and glowing atmospheric Fresnel halo.
- **Kaspersky-Style Animated Emission Arcs**: Flying luminous photon streams connecting high-emission industrial hubs to global atmospheric sinks.
- **Copernicus ERA5 Thermal Anomaly Overlay**: Sharp, dynamic heatmap showing regional temperature rises (+0.5°C to +4.5°C) across planetary hotspots.
- **Planetary Time-Machine (1980 - 2026 - 2050 Forecast)**: Interactive timeline slider with Play/Pause automated playback, showing decadal milestones, atmospheric CO₂ ppm, and shrinking polar ice extent.
- **Dual Analytical Lens ("Causes" vs. "Impacts")**: Toggle between examining drivers (fossil fuels, coal power, peatland drainage, agricultural methane) and consequences (deadly wet-bulb heatwaves, glacial loss, mega-droughts, coastal flooding).
- **Interactive Regional Dossiers**: Click any 3D marker or tipping point beacon to inspect detailed sectoral emission breakdowns, local risks, and Paris Agreement compliance.
- **Guided Cinematic Tour Mode**: Automated orbital tour guiding the camera through 6 critical climate tipping points.
- **Procedural Web Audio Synthesizer**: Tactile sci-fi click feedback, ambient deep space hum, and tipping point alarm chimes (with instant mute control).

---

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **3D Graphics**: Three.js (WebGL, Custom Shaders, Particle Systems)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Audio**: Web Audio API Procedural Synthesizer

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/thisisrakeshhhh/global.git

# Navigate into the project directory
cd global

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## License

MIT License.
