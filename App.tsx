import React, { useState } from 'react';
import GestureController from './components/GestureController';
import SimulatedOS from './components/SimulatedOS';
import PermissionScreen from './components/PermissionScreen';
import { GestureType, Landmark } from './types';
import { Power, ScanFace, CheckCircle2, Flashlight } from 'lucide-react';

const App: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [activeGesture, setActiveGesture] = useState<GestureType>(GestureType.NONE);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(true);
  
  // Auto Learning State
  const [isTraining, setIsTraining] = useState(false);
  const [customTemplate, setCustomTemplate] = useState<Landmark[] | null>(null);

  const handleTrainingComplete = (template: Landmark[]) => {
    setCustomTemplate(template);
    setIsTraining(false);
  };

  if (!hasPermission) {
    return <PermissionScreen onPermissionGranted={() => setHasPermission(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col lg:flex-row items-center justify-center p-4 lg:p-12 gap-8 lg:gap-24 overflow-hidden">
      
      {/* Left Column: Controls & Camera */}
      <div className="flex flex-col items-center lg:items-end gap-8 w-full max-w-lg z-10">
        <div className="text-center lg:text-right space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            GestureOS
          </h1>
          <p className="text-slate-400">
            Background Service Active • AI Monitoring
          </p>
        </div>

        <GestureController 
          isEnabled={isTrackingEnabled} 
          isTraining={isTraining}
          customTemplate={customTemplate}
          onGestureDetected={setActiveGesture} 
          onTrainingComplete={handleTrainingComplete}
        />

        {/* Control Panel */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 w-full backdrop-blur-sm space-y-6">
          
          {/* Main Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-semibold text-lg">System Status</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">Running in Background</span>
            </div>
            <button 
              onClick={() => setIsTrackingEnabled(!isTrackingEnabled)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isTrackingEnabled 
                  ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
                  : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              }`}
            >
              <Power size={18} />
              {isTrackingEnabled ? 'Active' : 'Disabled'}
            </button>
          </div>

          <hr className="border-slate-700" />

          {/* Auto Learning Section */}
          <div className="space-y-3">
             <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-2">
                  <ScanFace size={20} className="text-purple-400"/> Auto Learning
                </span>
                {customTemplate && (
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30 flex items-center gap-1">
                    <CheckCircle2 size={12}/> Gesture Saved
                  </span>
                )}
             </div>
             <p className="text-xs text-slate-400">
               {customTemplate 
                 ? "Custom gesture learned! Perform it to toggle Flashlight." 
                 : "Teach the AI a custom hand pose to trigger special actions."}
             </p>
             
             <button
               onClick={() => setIsTraining(true)}
               disabled={isTraining}
               className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                 isTraining 
                   ? 'bg-yellow-500 text-black animate-pulse'
                   : customTemplate 
                     ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                     : 'bg-purple-600 hover:bg-purple-500 text-white'
               }`}
             >
               {isTraining ? (
                 "SHOW HAND TO CAMERA..."
               ) : (
                 <>
                   {customTemplate ? "Retrain Gesture" : "Start Learning"}
                 </>
               )}
             </button>
          </div>

          <hr className="border-slate-700" />
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-400"></span> Edge: Scroll/Nav
             </div>
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-purple-400"></span> Custom: <Flashlight size={10} /> Flashlight
             </div>
          </div>
        </div>
      </div>

      {/* Right Column: Simulated Device */}
      <div className="relative z-10 scale-90 sm:scale-100 transition-transform">
        <div className="absolute -inset-4 bg-blue-500/20 rounded-[4rem] blur-2xl -z-10 animate-pulse" />
        <SimulatedOS activeGesture={activeGesture} />
      </div>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/40 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/40 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  );
};

export default App;