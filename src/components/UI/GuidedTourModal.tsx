import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, Compass, AlertTriangle, PlayCircle } from 'lucide-react';
import { TIPPING_POINTS, TippingPoint } from '../../data/tippingPoints';
import { audioController } from '../../utils/audioController';

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFocusCoordinates: (lat: number, lng: number, distance?: number) => void;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  onFocusCoordinates
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = TIPPING_POINTS;
  const currentItem: TippingPoint = steps[currentStep];

  useEffect(() => {
    if (isOpen && currentItem) {
      onFocusCoordinates(
        currentItem.cameraFocus.lat,
        currentItem.cameraFocus.lng,
        currentItem.cameraFocus.distance
      );
      audioController.playAlarm();
    }
  }, [isOpen, currentStep]);

  if (!isOpen || !currentItem) return null;

  const nextStep = () => {
    audioController.playSelect();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  const prevStep = () => {
    audioController.playSelect();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-xl pointer-events-auto">
      <div className="bg-slate-950/95 backdrop-blur-xl border border-cyan-500/60 rounded-2xl p-4 sm:p-5 shadow-[0_0_40px_rgba(6,182,212,0.3)] flex flex-col gap-3 font-mono text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-[11px]">
              {currentStep + 1}/{steps.length}
            </div>
            <span className="text-[11px] text-cyan-300 uppercase tracking-wider font-bold">
              PLANETARY BRIEFING // TIPPING POINT TOUR
            </span>
          </div>

          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Status */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">{currentItem.name}</h3>
          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40 text-[10px]">
            {currentItem.currentStatus}
          </span>
        </div>

        {/* Short Summary */}
        <p className="text-slate-300 text-xs leading-relaxed">{currentItem.fullDesc}</p>

        {/* Key Consequences */}
        <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 space-y-1">
          <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">
            Critical Tipping Threshold: {currentItem.thresholdTemp}
          </span>
          <ul className="list-disc list-inside text-slate-400 text-[11px] space-y-0.5">
            {currentItem.impactConsequences.slice(0, 2).map((c, i) => (
              <li key={i} className="truncate">{c}</li>
            ))}
          </ul>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
              currentStep === 0
                ? 'opacity-40 border-slate-800 text-slate-600 cursor-not-allowed'
                : 'border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {steps.map((_, idx) => (
              <span
                key={idx}
                className={`inline-block w-2 h-2 rounded-full transition-all ${
                  idx === currentStep ? 'bg-cyan-400 w-5' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs font-mono transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]"
          >
            <span>{currentStep === steps.length - 1 ? 'Restart Tour' : 'Next Hotspot'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
