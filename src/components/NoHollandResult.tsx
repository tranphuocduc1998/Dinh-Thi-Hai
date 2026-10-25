import Link from 'next/link';

// Hiện khi người dùng vào trang cần kết quả Holland nhưng chưa có (hoặc dữ liệu đã hết hạn).
// Thay cho việc tự động chuyển trang: người dùng biết vì sao và tự quyết định.
export function NoHollandResult() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3 shadow-sm">
        <h1 className="text-lg font-bold text-slate-800">
          Chưa có kết quả bài test Holland
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Bạn cần làm bài test tính cách trước để hệ thống gợi ý ngành phù hợp.
          Kết quả được lưu trên thiết bị này, nên tải lại trang sẽ không làm mất.
        </p>
        <Link
          href="/holland-test"
          className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Làm bài test
        </Link>
      </div>
    </main>
  );
}
