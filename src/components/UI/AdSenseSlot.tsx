import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface AdSenseSlotProps {
  slotId?: string;
  adClient?: string;
  className?: string;
  format?: string;
}

/**
 * Google AdSense Compliant Banner Container
 * - Positioned respectfully outside the interactive 3D WebGL canvas
 * - Clearly demarcated to avoid accidental clicks (Google AdSense policy compliance)
 * - Features clean climate action partner sponsorship styling
 */
export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotId = '1234567890',
  adClient = 'ca-pub-XXXXXXXXXXXXXXXX',
  className = ''
}) => {
  return (
    <div className={`w-full max-w-4xl mx-auto my-3 pointer-events-auto font-mono ${className}`}>
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-lg">
        <div className="flex items-center justify-between w-full text-[9px] uppercase tracking-wider text-slate-500 px-2 pb-1 border-b border-slate-900 mb-2">
          <span>SPONSORED CLIMATE INITIATIVE // ADSENSE READY SLOT</span>
          <span className="flex items-center gap-1 text-slate-600">
            <ShieldCheck className="w-3 h-3" />
            <span>AdSense Compliant Placement</span>
          </span>
        </div>

        {/* Ad Content / Placeholder Container */}
        <div className="w-full h-16 sm:h-20 bg-slate-900/50 rounded-lg border border-dashed border-slate-800 flex flex-col items-center justify-center gap-1 text-slate-400 p-2">
          <div className="text-xs font-semibold text-slate-300">
            Google AdSense Banner Placement Area (728x90 / Responsive)
          </div>
          <div className="text-[10px] text-slate-500">
            Ready for integration with your AdSense Publisher ID: <code className="text-cyan-400">{adClient}</code> • Slot: <code className="text-cyan-400">{slotId}</code>
          </div>
        </div>
      </div>
    </div>
  );
};
