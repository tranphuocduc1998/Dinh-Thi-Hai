// src/components/BaselineSelector.tsx

'use client';

import { useAdvisorStore, type BaselineType } from '@/store/useAdvisorStore';

const BASELINES: {
  value: BaselineType;
  label: string;
  description: string;
  badge: string;
  badgeColor: string;
}[] = [
  {
    value: 'proposed',
    label: 'B4 — Proposed Method',
    description: 'Trọng số tối ưu (Grid Search) + Giải thích chi tiết',
    badge: 'Đề xuất',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    value: 'hybrid_fixed',
    label: 'B3 — Hybrid Fixed Weights',
    description: 'Kết hợp Holland + Điểm số + Địa lý, trọng số cố định',
    badge: 'Hybrid',
    badgeColor: 'bg-green-100 text-green-700 border-green-200',
  },
  {
    value: 'content_based',
    label: 'B2 — Content-Based',
    description: 'Chỉ dùng mã Holland RIASEC để xếp hạng',
    badge: 'Holland only',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
  },
  {
    value: 'random',
    label: 'B1 — Random',
    description: 'Gợi ý ngẫu nhiên — mốc so sánh tối thiểu',
    badge: 'Baseline',
    badgeColor: 'bg-gray-100 text-gray-600 border-gray-200',
  },
];

export function BaselineSelector() {
  const { selectedBaseline, setSelectedBaseline } = useAdvisorStore();

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Phương pháp gợi ý
        </h3>
        <span className="text-xs text-gray-400">Dành cho nghiên cứu</span>
      </div>

      <div className="space-y-2">
        {BASELINES.map((b) => {
          const isSelected = selectedBaseline === b.value;
          return (
            <button
              key={b.value}
              onClick={() => setSelectedBaseline(b.value)}
              className={`
                w-full text-left p-3 rounded-lg border transition-all
                ${isSelected
                  ? 'border-blue-400 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
              `}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    {/* Radio indicator */}
                    <div className={`
                      w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 mt-0.5
                      ${isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400'}
                    `}>
                      {isSelected && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                    <span className={`
                      text-sm font-semibold
                      ${isSelected ? 'text-blue-700' : 'text-gray-700'}
                    `}>
                      {b.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 ml-5">
                    {b.description}
                  </p>
                </div>

                {/* Badge */}
                <span className={`
                  text-xs font-medium px-2 py-0.5 rounded-full border
                  flex-shrink-0 ${b.badgeColor}
                `}>
                  {b.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}