'use client';

import { useState, useMemo } from 'react';
import { RankedMajorResult } from '@/lib/coreEngineHandle';
import { computeContentBasedRanking, ContentRankedMajor } from '@/lib/contentRanking';
import { ChevronDown, ChevronUp, Star, MapPin, BookOpen, TrendingUp, Trophy } from 'lucide-react';

// ============================================================
// PROPS
// ============================================================
interface ContentRankingSectionProps {
  tier2Results: RankedMajorResult[];
  riasecCode: string;
}

// ============================================================
// SUB-COMPONENT: THANH ĐIỂM TỪNG CHIỀU
// ============================================================
function DimensionBar({
  label,
  score,
  weight,
  contribution,
  explanation,
  color,
}: {
  label: string;
  score: number;
  weight: number;
  contribution: number;
  explanation: string;
  color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-mono text-slate-500">
          {Math.round(score * 100)}%
          <span className="text-slate-400 ml-1">(×{weight})</span>
        </span>
      </div>
      <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${Math.round(score * 100)}%` }}
        />
      </div>
      <p className="text-[11px] text-slate-400 leading-relaxed">{explanation}</p>
    </div>
  );
}

// ============================================================
// SUB-COMPONENT: BADGE TIER
// ============================================================
function TierBadge({ tier }: { tier: ContentRankedMajor['tier'] }) {
  const config = {
    'Rất phù hợp':      { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    'Phù hợp':          { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200'    },
    'Có thể cân nhắc':  { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200'   },
  }[tier];

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${config.bg} ${config.text} ${config.border}`}>
      {tier === 'Rất phù hợp' && <Star className="w-3 h-3 fill-current" />}
      {tier}
    </span>
  );
}

// ============================================================
// SUB-COMPONENT: CARD NGÀNH (TOP 3 + EXPANDED)
// ============================================================
function MajorCard({
  item,
  isTop3,
  defaultExpanded = false,
}: {
  item: ContentRankedMajor;
  isTop3: boolean;
  defaultExpanded?: boolean;
}) {
  const [showDetail, setShowDetail] = useState(defaultExpanded);

  const bestPath = item.bestPaths[0];

  const dimColors = [
    '[&]:bg-violet-400',  // RIASEC
    '[&]:bg-blue-400',    // Subject
    '[&]:bg-emerald-400', // Safety
    '[&]:bg-amber-400',   // Geo
  ];

  // Thanh tổng hợp CBScore — màu theo tier
  const scoreBarColor =
    item.tier === 'Rất phù hợp' ? 'bg-emerald-500' :
    item.tier === 'Phù hợp'     ? 'bg-blue-500'    :
                                   'bg-amber-500';

  return (
    <div className={`
      relative bg-white rounded-2xl border transition-all duration-200
      ${isTop3
        ? 'border-blue-200 shadow-md hover:shadow-lg'
        : 'border-slate-200 shadow-sm hover:shadow-md opacity-90 hover:opacity-100'}
      ${item.rank === 1 ? 'ring-2 ring-blue-400 ring-offset-1' : ''}
    `}>

      {/* Nhãn Top 1 */}
      {item.rank === 1 && (
        <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow">
          <Trophy className="w-3 h-3" /> Gợi ý số 1
        </div>
      )}

      {/* ── HEADER ── */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Số thứ tự */}
            <div className={`
              flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm
              ${isTop3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}
            `}>
              #{item.rank}
            </div>

            <div>
              <h3 className="font-bold text-slate-800 text-base leading-tight">
                {item.majorName}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Mã ngành: {item.majorCode}
              </p>
            </div>
          </div>

          {/* CBScore + Tier */}
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <TierBadge tier={item.tier} />
            <span className="text-2xl font-black text-slate-800 font-mono leading-none">
              {item.cbScorePercent}
              <span className="text-sm font-semibold text-slate-400">%</span>
            </span>
          </div>
        </div>

        {/* Thanh CBScore tổng */}
        <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${scoreBarColor}`}
            style={{ width: `${item.cbScorePercent}%` }}
          />
        </div>
      </div>

      {/* ── LÝ DO CHÍNH ── */}
      <div className="px-5 pb-3">
        <p className="text-sm text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-700">Tại sao? </span>
          {item.primaryReason}
        </p>
        {item.secondaryReasons.length > 0 && (
          <ul className="mt-2 space-y-1">
            {item.secondaryReasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-slate-500">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── THÔNG TIN TRƯỜNG TỐT NHẤT ── */}
      {bestPath && (
        <div className="mx-5 mb-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <MapPin className="w-3 h-3" />
            <span className="font-medium">Con đường tốt nhất</span>
          </div>
          <p className="text-sm font-semibold text-slate-700">{bestPath.schoolName}</p>
          <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
            <span>Tổ hợp: <b className="text-blue-600 font-mono">{bestPath.comboCode}</b></span>
            <span>Điểm bạn: <b className="font-mono text-slate-700">{bestPath.studentScore?.toFixed(1)}</b></span>
            <span>Chuẩn: <b className="font-mono text-slate-700">{bestPath.cutoff}</b></span>
            <span className={`font-semibold ${bestPath.safetyMargin >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {bestPath.safetyMargin >= 0
                ? `+${bestPath.safetyMargin.toFixed(1)}đ`
                : `${bestPath.safetyMargin.toFixed(1)}đ`}
            </span>
          </div>
        </div>
      )}

      {/* ── TOGGLE CHI TIẾT ── */}
      <button
        onClick={() => setShowDetail(!showDetail)}
        className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 py-2.5 border-t border-slate-100 transition-colors"
      >
        {showDetail ? (
          <><ChevronUp className="w-3.5 h-3.5" /> Ẩn chi tiết điểm</>
        ) : (
          <><ChevronDown className="w-3.5 h-3.5" /> Xem chi tiết từng chiều</>
        )}
      </button>

      {/* ── CHI TIẾT TỪNG CHIỀU (COLLAPSE) ── */}
      {showDetail && (
        <div className="px-5 pb-5 space-y-3 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Phân tích 4 chiều đánh giá
          </p>
          {item.dimensions.map((dim, i) => (
            <DimensionBar
              key={dim.label}
              {...dim}
              color={dimColors[i]}
            />
          ))}

          {/* Công thức tổng hợp */}
          <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-[11px] font-mono text-slate-400 text-center">
              CBScore = {item.dimensions.map(d =>
                `${d.weight}×${Math.round(d.score * 100)}%`
              ).join(' + ')} = <span className="font-bold text-slate-600">{item.cbScorePercent}%</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT: CONTENT RANKING SECTION
// ============================================================
export function ContentRankingSection({
  tier2Results,
  riasecCode,
}: ContentRankingSectionProps) {
  const [showAll, setShowAll] = useState(false);

  // Chạy engine tầng 3
  const ranked = useMemo(
    () => computeContentBasedRanking(tier2Results),
    [tier2Results]
  );

  if (ranked.length === 0) return null;

  const top3    = ranked.slice(0, 3);
  const theRest = ranked.slice(3);
  const hasMore = theRest.length > 0;

  return (
    <section className="space-y-5 mt-8">

      {/* ── HEADER SECTION ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-xl font-extrabold text-slate-800">
              Tầng 3: Kết quả Tư vấn Hướng nghiệp
            </h2>
          </div>
          <p className="text-sm text-slate-500 ml-3">
            Xếp hạng tổng hợp theo 4 chiều: định hướng nghề nghiệp · năng lực học tập · biên an toàn · địa lý
          </p>
        </div>

        <div className="flex-shrink-0 text-right">
          <p className="text-xs text-slate-400">Mã Holland</p>
          <p className="text-lg font-black text-blue-600 font-mono">{riasecCode}</p>
        </div>
      </div>

      {/* ── LEGEND TRỌNG SỐ ── */}
      <div className="flex flex-wrap gap-2 text-xs">
        {[
          { label: 'Định hướng', weight: '40%', color: 'bg-violet-100 text-violet-700 border-violet-200' },
          { label: 'Năng lực',   weight: '25%', color: 'bg-blue-100 text-blue-700 border-blue-200'       },
          { label: 'An toàn',    weight: '25%', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
          { label: 'Địa lý',     weight: '10%', color: 'bg-amber-100 text-amber-700 border-amber-200'    },
        ].map(({ label, weight, color }) => (
          <span key={label} className={`px-2.5 py-1 rounded-full border font-medium ${color}`}>
            {label} <span className="opacity-70">{weight}</span>
          </span>
        ))}
      </div>

      {/* ── TOP 3 CARDS ── */}
      <div className="space-y-4">
        {top3.map(item => (
          <MajorCard
            key={item.majorCode}
            item={item}
            isTop3={true}
            defaultExpanded={item.rank === 1}
          />
        ))}
      </div>

      {/* ── EXPAND / COLLAPSE PHẦN CÒN LẠI ── */}
      {hasMore && (
        <>
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-600 hover:text-blue-600 border border-dashed border-slate-300 hover:border-blue-300 rounded-xl transition-all bg-white hover:bg-blue-50"
          >
            {showAll ? (
              <><ChevronUp className="w-4 h-4" /> Thu gọn</>
            ) : (
              <><ChevronDown className="w-4 h-4" /> Xem thêm {theRest.length} ngành khác</>
            )}
          </button>

          {showAll && (
            <div className="space-y-3">
              {theRest.map(item => (
                <MajorCard
                  key={item.majorCode}
                  item={item}
                  isTop3={false}
                  defaultExpanded={false}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── FOOTER NOTE ── */}
      <div className="flex items-start gap-2 p-4 bg-blue-50 border border-blue-100 rounded-xl">
        <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          Kết quả tư vấn dựa trên mô hình lai Knowledge-Based + Content-Based.
          Điểm chuẩn tham khảo năm gần nhất — thực tế có thể thay đổi.
          Hãy tham khảo thêm ý kiến của giáo viên và phụ huynh trước khi quyết định.
        </p>
      </div>

    </section>
  );
}
