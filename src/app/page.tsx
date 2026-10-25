'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { checkApiHealth } from '@/lib/api/advisor';

export default function HomePage() {
  const [status, setStatus] = useState('Đang kiểm tra...');

    useEffect(() => {
    checkApiHealth().then((ok) =>
      setStatus(ok ? '✅ API kết nối thành công' : '❌ API không phản hồi')
    );
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Hệ Thống Tư Vấn Hướng Nghiệp Lai Thông Minh ({status})
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Khám phá bản thân và định hướng tương lai thông qua quy trình xử lý 3 tầng: 
            Tính cách &gt;&gt; Nhóm ngành &gt;&gt; Điểm số xét tuyển đại học.
          </p>
        </div>

        {/* Khối giới thiệu 3 tầng gối đầu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-blue-600 font-bold">Tầng 1: Holland Test</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Khảo sát sở thích với 30 câu hỏi chuẩn hóa giúp định hình mã tính cách trội (RIASEC) của bản thân.
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-emerald-600 font-bold">Tầng 2: Bộ lọc Tri thức</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Hệ chuyên gia (Knowledge-based) tự động ánh xạ tính cách sang nhóm ngành và sàng lọc theo học phí, khu vực.
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-orange-600 font-bold">Tầng 3: Xếp hạng Năng lực</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Thuật toán xếp hạng (Content-based) đối chiếu kết quả thi/học bạ để đưa ra Top 3 ngành nghề phù hợp nhất.
            </CardContent>
          </Card>
        </div>

        <div className="pt-4">
          <Link href="/holland-test">
            <Button size="lg" className="px-8 py-6 text-lg font-bold bg-blue-600 hover:bg-blue-700 transition-all rounded-xl shadow-md">
              Bắt đầu khám phá bản thân &raquo;
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}