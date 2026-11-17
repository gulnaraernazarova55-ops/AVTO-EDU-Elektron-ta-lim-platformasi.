import React from 'react';
import { SlideDiagramType } from '../types';

export const SlideDiagram: React.FC<{ type?: SlideDiagramType }> = ({ type }) => {
  if (!type) return null;

  if (type === 'four-stroke') {
    return (
      <svg viewBox="0 0 360 220" className="w-full h-full max-h-64 rounded-lg bg-slate-900 border border-slate-700 p-3">
        <text x="180" y="22" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="600">
          4-STROKE PRESSURE &amp; TIMING CYCLE (720°)
        </text>
        <g transform="translate(20,40)">
          {['1. INTAKE', '2. COMPRESSION', '3. POWER', '4. EXHAUST'].map((label, idx) => {
            const x = idx * 82;
            const pistonY = idx === 0 || idx === 2 ? 78 : 42;
            const fill = idx === 2 ? '#EA580C' : '#334155';
            return (
              <g key={label} transform={`translate(${x},0)`}>
                <rect x="8" y="20" width="60" height="105" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                <rect x="12" y={pistonY} width="52" height="28" rx="3" fill="#CBD5E1" />
                <rect x="12" y="24" width="52" height={pistonY - 24} fill={fill} opacity="0.45" />
                {idx === 2 && <circle cx="38" cy="27" r="5" fill="#FBBF24" />}
                <text x="38" y="145" textAnchor="middle" fill="#E2E8F0" fontSize="8.5" fontWeight="600">
                  {label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    );
  }

  if (type === 'ignition-wave') {
    return (
      <svg viewBox="0 0 360 220" className="w-full h-full max-h-64 rounded-lg bg-slate-900 border border-slate-700 p-3">
        <text x="180" y="22" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="600">
          SECONDARY IGNITION WAVEFORM (kV vs ms)
        </text>
        <line x1="25" y1="160" x2="340" y2="160" stroke="#475569" strokeWidth="1" />
        <line x1="25" y1="40" x2="25" y2="180" stroke="#475569" strokeWidth="1" />
        <path
          d="M 25 160 L 70 160 L 74 175 L 92 160 L 96 48 L 102 128 L 195 134 L 204 165 L 214 148 L 224 163 L 234 155 L 244 160 L 335 160"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="104" y="48" fill="#F8FAFC" fontSize="9">Firing Spike (10-15 kV)</text>
        <text x="135" y="122" fill="#38BDF8" fontSize="9">Burn Line (~1.4 ms)</text>
        <text x="215" y="182" fill="#34D399" fontSize="9">Coil Ringing</text>
      </svg>
    );
  }

  if (type === 'fuel-trim') {
    return (
      <svg viewBox="0 0 360 220" className="w-full h-full max-h-64 rounded-lg bg-slate-900 border border-slate-700 p-3">
        <text x="180" y="22" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="600">
          STFT / LTFT DIAGNOSTIC THRESHOLDS
        </text>
        <rect x="40" y="50" width="280" height="24" rx="4" fill="#1E293B" />
        <rect x="145" y="50" width="70" height="24" fill="#059669" opacity="0.6" />
        <text x="180" y="66" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="600">±8% NORMAL</text>
        <text x="65" y="66" textAnchor="middle" fill="#F87171" fontSize="10">-25% RICH</text>
        <text x="295" y="66" textAnchor="middle" fill="#FBBF24" fontSize="10">+25% LEAN</text>
        <rect x="40" y="102" width="130" height="78" rx="6" fill="#1E293B" stroke="#334155" />
        <text x="105" y="124" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="600">IDLE +20% → 2500 RPM +2%</text>
        <text x="105" y="150" textAnchor="middle" fill="#CBD5E1" fontSize="9.5">Vacuum Leak (Intake)</text>
        <rect x="190" y="102" width="130" height="78" rx="6" fill="#1E293B" stroke="#334155" />
        <text x="255" y="124" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="600">IDLE +3% → 2500 RPM +22%</text>
        <text x="255" y="150" textAnchor="middle" fill="#CBD5E1" fontSize="9.5">Fuel Delivery / MAF</text>
      </svg>
    );
  }

  if (type === 'compression-chart') {
    return (
      <svg viewBox="0 0 360 220" className="w-full h-full max-h-64 rounded-lg bg-slate-900 border border-slate-700 p-3">
        <text x="180" y="22" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="600">
          CYLINDER COMPRESSION COMPARISON (BAR)
        </text>
        {[
          { lbl: 'CYL 1', val: 13.1, ok: true },
          { lbl: 'CYL 2', val: 12.9, ok: true },
          { lbl: 'CYL 3', val: 8.4, ok: false },
          { lbl: 'CYL 4', val: 13.0, ok: true },
        ].map((c, idx) => {
          const h = c.val * 8;
          const x = 55 + idx * 72;
          return (
            <g key={c.lbl}>
              <rect x={x} y={170 - h} width="42" height={h} rx="4" fill={c.ok ? '#10B981' : '#EF4444'} />
              <text x={x + 21} y={163 - h} textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="600">
                {c.val}
              </text>
              <text x={x + 21} y="190" textAnchor="middle" fill="#94A3B8" fontSize="10">
                {c.lbl}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 220" className="w-full h-full max-h-64 rounded-lg bg-slate-900 border border-slate-700 p-3">
      <text x="180" y="22" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="600">
        {type === 'timing-belt' ? 'CKP / CMP TIMING SYNCHRONIZATION' : 'ECU CLOSED-LOOP CONTROL ARCHITECTURE'}
      </text>
      <rect x="30" y="65" width="90" height="44" rx="6" fill="#1E293B" stroke="#EA580C" />
      <text x="75" y="91" textAnchor="middle" fill="#F8FAFC" fontSize="10">Sensors (MAF/CKP)</text>
      <line x1="120" y1="87" x2="145" y2="87" stroke="#F59E0B" strokeWidth="2" />
      <rect x="145" y="60" width="76" height="54" rx="6" fill="#EA580C" />
      <text x="183" y="91" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">ECU / PCM</text>
      <line x1="221" y1="87" x2="246" y2="87" stroke="#F59E0B" strokeWidth="2" />
      <rect x="246" y="65" width="84" height="44" rx="6" fill="#1E293B" stroke="#38BDF8" />
      <text x="288" y="91" textAnchor="middle" fill="#F8FAFC" fontSize="10">Coils &amp; Injectors</text>
      <path d="M 288 109 L 288 155 L 75 155 L 75 109" fill="none" stroke="#10B981" strokeWidth="1.8" strokeDasharray="5 3" />
      <text x="180" y="175" textAnchor="middle" fill="#34D399" fontSize="10">O2 Sensor Closed-Loop Feedback</text>
    </svg>
  );
};
