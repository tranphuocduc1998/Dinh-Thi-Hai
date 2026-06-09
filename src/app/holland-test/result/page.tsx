'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { HOLLAND_RESULTS_MAP } from '@/data/hollandResults';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export default function HollandResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Đọc dữ liệu thô từ URL
  const topGroup = searchParams.get('topGroup') || 'R';
  const rawScores = searchParams.get('scores');
  
  // Phân tích ma trận điểm đã tính
  let scores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  if (rawScores) {
    try {
      scores = JSON.parse(decodeURIComponent(rawScores));
    } catch (e) {
      console.error('Lỗi định dạng ma trận điểm:', e);
    }
  }

  // Lấy thông tin chi tiết giải thích từ sơ đồ ánh xạ
  const currentResult = HOLLAND_RESULTS_MAP[topGroup] || HOLLAND_RESULTS_MAP['R'];

  // Điểm tối đa của 1 nhóm câu hỏi là 35 (7 câu * 5 điểm)
  const MAX_SCORE_PER_GROUP = 35;

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-6">
        
        {/* Khối lời chào và Kết luận nhóm trội */}
        <Card className="border-t-8 border-t-blue-600 shadow-md">
          <CardHeader className="text-center">
            <CardDescription className="text-sm uppercase tracking-wider font-semibold text-blue-600">Kết quả phân tích Tầng 1</CardDescription>
            <CardTitle className="text-3xl font-extrabold text-slate-900 mt-1">
              Mã Tính Cách Trội: {topGroup} — {currentResult.vietnameseName}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-700 bg-slate-50/50 p-6 rounded-b-xl border-t text-center sm:text-left">
            <p className="font-bold text-slate-800 mb-2">🧬 Đặc trưng tính cách nổi bật:</p>
            <p className="leading-relaxed text-slate-600">{currentResult.description}</p>
          </CardContent>
        </Card>

        {/* Khối hiển thị trực quan Ma trận điểm RIASEC */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">📊 Ma Trận Phân Bố Điểm RIASEC</CardTitle>
            <CardDescription>Điểm số chi tiết tích lũy được qua 42 câu hỏi (Tối đa 35 điểm/nhóm)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(scores).map(([group, score]) => {
              const info = HOLLAND_RESULTS_MAP[group];
              const percentage = (score / MAX_SCORE_PER_GROUP) * 100;
              const isTop = group === topGroup;

              return (
                <div key={group} className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className={`font-semibold ${isTop ? 'text-blue-600 font-bold' : 'text-slate-700'}`}>
                      {group} - {info?.vietnameseName} {isTop && '⭐ (Trội nhất)'}
                    </span>
                    <span className="font-mono font-bold text-slate-600">{score} / {MAX_SCORE_PER_GROUP} đ</span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className={`h-3 rounded-full bg-slate-100 ${isTop ? '[&>div]:bg-blue-600' : '[&>div]:bg-slate-400'}`} 
                  />
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
              {currentResult.careers.map((career, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 font-medium text-sm rounded-lg shadow-200"
                >
                  {career}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nút hành động chuyển hướng kết nối sang Tầng 2 */}
        <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">Sẵn sàng bước vào Tầng 2?</h4>
            <p className="text-xs text-blue-200">Hệ chuyên gia (Knowledge-based) đang đợi để lọc cụ thể trường đại học và học phí theo mã {topGroup} của bạn.</p>
          </div>
          <Button 
            onClick={() => router.push(`/knowledge-filter?riasec=${topGroup}`)}
            className="w-full sm:w-auto bg-white text-blue-900 hover:bg-blue-50 font-bold py-5 px-6 rounded-xl transition-all whitespace-nowrap"
          >
            Tiến hành lọc Ngành Đại học &raquo;
          </Button>
        </div>

      </div>
    </main>
  );
}