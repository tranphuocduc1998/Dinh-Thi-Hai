'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HOLLAND_QUESTIONS, LIKERT_OPTIONS } from '@/data/hollandQuestions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export default function HollandTestPage() {
  const router = useRouter();
  
  // State lưu câu trả lời: dạng { [Q01]: 5, [Q02]: 3... } với giá trị điểm từ 1 -> 5
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});

  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / HOLLAND_QUESTIONS.length) * 100;

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: parseInt(value, 10),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (answeredCount < HOLLAND_QUESTIONS.length) {
      alert(`Bạn mới hoàn thành ${answeredCount}/${HOLLAND_QUESTIONS.length} câu. Vui lòng trả lời đầy đủ tất cả các câu hỏi trước khi nộp bài!`);
      return;
    }

    // Khởi tạo bảng điểm tính toán cho 6 nhóm RIASEC
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    // Tích lũy điểm Likert (1 đến 5 điểm) trực tiếp vào từng nhóm ngành
    HOLLAND_QUESTIONS.forEach((q) => {
      const score = answers[q.id] || 0;
      scores[q.category] += score;
    });

    // Sắp xếp tìm nhóm có tổng điểm cao nhất
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topGroup = sortedScores[0][0];
    const topScore = sortedScores[0][1]; // Điểm tối đa lúc này là 7 câu * 5 điểm = 35 điểm/nhóm

    const encodedScores = encodeURIComponent(JSON.stringify(scores));
    
    // Đẩy tiếp luồng dữ liệu đã tính toán sang trang kết quả
    router.push(`/holland-test/result?topGroup=${topGroup}&topScore=${topScore}&scores=${encodedScores}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-6">
        
        {/* Thanh tiến độ làm bài thông minh */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 sticky top-4 z-10 space-y-2">
          <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
            <span>Tiến độ hoàn thành bài test:</span>
            <span className="text-blue-600 font-bold">{answeredCount} / {HOLLAND_QUESTIONS.length} câu</span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-slate-100" />
        </div>

        <div className="text-center py-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tầng 1: Khảo Sát Tính Cách RIASEC</h2>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
            Mỗi câu hỏi có 5 mức độ lựa chọn. Hãy chọn phương án phản ánh chính xác nhất suy nghĩ và sở thích của bạn.
          </p>
        </div>

        {/* Danh sách 42 câu hỏi */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {HOLLAND_QUESTIONS.map((q, index) => {
            const isAnswered = answers[q.id] !== undefined;
            return (
              <Card key={q.id} className={`transition-all duration-300 border-l-4 ${isAnswered ? 'border-l-blue-500 shadow-md bg-white' : 'border-l-slate-200 bg-white/80'}`}>
                <CardHeader className="py-4">
                  <CardTitle className="text-base font-semibold text-slate-800 leading-relaxed">
                    <span className="text-blue-500 mr-1">{q.id}.</span> {q.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-5">
                  {/* Cấu hình hiển thị cột dọc tùy chọn Likert giúp học sinh dễ đọc trên cả máy tính lẫn điện thoại */}
                  <RadioGroup
                    value={answers[q.id]?.toString()}
                    onValueChange={(val) => handleAnswerChange(q.id, val)}
                    className="grid grid-cols-1 gap-2 sm:grid-cols-1"
                  >
                    {LIKERT_OPTIONS.map((opt) => (
                      <div 
                        key={opt.value} 
                        className={`flex items-center space-x-3 p-2.5 rounded-lg border transition-all cursor-pointer hover:bg-slate-50 ${answers[q.id] === parseInt(opt.value, 10) ? 'border-blue-200 bg-blue-50/40' : 'border-slate-100'}`}
                      >
                        <RadioGroupItem value={opt.value} id={`opt-${q.id}-${opt.value}`} />
                        <Label htmlFor={`opt-${q.id}-${opt.value}`} className="w-full text-sm font-medium text-slate-700 cursor-pointer">
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            );
          })}

          <div className="pt-4 pb-12">
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