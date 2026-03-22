"use client";

import { motion } from "framer-motion";

export default function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex justify-center"
    >
      <div className="relative">
        {/* Glow behind phone */}
        <div
          className="absolute inset-0 blur-[60px] opacity-30 rounded-full"
          style={{ background: "linear-gradient(135deg, #4F46E5 0%, #A78BFA 50%, #60A5FA 100%)" }}
        />

        {/* Phone frame */}
        <div
          className="relative w-[260px] sm:w-[280px] rounded-[2.5rem] p-2"
          style={{
            background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 rounded-b-2xl" style={{ backgroundColor: "#1a1a2e" }} />

          {/* Screen */}
          <div className="rounded-[2rem] overflow-hidden bg-white">
            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pt-3 pb-1 bg-white">
              <span className="text-[9px] font-semibold text-gray-800">9:41</span>
              <div className="flex gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#1a1a2e"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.24 4.24 0 00-6 0zm-4-4l2 2a7.07 7.07 0 0110 0l2-2C15.68 9.68 8.32 9.68 5 13z" /></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#1a1a2e"><rect x="17" y="5" width="4" height="14" rx="1" /><rect x="11" y="8" width="4" height="11" rx="1" /><rect x="5" y="11" width="4" height="8" rx="1" /></svg>
                <svg width="16" height="12" viewBox="0 0 28 14" fill="#1a1a2e"><rect x="0" y="1" width="23" height="12" rx="3" stroke="#1a1a2e" strokeWidth="1.5" fill="none" /><rect x="2" y="3" width="16" height="8" rx="1.5" fill="#34D399" /><rect x="24.5" y="4.5" width="2" height="5" rx="1" /></svg>
              </div>
            </div>

            {/* Dashboard preview content */}
            <div className="px-4 pb-5 pt-2">
              {/* Header */}
              <div className="mb-3">
                <p className="text-[8px] text-gray-400 uppercase tracking-wider">Your path</p>
                <p className="text-[11px] font-bold text-gray-900">
                  Once<span style={{ color: "#4F46E5" }}>.</span> Dashboard
                </p>
              </div>

              {/* Pillar scores mini */}
              <div className="grid grid-cols-4 gap-1.5 mb-3">
                {[
                  { name: "Money", score: 72, color: "#F59E0B" },
                  { name: "Mind", score: 85, color: "#A78BFA" },
                  { name: "Body", score: 58, color: "#34D399" },
                  { name: "Spirit", score: 41, color: "#60A5FA" },
                ].map((p) => (
                  <div key={p.name} className="rounded-lg p-1.5 text-center" style={{ backgroundColor: `${p.color}10` }}>
                    <p className="text-[7px] text-gray-500">{p.name}</p>
                    <p className="text-[11px] font-bold" style={{ color: p.color }}>{p.score}</p>
                  </div>
                ))}
              </div>

              {/* Streak */}
              <div className="flex items-center gap-2 rounded-lg border border-gray-100 p-2 mb-3">
                <span className="text-sm">&#x1F525;</span>
                <div>
                  <p className="text-[9px] font-semibold text-gray-900">7-day streak!</p>
                  <p className="text-[7px] text-gray-400">Keep going tomorrow</p>
                </div>
              </div>

              {/* Module preview */}
              <div className="space-y-1.5">
                <p className="text-[8px] font-semibold text-gray-500 uppercase tracking-wider">Current Module</p>
                <div className="rounded-lg border border-gray-100 p-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md flex items-center justify-center" style={{ backgroundColor: "#F59E0B20" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-semibold text-gray-900">Smart Money Basics</p>
                      <div className="mt-0.5 h-1 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: "60%", backgroundColor: "#F59E0B" }} />
                      </div>
                    </div>
                    <span className="text-[8px] text-gray-400">3/5</span>
                  </div>
                </div>

                {/* Lessons list */}
                {["Your Money Blueprint", "The 50/30/20 Rule", "Emergency Fund"].map((lesson, i) => (
                  <div key={lesson} className="flex items-center gap-2 rounded-lg px-2 py-1.5" style={i < 2 ? { backgroundColor: "#F9FAFB" } : {}}>
                    <div
                      className="h-4 w-4 rounded-full flex items-center justify-center"
                      style={i < 2 ? { backgroundColor: "#F59E0B", color: "white" } : { border: "1.5px solid #D1D5DB" }}
                    >
                      {i < 2 && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      )}
                    </div>
                    <p className={`text-[8px] ${i < 2 ? "text-gray-400 line-through" : "text-gray-700 font-medium"}`}>{lesson}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
