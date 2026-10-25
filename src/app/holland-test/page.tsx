'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDown, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { HOLLAND_QUESTIONS, LIKERT_OPTIONS } from '@/data/hollandQuestions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useAdvisorStore } from '@/store/useAdvisorStore';
import { cn } from '@/lib/utils';

const TOTAL = HOLLAND_QUESTIONS.length;

// Thời gian chờ trước khi tự cuộn sang câu kế tiếp (để người dùng kịp thấy lựa chọn của mình)
const AUTO_ADVANCE_DELAY_MS = 300;

// Khoảng cách chừa lại giữa thanh sticky và câu hỏi khi cuộn tới
const SCROLL_GAP_PX = 24;

export default function HollandTestPage() {
  const router = useRouter();
  const { setHollandResult } = useAdvisorStore();

  // { [Q01]: 5, [Q02]: 3, ... } — điểm từ 1 đến 5
  const [answers, setAnswers] = useState<Record<string, number>>({});

  // Câu đang được chọn / vừa cuộn tới (hiện vòng sáng trong danh sách và trên thẻ câu hỏi)
  const [activeId, setActiveId] = useState<string | null>(null);

  // Bật sau khi bấm nộp mà còn thiếu câu: tô vàng các câu chưa trả lời
  const [showMissing, setShowMissing] = useState(false);

  // Tự chuyển sang câu chưa trả lời kế tiếp sau khi chọn
  const [autoAdvance, setAutoAdvance] = useState(true);

  // Mở/đóng bảng danh sách câu hỏi trong thanh sticky
  const [showNav, setShowNav] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const answeredCount = Object.keys(answers).length;
  const remainingCount = TOTAL - answeredCount;
  const progressPercentage = (answeredCount / TOTAL) * 100;
  const isComplete = remainingCount === 0;

  // Màn hình rộng: mở sẵn bảng danh sách câu. Màn hình nhỏ: để đóng cho đỡ chiếm chỗ.
  useEffect(() => {
    if (window.matchMedia('(min-width: 640px)').matches) {
      setShowNav(true);
    }
  }, []);

  // Dọn timer khi rời trang
  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  // ------------------------------------------------------------
  // Cuộn tới một câu hỏi, trừ đi chiều cao thanh sticky để không bị che
  // ------------------------------------------------------------
  const scrollToQuestion = useCallback((id: string) => {
    const el = document.getElementById(`question-${id}`);
    if (!el) return;

    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      SCROLL_GAP_PX -
      16; // 16 = khoảng top-4 của thanh sticky

    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    setActiveId(id);
  }, []);

  // Tìm câu chưa trả lời kế tiếp sau vị trí fromIndex; hết phía sau thì quay lại từ đầu
  const findNextUnansweredIndex = (
    fromIndex: number,
    current: Record<string, number>
  ) => {
    for (let i = fromIndex + 1; i < TOTAL; i++) {
      if (current[HOLLAND_QUESTIONS[i].id] === undefined) return i;
    }
    for (let i = 0; i <= fromIndex; i++) {
      if (current[HOLLAND_QUESTIONS[i].id] === undefined) return i;
    }
    return -1;
  };

  const scrollToFirstUnanswered = () => {
    const idx = HOLLAND_QUESTIONS.findIndex((q) => answers[q.id] === undefined);
    if (idx !== -1) scrollToQuestion(HOLLAND_QUESTIONS[idx].id);
  };

  // ------------------------------------------------------------
  // Chọn đáp án
  // ------------------------------------------------------------
  const handleAnswerChange = (questionId: string, value: string, index: number) => {
    const isFirstTime = answers[questionId] === undefined;
    const nextAnswers = { ...answers, [questionId]: parseInt(value, 10) };

    setAnswers(nextAnswers);
    setActiveId(questionId);

    // Chỉ tự chuyển khi trả lời lần đầu; sửa lại đáp án cũ thì giữ nguyên vị trí
    if (!autoAdvance || !isFirstTime) return;

    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      const nextIdx = findNextUnansweredIndex(index, nextAnswers);
      if (nextIdx === -1) {
        // Đã trả lời hết: cuộn xuống nút nộp bài
        submitRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        scrollToQuestion(HOLLAND_QUESTIONS[nextIdx].id);
      }
    }, AUTO_ADVANCE_DELAY_MS);
  };

  // ------------------------------------------------------------
  // Nộp bài — giữ nguyên logic tính điểm
  // ------------------------------------------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (answeredCount < TOTAL) {
      setShowMissing(true);
      scrollToFirstUnanswered();
      return;
    }

    // Bước 1: Raw Score (tổng đơn thuần, không weight)
    const rawScores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    // Bước 2: Core Score (chỉ câu isCore, dùng tie-break)
    const coreScores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    HOLLAND_QUESTIONS.forEach((q) => {
      const score = answers[q.id] || 0;
      rawScores[q.category] += score;
      if (q.isCore) coreScores[q.category] += score;
    });

    // Bước 3: Xếp hạng, tie-break 2 cấp
    const sorted = Object.entries(rawScores).sort((a, b) => {
      const [gA, scoreA] = a;
      const [gB, scoreB] = b;

      if (scoreA !== scoreB) return scoreB - scoreA;
      if (coreScores[gA] !== coreScores[gB]) return coreScores[gB] - coreScores[gA];
      return 0;
    });

    const topCode = sorted
      .slice(0, 3)
      .map(([g]) => g)
      .join('');

    setHollandResult({ topCode, rawScores, coreScores, rank: sorted });
    router.push('/holland-test/result');
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-6">

        {/* ============================================================
            THANH TIẾN ĐỘ (sticky): đếm câu, tiến độ, danh sách câu
        ============================================================ */}
        <div
          ref={headerRef}
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 sticky top-4 z-20 space-y-3"
        >
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-semibold text-slate-700">
              Đã chọn{' '}
              <span className="text-blue-600 font-bold">{answeredCount}</span> / {TOTAL} câu
            </span>
            <span
              className={cn(
                'font-medium',
                isComplete ? 'text-emerald-600' : 'text-amber-600'
              )}
            >
              {isComplete ? 'Đã trả lời hết' : `Còn ${remainingCount} câu chưa trả lời`}
            </span>
          </div>

          <Progress value={progressPercentage} className="h-2 bg-slate-100" />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isComplete}
                onClick={scrollToFirstUnanswered}
              >
                <ArrowDown className="w-3.5 h-3.5 mr-1.5" />
                Đến câu chưa trả lời
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowNav((v) => !v)}
                aria-expanded={showNav}
              >
                Danh sách câu
                {showNav ? (
                  <ChevronUp className="w-3.5 h-3.5 ml-1" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 ml-1" />
                )}
              </Button>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={(e) => setAutoAdvance(e.target.checked)}
                className="accent-blue-600"
              />
              Tự chuyển sang câu kế tiếp
            </label>
          </div>

          {showNav && (
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <div
                className="grid gap-1.5 max-h-32 overflow-y-auto pr-1"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(2rem, 1fr))' }}
              >
                {HOLLAND_QUESTIONS.map((q, index) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isMissing = showMissing && !isAnswered;
                  const isActive = activeId === q.id;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => scrollToQuestion(q.id)}
                      aria-label={`Câu ${index + 1}: ${isAnswered ? 'đã trả lời' : 'chưa trả lời'}`}
                      className={cn(
                        'h-8 rounded-md border text-xs font-semibold transition-colors',
                        isAnswered && 'bg-blue-600 border-blue-600 text-white',
                        !isAnswered && !isMissing && 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50',
                        isMissing && 'bg-amber-50 border-amber-400 text-amber-700',
                        isActive && 'ring-2 ring-blue-400 ring-offset-1'
                      )}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-blue-600" /> Đã chọn
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm border border-slate-300 bg-white" /> Chưa chọn
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="text-center py-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Tầng 1: Khảo Sát Tính Cách RIASEC
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
            Mỗi câu hỏi có 5 mức độ lựa chọn. Hãy chọn phương án phản ánh chính xác nhất
            suy nghĩ và sở thích của bạn.
          </p>
        </div>

        {/* ============================================================
            DANH SÁCH CÂU HỎI
        ============================================================ */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {HOLLAND_QUESTIONS.map((q, index) => {
            const isAnswered = answers[q.id] !== undefined;
            const isMissing = showMissing && !isAnswered;
            const isActive = activeId === q.id;

            return (
              // div bọc ngoài mang id để cuộn tới (không phụ thuộc Card có nhận ref hay không)
              <div key={q.id} id={`question-${q.id}`}>
                <Card
                  className={cn(
                    'transition-all duration-300 border-l-4',
                    isAnswered && 'border-l-blue-500 shadow-md bg-white',
                    !isAnswered && !isMissing && 'border-l-slate-200 bg-white/80',
                    isMissing && 'border-l-amber-400 bg-amber-50/60',
                    isActive && 'ring-2 ring-blue-300'
                  )}
                >
                  <CardHeader className="py-4">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-base font-semibold text-slate-800 leading-relaxed">
                        <span className="text-blue-500 mr-1">Câu {index + 1}.</span>
                        {q.question}
                      </CardTitle>

                      {isAnswered ? (
                        <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> Đã chọn
                        </span>
                      ) : (
                        <span
                          className={cn(
                            'flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border',
                            isMissing
                              ? 'text-amber-700 bg-amber-100 border-amber-300'
                              : 'text-slate-500 bg-slate-50 border-slate-200'
                          )}
                        >
                          Chưa chọn
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pb-5">
                    <RadioGroup
                      value={answers[q.id]?.toString() ?? ''}
                      onValueChange={(val) => handleAnswerChange(q.id, val, index)}
                      className="grid grid-cols-1 gap-2"
                    >
                      {LIKERT_OPTIONS.map((opt) => (
                        <div
                          key={opt.value}
                          className={cn(
                            'flex items-center space-x-3 p-2.5 rounded-lg border transition-all cursor-pointer hover:bg-slate-50',
                            answers[q.id] === parseInt(opt.value, 10)
                              ? 'border-blue-200 bg-blue-50/40'
                              : 'border-slate-100'
                          )}
                        >
                          <RadioGroupItem value={opt.value} id={`opt-${q.id}-${opt.value}`} />
                          <Label
                            htmlFor={`opt-${q.id}-${opt.value}`}
                            className="w-full text-sm font-medium text-slate-700 cursor-pointer"
                          >
                            {opt.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            );
          })}

          <div ref={submitRef} className="pt-4 pb-12 space-y-3">
            {!isComplete && showMissing && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-center">
                Còn {remainingCount} câu chưa trả lời (đang tô vàng). Hãy hoàn thành rồi nộp bài.
              </p>
            )}

            <Button
              type="submit"
              className="w-full py-6 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Nộp bài & Phân tích ma trận tính cách &raquo;
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
