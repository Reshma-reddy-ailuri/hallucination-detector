export interface SamplePreset {
  id: string;
  title: string;
  category: string;
  sourceDocument: string;
  defaultQuestion: string;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'corporate-history',
    title: 'Veritas Tech Conglomerate History',
    category: 'Corporate Record',
    sourceDocument: `Veritas Intelligence Systems was formally incorporated in 2004 following early incubation research at Stanford University. The organization expanded its presence into the European market during the early 2000s, specifically targeting infrastructure projects and public sector compliance. 

Recent fiscal data from 2023 indicates a strategic shift towards renewable energy investments, which now represent 40% of the firm's global portfolio. Corporate headquarters are situated in San Francisco, California, with major operational hubs in London and Zurich. All proprietary software relies on sub-millisecond natural language inference and zero-trust data audit protocols.`,
    defaultQuestion: 'When was the company founded, and what were its primary expansion and investment activities?',
  },
  {
    id: 'quantum-computing',
    title: 'Quantum Hardware & Supremacy Benchmarks',
    category: 'Technical Spec',
    sourceDocument: `In 2019, Google's 53-qubit Sycamore processor achieved quantum supremacy, performing a calculation in 200 seconds that would take supercomputers thousands of years. The technical consensus across cryogenic engineering indicates that superconducting quantum systems require extreme cryogenic cooling (dilution refrigeration below 20 milliKelvin) to maintain qubit state coherence and avoid environmental thermal interference. 

Commercial quantum chips operating natively at room temperature do not exist today due to rapid environmental decoherence. Full-scale commercial utility for general computing is projected by most experts to remain over a decade away, with error correction being the principal bottleneck.`,
    defaultQuestion: 'Do commercial quantum chips operate at room temperature today, and when was quantum supremacy achieved?',
  },
  {
    id: 'macro-economic',
    title: 'Macro-Economic Forecast & AI Productivity 2024',
    category: 'Financial Analysis',
    sourceDocument: `The 2024 Global Economic Outlook reports that macro-economic indicators show a gradual stabilization across tier-1 markets, driven by labor efficiency gains in high-tech verticals. Generative AI integration has increased automated document verification throughput by 310% in financial audit departments. 

Inflation metrics stabilized at 2.4% annually across Western Europe, while capital expenditure in enterprise AI infrastructure surpassed $140 billion globally in Q3 2024.`,
    defaultQuestion: 'What are the macro-economic trends and impact of AI integration on financial audit departments?',
  },
];
