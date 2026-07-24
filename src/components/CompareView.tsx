import React, { useState } from 'react';
import { RefreshCw, Download, Filter, Plus, Lightbulb, BookOpen, Zap, Check, AlertTriangle, Layers, Maximize2 } from 'lucide-react';
import { ThreeRadarChart } from './ThreeRadarChart';

export const CompareView: React.FC = () => {
  const [activeModels, setActiveModels] = useState<string[]>([
    'GPT-4 Omni',
    'Claude 3.5 Sonnet',
    'Llama 3 70B',
    'Gemini 1.5 Pro',
    'Mistral Large 2',
    'Gemini 1.5 Flash',
  ]);
  const [selectedDimension, setSelectedDimension] = useState<string>('all');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isRerunning, setIsRerunning] = useState<boolean>(false);

  const modelPalette: Record<string, string> = {
    'GPT-4 Omni': '#2dd4bf',
    'Claude 3.5 Sonnet': '#a855f7',
    'Llama 3 70B': '#f97316',
    'Gemini 1.5 Pro': '#3b82f6',
    'Mistral Large 2': '#ec4899',
    'Gemini 1.5 Flash': '#10b981',
  };

  const handleRerun = () => {
    setIsRerunning(true);
    setTimeout(() => setIsRerunning(false), 1200);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Model Entity,Hallucination %,Factual Recall,Logic Consistency,Citation Accuracy\n' +
      'GPT-4 Omni,0.42%,96.8%,94.2%,98.1%\n' +
      'Claude 3.5 Sonnet,0.51%,98.4%,97.9%,96.4%\n' +
      'Llama 3 70B,1.12%,92.4%,89.5%,84.2%\n' +
      'Gemini 1.5 Pro,0.89%,94.7%,91.3%,93.9%\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'veritas_performance_variance.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeModel = (modelName: string) => {
    if (activeModels.length > 2) {
      setActiveModels(activeModels.filter((m) => m !== modelName));
    }
  };

  const addModel = () => {
    const options = ['Command R+', 'DeepSeek V3', 'Qwen 2.5 72B', 'Yi 1.5 34B'];
    const available = options.find((opt) => !activeModels.includes(opt));
    if (available) {
      setActiveModels([...activeModels, available]);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl md:text-3xl font-semibold text-[#d4e4fa] tracking-tight">
            Performance Variance Comparison
          </h1>
          <p className="font-body text-sm text-[#bacac5] mt-1">
            Deep-tier comparative analysis of Large Language Model veracity and architectural logic.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleRerun}
            className="px-4 py-2 bg-[#57f1db] text-[#003731] font-code text-xs font-bold rounded flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(87,241,219,0.25)]"
          >
            <RefreshCw className={`w-4 h-4 ${isRerunning ? 'animate-spin' : ''}`} />
            <span>RERUN ANALYSIS</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 border border-[#3c4a46] text-[#bacac5] hover:border-[#57f1db] hover:text-[#57f1db] font-code text-xs rounded flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* Model Selector (Interactive Chips) */}
      <div className="p-4 bg-[#0d1c2d] border border-[#3c4a46]/40 rounded-xl space-y-3">
        <p className="font-code text-xs text-[#859490] uppercase tracking-widest">
          Active Models for Forensic Comparison
        </p>
        <div className="flex flex-wrap gap-2">
          {activeModels.map((model) => (
            <div
              key={model}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#2dd4bf]/10 border rounded-full text-xs font-code transition-all"
              style={{
                borderColor: modelPalette[model] || '#57f1db',
                color: modelPalette[model] || '#57f1db',
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: modelPalette[model] || '#57f1db' }}
              ></div>
              <span>{model}</span>
              <button
                onClick={() => removeModel(model)}
                className="hover:opacity-80 transition-opacity ml-1"
                title="Remove model"
              >
                ×
              </button>
            </div>
          ))}

          {/* Add Model Button */}
          <button
            onClick={addModel}
            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-dashed border-[#3c4a46] text-[#bacac5] rounded-full text-xs font-code hover:border-[#57f1db] hover:text-[#57f1db] transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Model</span>
          </button>
        </div>
      </div>

      {/* Multi-Dimensional Reliability Section (3D Radar Chart) */}
      <div className="p-5 bg-[#122131] border border-[#3c4a46]/50 rounded-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#3c4a46]/30 pb-3">
          <div>
            <h3 className="font-code text-xs font-bold text-[#d4e4fa] uppercase tracking-widest">
              MULTI-DIMENSIONAL RELIABILITY (3D MATRIX)
            </h3>
            <p className="font-body text-xs text-[#bacac5] mt-0.5">
              Cross-metric performance mapping across core architectural benchmarks.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {activeModels.slice(0, 4).map((m) => (
              <div key={m} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: modelPalette[m] || '#57f1db' }}
                ></div>
                <span className="font-code text-[11px] text-[#859490] uppercase">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3D WebGL Canvas Container */}
        <div className="relative w-full chart-grid rounded-lg border border-[#3c4a46]/40 flex flex-col overflow-hidden shadow-xl">
          <div className="w-full h-[340px] md:h-[380px] relative">
            <ThreeRadarChart
              selectedDimension={selectedDimension}
              isExploded={isExploded}
            />
          </div>

          {/* Control Bar */}
          <div className="p-3 bg-[#1c2b3c] border-t border-[#3c4a46]/40 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3 z-10">
            {/* Layer Selection Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-code text-[10px] text-[#859490] uppercase mr-1">
                Isolate Dimension:
              </span>
              {['all', 'veracity', 'reasoning', 'speed', 'factuality', 'logic'].map((dim) => (
                <button
                  key={dim}
                  onClick={() => setSelectedDimension(dim)}
                  className={`px-2.5 py-1 rounded border text-[10px] font-code uppercase tracking-wider transition-all cursor-pointer ${
                    selectedDimension === dim
                      ? 'bg-[#57f1db]/20 border-[#57f1db] text-[#57f1db] font-bold shadow-[0_0_8px_rgba(87,241,219,0.2)]'
                      : 'bg-[#0d1c2d] border-[#3c4a46]/30 text-[#bacac5] hover:border-[#57f1db]/50 hover:text-[#57f1db]'
                  }`}
                >
                  {dim === 'all' ? 'Show All' : dim}
                </button>
              ))}
            </div>

            {/* Global View Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsExploded(!isExploded)}
                className={`flex items-center gap-1.5 px-3 py-1 border rounded text-[10px] font-code uppercase tracking-wider transition-all cursor-pointer ${
                  isExploded
                    ? 'bg-[#57f1db] text-[#003731] font-bold border-[#57f1db]'
                    : 'bg-[#0d1c2d] border-[#3c4a46]/40 text-[#bacac5] hover:text-[#57f1db] hover:border-[#57f1db]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isExploded ? 'Collapse Stack' : 'Explode View'}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedDimension('all');
                  setIsExploded(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1 border border-[#3c4a46]/40 bg-[#0d1c2d] text-[#bacac5] hover:text-[#57f1db] hover:border-[#57f1db] rounded text-[10px] font-code uppercase tracking-wider transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset View</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Comparison Tables & Best Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Comparison Cards & Table */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#122131] border border-[#3c4a46]/50 p-4 rounded-xl relative overflow-hidden">
              <div className="absolute top-2 right-2 p-2 opacity-15">
                <Check className="w-12 h-12 text-[#57f1db]" />
              </div>
              <h4 className="font-code text-xs text-[#859490] uppercase tracking-widest mb-1">
                HIGHEST ACCURACY
              </h4>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-3xl font-bold text-[#57f1db]">98.4%</span>
                <span className="font-code text-xs text-[#bacac5]">Claude 3.5 Sonnet</span>
              </div>
              <div className="mt-3 h-1.5 w-full bg-[#273647] rounded-full overflow-hidden">
                <div className="h-full bg-[#57f1db]" style={{ width: '98.4%' }}></div>
              </div>
            </div>

            <div className="bg-[#122131] border border-[#3c4a46]/50 p-4 rounded-xl relative overflow-hidden">
              <div className="absolute top-2 right-2 p-2 opacity-15">
                <AlertTriangle className="w-12 h-12 text-[#ffb4ab]" />
              </div>
              <h4 className="font-code text-xs text-[#859490] uppercase tracking-widest mb-1">
                HALLUCINATION FLOOR
              </h4>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-3xl font-bold text-[#ffb4ab]">0.42%</span>
                <span className="font-code text-xs text-[#bacac5]">GPT-4 Omni</span>
              </div>
              <div className="mt-3 h-1.5 w-full bg-[#273647] rounded-full overflow-hidden">
                <div className="h-full bg-[#ffb4ab]" style={{ width: '4%' }}></div>
              </div>
            </div>
          </div>

          {/* Detailed Variance Matrix Table */}
          <div className="bg-[#122131] border border-[#3c4a46]/50 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-[#3c4a46]/40 bg-[#1c2b3c] flex justify-between items-center">
              <h4 className="font-code text-xs font-bold text-[#d4e4fa] uppercase">
                DETAILED VARIANCE MATRIX
              </h4>
              <Maximize2 className="w-4 h-4 text-[#859490] cursor-pointer hover:text-[#57f1db]" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body border-collapse text-xs">
                <thead className="bg-[#0d1c2d] border-b border-[#3c4a46]/50 text-[#859490] font-code">
                  <tr>
                    <th className="px-4 py-3 uppercase">MODEL ENTITY</th>
                    <th className="px-4 py-3 uppercase text-center">HALLUCINATION %</th>
                    <th className="px-4 py-3 uppercase text-center">FACTUAL RECALL</th>
                    <th className="px-4 py-3 uppercase text-center">LOGIC CONS.</th>
                    <th className="px-4 py-3 uppercase text-center">CITATION ACC.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3c4a46]/30">
                  <tr className="hover:bg-[#273647]/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#d4e4fa]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#2dd4bf]/20 border border-[#2dd4bf] flex items-center justify-center font-code text-[11px] text-[#2dd4bf]">
                          G
                        </div>
                        <span>GPT-4 Omni</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-code text-[#ffb4ab]">0.42%</td>
                    <td className="px-4 py-3 text-center font-code text-[#d4e4fa]">96.8%</td>
                    <td className="px-4 py-3 text-center font-code text-[#d4e4fa]">94.2%</td>
                    <td className="px-4 py-3 text-center font-code">
                      <span className="px-2 py-0.5 bg-[#44d69b]/15 border border-[#44d69b] text-[#44d69b] rounded">
                        98.1%
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#273647]/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#d4e4fa]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#a855f7]/20 border border-[#a855f7] flex items-center justify-center font-code text-[11px] text-[#a855f7]">
                          C
                        </div>
                        <span>Claude 3.5 Sonnet</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-code text-[#ffb4ab]">0.51%</td>
                    <td className="px-4 py-3 text-center font-code text-[#d4e4fa]">98.4%</td>
                    <td className="px-4 py-3 text-center font-code text-[#d4e4fa]">97.9%</td>
                    <td className="px-4 py-3 text-center font-code">
                      <span className="px-2 py-0.5 bg-[#44d69b]/15 border border-[#44d69b] text-[#44d69b] rounded">
                        96.4%
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#273647]/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#d4e4fa]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#f97316]/20 border border-[#f97316] flex items-center justify-center font-code text-[11px] text-[#f97316]">
                          L
                        </div>
                        <span>Llama 3 70B</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-code text-[#ffb4ab]">1.12%</td>
                    <td className="px-4 py-3 text-center font-code text-[#d4e4fa]">92.4%</td>
                    <td className="px-4 py-3 text-center font-code text-[#d4e4fa]">89.5%</td>
                    <td className="px-4 py-3 text-center font-code">
                      <span className="px-2 py-0.5 bg-[#3c4a46]/30 border border-[#3c4a46] text-[#bacac5] rounded">
                        84.2%
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#273647]/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#d4e4fa]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#3b82f6]/20 border border-[#3b82f6] flex items-center justify-center font-code text-[11px] text-[#3b82f6]">
                          G
                        </div>
                        <span>Gemini 1.5 Pro</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-code text-[#ffb4ab]">0.89%</td>
                    <td className="px-4 py-3 text-center font-code text-[#d4e4fa]">94.7%</td>
                    <td className="px-4 py-3 text-center font-code text-[#d4e4fa]">91.3%</td>
                    <td className="px-4 py-3 text-center font-code">
                      <span className="px-2 py-0.5 bg-[#44d69b]/15 border border-[#44d69b] text-[#44d69b] rounded">
                        93.9%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Best Performer Report & Metadata */}
        <div className="space-y-6">
          <div className="bg-[#1c2b3c] border border-[#57f1db]/30 p-5 rounded-xl space-y-4 shadow-xl">
            <h4 className="font-code text-xs font-bold text-[#57f1db] uppercase tracking-wider">
              BEST PERFORMER REPORT
            </h4>

            <div className="space-y-4 text-xs font-body">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#a855f7] shrink-0 mt-0.5" />
                <div>
                  <p className="font-code font-bold text-[#d4e4fa]">Reasoning Lead</p>
                  <p className="text-[#bacac5] mt-0.5 leading-relaxed">
                    Claude 3.5 Sonnet demonstrates 4.2% higher logical consistency on complex edge cases.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#2dd4bf] shrink-0 mt-0.5" />
                <div>
                  <p className="font-code font-bold text-[#d4e4fa]">Citation Integrity</p>
                  <p className="text-[#bacac5] mt-0.5 leading-relaxed">
                    GPT-4 Omni maintains the lowest link decay and highest quote precision at 98.1%.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-[#f97316] shrink-0 mt-0.5" />
                <div>
                  <p className="font-code font-bold text-[#d4e4fa]">Cost-to-Accuracy Ratio</p>
                  <p className="text-[#bacac5] mt-0.5 leading-relaxed">
                    Llama 3 70B delivers optimal throughput for high-volume non-critical verification.
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full py-2 bg-[#273647] border border-[#3c4a46] text-[#d4e4fa] font-code text-xs rounded hover:bg-[#57f1db]/10 hover:border-[#57f1db] transition-all">
              VIEW FULL AUDIT LOG
            </button>
          </div>

          {/* Forensic Metadata */}
          <div className="p-5 bg-[#122131] border border-[#3c4a46]/50 rounded-xl space-y-3">
            <h4 className="font-code text-xs font-bold text-[#d4e4fa] uppercase tracking-wider">
              FORENSIC METADATA
            </h4>

            <div className="space-y-2 font-code text-xs text-[#859490]">
              <div className="flex justify-between border-b border-[#3c4a46]/20 pb-1.5">
                <span>Sample Size:</span>
                <span className="text-[#d4e4fa]">12,400 Units</span>
              </div>
              <div className="flex justify-between border-b border-[#3c4a46]/20 pb-1.5">
                <span>Verification Engine:</span>
                <span className="text-[#57f1db]">Veritas NLI 4.2</span>
              </div>
              <div className="flex justify-between border-b border-[#3c4a46]/20 pb-1.5">
                <span>Hardware Interconnect:</span>
                <span className="text-[#d4e4fa]">H100 Interconnect</span>
              </div>
              <div className="flex justify-between">
                <span>Audit Methodology:</span>
                <span className="text-[#d4e4fa]">Double-Blind P2P</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
