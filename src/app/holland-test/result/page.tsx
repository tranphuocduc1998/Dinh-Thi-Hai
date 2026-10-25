'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdvisorStore } from '@/store/useAdvisorStore';
import { HOLLAND_RESULTS_MAP } from '@/data/hollandResults';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

// ── Đúng sau khi sửa: không nhân weight ──────────────────
const QUESTIONS_PER_GROUP = 7;
const MAX_SCORE_PER_GROUP = QUESTIONS_PER_GROUP * 5; // = 35

export default function HollandResultPage() {
  const router = useRouter();
  const { hollandResult, currentStep } = useAdvisorStore();

  // ── Redirect nếu chưa làm bài test ───────────────────────
  useEffect(() => {
    if (!hollandResult) {
      router.replace('/holland-test');
    }
  }, [hollandResult, router]);

  if (!hollandResult) return null;

  const { topCode, rawScores, coreScores, rank } = hollandResult;

  // ── Nhóm trội nhất ────────────────────────────────────────
  const topGroup = topCode[0];
  const currentResult = HOLLAND_RESULTS_MAP[topGroup];

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-6">

        {/* ── HERO ───────────────────────────────────────────── */}
        <Card className="border-t-8 border-t-blue-600 shadow-md">
          <CardHeader className="text-center">
            <CardDescription className="text-sm uppercase tracking-wider font-semibold text-blue-600">
              Kết quả phân tích Holland
            </CardDescription>
            <CardTitle className="text-3xl font-extrabold text-slate-900 mt-1">
              🧬 Mã tính cách của bạn: {topCode}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 rounded-b-xl border-t space-y-4">
            {/* Mô tả đầy đủ top 3 nhóm */}
            {topCode.split('').map((g, idx) => {
              const info = HOLLAND_RESULTS_MAP[g];
              return (
                <div
                  key={g}
                  className="border-l-4 border-blue-400 pl-4 py-2"
                >
                  <p className="font-bold text-slate-800">
                    #{idx + 1} {g} — {info?.vietnameseName}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    {info?.description}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* ── TOP 3 BADGES ───────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>🥇 Top 3 nhóm tính cách</CardTitle>
            <CardDescription>
              Mã RIASEC theo điểm tổng + core score tie-break
            </CardDescription>
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
          </CardContent>
        </Card>

        {/* ── MA TRẬN ĐIỂM ───────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Ma trận điểm chi tiết</CardTitle>
            <CardDescription>
              Raw score + core score tie-break
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {rank.map(([group, value]) => {
              const info = HOLLAND_RESULTS_MAP[group];
              const percentage = (value / MAX_SCORE_PER_GROUP) * 100;
              const isTop = topCode.includes(group);

              return (
                <div key={group} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span
                      className={`font-semibold ${
                        isTop ? 'text-blue-600' : 'text-slate-700'
                      }`}
                    >
                      {group} - {info?.vietnameseName}
                    </span>
                    <span className="font-mono text-slate-600">
                      {value} điểm
                    </span>
                  </div>

                  <Progress
                    value={Math.min(percentage, 100)}
                    className={`h-3 ${
                      isTop
                        ? '[&>div]:bg-blue-600'
                        : '[&>div]:bg-slate-400'
                    }`}
                  />

                  <div className="text-xs text-slate-500">
                    Core score: {coreScores[group] ?? 0}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* ── NEXT STEP ──────────────────────────────────────── */}
        <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">Bước tiếp theo</h4>
            <p className="text-xs text-blue-200">
              Hệ thống sẽ lọc ngành học phù hợp theo mã {topCode}
            </p>
          </div>
          <Button
            onClick={() => router.push('/knowledge-filter')}
            className="w-full sm:w-auto bg-white text-blue-900 hover:bg-blue-50 font-bold py-5 px-6 rounded-xl"
          >
            Lọc ngành phù hợp »
          </Button>
        </div>

      </div>
    </main>
  );
}