'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { HOLLAND_RESULTS_MAP } from '@/data/hollandResults';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RIASE_RESULT } from '@/data/RIASEC';
import { useEffect, useState } from 'react';
import { getIndustriesWithScore } from '@/lib/utils';

const QUESTIONS_PER_GROUP = 7;   // kiểm tra lại đúng với data của bạn
const MAX_SCORE_PER_GROUP = QUESTIONS_PER_GROUP * 5;  // = 35
// vì weight max = 2 nên scale tăng nhẹ (không bắt buộc dùng)

export default function HollandResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  // =========================
  // 1. Đọc dữ liệu
  // =========================
  const [topCode, setTopCode] = useState<string>("");
  const [scores, setScores] = useState<Record<string, number>>({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const [coreScores, setCoreScores] = useState<Record<string, number>>({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const [rank, setRank] = useState<[string, number][]>([]);

  // Trong result page:
  useEffect(() => {
    const stored = sessionStorage.getItem('hollandResult');
    if (!stored) { router.push('/holland-test'); return; }
    const data = JSON.parse(stored);
    setTopCode(data.topCode);
    setScores(data.rawScores);
    setCoreScores(data.coreScores);
    setRank(data.rank);
  }, []);

  // =========================
  // 2. RENDER TOP GROUP (FIRST CODE)
  // =========================
  const topGroup = topCode[0];
  const currentResult = HOLLAND_RESULTS_MAP[topGroup];

  // =========================
  // CAREER MATCHING ENGINE
  // =========================
  const industriesWithScore = getIndustriesWithScore(topCode);

  const visibleIndustries = expanded
    ? industriesWithScore
    : industriesWithScore.slice(0, 6);

  // // group by cluster
  // const grouped = industriesWithScore.reduce((acc: any, item) => {
  //   const key = 'other';
  //   if (!acc[key]) acc[key] = [];
  //   acc[key].push(item);
  //   return acc;
  // }, {});

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-6">

        {/* =========================
            HERO RESULT
        ========================= */}
        <Card className="border-t-8 border-t-blue-600 shadow-md">
          <CardHeader className="text-center">
            <CardDescription className="text-sm uppercase tracking-wider font-semibold text-blue-600">
              Kết quả phân tích Holland nâng cao
            </CardDescription>

            <CardTitle className="text-3xl font-extrabold text-slate-900 mt-1">
              🧬 Mã tính cách của bạn: {topCode}
            </CardTitle>

            <p className="text-sm text-slate-500 mt-2">
              Nhóm trội nhất: <b>{topGroup} - {currentResult?.vietnameseName}</b>
            </p>
          </CardHeader>
        </Card>

        {/* =========================
            TOP 3 CODE BREAKDOWN
        ========================= */}
        <Card>
          <CardHeader>
            <CardTitle>🥇 Top 3 nhóm tính cách</CardTitle>
            <CardDescription>Mã RIASEC theo điểm tổng + core score tie-break</CardDescription>
          </CardHeader>

          <CardContent className="flex gap-3 flex-wrap">
            {topCode.split('').map((g, idx) => {
              const info = HOLLAND_RESULTS_MAP[g];
              return (
                <div
                  key={g}
                  className="px-4 py-2 rounded-lg bg-blue-50 border text-blue-700 font-bold"
                >
                  #{idx + 1} {g} - {info?.vietnameseName}
                </div>
              );
            })}
            {topCode.split('').map((g, idx) => {
              const info = HOLLAND_RESULTS_MAP[g];
              return (
                <div key={g} className="border-l-4 border-blue-400 pl-4 py-2">
                  <p className="font-bold text-slate-800">
                    #{idx + 1} {g} — {info?.vietnameseName}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">{info?.description}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* =========================
            SCORE MATRIX
        ========================= */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Ma trận điểm chi tiết</CardTitle>
            <CardDescription>Weighted score + core insight</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {rank.map(([group, value]) => {
              const info = HOLLAND_RESULTS_MAP[group];
              const percentage = (value / MAX_SCORE_PER_GROUP) * 100;
              const isTop = group === topGroup;

              return (
                <div key={group} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className={`font-semibold ${isTop ? 'text-blue-600' : 'text-slate-700'}`}>
                      {group} - {info?.vietnameseName}
                    </span>

                    <span className="font-mono text-slate-600">
                      {value.toFixed(0)} điểm
                    </span>
                  </div>

                  <Progress
                    value={percentage}
                    className={`h-3 ${isTop ? '[&>div]:bg-blue-600' : '[&>div]:bg-slate-400'}`}
                  />

                  <div className="text-xs text-slate-500">
                    Core score: {coreScores[group] || 0}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Khối gợi ý danh sách ngành nghề tương ứng */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">💼 Gợi Ý Nhóm Ngành Định Hướng</CardTitle>
            <CardDescription>Các vị trí nghề nghiệp phù hợp với cấu trúc tư duy của bạn:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {visibleIndustries.map((i) => (
                <span
                  key={i.code}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 font-medium text-sm rounded-lg shadow-200"
                >
                  {i.name} ({i.code} - {i.matchPercent.toFixed(0)}%)
                </span>
              ))}
            </div>
            {/* BUTTON EXPAND / COLLAPSE */}
            {industriesWithScore.length > 6 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                >
                  {expanded ? 'Thu gọn ▲' : 'Xem thêm ▼'}
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* =========================
            NEXT STEP
        ========================= */}
        <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">Bước tiếp theo</h4>
            <p className="text-xs text-blue-200">
              Hệ thống sẽ lọc ngành học phù hợp theo mã {topCode}
            </p>
          </div>

          <Button
            onClick={() => router.push(`/knowledge-filter?riasec=${topCode}`)}
            className="w-full sm:w-auto bg-white text-blue-900 hover:bg-blue-50 font-bold py-5 px-6 rounded-xl"
          >
            Lọc ngành phù hợp »
          </Button>
        </div>

      </div>
    </main>
  );
}