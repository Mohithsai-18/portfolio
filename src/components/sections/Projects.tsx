"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, PlayCircle, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import AnimatedReveal from "../ui/AnimatedReveal";
import GlowButton from "../ui/GlowButton";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ============================================================================
// INTERACTIVE SIMULATION SUITE FOR PREMIUM PROJECT SHOWCASE
// ============================================================================

function PharmaFlowSimulation({ ticks }: { ticks: number }) {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "user", text: "Is Paracetamol safe with alcohol?" },
    { sender: "bot", text: "Clinical Check: Concurrent ingestion of Paracetamol and alcohol increases the risk of severe hepatotoxicity. Do not consume alcohol during therapy." }
  ]);

  const samplePrompts = [
    "Check stock for Amoxicillin",
    "Identify drug interactions for Ibuprofen",
    "List expired batch alerts"
  ];

  const handlePrompt = (prompt: string) => {
    const newMsgs = [...messages, { sender: "user" as const, text: prompt }];
    setMessages(newMsgs);

    setTimeout(() => {
      let botResponse = "Analyzing Database... ";
      if (prompt.includes("Amoxicillin")) {
        botResponse = "Stock Check: Batch AMX-204 is available (250 units, Expiry Dec 2026). Location Shelf A-4.";
      } else if (prompt.includes("interactions")) {
        botResponse = "Drug Interaction: Ibuprofen + Aspirin increases gastrointestinal bleeding risks. Use with caution.";
      } else if (prompt.includes("expired")) {
        botResponse = "Batch Alert: 2 batches of Vitamin D3 expired on May 15. Auto-notification sent to Supplier.";
      }
      setMessages([...newMsgs, { sender: "bot" as const, text: botResponse }]);
    }, 800);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-black/40 font-mono text-[10.5px] text-[#8A8A8A] rounded-xl border border-white/5">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
        <span className="text-[#B7FF2A] font-bold text-[9px] md:text-[10px]">PHARMAFLOW AI CLINICAL CONSULTANT</span>
        <span className="text-white/40 text-[8px] md:text-[9px] uppercase">Chat: Online</span>
      </div>
      
      <div className="flex-grow overflow-y-auto space-y-2 mb-3 max-h-[160px] md:max-h-[300px] pr-1">
        {messages.map((m, idx) => (
          <div key={idx} className={`p-2.5 rounded-xl max-w-[85%] ${
            m.sender === "user"
              ? "bg-white/[0.02] border border-white/5 text-white ml-auto"
              : "bg-[#B7FF2A]/5 border border-[#B7FF2A]/10 text-[#B7FF2A] mr-auto"
          }`}>
            <span className="text-[8px] opacity-40 uppercase block mb-1">
              {m.sender === "user" ? "USER_PROMPT" : "RF_MODEL_BOT"}
            </span>
            <p className="leading-normal">{m.text}</p>
          </div>
        ))}
      </div>

      <div className="space-y-1.5 border-t border-white/5 pt-2">
        <span className="text-[8.5px] text-white/40 uppercase block mb-1">Select query template:</span>
        <div className="flex flex-wrap gap-1">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handlePrompt(p)}
              className="px-2 py-1 rounded bg-white/[0.01] hover:bg-[#B7FF2A]/10 hover:text-white border border-white/5 hover:border-[#B7FF2A]/20 transition-all text-[9.5px] text-left cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RetinalDiagnosticsSimulation({ ticks }: { ticks: number }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ label: string; val: number }[]>([
    { label: "Diabetic Retinopathy", val: 88.4 },
    { label: "Glaucoma", val: 8.2 },
    { label: "Cataract", val: 2.1 },
    { label: "Normal", val: 1.3 }
  ]);
  const [logs, setLogs] = useState<string[]>([
    "System standby. Ready for fundus image upload.",
    "FastAPI backend online on port 8000."
  ]);

  const runDiagnostics = () => {
    setAnalyzing(true);
    setProgress(0);
    setLogs(prev => [...prev, "Reading fundus image...", "Running PyTorch ResNet50 model inference..."]);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          const drVal = Number((80 + Math.random() * 18).toFixed(1));
          const glVal = Number((1 + Math.random() * 10).toFixed(1));
          const catVal = Number((1 + Math.random() * 5).toFixed(1));
          const normVal = Number((100 - drVal - glVal - catVal).toFixed(1));
          setResults([
            { label: "Diabetic Retinopathy", val: drVal },
            { label: "Glaucoma", val: glVal },
            { label: "Cataract", val: catVal },
            { label: "Normal", val: normVal }
          ]);
          setLogs(prevLogs => [
            ...prevLogs,
            "Inference completed.",
            `Diabetic Retinopathy detected: ${drVal}%`
          ]);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/40 font-mono text-[10.5px] text-[#8A8A8A] rounded-xl border border-white/5 justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <span className="text-[#B7FF2A] font-bold">RETINAL DIAGNOSTIC SYSTEM</span>
          <span className="text-white/40 text-[9px]">Model: ResNet50 + PyTorch</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 border border-white/5 bg-black/80 rounded-lg flex flex-col items-center justify-center relative min-h-[90px]">
            {analyzing ? (
              <div className="text-center">
                <span className="text-[#B7FF2A] text-xs font-bold block animate-pulse">SCANNING...</span>
                <span className="text-white/60 text-[9px] mt-1 block">{progress}%</span>
              </div>
            ) : (
              <div className="text-center">
                <svg className="w-8 h-8 text-[#B7FF2A] opacity-60 mx-auto mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="text-white/40 text-[8px] uppercase">Fundus Loaded</span>
              </div>
            )}
            <div className="absolute top-1.5 left-1.5 text-[7px] text-white/30">IMG_0921.JPG</div>
          </div>

          <div className="space-y-1.5 flex flex-col justify-center">
            {results.map((res, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-[8px]">
                  <span>{res.label}</span>
                  <span className="text-white font-bold">{res.val}%</span>
                </div>
                <div className="bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-[#B7FF2A] h-full transition-all duration-500" style={{ width: `${res.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-2">
        <span className="text-[8px] text-white/40 uppercase block mb-1">System Logs</span>
        <div className="bg-black/60 p-2 rounded-lg border border-white/5 max-h-[50px] overflow-y-auto space-y-0.5 text-[8px]">
          {logs.slice(-3).map((log, idx) => (
            <div key={idx} className="text-[#F5F5F5]/70 truncate">{`$ ${log}`}</div>
          ))}
        </div>
        <button
          onClick={runDiagnostics}
          disabled={analyzing}
          className={`w-full mt-2.5 py-1.5 rounded font-bold uppercase text-[9px] transition-all cursor-pointer ${
            analyzing
              ? "bg-white/5 text-white/20 cursor-default"
              : "bg-[#B7FF2A] text-black hover:shadow-[0_0_12px_#B7FF2A]"
          }`}
        >
          Run AI Eye Diagnostics
        </button>
      </div>
    </div>
  );
}

function PlanYourDaySimulation({ ticks }: { ticks: number }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Shopping", desc: "Buy groceries & weekly fruits", time: "3:45 pm", completed: false },
    { id: 2, title: "Workout", desc: "1hr high intensity session", time: "6:00 pm", completed: false }
  ]);
  const [totalTasks, setTotalTasks] = useState(2);
  const [completedCount, setCompletedCount] = useState(0);
  const [points, setPoints] = useState(0);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleComplete = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        if (!t.completed) {
          setCompletedCount(c => c + 1);
          setPoints(p => p + 10);
          return { ...t, completed: true };
        }
      }
      return t;
    }));
  };

  const handleAddTask = () => {
    if (!newTaskTitle) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      desc: newTaskDesc || "No description",
      time: "4:00 pm",
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    setTotalTasks(t => t + 1);
    setNewTaskTitle("");
    setNewTaskDesc("");
    setShowAddForm(false);
  };

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/45 font-mono text-[10px] text-[#8A8A8A] rounded-xl border border-white/5 justify-between select-none">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-2.5">
          <span className="text-[#B7FF2A] font-bold text-[9px] md:text-[10px]">PLAN YOUR DAY SIMULATOR</span>
          <span className="text-white/40 text-[8px] uppercase">Android Studio Mockup</span>
        </div>

        {/* Overview Row */}
        <div className="grid grid-cols-3 gap-1.5 mb-2.5">
          <div className="p-2 border border-white/5 bg-black/40 rounded-lg text-center">
            <span className="text-white/40 text-[8px] uppercase block">Total</span>
            <span className="text-[#B7FF2A] text-xs font-bold">{totalTasks}</span>
          </div>
          <div className="p-2 border border-white/5 bg-black/40 rounded-lg text-center">
            <span className="text-white/40 text-[8px] uppercase block">Done</span>
            <span className="text-white text-xs font-bold">{completedCount}</span>
          </div>
          <div className="p-2 border border-white/5 bg-[#B7FF2A]/5 rounded-lg text-center">
            <span className="text-white/40 text-[8px] uppercase block">Points</span>
            <span className="text-[#B7FF2A] text-xs font-bold">{points} pts</span>
          </div>
        </div>

        {/* Task App Body Mockup */}
        <div className="bg-black/60 rounded-xl p-2.5 border border-white/5 min-h-[120px] max-h-[140px] overflow-y-auto">
          {showAddForm ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Task Title (e.g., Gym)"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-[9px] focus:outline-none focus:border-[#B7FF2A]"
              />
              <input
                type="text"
                placeholder="Description"
                value={newTaskDesc}
                onChange={e => setNewTaskDesc(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-[9px] focus:outline-none"
              />
              <div className="flex gap-1">
                <button
                  onClick={handleAddTask}
                  className="flex-1 bg-[#B7FF2A] text-black rounded py-0.5 text-[8.5px] font-bold cursor-pointer border-0"
                >
                  SAVE
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-white/10 text-white rounded py-0.5 text-[8.5px] cursor-pointer border-0"
                >
                  CANCEL
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[8px] border-b border-white/5 pb-1 mb-1">
                <span className="text-white/30 uppercase">Active Task Sheet</span>
                <span className="text-[#B7FF2A] font-bold">127.0.0.1:adb</span>
              </div>
              {tasks.length === 0 ? (
                <div className="text-center text-white/30 py-4">No tasks planned</div>
              ) : (
                tasks.map(t => (
                  <div key={t.id} className="flex justify-between items-center p-1.5 bg-white/[0.02] border border-white/5 rounded">
                    <div>
                      <span className={`font-bold text-[9px] ${t.completed ? "line-through text-white/20" : "text-white"}`}>
                        {t.title}
                      </span>
                      <span className="text-[7.5px] opacity-40 block">{t.desc}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[7.5px] text-[#B7FF2A]/60">{t.time}</span>
                      {!t.completed ? (
                        <button
                          onClick={() => handleComplete(t.id)}
                          className="px-1.5 py-0.5 rounded bg-[#B7FF2A]/10 text-[#B7FF2A] hover:bg-[#B7FF2A] hover:text-black border border-[#B7FF2A]/20 transition-all text-[7.5px] font-bold cursor-pointer"
                        >
                          Complete
                        </button>
                      ) : (
                        <span className="text-[7px] uppercase tracking-wide text-white/20 font-bold border border-white/10 px-1 rounded">
                          Done
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-2.5 flex gap-2">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex-1 py-1 rounded bg-[#B7FF2A] text-black font-bold uppercase text-[8.5px] hover:shadow-[0_0_10px_#B7FF2A] transition-all cursor-pointer text-center border-0"
        >
          + Add New Task
        </button>
        <button
          onClick={() => {
            setTasks([
              { id: 1, title: "Shopping", desc: "Buy groceries & weekly fruits", time: "3:45 pm", completed: false },
              { id: 2, title: "Workout", desc: "1hr high intensity session", time: "6:00 pm", completed: false }
            ]);
            setTotalTasks(2);
            setCompletedCount(0);
            setPoints(0);
          }}
          className="px-2 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/15 transition-all text-[8.5px] cursor-pointer text-center"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function ApertureSimulation({ ticks }: { ticks: number }) {
  const [gpuStats, setGpuStats] = useState([
    { id: "GPU-0", name: "NVIDIA H100", load: 84, temp: 72 },
    { id: "GPU-1", name: "NVIDIA H100", load: 92, temp: 74 },
    { id: "GPU-2", name: "NVIDIA A100", load: 12, temp: 58 },
    { id: "GPU-3", name: "NVIDIA A100", load: 0, temp: 45 }
  ]);

  const [logs, setLogs] = useState<string[]>([
    "[Ray-Scheduler] Initializing Cluster control plane...",
    "[Kubernetes-Node] Syncing node allocations...",
    "[Autoscaler] 2 GPU instances in cold standby."
  ]);

  useEffect(() => {
    setGpuStats(prev => prev.map((g, idx) => {
      if (idx === 3) return g;
      const deltaLoad = Math.floor(Math.random() * 15) - 7;
      const newLoad = Math.max(10, Math.min(100, g.load + deltaLoad));
      const newTemp = Math.floor(55 + (newLoad / 100) * 22);
      return { ...g, load: newLoad, temp: newTemp };
    }));

    const logPool = [
      `[Ray-Client] Deploying LLM fine-tune worker batch #${1000 + ticks}`,
      `[Route-Agent] Ingested 184 requests/sec. Route balance ok.`,
      `[Cache-Controller] Model weight cache hit: 'Llama-3-8b'`,
      `[Cluster-Telemetry] Average load: ${(84 + 92 + 12) / 3}%`,
      `[Resource-Manager] Scaling partition GPU-02 to active state.`
    ];
    setLogs(prev => [...prev.slice(-4), logPool[ticks % logPool.length]]);
  }, [ticks]);

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/40 font-mono text-[10.5px] text-[#8A8A8A] rounded-xl border border-white/5 justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <span className="text-[#B7FF2A] font-bold">APERTURE GPU ORCHESTRATION CONSOLE</span>
          <span className="text-white/40 text-[9px]">Active nodes: 3/4</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {gpuStats.map((gpu) => (
            <div key={gpu.id} className="p-2 border border-white/5 bg-white/[0.01] rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-bold text-[9px]">{gpu.id}</span>
                <span className="text-[8px] opacity-40">{gpu.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-grow bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#B7FF2A] h-full transition-all duration-500"
                    style={{ width: `${gpu.load}%` }}
                  />
                </div>
                <span className="text-[9px] text-[#F5F5F5] w-7 text-right">{gpu.load}%</span>
              </div>
              <span className="text-[8.5px] opacity-50 block mt-1">Temp: {gpu.temp}°C // Status: {gpu.load > 0 ? "Active" : "Idle"}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 pt-2">
        <span className="text-[8px] text-white/40 uppercase block mb-1">Cluster Logs</span>
        <div className="bg-black/60 p-2.5 rounded-lg border border-white/5 space-y-1 max-h-[80px] overflow-y-auto">
          {logs.map((log, idx) => (
            <div key={idx} className="text-[#F5F5F5]/75 truncate">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrailGuardSimulation({ ticks }: { ticks: number }) {
  const [pulse, setPulse] = useState(72);
  const [battery, setBattery] = useState(98);
  const [coordinates, setCoordinates] = useState({ lat: 34.0522, lng: -118.2437 });

  useEffect(() => {
    setPulse(Math.floor(70 + Math.random() * 8));
    setCoordinates(prev => ({
      lat: Number((prev.lat + (Math.random() - 0.5) * 0.0002).toFixed(5)),
      lng: Number((prev.lng + (Math.random() - 0.5) * 0.0002).toFixed(5))
    }));
    setBattery(prev => Math.max(15, prev - (ticks % 10 === 0 ? 1 : 0)));
  }, [ticks]);

  const ecgPath = "M0,15 L10,15 L15,5 L20,30 L25,10 L30,15 L50,15 L55,5 L60,30 L65,10 L70,15 L100,15";

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/40 font-mono text-[10.5px] text-[#8A8A8A] rounded-xl border border-white/5 justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <span className="text-[#B7FF2A] font-bold">TRAILGUARD NODE TELEMETRY</span>
          <span className="text-white/40 text-[9px]">LoRa Signal: Strong</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 border border-white/5 bg-white/[0.01] rounded-lg">
            <span className="text-[8px] opacity-40 uppercase block mb-1">GPS Coordinate</span>
            <span className="text-white font-bold text-xs">{coordinates.lat} N</span>
            <span className="text-white font-bold text-xs block">{coordinates.lng} W</span>
            <span className="text-[8.5px] text-[#B7FF2A] mt-1 block">Mesh relay: Connected</span>
          </div>

          <div className="p-3 border border-white/5 bg-white/[0.01] rounded-lg flex flex-col justify-between">
            <div>
              <span className="text-[8px] opacity-40 uppercase block mb-0.5">Biometrics</span>
              <span className="text-white font-bold text-sm block">{pulse} BPM</span>
            </div>
            <span className="text-[8.5px] opacity-60">Status: Activity Normal</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-2">
        <span className="text-[8px] text-white/40 uppercase block mb-2">Live Heart Waveform (ECG)</span>
        <div className="bg-black/60 p-2.5 rounded-lg border border-white/5 flex items-center justify-between">
          <svg className="w-40 h-8 text-[#B7FF2A]" viewBox="0 0 100 30" fill="none">
            <path
              d={ecgPath}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
          </svg>
          <div className="text-right">
            <span className="text-[8px] opacity-40 block">Battery</span>
            <span className="text-[#B7FF2A] font-bold">{battery}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmartIrrigationSimulation({ ticks }: { ticks: number }) {
  const [moisture, setMoisture] = useState([38, 42, 55]);
  const [valves, setValves] = useState([false, false, true]);

  const toggleValve = (idx: number) => {
    setValves(prev => prev.map((v, i) => i === idx ? !v : v));
  };

  useEffect(() => {
    setMoisture(prev => prev.map((m, idx) => {
      const adjustment = valves[idx] ? 2 : -1;
      return Math.max(10, Math.min(100, m + adjustment));
    }));
  }, [ticks, valves]);

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/40 font-mono text-[10.5px] text-[#8A8A8A] rounded-xl border border-white/5 justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <span className="text-[#B7FF2A] font-bold">SMART IRRIGATION TELEMETRY</span>
          <span className="text-white/40 text-[9px]">Link: Active</span>
        </div>

        <div className="space-y-3.5 mb-4">
          {moisture.map((m, idx) => (
            <div key={idx} className="p-2 border border-white/5 bg-white/[0.01] rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#F5F5F5] font-bold text-[9px]">Moisture Channel 0{idx + 1}</span>
                <span className={`text-[8.5px] font-bold px-1.5 rounded ${
                  m < 35 ? "text-red-400 bg-red-400/10" : "text-[#B7FF2A] bg-[#B7FF2A]/10"
                }`}>
                  {m < 35 ? "CRITICAL LOW" : "SUFFICIENT"}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-grow bg-white/5 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#B7FF2A] h-full transition-all duration-500"
                    style={{ width: `${m}%` }}
                  />
                </div>
                <span className="text-[10px] text-white w-7 text-right">{m}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[8px] opacity-40">Auto Irrigation Valve 0{idx + 1}</span>
                <button
                  onClick={() => toggleValve(idx)}
                  className={`px-2 py-0.5 rounded text-[8px] uppercase tracking-wider transition-all font-bold cursor-pointer ${
                    valves[idx]
                      ? "bg-[#B7FF2A] text-black"
                      : "bg-white/5 text-[#8A8A8A] hover:bg-white/10"
                  }`}
                >
                  {valves[idx] ? "Valve: Open" : "Valve: Closed"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FaceRecognitionSimulation({ ticks }: { ticks: number }) {
  const [scanOffset, setScanOffset] = useState(0);
  const [confidence, setConfidence] = useState(99.4);
  const [faceCoords, setFaceCoords] = useState({ x: 120, y: 50, w: 90, h: 90 });

  useEffect(() => {
    setScanOffset(prev => (prev + 5) % 100);
    setFaceCoords(prev => ({
      x: Math.max(90, Math.min(160, prev.x + (Math.random() - 0.5) * 4)),
      y: Math.max(40, Math.min(80, prev.y + (Math.random() - 0.5) * 4)),
      w: 90,
      h: 90
    }));
    setConfidence(Number((99.2 + Math.random() * 0.6).toFixed(2)));
  }, [ticks]);

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/40 font-mono text-[10.5px] text-[#8A8A8A] rounded-xl border border-white/5 justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <span className="text-[#B7FF2A] font-bold text-[9px] md:text-[10px]">BIOMETRIC FACE SCANNER</span>
          <span className="text-white/40 text-[8px] md:text-[9px]">Feed: Live</span>
        </div>

        <div className="w-full aspect-[16/10] bg-black/80 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <div
            className="absolute border-2 border-[#B7FF2A] transition-all duration-300 rounded-lg flex flex-col justify-between p-1.5"
            style={{
              left: `${faceCoords.x}px`,
              top: `${faceCoords.y}px`,
              width: `${faceCoords.w}px`,
              height: `${faceCoords.h}px`
            }}
          >
            <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#B7FF2A]" />
            <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#B7FF2A]" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#B7FF2A]" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#B7FF2A]" />
            <div className="text-[7.5px] font-bold text-[#B7FF2A] tracking-wider uppercase">MTCNN_TRACK</div>
            <div className="text-[7.5px] text-white/50 text-right">FACE_01</div>
          </div>

          <div
            className="absolute left-0 w-full h-[1.5px] bg-[#B7FF2A] shadow-[0_0_12px_#B7FF2A] opacity-60 transition-all duration-300 pointer-events-none"
            style={{ top: `${scanOffset}%` }}
          />

          <div className="absolute top-2 left-2 text-[8px] bg-red-600/80 text-white font-bold px-1.5 py-0.5 rounded animate-pulse">● REC</div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-2">
        <div className="flex justify-between items-center text-[9px]">
          <span>Class: <strong className="text-white">Nadipi Mohith Sai</strong></span>
          <span>Confidence: <strong className="text-[#B7FF2A]">{confidence}%</strong></span>
          <span className="text-[#B7FF2A] font-bold bg-[#B7FF2A]/10 px-1.5 rounded text-[8px]">Spoof Check: PASS</span>
        </div>
      </div>
    </div>
  );
}

function ResumeBoosterSimulation({ ticks }: { ticks: number }) {
  const [atsScore, setAtsScore] = useState(74);
  const [boosted, setBoosted] = useState(false);
  const [typingText, setTypingText] = useState("");

  const originalBullet = "I was in charge of managing pharmacy database systems.";
  const boostedBullet = "Architected a high-fidelity Pharmacy DBMS, enhancing batch indexing speed by 40% and deploying a Random Forest clinical diagnostics module.";

  const handleBoost = () => {
    setBoosted(true);
    let charIdx = 0;
    setTypingText("");
    const interval = setInterval(() => {
      setTypingText((prev) => prev + boostedBullet.charAt(charIdx));
      charIdx++;
      if (charIdx >= boostedBullet.length) {
        clearInterval(interval);
        setAtsScore(96);
      }
    }, 20);
  };

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/40 font-mono text-[10.5px] text-[#8A8A8A] rounded-xl border border-white/5 justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <span className="text-[#B7FF2A] font-bold">ATS OPTIMIZATION PLATFORM</span>
          <span className="text-white/40 text-[9px]">API: OpenAI GPT-4o</span>
        </div>

        <div className="flex items-center gap-4 bg-white/[0.01] border border-white/5 p-3 rounded-lg mb-3">
          <div className="relative w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">{atsScore}%</span>
            <svg className="absolute -inset-0.5 w-15 h-15 rotate-[-90deg]" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                stroke="#B7FF2A"
                strokeWidth="3.5"
                fill="none"
                strokeDasharray="289"
                strokeDashoffset={289 - (289 * atsScore) / 100}
                className="transition-all duration-1000"
              />
            </svg>
          </div>
          <div>
            <span className="text-[8.5px] opacity-40 uppercase block">ATS Keyword Matching</span>
            <span className="text-[#F5F5F5] font-bold text-xs block">
              {atsScore < 85 ? "NEEDS KEYWORD RE-PHRASING" : "HIGH ALIGNMENT DETECTED"}
            </span>
            <span className="text-[8px] opacity-50 block mt-0.5">Missing: Architected, Orchestrated, Telemetry</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="p-2 bg-black/60 border border-white/5 rounded-lg">
            <span className="text-[8px] opacity-40 uppercase block mb-1">Standard Bullet (Input)</span>
            <p className="text-white/60 leading-normal">{originalBullet}</p>
          </div>

          <div className="p-2 bg-black/60 border border-white/5 rounded-lg min-h-[50px] relative">
            <span className="text-[8px] text-[#B7FF2A] uppercase block mb-1">ATS Enhanced Bullet (Output)</span>
            {boosted ? (
              <p className="text-[#B7FF2A] leading-normal">{typingText}</p>
            ) : (
              <p className="text-white/20 italic">Click Boost below to translate...</p>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleBoost}
        disabled={boosted}
        className={`w-full mt-3 py-2 rounded font-bold uppercase text-[9.5px] transition-all cursor-pointer ${
          boosted
            ? "bg-white/5 text-white/20 cursor-default"
            : "bg-[#B7FF2A] text-black hover:shadow-[0_0_12px_#B7FF2A]"
        }`}
      >
        Boost ATS Keyword Alignment
      </button>
    </div>
  );
}

function ApexTradingSimulation({ ticks }: { ticks: number }) {
  const [prices, setPrices] = useState([450.2, 451.4, 450.8, 452.1, 451.7, 453.0]);
  const [bids, setBids] = useState([
    { price: 452.9, size: 240 },
    { price: 452.8, size: 180 },
    { price: 452.7, size: 490 }
  ]);

  useEffect(() => {
    setPrices(prev => {
      const lastPrice = prev[prev.length - 1];
      const delta = (Math.random() - 0.45) * 1.5;
      const nextPrice = Number((lastPrice + delta).toFixed(2));
      return [...prev.slice(-9), nextPrice];
    });

    setBids(prev => prev.map(b => ({
      ...b,
      size: Math.max(10, Math.min(990, b.size + Math.floor((Math.random() - 0.5) * 50)))
    })));
  }, [ticks]);

  const maxVal = Math.max(...prices);
  const minVal = Math.min(...prices);
  const range = maxVal - minVal || 1;

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/40 font-mono text-[10.5px] text-[#8A8A8A] rounded-xl border border-white/5 justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <span className="text-[#B7FF2A] font-bold">APEX TRADING LIVE TERMINAL</span>
          <span className="text-white/40 text-[9px] uppercase">Market: Open</span>
        </div>

        <div className="p-2 border border-white/5 bg-black/80 rounded-xl relative h-28 flex items-end justify-between px-4 mb-3">
          {prices.map((p, idx) => {
            const hPercentage = ((p - minVal) / range) * 80 + 10;
            const isGreen = idx === 0 ? true : p >= prices[idx - 1];
            return (
              <div key={idx} className="flex flex-col items-center flex-grow">
                <div
                  className={`w-2.5 transition-all duration-300 rounded ${
                    isGreen ? "bg-[#B7FF2A]" : "bg-red-400"
                  }`}
                  style={{ height: `${hPercentage}px` }}
                />
                <span className="text-[7px] text-white/40 mt-1">${p.toFixed(0)}</span>
              </div>
            );
          })}
          <div className="absolute top-2 right-2 text-[#B7FF2A] font-bold text-xs animate-pulse">
            ${prices[prices.length - 1]?.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-2">
        <span className="text-[8px] text-white/40 uppercase block mb-1">Buy Order Book (Depth)</span>
        <div className="space-y-1 bg-black/60 p-2 rounded-lg border border-white/5">
          {bids.map((b, idx) => (
            <div key={idx} className="flex justify-between items-center text-[9px]">
              <span className="text-[#B7FF2A]">${b.price.toFixed(2)}</span>
              <span className="text-white/50">{b.size} SHARES</span>
              <div className="w-16 bg-white/5 h-1 rounded-full overflow-hidden">
                <div className="bg-[#B7FF2A]/50 h-full" style={{ width: `${(b.size / 990) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DevCollabSimulation({ ticks }: { ticks: number }) {
  const [buildLogs, setBuildLogs] = useState<string[]>([
    "git fetch origin main...",
    "Local branch: main (up to date)",
    "yarn install dependencies success"
  ]);

  useEffect(() => {
    const compileSteps = [
      "Compiling src/components/sections/Projects.tsx...",
      "TypeScript checks successful (0 errors found)",
      "Optimizing CSS bundle (chunks size: 142KB)",
      "Vite dev server refreshed successfully.",
      "Deploying build artifacts to edge server..."
    ];
    setBuildLogs(prev => [...prev.slice(-3), compileSteps[ticks % compileSteps.length]]);
  }, [ticks]);

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/40 font-mono text-[10.5px] text-[#8A8A8A] rounded-xl border border-white/5 justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <span className="text-[#B7FF2A] font-bold">DEV COLLAB COMPILE CONSOLE</span>
          <span className="text-white/40 text-[9px]">State: Idle</span>
        </div>

        <div className="p-3 border border-white/5 bg-white/[0.01] rounded-lg mb-3">
          <span className="text-[8px] opacity-40 uppercase block mb-2">Commit Workflow</span>
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#B7FF2A] flex items-center justify-center text-[7px] text-black font-bold">A</div>
            <div className="h-0.5 flex-grow bg-white/10 relative">
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#B7FF2A]" />
            </div>
            <div className="w-3.5 h-3.5 rounded-full bg-white/10 flex items-center justify-center text-[7px] text-[#8A8A8A]">B</div>
            <div className="h-0.5 flex-grow bg-white/10 relative">
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/30" />
            </div>
            <div className="w-3.5 h-3.5 rounded-full bg-white/5 flex items-center justify-center text-[7px] text-[#8A8A8A]/40">C</div>
          </div>
          <span className="text-[8px] opacity-40 mt-2 block">Active PR: #12 (ATS Matcher Refactor)</span>
        </div>
      </div>

      <div className="border-t border-white/5 pt-2">
        <span className="text-[8px] text-white/40 uppercase block mb-1">Terminal Compiler Outputs</span>
        <div className="bg-black/80 p-2.5 rounded-lg border border-white/5 space-y-1 font-mono text-[9px] text-[#F5F5F5]/70 min-h-[70px]">
          {buildLogs.map((log, idx) => (
            <div key={idx} className="truncate">{`$ ${log}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeAutomationSimulation({ ticks }: { ticks: number }) {
  const [lights, setLights] = useState(true);
  const [acTemp, setAcTemp] = useState(22);
  const [securityArmed, setSecurityArmed] = useState(true);

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/40 font-mono text-[10.5px] text-[#8A8A8A] rounded-xl border border-white/5 justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <span className="text-[#B7FF2A] font-bold">HOME AUTOMATION HUB</span>
          <span className="text-white/40 text-[9px]">Server status: Online</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className={`p-3 border rounded-lg transition-all flex flex-col justify-between ${
            lights ? "border-[#B7FF2A] bg-[#B7FF2A]/5" : "border-white/5 bg-white/[0.01]"
          }`}>
            <span className="text-[8.5px] opacity-40 uppercase block">Smart Lights</span>
            <span className={`text-xs font-bold ${lights ? "text-[#B7FF2A]" : "text-white/30"}`}>
              {lights ? "STATUS: ON" : "STATUS: OFF"}
            </span>
            <button
              onClick={() => setLights(!lights)}
              className="mt-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[8.5px] text-white cursor-pointer"
            >
              Toggle
            </button>
          </div>

          <div className="p-3 border border-white/5 bg-white/[0.01] rounded-lg flex flex-col justify-between">
            <span className="text-[8.5px] opacity-40 uppercase block">AC Climate</span>
            <span className="text-white text-xs font-bold">TEMP: {acTemp}°C</span>
            <div className="flex items-center gap-1.5 mt-2">
              <button
                onClick={() => setAcTemp(prev => Math.max(16, prev - 1))}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white font-bold cursor-pointer"
              >
                -
              </button>
              <button
                onClick={() => setAcTemp(prev => Math.min(30, prev + 1))}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white font-bold cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <div className={`p-3 border col-span-2 rounded-lg transition-all flex items-center justify-between ${
            securityArmed ? "border-red-500 bg-red-500/5" : "border-white/5 bg-white/[0.01]"
          }`}>
            <div>
              <span className="text-[8.5px] opacity-40 uppercase block">Security Array</span>
              <span className={`text-xs font-bold ${securityArmed ? "text-red-400" : "text-white/30"}`}>
                {securityArmed ? "SYSTEM ARMED" : "SYSTEM DISARMED"}
              </span>
            </div>
            <button
              onClick={() => setSecurityArmed(!securityArmed)}
              className={`px-3 py-1 rounded text-[8px] uppercase tracking-wider font-bold cursor-pointer ${
                securityArmed ? "bg-red-500 text-white" : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {securityArmed ? "Disarm" : "Arm System"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioSimulation({ ticks }: { ticks: number }) {
  const [speed, setSpeed] = useState(1.5);
  const [oblique, setOblique] = useState(45);
  const [stars, setStars] = useState(33);

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/40 font-mono text-[10.5px] text-[#8A8A8A] rounded-xl border border-white/5 justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <span className="text-[#B7FF2A] font-bold">PORTFOLIO SHADER CONTROL PANEL</span>
          <span className="text-white/40 text-[9px]">Engine: WebGL v2.0</span>
        </div>

        <div className="space-y-3.5 mb-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#F5F5F5] font-bold text-[9px]">Dune Wave Speed</span>
              <span className="text-[#B7FF2A] text-[9px]">{speed}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="4.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-[#B7FF2A] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#F5F5F5] font-bold text-[9px]">Oblique Obliquity Angle</span>
              <span className="text-[#B7FF2A] text-[9px]">{oblique}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              value={oblique}
              onChange={(e) => setOblique(Number(e.target.value))}
              className="w-full accent-[#B7FF2A] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#F5F5F5] font-bold text-[9px]">Emitter Ratio</span>
              <span className="text-[#B7FF2A] text-[9px]">{stars}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={stars}
              onChange={(e) => setStars(Number(e.target.value))}
              className="w-full accent-[#B7FF2A] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FallbackTerminal({ SimulationTitle, ticks }: { SimulationTitle: string; ticks: number }) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const logBase = [
      `[SysInfo] Initializing connection to core module...`,
      `[Memory] Shared storage cache allocation ok.`,
      `[Network] Sync latency: 12ms.`,
      `[Inference] Ticking process registry.`,
      `[System] Diagnostic telemetry normal.`
    ];
    setLogs([
      `[Time:${new Date().toLocaleTimeString()}] Querying node info for ${SimulationTitle}...`,
      ...logBase
    ]);
  }, [SimulationTitle, ticks]);

  return (
    <div className="w-full h-full flex flex-col p-4 bg-black/40 font-mono text-[10.5px] text-[#8A8A8A] rounded-xl border border-white/5 justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <span className="text-[#B7FF2A] font-bold">{SimulationTitle.toUpperCase()} SIMULATOR</span>
          <span className="text-white/40 text-[9px]">Tick: {ticks}</span>
        </div>

        <div className="bg-black/60 p-3 rounded-lg border border-white/5 min-h-[140px] space-y-1.5 max-h-[180px] overflow-y-auto">
          {logs.map((log, idx) => (
            <div key={idx} className="text-[#F5F5F5]/70 leading-normal">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InteractiveSimulation({ projectTitle, ticks }: { projectTitle: string; ticks: number }) {
  const normalizedTitle = projectTitle.toLowerCase();

  if (normalizedTitle.includes("pharmaflow")) {
    return <PharmaFlowSimulation ticks={ticks} />;
  }
  if (normalizedTitle.includes("plan your day")) {
    return <PlanYourDaySimulation ticks={ticks} />;
  }
  if (normalizedTitle.includes("retinal") || normalizedTitle.includes("biomedical")) {
    return <RetinalDiagnosticsSimulation ticks={ticks} />;
  }
  if (normalizedTitle.includes("aperture")) {
    return <ApertureSimulation ticks={ticks} />;
  }
  if (normalizedTitle.includes("trailguard")) {
    return <TrailGuardSimulation ticks={ticks} />;
  }
  if (normalizedTitle.includes("irrigation")) {
    return <SmartIrrigationSimulation ticks={ticks} />;
  }
  if (normalizedTitle.includes("face recognition") || normalizedTitle.includes("attendance")) {
    return <FaceRecognitionSimulation ticks={ticks} />;
  }
  if (normalizedTitle.includes("resume booster")) {
    return <ResumeBoosterSimulation ticks={ticks} />;
  }
  if (normalizedTitle.includes("apex trading")) {
    return <ApexTradingSimulation ticks={ticks} />;
  }
  if (normalizedTitle.includes("dev collab") || normalizedTitle.includes("devcollab")) {
    return <DevCollabSimulation ticks={ticks} />;
  }
  if (normalizedTitle.includes("home automation")) {
    return <HomeAutomationSimulation ticks={ticks} />;
  }
  if (normalizedTitle.includes("portfolio")) {
    return <PortfolioSimulation ticks={ticks} />;
  }

  return <FallbackTerminal SimulationTitle={projectTitle} ticks={ticks} />;
}

function GraphicBlueprintView({ project }: { project: any }) {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center bg-black/40 p-4 md:p-6 text-center font-mono">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      {/* Outer rotating technical circle */}
      <div className="absolute w-[80%] max-w-[340px] aspect-square rounded-full border border-white/5 animate-[spin_60s_linear_infinite] flex items-center justify-center pointer-events-none">
        <div className="w-[85%] h-[85%] rounded-full border border-dashed border-[#B7FF2A]/20" />
      </div>

      {/* SVG Graphic wrapper */}
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/[0.01] border border-white/5 flex items-center justify-center mb-4 md:mb-5 relative z-10 shadow-[0_0_50px_rgba(255,255,255,0.02)]">
        <div className="scale-150 text-[#B7FF2A] drop-shadow-[0_0_12px_rgba(183,255,42,0.4)]">
          {project.graphic}
        </div>
      </div>

      <div className="relative z-10 space-y-1.5 max-w-md">
        <span className="text-[8.5px] text-[#B7FF2A] tracking-[0.25em] uppercase block">
          SYSTEM GRAPHIC BLUEPRINT
        </span>
        <h3 className="text-white text-xs md:text-sm uppercase tracking-wider font-bold">
          {project.title}
        </h3>
        <p className="text-[9.5px] text-[#8A8A8A] leading-relaxed max-w-sm mx-auto">
          No external image assets configured. Procedural telemetry and core microservices logs are fully active in the simulator.
        </p>
      </div>

      {/* Technical corners */}
      <div className="absolute top-4 left-4 text-[8px] text-white/20">SYS.LOC // 0x77AF</div>
      <div className="absolute top-4 right-4 text-[8px] text-[#B7FF2A] opacity-60">STATUS // ACTIVE</div>
      <div className="absolute bottom-4 left-4 text-[8px] text-white/20">BAUD // 115200</div>
      <div className="absolute bottom-4 right-4 text-[8px] text-white/20">CORE // x86_64</div>
    </div>
  );
}

function ProjectImage({ project, isExpanded = false }: { project: any; isExpanded?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!project.images || project.images.length === 0) {
    return (
      <div className="w-full h-full relative flex items-center justify-center bg-black/20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
        <div className={`${isExpanded ? "scale-150" : "group-hover:scale-110"} transition-transform duration-500 flex items-center justify-center`}>
          {project.graphic}
        </div>
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full h-full relative group/img overflow-hidden bg-black/40">
      {/* Images using Next.js Image Component */}
      {project.images.map((imgUrl: string, idx: number) => (
        <Image
          key={imgUrl}
          src={imgUrl}
          alt={`${project.title} screenshot ${idx + 1}`}
          fill
          sizes={isExpanded ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 400px"}
          priority={idx === 0}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ease-in-out ${
            idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          } group-hover:scale-108`}
        />
      ))}

      {/* Navigation Arrows */}
      {project.images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-black/80 hover:border-white/30 z-10 cursor-pointer"
            title="Previous Image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-black/80 hover:border-white/30 z-10 cursor-pointer"
            title="Next Image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {project.images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
          {project.images.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? "bg-[#B7FF2A] w-4" : "bg-white/40"
              }`}
              title={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [showAllCompleted, setShowAllCompleted] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<any | null>(null);
  
  const [leftViewMode, setLeftViewMode] = useState<"gallery" | "simulation">("gallery");
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState<number>(0);
  const [simTicks, setSimTicks] = useState<number>(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setSimTicks((prev) => prev + 1);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (expandedProject) {
      const hasScreenshots = expandedProject.screenshots && expandedProject.screenshots.length > 0;
      setLeftViewMode(hasScreenshots ? "gallery" : "simulation");
      setActiveScreenshotIdx(0);
      setZoomScale(1);
      setIsFullscreenOpen(false);
    }
  }, [expandedProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreenOpen) {
          setIsFullscreenOpen(false);
          setZoomScale(1);
        } else {
          setExpandedProject(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreenOpen]);

  useEffect(() => {
    if (expandedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [expandedProject]);

  const allProjects = [
    {
      title: "Plan Your Day",
      category: "Mobile Application",
      status: "Completed" as const,
      year: "2026",
      shortDescription: "A personal task manager and daily planner Android application developed in Android Studio using Java and Kotlin.",
      fullDescription: "A native Android application designed to help users structure their daily tasks, track deadlines, set time triggers, and log completed actions. Built utilizing a hybrid codebase of Java and Kotlin within Android Studio, it features clean task categorizations (Monthly, Recurring, Completed) and visual weekly summary charts.",
      technologies: ["Android SDK", "Java", "Kotlin", "SQLite", "Android Studio"],
      features: ["Task Dashboard & Analytics", "Interactive Time Pickers", "Categorized Task Sheets", "Weekly Progress Summary"],
      architecture: {
        frontend: "Native Android XML + Material Components",
        backend: "Local Application Logic (Java/Kotlin)",
        database: "SQLite / Room Database",
        deployment: "Google Play Store / APK"
      },
      screenshots: [
        "/projects/plan-your-day/dashboard.png",
        "/projects/plan-your-day/create_task.png",
        "/projects/plan-your-day/monthly_tasks.png",
        "/projects/plan-your-day/completed_tasks.png"
      ],
      githubRepository: "https://github.com/Mohithsai-18",
      liveDemo: "#",
      documentation: "https://github.com/Mohithsai-18#readme",
      featured: false,

      // Compatibility fields
      desc: "A personal task manager and daily planner Android application developed in Android Studio using Java and Kotlin.",
      tech: ["Android Studio", "Java", "Kotlin", "SQLite"],
      techStack: ["Android Studio", "Java", "Kotlin", "SQLite"],
      github: "https://github.com/Mohithsai-18",
      demo: "#",
      images: [
        "/projects/plan-your-day/dashboard.png",
        "/projects/plan-your-day/create_task.png",
        "/projects/plan-your-day/monthly_tasks.png",
        "/projects/plan-your-day/completed_tasks.png"
      ],
      illustrationClass: "bg-white/[0.01] border border-white/5",
      graphic: (
        <svg className="w-10 h-10 text-[#8A8A8A] opacity-60" viewBox="0 0 100 100" fill="none">
          <rect x="25" y="15" width="50" height="70" rx="8" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="78" r="3" fill="currentColor" />
          <line x1="35" y1="28" x2="65" y2="28" stroke="currentColor" strokeWidth="1.5" />
          <rect x="35" y="38" width="30" height="25" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <line x1="42" y1="45" x2="58" y2="45" stroke="currentColor" strokeWidth="1" />
          <line x1="42" y1="50" x2="54" y2="50" stroke="currentColor" strokeWidth="1" />
          <line x1="42" y1="55" x2="50" y2="55" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    },
    {
      title: "Retinal AI Diagnostics",
      category: "Biomedical AI",
      status: "Completed" as const,
      year: "2026",
      shortDescription: "AI system for retinal disease detection using deep learning fundus scans.",
      fullDescription: "A deep-learning-driven clinical helper designed for automatic detection and severity classification of Diabetic Retinopathy, Glaucoma, and Cataracts. Features a responsive React diagnostics frontend, explainable AI Grad-CAM overlays, longitudinal scan comparisons, and PDF reports.",
      technologies: ["FastAPI", "React", "PyTorch", "Tailwind CSS", "MySQL"],
      features: ["Retinal Disease Detection", "Diabetic Retinopathy Grading", "Patient Reports Generator", "Model Performance Analysis"],
      architecture: {
        frontend: "React + Tailwind CSS v4 + Framer Motion",
        backend: "FastAPI + SQLAlchemy (Python)",
        database: "MySQL",
        ai: "PyTorch (ResNet50)",
        deployment: "Local Host / Docker"
      },
      screenshots: [
        "/projects/biomedical/dashboard-overview.png",
        "/projects/biomedical/upload-page.png",
        "/projects/biomedical/analysis-results.png",
        "/projects/biomedical/compare-page.png",
        "/projects/biomedical/history-page.png",
        "/projects/biomedical/mobile-dashboard.png",
        "/projects/biomedical/mobile-upload.png"
      ],
      githubRepository: "https://github.com/Mohithsai-18/retinal-disease-detection-ai",
      liveDemo: "#",
      documentation: "https://github.com/Mohithsai-18/retinal-disease-detection-ai#readme",
      featured: false,

      // Compatibility fields
      desc: "AI system for retinal disease detection using deep learning fundus scans.",
      tech: ["FastAPI", "React", "PyTorch", "Tailwind CSS", "MySQL"],
      techStack: ["FastAPI", "React", "PyTorch", "Tailwind CSS", "MySQL"],
      github: "https://github.com/Mohithsai-18/retinal-disease-detection-ai",
      demo: "#",
      images: [
        "/projects/biomedical/dashboard-overview.png",
        "/projects/biomedical/upload-page.png",
        "/projects/biomedical/analysis-results.png",
        "/projects/biomedical/compare-page.png",
        "/projects/biomedical/history-page.png",
        "/projects/biomedical/mobile-dashboard.png",
        "/projects/biomedical/mobile-upload.png"
      ],
      illustrationClass: "bg-white/[0.01] border border-white/5",
      graphic: (
        <svg className="w-10 h-10 text-[#8A8A8A] opacity-60" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50 10 L50 20 M50 80 L50 90 M10 50 L20 50 M80 50 L90 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 22 L30 30 M70 70 L78 78 M22 78 L30 70 M70 22 L78 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "DevCollab Platform",
      category: "Project Management",
      status: "Completed" as const,
      year: "2026",
      shortDescription: "A collaborative project management platform with real-time kanban boards and AI assistant.",
      fullDescription: "A real-time workspace designed for developer teams. Includes drag-and-drop task boards, sprint planning views, team velocity analytics charts, direct GitHub integration, and a conversational AI assistant.",
      technologies: ["React", "Node.js", "Express", "MySQL", "Socket.io"],
      features: ["Real-time Kanban Board", "Sprint Planning", "Velocity Analytics", "AI Workspace Assistant"],
      architecture: {
        frontend: "React.js + Bootstrap 5 + Recharts",
        backend: "Node.js + Express.js + Socket.io",
        database: "MySQL 8.0",
        ai: "Groq LLaMA-3 API",
        deployment: "Vercel / Local Host"
      },
      screenshots: [
        "/projects/devcollab/landing.png",
        "/projects/devcollab/dashboard.png",
        "/projects/devcollab/sprints.png",
        "/projects/devcollab/ai_tools.png",
        "/projects/devcollab/login.png",
        "/projects/devcollab/register.png"
      ],
      githubRepository: "https://github.com/Mohithsai-18/devcollab",
      liveDemo: "https://devcollab-xi.vercel.app/",
      documentation: "https://github.com/Mohithsai-18/devcollab#readme",
      featured: true,

      // Compatibility fields
      desc: "A collaborative project management platform with real-time kanban boards and AI assistant.",
      tech: ["React", "Node.js", "Express", "MySQL", "Socket.io"],
      techStack: ["React", "Node.js", "Express", "MySQL", "Socket.io"],
      github: "https://github.com/Mohithsai-18/devcollab",
      demo: "https://devcollab-xi.vercel.app/",
      images: [
        "/projects/devcollab/landing.png",
        "/projects/devcollab/dashboard.png",
        "/projects/devcollab/sprints.png",
        "/projects/devcollab/ai_tools.png",
        "/projects/devcollab/login.png",
        "/projects/devcollab/register.png"
      ],
      illustrationClass: "bg-white/[0.01] border border-white/5",
      graphic: (
        <svg className="w-10 h-10 text-[#8A8A8A] opacity-60" viewBox="0 0 100 100" fill="none">
          <rect x="20" y="25" width="60" height="50" rx="4" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="2" />
          <circle cx="35" cy="32.5" r="2" fill="currentColor" />
          <circle cx="45" cy="32.5" r="2" fill="currentColor" />
          <circle cx="55" cy="32.5" r="2" fill="currentColor" />
          <path d="M35 55 L45 65 L65 47" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: "Aperture AI",
      category: "Cloud Infrastructure",
      status: "Completed" as const,
      year: "2025",
      shortDescription: "Production-grade Kubernetes platform for dynamically scheduling GPU workloads and serving LLM inference at scale.",
      fullDescription: "A production-grade Kubernetes-native platform for dynamically scheduling GPU workloads and serving LLM inference at scale. Integrates a custom Go operator with a Python FastAPI/vLLM inference server, Helm charts, and a comprehensive Prometheus/Grafana observability stack.",
      technologies: ["Go", "Python", "Kubernetes", "FastAPI", "vLLM", "Helm", "Grafana", "Prometheus", "Docker"],
      features: ["GPU Telemetry & Scheduling", "vLLM Inference Server", "Custom Go Kubernetes Operator", "Grafana/Prometheus Dashboards", "Resource Auto-scaling"],
      architecture: {
        frontend: "Grafana Dashboards + React Admin Panel",
        backend: "Go Operator + FastAPI/vLLM Inference Server",
        database: "Prometheus + Redis Cache",
        ai: "vLLM (LLaMA / Mistral Inference)",
        deployment: "Kubernetes Cluster (Helm charts)"
      },
      screenshots: [
        "/projects/aperture/swagger_docs.png",
        "/projects/aperture/health_check.png",
        "/projects/aperture/metrics.png",
        "/projects/aperture/grafana_dashboard_overview.png",
        "/projects/aperture/grafana_dashboard_details.png",
        "/projects/aperture/grafana_alerts.png"
      ],
      githubRepository: "https://github.com/Mohithsai-18/aperture-ai",
      liveDemo: "#",
      documentation: "https://github.com/Mohithsai-18/aperture-ai#readme",
      featured: true,

      // Compatibility fields
      desc: "Production-grade Kubernetes platform for dynamically scheduling GPU workloads and serving LLM inference at scale.",
      tech: ["Go", "Python", "Kubernetes", "FastAPI", "vLLM", "Helm", "Grafana", "Prometheus", "Docker"],
      techStack: ["Go", "Python", "Kubernetes", "FastAPI", "vLLM", "Helm", "Grafana", "Prometheus", "Docker"],
      github: "https://github.com/Mohithsai-18/aperture-ai",
      demo: "#",
      images: [
        "/projects/aperture/swagger_docs.png",
        "/projects/aperture/health_check.png",
        "/projects/aperture/metrics.png",
        "/projects/aperture/grafana_dashboard_overview.png",
        "/projects/aperture/grafana_dashboard_details.png",
        "/projects/aperture/grafana_alerts.png"
      ],
      illustrationClass: "bg-white/[0.01] border border-white/5",
      graphic: (
        <svg className="w-10 h-10 text-[#8A8A8A] opacity-60" viewBox="0 0 100 100" fill="none">
          <rect x="25" y="20" width="50" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="25" y="42" width="50" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="25" y="64" width="50" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="35" cy="27.5" r="2" fill="currentColor" />
          <circle cx="35" cy="49.5" r="2" fill="currentColor" />
          <circle cx="35" cy="71.5" r="2" fill="currentColor" />
          <line x1="60" y1="27.5" x2="70" y2="27.5" stroke="currentColor" strokeWidth="2" />
          <line x1="60" y1="49.5" x2="70" y2="49.5" stroke="currentColor" strokeWidth="2" />
          <line x1="60" y1="71.5" x2="70" y2="71.5" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: "TrailGuard",
      category: "Embedded Safety System",
      status: "Completed" as const,
      year: "2025",
      shortDescription: "AI wearable safety ecosystem for traveller safety and emergency communication.",
      fullDescription: "An off-grid AI wearable safety ecosystem designed for hikers and travelers. Features real-time biometric analysis, location beaconing, fall detection, and satellite/LoRa mesh network emergency relay alerts.",
      technologies: ["ESP32", "IoT", "Sensors"],
      features: ["Emergency Alerts", "GPS Tracking", "Safety Monitoring"],
      architecture: {
        frontend: "React Control Panel",
        backend: "Node-RED Gateway",
        database: "InfluxDB Logger",
        ai: "TensorFlow Lite Micro (Fall Detector)",
        deployment: "ESP32 Hardware Module"
      },
      screenshots: [
        "/projects/trailguard/screen-1.png",
        "/projects/trailguard/screen-2.png",
        "/projects/trailguard/screen-3.png",
        "/projects/trailguard/screen-4.png"
      ],
      githubRepository: "",
      liveDemo: "#",
      documentation: "https://github.com/Mohithsai-18#readme",
      featured: true,

      // Compatibility fields
      desc: "AI wearable safety ecosystem for traveller safety and emergency communication.",
      tech: ["ESP32", "IoT", "Sensors"],
      techStack: ["ESP32", "IoT", "Sensors"],
      github: "",
      demo: "#",
      images: [
        "/projects/trailguard/screen-1.png",
        "/projects/trailguard/screen-2.png",
        "/projects/trailguard/screen-3.png",
        "/projects/trailguard/screen-4.png"
      ],
      illustrationClass: "bg-white/[0.01] border border-white/5",
      graphic: (
        <svg className="w-10 h-10 text-[#8A8A8A] opacity-60" viewBox="0 0 100 100" fill="none">
          <path d="M50 15 L80 25 V50 C80 68 67 81 50 85 C33 81 20 68 20 50 V25 L50 15 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="50" cy="45" r="8" stroke="currentColor" strokeWidth="2" />
          <path d="M50 53 L50 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "Apex Trading Agent",
      category: "FinTech AI Agent",
      status: "In Progress" as const,
      year: "2026",
      shortDescription: "Autonomous trading agent terminal with predictive LSTM models and multi-agent execution loops.",
      fullDescription: "A real-time trading simulator displaying fast options chains, interactive candlestick graphs, order book matching algorithms, and predictive time-series LSTM alerts driven by AI agents.",
      technologies: ["React", "APIs", "Analytics", "Real-Time Data"],
      features: ["Market Analysis", "Trading Dashboard", "Portfolio Tracking", "Insights Engine"],
      architecture: {
        frontend: "React + Tailwind + WebSocket client",
        backend: "Go Microservices Engine",
        database: "TimescaleDB + Redis Cache",
        ai: "LSTM Time-Series Predictor",
        deployment: "Google Cloud Kubernetes Engine"
      },
      screenshots: [
        "/projects/apex-trading/cover.webp",
        "/projects/apex-trading/screen-1.webp",
        "/projects/apex-trading/screen-2.webp",
        "/projects/apex-trading/screen-3.webp",
        "/projects/apex-trading/screen-4.webp"
      ],
      githubRepository: "https://github.com/Mohithsai-18",
      liveDemo: "#",
      documentation: "https://github.com/Mohithsai-18#readme",
      featured: false,

      // Compatibility fields
      desc: "Autonomous trading agent terminal with predictive LSTM models and multi-agent execution loops.",
      tech: ["React", "APIs", "Analytics", "Real-Time Data"],
      techStack: ["React", "APIs", "Analytics", "Real-Time Data"],
      github: "https://github.com/Mohithsai-18",
      demo: "#",
      images: [
        "/projects/apex-trading/cover.webp",
        "/projects/apex-trading/screen-1.webp",
        "/projects/apex-trading/screen-2.webp",
        "/projects/apex-trading/screen-3.webp",
        "/projects/apex-trading/screen-4.webp"
      ],
      illustrationClass: "bg-white/[0.01] border border-white/5",
      graphic: (
        <svg className="w-10 h-10 text-[#8A8A8A] opacity-60" viewBox="0 0 100 100" fill="none">
          <path d="M20 80 L35 55 L55 65 L80 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="70 30 80 30 80 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: "PharmaFlow",
      category: "Healthcare AI Platform",
      status: "Completed" as const,
      year: "2025",
      shortDescription: "An ambient dark web application for pharmacies to manage inventory, sales, suppliers, and billing, featuring an integrated Random Forest machine learning clinical chatbot.",
      fullDescription: "PharmaFlow is a comprehensive healthcare system designed for modern pharmacies. It automates inventory tracking, generates low-stock warning alerts, structures supplier directories, and processes sales invoices in real-time. It features an integrated clinical helper running a local Random Forest classifier to answer inquiries about medicine categorization and dosage guides.",
      technologies: ["Flask", "Python", "MySQL", "Machine Learning", "Chart.js"],
      features: ["Inventory Management", "Sales Management", "Supplier Management", "Billing System", "AI Clinical Assistant", "Analytics Dashboard"],
      architecture: {
        frontend: "HTML5 + CSS + Chart.js",
        backend: "Flask (Python)",
        database: "MySQL",
        ai: "Scikit-Learn (Random Forest)",
        deployment: "Local System / Docker"
      },
      screenshots: [
        "/projects/pharmaflow/cover.webp",
        "/projects/pharmaflow/screen-1.webp",
        "/projects/pharmaflow/screen-2.webp",
        "/projects/pharmaflow/screen-3.webp",
        "/projects/pharmaflow/screen-4.webp"
      ],
      githubRepository: "https://github.com/Mohithsai-18/Pharmacy-DBMS",
      liveDemo: "http://127.0.0.1:5005/dashboard",
      documentation: "https://github.com/Mohithsai-18/Pharmacy-DBMS#readme",
      featured: false,

      // Compatibility fields
      desc: "An ambient dark web application for pharmacies to manage inventory, sales, suppliers, and billing, featuring an integrated Random Forest machine learning clinical chatbot.",
      tech: ["Flask", "Python", "MySQL", "Machine Learning", "Chart.js"],
      techStack: ["Flask", "Python", "MySQL", "Machine Learning", "Chart.js"],
      github: "https://github.com/Mohithsai-18/Pharmacy-DBMS",
      demo: "http://127.0.0.1:5005/dashboard",
      images: [
        "/projects/pharmaflow/cover.webp",
        "/projects/pharmaflow/screen-1.webp",
        "/projects/pharmaflow/screen-2.webp",
        "/projects/pharmaflow/screen-3.webp",
        "/projects/pharmaflow/screen-4.webp"
      ],
      illustrationClass: "bg-white/[0.01] border border-white/5",
      graphic: (
        <svg className="w-10 h-10 text-[#8A8A8A] opacity-60" viewBox="0 0 100 100" fill="none">
          <rect x="30" y="25" width="40" height="50" rx="10" stroke="currentColor" strokeWidth="2" />
          <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="2" />
          <line x1="50" y1="35" x2="50" y2="65" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: "Smart Irrigation System",
      category: "IoT Automation",
      status: "Completed" as const,
      year: "2024",
      shortDescription: "IoT based automated irrigation system with moisture sensing.",
      fullDescription: "An intelligent agriculture platform using connected microcontrollers to read real-time soil moisture levels, air temperatures, and relative humidity. It automatically triggers water relays, syncs telemetry logs to the cloud, and minimizes water consumption.",
      technologies: ["Arduino", "IoT", "Sensors", "Cloud"],
      features: ["Soil Monitoring", "Automatic Irrigation", "Remote Monitoring", "Water Optimization"],
      architecture: {
        frontend: "Blynk Dashboard",
        backend: "ESP8266 C++ Controller",
        database: "Blynk Time-Series DB",
        deployment: "Solar-Powered Node Hardware"
      },
      screenshots: [
        "/projects/smart-irrigation/cover.webp",
        "/projects/smart-irrigation/screen-1.webp",
        "/projects/smart-irrigation/screen-2.webp",
        "/projects/smart-irrigation/screen-3.webp",
        "/projects/smart-irrigation/screen-4.webp"
      ],
      githubRepository: "https://github.com/Mohithsai-18",
      liveDemo: "#",
      documentation: "https://github.com/Mohithsai-18#readme",
      featured: true,

      // Compatibility fields
      desc: "IoT based automated irrigation system with moisture sensing.",
      tech: ["Arduino", "IoT", "Sensors", "Cloud"],
      techStack: ["Arduino", "IoT", "Sensors", "Cloud"],
      github: "https://github.com/Mohithsai-18",
      demo: "#",
      images: [
        "/projects/smart-irrigation/cover.webp",
        "/projects/smart-irrigation/screen-1.webp",
        "/projects/smart-irrigation/screen-2.webp",
        "/projects/smart-irrigation/screen-3.webp",
        "/projects/smart-irrigation/screen-4.webp"
      ],
      illustrationClass: "bg-white/[0.01] border border-white/5",
      graphic: (
        <svg className="w-10 h-10 text-[#8A8A8A] opacity-60" viewBox="0 0 100 100" fill="none">
          <path d="M50 15L15 45H25V80H75V45H85L50 15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="50" cy="55" r="10" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: "Scan Your Attendance",
      category: "Computer Vision / SaaS",
      status: "Completed" as const,
      year: "2026",
      shortDescription: "Production-grade facial biometric attendance system.",
      fullDescription: "A user-friendly, production-grade Face Recognition Attendance System designed for local institutional registry gates. Powered by an advanced Python FastAPI backend and a responsive TypeScript React frontend, the system performs real-time webcam face matching against database signatures. Features include dynamic student enrollment, admin credentials security, live telemetry event feeds, settings customization, and PDF/CSV report exports.",
      technologies: ["React (Vite)", "TypeScript", "FastAPI", "dlib", "face_recognition", "PostgreSQL", "Tailwind CSS"],
      features: ["Webcam Biometric Matching", "Dynamic Student Enrollment", "Secure Administrator Console", "Chronological Check-in Logs", "Hourly Attendance Analytics Grid", "CSV & PDF Report Export"],
      architecture: {
        frontend: "React (Vite) + TypeScript + Tailwind CSS v3",
        backend: "FastAPI (Python) + SQLAlchemy ORM",
        database: "PostgreSQL (In-memory NumPy distance matching)",
        ai: "dlib + face_recognition library",
        deployment: "Local Institutional Gateway / Docker"
      },
      screenshots: [
        "/projects/scan-your-attendance/dashboard.png",
        "/projects/scan-your-attendance/login.png",
        "/projects/scan-your-attendance/register_student.png",
        "/projects/scan-your-attendance/attendance_history.png",
        "/projects/scan-your-attendance/attendance_history_grid.png",
        "/projects/scan-your-attendance/live_scanner.png",
        "/projects/scan-your-attendance/reports.png",
        "/projects/scan-your-attendance/settings.png"
      ],
      githubRepository: "https://github.com/Mohithsai-18/scan-your-attendance",
      liveDemo: "#",
      documentation: "https://github.com/Mohithsai-18/scan-your-attendance#readme",
      featured: false,

      // Compatibility fields
      desc: "Production-grade facial biometric attendance system.",
      tech: ["React (Vite)", "TypeScript", "FastAPI", "dlib", "PostgreSQL", "Tailwind CSS"],
      techStack: ["React (Vite)", "TypeScript", "FastAPI", "dlib", "PostgreSQL", "Tailwind CSS"],
      github: "https://github.com/Mohithsai-18/scan-your-attendance",
      demo: "#",
      images: [
        "/projects/scan-your-attendance/dashboard.png",
        "/projects/scan-your-attendance/login.png",
        "/projects/scan-your-attendance/register_student.png",
        "/projects/scan-your-attendance/attendance_history.png",
        "/projects/scan-your-attendance/attendance_history_grid.png",
        "/projects/scan-your-attendance/live_scanner.png",
        "/projects/scan-your-attendance/reports.png",
        "/projects/scan-your-attendance/settings.png"
      ],
      illustrationClass: "bg-white/[0.01] border border-white/5",
      graphic: (
        <svg className="w-10 h-10 text-[#8A8A8A] opacity-60" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: "Portfolio Website",
      category: "Personal Branding",
      status: "Completed" as const,
      year: "2026",
      shortDescription: "Modern portfolio built with Next.js, Tailwind CSS and Framer Motion.",
      fullDescription: "A high-end developer showcase portfolio combining a GPU-accelerated WebGL sand dune canvas simulation, smooth Framer Motion spring physics, contextual overlays, glassmorphic card cards, and clean typography.",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
      features: ["Animated Dune Background", "Interactive Projects", "Responsive Design", "Glassmorphism UI"],
      architecture: {
        frontend: "Next.js App Router + GLSL Shaders",
        backend: "Next.js Serverless API",
        database: "None (Static Metadata)",
        deployment: "Vercel Edge Network"
      },
      screenshots: [
        "/projects/portfolio/cover.webp",
        "/projects/portfolio/screen-1.webp",
        "/projects/portfolio/screen-2.webp",
        "/projects/portfolio/screen-3.webp",
        "/projects/portfolio/screen-4.webp"
      ],
      githubRepository: "https://github.com/Mohithsai-18/portfolio",
      liveDemo: "#",
      documentation: "https://github.com/Mohithsai-18/portfolio#readme",
      featured: false,

      // Compatibility fields
      desc: "Modern portfolio built with Next.js, Tailwind CSS and Framer Motion.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
      techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
      github: "https://github.com/Mohithsai-18/portfolio",
      demo: "#",
      images: [
        "/projects/portfolio/cover.webp",
        "/projects/portfolio/screen-1.webp",
        "/projects/portfolio/screen-2.webp",
        "/projects/portfolio/screen-3.webp",
        "/projects/portfolio/screen-4.webp"
      ],
      illustrationClass: "bg-white/[0.01] border border-white/5",
      graphic: (
        <svg className="w-10 h-10 text-[#8A8A8A] opacity-60" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="10" fill="currentColor" />
          <path d="M50 10 L50 30 M50 70 L50 90 M10 50 L30 50 M70 50 L90 50" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: "City Resilience Platform",
      category: "Urban Analytics / AI",
      status: "In Progress" as const,
      year: "2026",
      shortDescription: "AI-powered urban simulation and climate resilience planning system.",
      fullDescription: "An agent-based city simulation model built to test infrastructure resilience against extreme climate events, traffic bottlenecks, and power grid failures. Features real-time spatial analytics and predictive disaster response pathways.",
      technologies: ["Next.js", "Python", "GIS", "Machine Learning"],
      features: ["Disaster Simulation", "Telemetry Analysis", "Infrastructure Mapping", "Resource Routing"],
      architecture: {
        frontend: "Next.js Web Map UI",
        backend: "Python Simulation Engine",
        database: "PostgreSQL/PostGIS",
        ai: "Reinforcement Learning Agents",
        deployment: "Dockerized AWS Infrastructure"
      },
      screenshots: [],
      githubRepository: "https://github.com/Mohithsai-18",
      liveDemo: "#",
      documentation: "https://github.com/Mohithsai-18#readme",
      featured: false,

      // Compatibility fields
      desc: "AI-powered urban simulation and climate resilience planning system.",
      tech: ["Next.js", "Python", "GIS", "Machine Learning"],
      techStack: ["Next.js", "Python", "GIS", "Machine Learning"],
      github: "https://github.com/Mohithsai-18",
      demo: "#",
      images: [],
      illustrationClass: "bg-white/[0.01] border border-white/5",
      graphic: (
        <svg className="w-10 h-10 text-[#8A8A8A] opacity-60" viewBox="0 0 100 100" fill="none">
          <rect x="20" y="20" width="60" height="60" rx="4" stroke="currentColor" strokeWidth="2" />
          <path d="M20 50 H80 M50 20 V80" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      )
    },
    {
      title: "Personal AI Assistant",
      category: "Agentic AI / Automation",
      status: "In Progress" as const,
      year: "2026",
      shortDescription: "Autonomous agent system executing workflows, tool-use, and environment controls.",
      fullDescription: "An advanced personal agent utilizing large language models to execute natural language commands across system APIs, orchestrate developer environment setups, trigger file structures, and perform browser-based agentic workflows.",
      technologies: ["Python", "LLMs", "LangChain", "FastAPI", "React"],
      features: ["Tool-use Integration", "Autonomous Agent Loops", "System Command Executions", "Browser Automation Nodes"],
      architecture: {
        frontend: "React Terminal UI",
        backend: "FastAPI Agent Hub",
        database: "Redis Vector Store",
        ai: "LangGraph Agentic Framework",
        deployment: "Local Server / Containerized Node"
      },
      screenshots: [],
      githubRepository: "https://github.com/Mohithsai-18",
      liveDemo: "#",
      documentation: "https://github.com/Mohithsai-18#readme",
      featured: false,

      // Compatibility fields
      desc: "Autonomous agent system executing workflows, tool-use, and environment controls.",
      tech: ["Python", "LLMs", "LangChain", "FastAPI", "React"],
      techStack: ["Python", "LLMs", "LangChain", "FastAPI", "React"],
      github: "https://github.com/Mohithsai-18",
      demo: "#",
      images: [],
      illustrationClass: "bg-white/[0.01] border border-white/5",
      graphic: (
        <svg className="w-10 h-10 text-[#8A8A8A] opacity-60" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="2" />
          <path d="M35 50 C35 40, 65 40, 65 50 C65 60, 35 60, 35 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="6" fill="currentColor" />
        </svg>
      )
    }
  ];

  const completedProjects = allProjects.filter(p => p.status === "Completed");
  const inProgressProjects = allProjects.filter(p => p.status === "In Progress");

  const featuredCompleted = completedProjects.filter(p => p.featured);
  const additionalCompleted = completedProjects.filter(p => !p.featured);

  const isExpandedActive = expandedProject !== null;

  return (
    <section 
      id="projects" 
      className={`py-16 px-6 md:px-12 max-w-7xl mx-auto w-full relative ${
        isExpandedActive ? "z-[90]" : "z-10"
      }`}
    >
      
      {/* SECTION 5: COMPLETED PROJECTS */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#B7FF2A] uppercase font-display block mb-2">
            MAJOR PROJECTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] uppercase tracking-tight font-display">
            Featured Systems
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {featuredCompleted.map((project, idx) => {
            const cardId = `featured-${idx}`;
            const isHovered = hoveredCardId === cardId && !isExpandedActive;
            const isDimmed = (hoveredCardId !== null && hoveredCardId !== cardId) || isExpandedActive;

            const cardScale = isExpandedActive ? 0.95 : isHovered ? 1.08 : isDimmed ? 0.95 : 1.0;
            const cardOpacity = isExpandedActive ? 0.25 : isDimmed ? 0.45 : 1.0;
            const cardBlur = isExpandedActive ? "blur(3px)" : "blur(0px)";
            const cardZIndex = isHovered ? 20 : 10;

            return (
              <AnimatedReveal 
                key={idx} 
                direction="up" 
                delay={idx * 0.03}
                className="flex w-full"
              >
                <motion.div
                  onMouseEnter={() => !isExpandedActive && setHoveredCardId(cardId)}
                  onMouseLeave={() => !isExpandedActive && setHoveredCardId(null)}
                  onClick={() => setExpandedProject(project)}
                  animate={{
                    scale: cardScale,
                    opacity: cardOpacity,
                    filter: cardBlur,
                    zIndex: cardZIndex,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.8 }}
                  className="w-full h-full relative"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                  }}
                  layoutId={`project-card-${project.title}`}
                >
                  <GlassCard 
                    enableHoverScale={false} 
                    variant="bubble"
                    glowColor="rgba(255, 255, 255, 0.02)"
                    className="flex flex-col h-full p-5 group cursor-pointer"
                  >
                    {/* Image Area */}
                    <div className="w-full aspect-[16/10] rounded-2xl border border-white/5 relative overflow-hidden mb-3 bg-black/20">
                      <ProjectImage project={project} />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-[13px] font-bold text-[#F5F5F5] tracking-wider mb-1.5 transition-colors duration-300 uppercase">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] text-[#8A8A8A] leading-relaxed mb-4 font-sans flex-grow">
                      {project.desc}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                      {project.tech?.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[8.5px] tracking-wide font-display text-[#8A8A8A] bg-white/[0.01] border border-white/5 px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Link */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-[9px] tracking-wider font-display uppercase">
                      <span className="flex items-center gap-1 text-[#8A8A8A] group-hover:text-[#B7FF2A] transition-colors duration-200">
                        <span>View Details</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                      {(project.github || project.githubRepository) && (
                        <a
                          href={project.github || project.githubRepository}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-[#8A8A8A] hover:text-[#B7FF2A] transition-colors duration-200 cursor-pointer"
                          title="GitHub Repository"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              </AnimatedReveal>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-8">
          <GlowButton 
            onClick={() => setShowAllCompleted(!showAllCompleted)}
            variant="secondary"
            className="px-5 py-2.5 flex items-center gap-1.5"
          >
            {showAllCompleted ? "Collapse Projects Vault" : "View All Projects"}
          </GlowButton>
        </div>

        {/* Expandable Vault of Remaining Completed Projects */}
        {showAllCompleted && (
          <AnimatedReveal direction="up" delay={0.1} className="w-full mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 border border-white/5 bg-white/[0.01] rounded-xl">
              {additionalCompleted.map((project, idx) => {
                const cardId = `additional-${idx}`;
                const isHovered = hoveredCardId === cardId && !isExpandedActive;
                const isDimmed = (hoveredCardId !== null && hoveredCardId !== cardId) || isExpandedActive;

                const cardScale = isExpandedActive ? 0.95 : isHovered ? 1.08 : isDimmed ? 0.95 : 1.0;
                const cardOpacity = isExpandedActive ? 0.25 : isDimmed ? 0.45 : 1.0;
                const cardBlur = isExpandedActive ? "blur(3px)" : "blur(0px)";
                const cardZIndex = isHovered ? 20 : 10;

                return (
                  <motion.div
                    key={idx}
                    onMouseEnter={() => !isExpandedActive && setHoveredCardId(cardId)}
                    onMouseLeave={() => !isExpandedActive && setHoveredCardId(null)}
                    onClick={() => setExpandedProject(project)}
                    animate={{
                      scale: cardScale,
                      opacity: cardOpacity,
                      filter: cardBlur,
                      zIndex: cardZIndex,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.8 }}
                    className="relative w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                    layoutId={`project-card-${project.title}`}
                  >
                    <GlassCard 
                      enableHoverScale={false}
                      variant="bubble"
                      glowColor="rgba(255, 255, 255, 0.02)"
                      className="p-5 flex flex-col justify-between group cursor-pointer h-full"
                    >
                      <div>
                        {project.images && project.images.length > 0 && (
                          <div className="w-full aspect-[16/10] rounded-2xl border border-white/5 relative overflow-hidden mb-3 bg-black/20">
                            <ProjectImage project={project} />
                          </div>
                        )}
                        <div className="mb-4">
                          <span className="text-[7.5px] tracking-[0.2em] font-display text-[#B7FF2A] font-bold block mb-1">
                            VERIFIED SYSTEM // CODE {idx + 301}
                          </span>
                          <h4 className="font-display text-[12px] font-bold text-[#F5F5F5] uppercase tracking-wider mb-1.5">
                            {project.title}
                          </h4>
                          <p className="text-[11px] text-[#8A8A8A] font-sans leading-relaxed">
                            {project.desc}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-1 mb-3.5">
                          {project.tech.map((tag, tIdx) => (
                            <span key={tIdx} className="text-[8px] tracking-wide font-display text-[#8A8A8A] bg-white/[0.01] border border-white/5 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between border-t border-white/5 pt-2.5">
                          <span className="text-[8.5px] tracking-widest font-display text-[#B7FF2A] uppercase flex items-center gap-1 hover:underline">
                            <span>Details</span>
                            <ArrowUpRight className="w-2.5 h-2.5" />
                          </span>
                          {(project.github || project.githubRepository) && (
                            <a
                              href={project.github || project.githubRepository}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 text-[8.5px] tracking-widest font-display text-[#8A8A8A] hover:text-[#B7FF2A] uppercase hover:underline cursor-pointer"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                              </svg>
                              <span>GitHub</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedReveal>
        )}
      </div>

      {/* SECTION 6: IN PROGRESS PROJECTS */}
      <div>
        <div className="mb-8 text-center">
          <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#B7FF2A] uppercase font-display block mb-2">
            IN PROGRESS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] uppercase tracking-tight font-display">
            Currently Building
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {inProgressProjects.map((project, idx) => {
            const cardId = `inprogress-${idx}`;
            const isHovered = hoveredCardId === cardId && !isExpandedActive;
            const isDimmed = (hoveredCardId !== null && hoveredCardId !== cardId) || isExpandedActive;

            const cardScale = isExpandedActive ? 0.95 : isHovered ? 1.08 : isDimmed ? 0.95 : 1.0;
            const cardOpacity = isExpandedActive ? 0.25 : isDimmed ? 0.45 : 1.0;
            const cardBlur = isExpandedActive ? "blur(3px)" : "blur(0px)";
            const cardZIndex = isHovered ? 20 : 10;

            return (
              <AnimatedReveal 
                key={idx} 
                direction="up" 
                delay={idx * 0.03}
                className="flex w-full"
              >
                <motion.div
                  onMouseEnter={() => !isExpandedActive && setHoveredCardId(cardId)}
                  onMouseLeave={() => !isExpandedActive && setHoveredCardId(null)}
                  onClick={() => setExpandedProject(project)}
                  animate={{
                    scale: cardScale,
                    opacity: cardOpacity,
                    filter: cardBlur,
                    zIndex: cardZIndex,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.8 }}
                  className="w-full h-full relative"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                  }}
                  layoutId={`project-card-${project.title}`}
                >
                  <GlassCard 
                    enableHoverScale={false} 
                    variant="bubble"
                    glowColor="rgba(255, 255, 255, 0.02)"
                    className="flex flex-col h-full p-5 group cursor-pointer"
                  >
                    {/* Image Area */}
                    <div className="w-full aspect-[16/10] rounded-2xl border border-white/5 relative overflow-hidden mb-3 bg-black/20">
                      <ProjectImage project={project} />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-[13px] font-bold text-[#F5F5F5] tracking-wider mb-1.5 transition-colors duration-300 uppercase">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] text-[#8A8A8A] leading-relaxed mb-4 font-sans flex-grow">
                      {project.desc}
                    </p>

                    {/* In Progress Status Indicator Tag */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-1 text-[8.5px] tracking-wider font-display text-[#B7FF2A] font-bold uppercase">
                        <PlayCircle className="w-3 h-3" />
                        <span>In Progress</span>
                      </div>
                      {(project.github || project.githubRepository) && (
                        <a
                          href={project.github || project.githubRepository}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-[8.5px] tracking-wider font-display text-[#8A8A8A] hover:text-[#B7FF2A] font-bold uppercase cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              </AnimatedReveal>
            );
          })}
        </div>

        {/* More Coming Soon Button */}
        <div className="flex justify-center mt-8">
          <GlowButton variant="secondary" className="px-5 py-2.5 flex items-center gap-1.5 cursor-default">
            More Coming Soon
            <PlusCircle className="w-3.5 h-3.5 text-[#8A8A8A]/40" />
          </GlowButton>
        </div>
      </div>

      {/* Expanded Apple-Style Focus Showcase Modal */}
      <AnimatePresence>
        {isExpandedActive && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
              onClick={() => setExpandedProject(null)}
            />

            {/* Expansions Card Content */}
            <motion.div
              layoutId={`project-card-${expandedProject.title}`}
              className="relative w-full max-w-[1500px] h-[90vh] md:h-[85vh] z-10 flex flex-col cursor-default"
              transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.8 }}
            >
              <GlassCard
                enableHoverScale={false}
                variant="bubble"
                className="p-4 md:p-6 h-full w-full relative overflow-hidden"
                glowColor="rgba(183, 255, 42, 0.03)"
              >
                {/* Close Button */}
                <button
                  onClick={() => setExpandedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center text-[#8A8A8A] hover:text-[#F5F5F5] transition-all cursor-pointer z-50 shadow-md"
                  title="Close showcase"
                >
                  <span className="text-sm font-bold">✕</span>
                </button>

                <div className="flex flex-col md:flex-row h-full w-full gap-5 md:gap-6 text-left">
                  {/* LEFT COLUMN: VIEWPORT (65% width equivalent) */}
                  <div className="w-full md:flex-[2] h-[40%] md:h-full flex flex-col gap-3 min-w-0 flex-shrink-0">
                    {/* Tab Selector Header */}
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                      <button
                        onClick={() => setLeftViewMode("gallery")}
                        className={`px-3 py-1.5 rounded-lg font-display text-[9.5px] uppercase tracking-wider transition-all cursor-pointer ${
                          leftViewMode === "gallery"
                            ? "bg-[#B7FF2A] text-black font-bold"
                            : "bg-white/5 text-[#8A8A8A] hover:bg-white/10"
                        }`}
                      >
                        {expandedProject.screenshots && expandedProject.screenshots.length > 0
                          ? "Screenshot Gallery"
                          : "System Blueprint"}
                      </button>
                      <button
                        onClick={() => setLeftViewMode("simulation")}
                        className={`px-3 py-1.5 rounded-lg font-display text-[9.5px] uppercase tracking-wider transition-all cursor-pointer ${
                          leftViewMode === "simulation"
                            ? "bg-[#B7FF2A] text-black font-bold"
                            : "bg-white/5 text-[#8A8A8A] hover:bg-white/10"
                        }`}
                      >
                        Interactive Simulator
                      </button>
                    </div>

                    {/* Main Viewport Content */}
                    <div className="flex-grow w-full rounded-2xl border border-white/5 relative overflow-hidden bg-black/40">
                      {leftViewMode === "gallery" ? (
                        expandedProject.screenshots && expandedProject.screenshots.length > 0 ? (
                          <div className="w-full h-full relative flex items-center justify-center">
                            <Image
                              src={expandedProject.screenshots[activeScreenshotIdx]}
                              alt={`${expandedProject.title} expanded preview`}
                              fill
                              priority
                              sizes="(max-width: 1024px) 100vw, 1200px"
                              className="object-contain w-full h-full p-2 md:p-4 transition-all duration-300"
                            />

                            {/* Zoom / Fullscreen overlay control */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsFullscreenOpen(true);
                              }}
                              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/35 transition-all cursor-pointer z-10"
                              title="Zoom/Fullscreen Preview"
                            >
                              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                              </svg>
                            </button>

                            {/* Gallery Left/Right Controls */}
                            {expandedProject.screenshots.length > 1 && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveScreenshotIdx((prev) => (prev === 0 ? expandedProject.screenshots.length - 1 : prev - 1));
                                  }}
                                  className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/35 transition-all cursor-pointer z-10"
                                  title="Previous Screenshot"
                                >
                                  <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveScreenshotIdx((prev) => (prev === expandedProject.screenshots.length - 1 ? 0 : prev + 1));
                                  }}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/35 transition-all cursor-pointer z-10"
                                  title="Next Screenshot"
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                              </>
                            )}

                            {/* Thumbnails indicator overlay */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/50 px-3.5 py-1.5 rounded-full border border-white/5 backdrop-blur-md max-w-[90%] overflow-x-auto">
                              {expandedProject.screenshots.map((_: any, sIdx: number) => (
                                <button
                                  key={sIdx}
                                  onClick={() => setActiveScreenshotIdx(sIdx)}
                                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                                    sIdx === activeScreenshotIdx ? "bg-[#B7FF2A] scale-110" : "bg-white/30 hover:bg-white/50"
                                  }`}
                                  title={`View screenshot ${sIdx + 1}`}
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <GraphicBlueprintView project={expandedProject} />
                        )
                      ) : (
                        // Render Interactive Simulation
                        <div className="w-full h-full relative">
                          <InteractiveSimulation projectTitle={expandedProject.title} ticks={simTicks} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: INTELLIGENCE PANEL (35% width equivalent) */}
                  <div className="w-full md:flex-[1] h-[55%] md:h-full flex flex-col justify-between overflow-y-auto pr-1 flex-shrink-0 text-left">
                    <div className="space-y-5">
                      {/* Header Details */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[8.5px] font-bold tracking-widest text-[#B7FF2A] bg-[#B7FF2A]/10 px-2 py-0.5 rounded uppercase font-display">
                            {expandedProject.category || "System Engineering"}
                          </span>
                          <span className="text-[8.5px] text-[#8A8A8A] font-mono">
                            // YEAR: {expandedProject.year || "2025"}
                          </span>
                          <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            expandedProject.status === "Completed"
                              ? "text-[#B7FF2A] bg-[#B7FF2A]/10"
                              : "text-amber-500 bg-amber-500/10"
                          }`}>
                            {expandedProject.status ? expandedProject.status.toUpperCase() : "COMPLETED"}
                          </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-[#F5F5F5] uppercase tracking-tight font-display">
                          {expandedProject.title}
                        </h2>
                        {expandedProject.shortDescription && (
                          <p className="text-[11.5px] text-[#F5F5F5] font-sans font-medium italic border-l-2 border-[#B7FF2A] pl-3 py-1 opacity-95 my-2.5">
                            {expandedProject.shortDescription}
                          </p>
                        )}
                      </div>

                      {/* Section 1: Detailed Overview */}
                      <div className="p-3 border border-white/5 bg-white/[0.01] rounded-xl">
                        <span className="text-[8px] md:text-[9px] tracking-[0.2em] font-display text-white/50 uppercase font-bold block mb-1.5 text-left">
                          PROJECT DETAILS
                        </span>
                        <p className="text-[11.5px] text-[#8A8A8A] font-sans leading-relaxed">
                          {expandedProject.fullDescription || expandedProject.overview || expandedProject.desc}
                        </p>
                      </div>

                      {/* Section 2: Technology Stack */}
                      {expandedProject.technologies && expandedProject.technologies.length > 0 && (
                        <div className="p-3 border border-white/5 bg-white/[0.01] rounded-xl text-left">
                          <span className="text-[8px] md:text-[9px] tracking-[0.2em] font-display text-white/50 uppercase font-bold block mb-2">
                            TECHNOLOGY STACK
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {expandedProject.technologies.map((tech: string, tIdx: number) => (
                              <span
                                key={tIdx}
                                className="text-[9.5px] tracking-wide font-display text-[#F5F5F5] bg-white/5 border border-white/10 px-2 py-0.5 rounded hover:border-[#B7FF2A]/30 transition-all cursor-default"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Section 3: Key Features */}
                      {expandedProject.features && expandedProject.features.length > 0 && (
                        <div className="p-3 border border-white/5 bg-[#0A0A0A]/50 rounded-xl">
                          <span className="text-[8px] md:text-[9px] tracking-[0.2em] font-display text-white/50 uppercase font-bold block mb-2 text-left">
                            KEY FEATURES
                          </span>
                          <ul className="space-y-1.5 text-left">
                            {expandedProject.features.map((feat: string, fIdx: number) => (
                              <li key={fIdx} className="text-[11px] text-[#8A8A8A] font-sans flex items-start gap-2">
                                <span className="text-[#B7FF2A] mt-0.5">▪</span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Section 4: Architecture Blueprint */}
                      {expandedProject.architecture && (
                        <div className="p-3 border border-white/5 bg-white/[0.01] rounded-xl text-left">
                          <span className="text-[8px] md:text-[9px] tracking-[0.2em] font-display text-white/50 uppercase font-bold block mb-2">
                            ARCHITECTURE BLUEPRINT
                          </span>
                          <div className="grid grid-cols-2 gap-2 text-[10px] font-sans">
                            {expandedProject.architecture.frontend && (
                              <div>
                                <span className="text-white/40 block text-[8px] uppercase">Frontend</span>
                                <span className="text-[#F5F5F5] font-bold">{expandedProject.architecture.frontend}</span>
                              </div>
                            )}
                            {expandedProject.architecture.backend && (
                              <div>
                                <span className="text-white/40 block text-[8px] uppercase">Backend</span>
                                <span className="text-[#F5F5F5] font-bold">{expandedProject.architecture.backend}</span>
                              </div>
                            )}
                            {expandedProject.architecture.database && (
                              <div>
                                <span className="text-white/40 block text-[8px] uppercase">Database</span>
                                <span className="text-[#F5F5F5] font-bold">{expandedProject.architecture.database}</span>
                              </div>
                            )}
                            {(expandedProject.architecture.ai || expandedProject.architecture.aiLayer) && (
                              <div>
                                <span className="text-white/40 block text-[8px] uppercase">AI Layer</span>
                                <span className="text-[#F5F5F5] font-bold">
                                  {expandedProject.architecture.ai || expandedProject.architecture.aiLayer}
                                </span>
                              </div>
                            )}
                            {expandedProject.architecture.deployment && (
                              <div className="col-span-2 mt-1 pt-1.5 border-t border-white/5">
                                <span className="text-white/40 block text-[8px] uppercase">Target Environment</span>
                                <span className="text-[#B7FF2A] font-mono">{expandedProject.architecture.deployment}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Section 5: Live Compiler Stream Console */}
                      <div className="p-2 bg-black/60 border border-white/5 rounded-xl font-mono text-[8px] text-[#8A8A8A] text-left">
                        <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1 opacity-60">
                          <span>CONSOLE STREAM</span>
                          <span className="text-[#B7FF2A] uppercase font-bold">ONLINE</span>
                        </div>
                        <div className="space-y-0.5">
                          <div>$ npm run build --scope={expandedProject.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}</div>
                          <div className="text-white/60">Success: Built target outputs. Status OK. (Tick: {simTicks})</div>
                        </div>
                      </div>
                    </div>

                    {/* Actions & Links at bottom (Unified GitHub Repository & Live Site & Docs) */}
                    <div className="pt-4 border-t border-white/5 mt-5 space-y-3">
                      {/* GitHub Repository card button */}
                      {(expandedProject.githubRepository || expandedProject.github) && (
                        <a
                          href={expandedProject.githubRepository || expandedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 border border-white/5 hover:border-[#B7FF2A]/20 bg-[#0A0A0A]/50 hover:bg-black/60 rounded-xl transition-all group/repo text-left cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <svg className="w-5 h-5 text-[#8A8A8A] group-hover/repo:text-[#B7FF2A] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                              </svg>
                              <div>
                                <span className="text-[11px] font-bold text-[#F5F5F5] block font-mono">
                                  {(expandedProject.githubRepository || expandedProject.github).replace("https://github.com/", "")}
                                </span>
                                <span className="text-[8.5px] text-[#8A8A8A] block uppercase tracking-wider font-sans">
                                  Repository Name
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[8px] font-mono text-[#B7FF2A] bg-[#B7FF2A]/10 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                                {expandedProject.status === "Completed" ? "Active / Public" : "In Development"}
                              </span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#8A8A8A] group-hover/repo:text-[#B7FF2A] transition-colors" />
                            </div>
                          </div>
                        </a>
                      )}

                      <div className="flex flex-col sm:flex-row gap-2.5">
                        {expandedProject.liveDemo && expandedProject.liveDemo !== "#" && (
                          <GlowButton
                            href={expandedProject.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            className="flex-grow py-2.5 flex items-center justify-center gap-1.5 text-[10.5px] uppercase font-bold tracking-wider text-black"
                          >
                            <span>Live Site</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                          </GlowButton>
                        )}
                        {expandedProject.documentation && expandedProject.documentation !== "#" && (
                          <GlowButton
                            href={expandedProject.documentation}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="secondary"
                            className="flex-grow py-2.5 flex items-center justify-center gap-1.5 text-[10.5px] uppercase font-bold tracking-wider border-white/10 hover:border-[#B7FF2A]/20"
                          >
                            <span>Documentation</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </GlowButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Preview Overlay with Zoom support */}
      <AnimatePresence>
        {isFullscreenOpen && expandedProject && expandedProject.screenshots && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center cursor-zoom-out select-none"
            onClick={() => {
              setIsFullscreenOpen(false);
              setZoomScale(1);
            }}
          >
            {/* Close fullscreen button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreenOpen(false);
                setZoomScale(1);
              }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center text-[#8A8A8A] hover:text-[#F5F5F5] transition-all cursor-pointer z-50 shadow-md text-lg font-bold"
              title="Close fullscreen preview"
            >
              ✕
            </button>

            {/* Instruction badge */}
            <div className="absolute top-6 left-6 bg-black/60 border border-white/10 px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-wider text-[#8A8A8A] pointer-events-none font-mono">
              Click Image to Zoom (Scale: {zoomScale}x) // Double click to toggle
            </div>

            {/* Prev/Next Controls */}
            {expandedProject.screenshots.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomScale(1);
                    setActiveScreenshotIdx((prev) => (prev === 0 ? expandedProject.screenshots.length - 1 : prev - 1));
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/35 transition-all cursor-pointer z-50 animate-pulse"
                  title="Previous Screenshot"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomScale(1);
                    setActiveScreenshotIdx((prev) => (prev === expandedProject.screenshots.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/35 transition-all cursor-pointer z-50 animate-pulse"
                  title="Next Screenshot"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Interactive Zoomable Image container */}
            <div 
              className="relative w-[90vw] h-[80vh] flex items-center justify-center overflow-auto"
              onClick={(e) => {
                e.stopPropagation();
                setZoomScale((prev) => (prev === 1 ? 2.2 : 1));
              }}
            >
              <div 
                className="relative transition-all duration-300 ease-out"
                style={{
                  width: "100%",
                  height: "100%",
                  transform: `scale(${zoomScale})`,
                  cursor: zoomScale === 1 ? "zoom-in" : "zoom-out",
                }}
              >
                <Image
                  src={expandedProject.screenshots[activeScreenshotIdx]}
                  alt={`${expandedProject.title} zoomed preview`}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Indicator dots at the bottom */}
            {expandedProject.screenshots.length > 1 && (
              <div className="absolute bottom-6 flex gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md max-w-[90%] overflow-x-auto">
                {expandedProject.screenshots.map((_: any, sIdx: number) => (
                  <button
                    key={sIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomScale(1);
                      setActiveScreenshotIdx(sIdx);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      sIdx === activeScreenshotIdx ? "bg-[#B7FF2A] scale-110" : "bg-white/30 hover:bg-white/50"
                    }`}
                    title={`View screenshot ${sIdx + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
