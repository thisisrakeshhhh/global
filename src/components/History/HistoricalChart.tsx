import React, { useState } from 'react';
import { IndicatorType, TimeRangeType, INDICATOR_METADATA, ClimateHistoryService } from '../../services/climateHistoryService';
import { Database, Info } from 'lucide-react';

interface HistoricalChartProps {
  indicator: IndicatorType;
  timeRange: TimeRangeType;
  onTimeRangeChange: (range: TimeRangeType) => void;
  selectedYear?: number;
  onYearSelect?: (year: number) => void;
}

export const HistoricalChart: React.FC<HistoricalChartProps> = ({
  indicator,
  timeRange,
  onTimeRangeChange,
  selectedYear,
  onYearSelect
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ year: number; value: number; label: string; era?: string } | null>(null);

  const meta = INDICATOR_METADATA[indicator];

  // Extract data based on indicator
  let dataPoints: { year: number; val: number; smoothed?: number; era?: string }[] = [];
  let eraBreakYear: number | null = null;
  let eraBreakLabel: string | null = null;

  if (indicator === 'temperature') {
    const temps = ClimateHistoryService.getFilteredTemperature(timeRange);
    dataPoints = temps.map(t => ({ year: t.year, val: t.anomaly, smoothed: t.smoothed }));
  } else if (indicator === 'co2') {
    const co2s = ClimateHistoryService.getFilteredCO2(timeRange);
    dataPoints = co2s.map(c => ({ year: c.year, val: c.ppm, era: c.era }));
    eraBreakYear = 1958;
    eraBreakLabel = '1958: Continuous Mauna Loa In-situ Begins';
  } else if (indicator === 'ocean') {
    const oceans = ClimateHistoryService.getFilteredOcean(timeRange);
    dataPoints = oceans.map(o => ({ year: o.year, val: o.sstAnomaly }));
  } else if (indicator === 'oceanHeat') {
    const oceanHeats = ClimateHistoryService.getFilteredOceanHeat(timeRange);
    dataPoints = oceanHeats.map(h => ({ year: h.year, val: h.ohc2000mZJ, era: h.era }));
    eraBreakYear = 2005;
    eraBreakLabel = '2005: Global Argo Autonomous Float Array Active';
  } else if (indicator === 'seaIce') {
    const ices = ClimateHistoryService.getFilteredSeaIce(timeRange);
    dataPoints = ices.map(i => ({ year: i.year, val: i.arcticMinMkm2, era: i.era }));
    eraBreakYear = 1979;
    eraBreakLabel = '1979: Continuous Satellite Microwave Era Begins';
  } else if (indicator === 'seaLevel') {
    const seaLevels = ClimateHistoryService.getFilteredSeaLevel(timeRange);
    dataPoints = seaLevels.map(s => ({ year: s.year, val: s.seaLevelMm, era: s.era }));
    eraBreakYear = 1993;
    eraBreakLabel = '1993: Precision Satellite Altimetry Begins';
  }

  if (dataPoints.length === 0) {
    return <div className="text-slate-400 text-sm py-12 text-center">No data available for this range.</div>;
  }

  // Chart dimensions & coordinates
  const width = 800;
  const height = 280;
  const padding = { top: 24, right: 30, bottom: 35, left: 55 };

  const minYear = dataPoints[0].year;
  const maxYear = dataPoints[dataPoints.length - 1].year;

  const values = dataPoints.map(d => d.val);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const valRange = (maxVal - minVal) || 1;

  // Add 10% padding to vertical scale
  const yMin = minVal - valRange * 0.08;
  const yMax = maxVal + valRange * 0.08;

  const getX = (yr: number) => padding.left + ((yr - minYear) / ((maxYear - minYear) || 1)) * (width - padding.left - padding.right);
  const getY = (v: number) => height - padding.bottom - ((v - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);

  // SVG Line path
  const linePath = dataPoints.reduce((acc, curr, idx) => {
    const x = getX(curr.year);
    const y = getY(curr.val);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Smoothed path (if temperature)
  let smoothedPath = '';
  if (indicator === 'temperature') {
    smoothedPath = dataPoints.reduce((acc, curr, idx) => {
      if (curr.smoothed === undefined) return acc;
      const x = getX(curr.year);
      const y = getY(curr.smoothed);
      return acc === '' ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }

  // Area under line
  const zeroY = getY(Math.max(yMin, Math.min(0, yMax)));
  const areaPath = `${linePath} L ${getX(maxYear)} ${zeroY} L ${getX(minYear)} ${zeroY} Z`;

  // Horizontal ticks
  const yTicksCount = 5;
  const yTicks = Array.from({ length: yTicksCount }, (_, i) => {
    const val = yMin + (i / (yTicksCount - 1)) * (yMax - yMin);
    return { val, y: getY(val) };
  });

  // Vertical year ticks
  const yearStep = maxYear - minYear > 70 ? 20 : maxYear - minYear > 30 ? 10 : 5;
  const xTicks: number[] = [];
  const firstTick = Math.ceil(minYear / yearStep) * yearStep;
  for (let yr = firstTick; yr <= maxYear; yr += yearStep) {
    xTicks.push(yr);
  }

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
      {/* Chart Header: Title, Agency & Time Slicers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-slate-100">{meta.title}</h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {meta.unit}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{meta.subtitle}</p>
        </div>

        {/* Time range switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          {(['all', '1950', '1980', '2000'] as TimeRangeType[]).map(r => (
            <button
              key={r}
              onClick={() => onTimeRangeChange(r)}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                timeRange === r
                  ? 'bg-slate-800 text-slate-100 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {r === 'all' ? 'All (1850+)' : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart Graphic */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] min-h-[220px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id={`grad-${indicator}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={meta.colorHex} stopOpacity="0.25" />
              <stop offset="100%" stopColor={meta.colorHex} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {yTicks.map((t, idx) => (
            <g key={idx}>
              <line
                x1={padding.left}
                y1={t.y}
                x2={width - padding.right}
                y2={t.y}
                stroke="#334155"
                strokeDasharray="2 4"
                strokeWidth="1"
              />
              <text
                x={padding.left - 8}
                y={t.y + 3}
                fill="#94a3b8"
                fontSize="10"
                textAnchor="end"
                fontFamily="monospace"
              >
                {t.val > 0 && indicator === 'temperature' ? `+${t.val.toFixed(2)}` : t.val.toFixed(1)}
              </text>
            </g>
          ))}

          {/* Grid lines (vertical year ticks) */}
          {xTicks.map(yr => {
            const x = getX(yr);
            return (
              <g key={yr}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 16}
                  fill="#94a3b8"
                  fontSize="11"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {yr}
                </text>
              </g>
            );
          })}

          {/* Era transition demarcation line if in range */}
          {eraBreakYear && eraBreakYear >= minYear && eraBreakYear <= maxYear && (
            <g>
              <line
                x1={getX(eraBreakYear)}
                y1={padding.top}
                x2={getX(eraBreakYear)}
                y2={height - padding.bottom}
                stroke="#06b6d4"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              <text
                x={getX(eraBreakYear) + 6}
                y={padding.top + 12}
                fill="#06b6d4"
                fontSize="9"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {eraBreakLabel}
              </text>
            </g>
          )}

          {/* Gradient area under curve */}
          <path
            d={areaPath}
            fill={`url(#grad-${indicator})`}
          />

          {/* Primary Data Line */}
          <path
            d={linePath}
            fill="none"
            stroke={meta.colorHex}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Smoothed 5-year line (if temperature) */}
          {smoothedPath && (
            <path
              d={smoothedPath}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeDasharray="6 3"
              strokeLinecap="round"
            />
          )}

          {/* Interactive hover circles & hit areas */}
          {dataPoints.map(d => {
            const cx = getX(d.year);
            const cy = getY(d.val);
            const isSelected = selectedYear === d.year;
            return (
              <g key={d.year}>
                {/* Visual circle dot for key points or hover */}
                {(dataPoints.length < 50 || d.year % 5 === 0 || isSelected) && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 5 : 2.5}
                    fill={isSelected ? '#ffffff' : meta.colorHex}
                    stroke={isSelected ? meta.colorHex : '#0f172a'}
                    strokeWidth={isSelected ? 2 : 1}
                  />
                )}
                {/* Transparent hover target */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="8"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint({
                    year: d.year,
                    value: d.val,
                    label: `${d.val > 0 && indicator === 'temperature' ? '+' : ''}${d.val.toFixed(2)} ${meta.unit}`,
                    era: d.era
                  })}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={() => onYearSelect?.(d.year)}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="absolute top-2 right-4 bg-slate-950/95 border border-slate-700/80 rounded-lg px-3 py-2 text-xs shadow-xl pointer-events-none backdrop-blur-md"
          >
            <div className="font-mono text-slate-400 font-semibold">{hoveredPoint.year}</div>
            <div className="text-sm font-bold text-slate-100">{hoveredPoint.label}</div>
            {hoveredPoint.era && (
              <div className="text-[10px] text-cyan-400 mt-0.5">
                {hoveredPoint.era === 'satellite' ? '📡 Satellite passive microwave' :
                 hoveredPoint.era === 'in_situ' ? '🔬 In-situ spectroscopic observation' :
                 hoveredPoint.era === 'satellite_altimetry' ? '🛰️ Precision radar altimetry' :
                 hoveredPoint.era === 'argo_array' ? '🤖 Global Argo autonomous profiling float array' :
                 hoveredPoint.era === 'expendable_bathythermograph' ? '🚢 Shipboard expendable bathythermograph (XBT)' :
                 '📜 Historical reconstruction'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chart Footer: Provenance Citation & Baseline Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-slate-400" />
          <span>Source: <strong className="text-slate-200">{meta.datasetName}</strong> ({meta.agency})</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Baseline: <span className="text-slate-300">{meta.baseline}</span></span>
        </div>
      </div>
    </div>
  );
};
