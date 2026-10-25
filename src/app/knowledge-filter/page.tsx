'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdvisorStore } from '@/store/useAdvisorStore';
import { fetchProvinces, fetchRecommendation, fetchWards, type GeoUnit } from '@/lib/api/advisor';
import type { MajorRecommendation } from '@/store/useAdvisorStore';
import { BaselineSelector } from '@/components/BaselineSelector';
import { ScoreInput } from '@/components/ScoreInput';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================
// CONSTANTS
// ============================================================

// subject_code từ DB — khớp với FastAPI
const AVAILABLE_SUBJECTS: { code: string; nameVi: string }[] = [
  { code: 'MATH', nameVi: 'Toán' },
  { code: 'LITERATURE', nameVi: 'Ngữ văn' },
  { code: 'ENGLISH', nameVi: 'Tiếng Anh' },
  { code: 'PHYSICS', nameVi: 'Vật lí' },
  { code: 'CHEMISTRY', nameVi: 'Hóa học' },
  { code: 'BIOLOGY', nameVi: 'Sinh học' },
  { code: 'HISTORY', nameVi: 'Lịch sử' },
  { code: 'GEOGRAPHY', nameVi: 'Địa lí' },
  { code: 'ECONOMICS_LAW', nameVi: 'Giáo dục kinh tế và pháp luật' },
  { code: 'INFORMATICS', nameVi: 'Tin học' },
  { code: 'FINE_ARTS', nameVi: 'Mỹ thuật' },
  { code: 'MUSIC', nameVi: 'Âm nhạc' },
  { code: 'AGRICULTURAL_TECHNOLOGY', nameVi: 'Công nghệ nông nghiệp' },
  { code: 'INDUSTRIAL_TECHNOLOGY', nameVi: 'Công nghệ công nghiệp' },
];

const clip = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));


// ============================================================
// SUB-COMPONENT: RESULT CARD
// ============================================================

function MajorCard({
  item,
  index,
}: {
  item: MajorRecommendation;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const bestPath = item.best_paths[0];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-all space-y-3">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-gray-400 font-mono">
              #{index + 1}
            </span>
            <h3 className="text-base font-bold text-gray-800">
              {item.major_name_vi}
            </h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
              {item.major_code}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {item.field_name_vi} — {item.group_name_vi}
          </p>
        </div>

        {/* Score */}
        <div className="flex flex-col items-end flex-shrink-0">
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Điểm phù hợp
          </span>
          <span className="text-2xl font-black text-blue-600 font-mono">
            {(item.final_score * 100).toFixed(1)}%
          </span>
          <span className="text-[11px] text-gray-400">
            Holland: {item.riasec_match_percent.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Primary reason */}
      {item.primary_reason && (
        <p className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
          {item.primary_reason}
        </p>
      )}

      {/* Best path */}
      {bestPath && (
        <div className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
          <p className="text-sm font-semibold text-slate-700">
            {bestPath.institution_name}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>
              Tổ hợp:{' '}
              <b className="text-blue-600 font-mono">
                {bestPath.combination_code}
              </b>
            </span>
            <span>
              Điểm bạn:{' '}
              <b className="font-mono">{bestPath.student_score.toFixed(1)}</b>
            </span>
            <span>
              Chuẩn:{' '}
              <b className="font-mono">{bestPath.cutoff_score}</b>
            </span>
            <span
              className={
                bestPath.safety_margin >= 0
                  ? 'text-green-600 font-semibold'
                  : 'text-red-500 font-semibold'
              }
            >
              {bestPath.safety_margin >= 0
                ? `+${bestPath.safety_margin.toFixed(1)}đ`
                : `${bestPath.safety_margin.toFixed(1)}đ`}
            </span>
          </div>
        </div>
      )}

      {/* Explainability — chỉ B4 có dimensions */}
      {item.dimensions && item.dimensions.length > 0 && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            {expanded ? 'Ẩn chi tiết ▲' : 'Xem chi tiết đánh giá ▼'}
          </button>

          {expanded && (
            <div className="space-y-2 pt-1">
              {item.dimensions.map((dim, dimIdx) => (
                <div key={`dim-${dimIdx}-${dim.label}`} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-600">
                      {dim.label}
                    </span>
                    <span className="font-mono text-slate-500">
                      {(dim.score * 100).toFixed(0)}%
                      <span className="text-slate-400 ml-1">
                        (×{dim.weight})
                      </span>
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${dim.score * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {dim.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}


// ============================================================
// MAIN PAGE
// ============================================================

export default function KnowledgeFilterPage() {
  const router = useRouter();

  // ── Store ─────────────────────────────────────────────────
  const {
    hollandResult,
    studentProfile,
    setSubjectScores,
    setGeoFilter,
    recommendationResult,
    setRecommendationResult,
    isLoading,
    setLoading,
    error,
    setError,
    selectedBaseline,
  } = useAdvisorStore();

  // ── Redirect nếu chưa có Holland result ───────────────────
  useEffect(() => {
    if (!hollandResult) {
      router.replace('/holland-test');
    }
  }, [hollandResult, router]);

  // ── Local state UI ────────────────────────────────────────
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);

  // ── Handlers môn học ──────────────────────────────────────
  const handleSubjectToggle = (code: string) => {
    if (selectedSubjects.includes(code)) {
      setSelectedSubjects((prev) => prev.filter((s) => s !== code));
      setScores((prev) => {
        const next = { ...prev };
        delete next[code];
        return next;
      });
    } else {
      setSelectedSubjects((prev) => [...prev, code]);
      // setScores((prev) => ({ ...prev, [code]: prev[code] ?? 0 }));
    }
  };

  const handleScoreChange = (code: string, value: number | null) => {
    setScores((prev) => {
      const next = { ...prev };
      if (value === null) delete next[code];
      else next[code] = value;
      return next;
    });
  };

  // ── Danh sách tỉnh/quận — lấy từ API sau
  const [provinces, setProvinces] = useState<GeoUnit[]>([]);
  const [wards, setWards] = useState<GeoUnit[]>([]);
  const [province, setProvince] = useState<GeoUnit | null>(null);
  const [ward, setWard] = useState<GeoUnit | null>(null);
  const [openProvince, setOpenProvince] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  // Tải danh sách tỉnh/thành một lần khi vào trang
  useEffect(() => {
    fetchProvinces()
      .then(setProvinces)
      .catch(() => setGeoError('Không tải được danh sách tỉnh/thành'));
  }, []);

  // Mỗi khi đổi tỉnh: xoá phường đã chọn rồi tải phường của tỉnh mới
  useEffect(() => {
    setWard(null);
    setWards([]);
    if (!province) return;

    let cancelled = false; // tránh ghi đè khi người dùng đổi tỉnh nhanh
    fetchWards(province.id)
      .then((data) => { if (!cancelled) setWards(data); })
      .catch(() => setGeoError('Không tải được danh sách phường/xã'));

    return () => { cancelled = true; };
  }, [province]);


  // ── Gọi API ───────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!hollandResult) return;

    setSubjectScores(scores);
    setGeoFilter(province?.id ?? null, ward?.id ?? null);

    setLoading(true);
    setError(null);

    try {
      const result = await fetchRecommendation({
        baseline: selectedBaseline,
        topCode: hollandResult.topCode,
        studentScores: scores,
        admissionYear: studentProfile.admissionYear,
        topN: 10,
        provinceId: province?.id ?? null,
        districtId: ward?.id ?? null,
      });
      setRecommendationResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const missingCodes = selectedSubjects.filter((c) => scores[c] === undefined);
  const canSubmit = selectedSubjects.length >= 3 && missingCodes.length === 0;

  const results = recommendationResult?.results ?? [];

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 font-sans">

      {/* Header */}
      <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">
          Tầng 2 & 3: Lọc Ngành & Xếp Hạng Phù Hợp
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Nhập điểm số để hệ thống tìm ngành phù hợp nhất với bạn.
        </p>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="text-xs bg-purple-100 text-purple-800 font-medium px-2.5 py-0.5 rounded">
            Mã Holland: {hollandResult?.topCode}
          </span>
          <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2.5 py-0.5 rounded">
            Baseline: {selectedBaseline}
          </span>
        </div>
      </div>


      {/* TODO: Bước D bổ sung địa lý từ API */}
      <BaselineSelector />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── SIDEBAR ────────────────────────────────────────── */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit space-y-6">

          {/* 1. Chọn môn học */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              1. Chọn môn học có điểm
            </h2>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  Chọn môn học...
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Tìm môn học..." />
                  <CommandEmpty>Không tìm thấy môn</CommandEmpty>
                  <CommandGroup>
                    {AVAILABLE_SUBJECTS.map((subject) => {
                      const isSelected = selectedSubjects.includes(subject.code);
                      return (
                        <CommandItem
                          key={`subject-${subject.code}`}
                          onSelect={() => handleSubjectToggle(subject.code)}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              isSelected ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {subject.nameVi}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* 2. Nhập điểm */}
          {selectedSubjects.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                2. Nhập điểm số
              </h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="p-3">Môn học</th>
                      <th className="p-3">Điểm</th>
                      <th className="p-3 text-right">Xoá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSubjects.map((code) => {
                      const subject = AVAILABLE_SUBJECTS.find(
                        (s) => s.code === code
                      );
                      return (
                        <tr key={`row-${code}`} className="border-t">
                          <td className="p-3 font-medium">
                            {subject?.nameVi}
                          </td>
                          <td className="p-3">
                            <ScoreInput
                              value={scores[code]}
                              onChange={(v) => handleScoreChange(code, v)}
                              label={subject?.nameVi ?? code}
                            />
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleSubjectToggle(code)}
                              className="text-red-500 hover:underline text-xs"
                            >
                              Xoá
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. Địa lý — tạm thời ẩn đến khi có API địa lý */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              3. Địa điểm học (tùy chọn)
            </h2>

            <div className="space-y-3">
              {/* Tỉnh / Thành phố */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">Tỉnh / Thành phố</label>
                <Popover open={openProvince} onOpenChange={setOpenProvince}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between font-normal">
                      {province?.name ?? 'Tất cả tỉnh/thành'}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput placeholder="Tìm tỉnh/thành..." />
                      <CommandEmpty>Không tìm thấy</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="tat-ca"
                          onSelect={() => { setProvince(null); setOpenProvince(false); }}
                        >
                          Tất cả tỉnh/thành
                        </CommandItem>
                        {provinces.map((p) => (
                          <CommandItem
                            key={p.id}
                            value={p.name}
                            onSelect={() => { setProvince(p); setOpenProvince(false); }}
                          >
                            <Check className={cn('mr-2 h-4 w-4', province?.id === p.id ? 'opacity-100' : 'opacity-0')} />
                            {p.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Phường / Xã: chỉ hiện sau khi chọn tỉnh */}
              {province && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-600">Phường / Xã</label>
                  <Popover open={openWard} onOpenChange={setOpenWard}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" className="w-full justify-between font-normal">
                        {ward?.name ?? 'Tất cả phường/xã'}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput placeholder="Tìm phường/xã..." />
                        <CommandEmpty>Không tìm thấy</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value="tat-ca"
                            onSelect={() => { setWard(null); setOpenWard(false); }}
                          >
                            Tất cả phường/xã
                          </CommandItem>
                          {wards.map((w) => (
                            <CommandItem
                              key={w.id}
                              value={w.name}
                              onSelect={() => { setWard(w); setOpenWard(false); }}
                            >
                              <Check className={cn('mr-2 h-4 w-4', ward?.id === w.id ? 'opacity-100' : 'opacity-0')} />
                              {w.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {geoError && <p className="text-xs text-red-500">{geoError}</p>}
            </div>
          </div>

          {/* Nút tìm ngành */}
          {selectedSubjects.length > 0 && !canSubmit && (
            <p className="text-xs text-amber-600">
              {selectedSubjects.length < 3
                ? 'Chọn ít nhất 3 môn để hệ thống ghép được tổ hợp xét tuyển.'
                : `Còn ${missingCodes.length} môn chưa nhập điểm.`}
            </p>
          )}
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !canSubmit}
            className="w-full py-5 font-bold bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang tìm ngành...
              </span>
            ) : (
              'Tìm ngành phù hợp »'
            )}
          </Button>

          {/* Lỗi */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* ── KẾT QUẢ ────────────────────────────────────────── */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              Danh sách ngành phù hợp
              {results.length > 0 && (
                <span className="ml-2 text-blue-600">({results.length})</span>
              )}
            </h2>
            {recommendationResult && (
              <span className="text-xs text-gray-400 font-mono">
                Tổng ứng viên: {recommendationResult.totalCandidates}
              </span>
            )}
          </div>

          {/* Trạng thái chờ */}
          {!recommendationResult && !isLoading && (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
              <div className="text-gray-300 text-5xl mb-3">🎯</div>
              <h3 className="text-base font-semibold text-gray-600">
                Chọn môn học và nhập điểm để bắt đầu
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Hệ thống sẽ gợi ý ngành phù hợp nhất với bạn
              </p>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto mb-3" />
              <p className="text-sm text-gray-500">
                Đang phân tích hồ sơ của bạn...
              </p>
            </div>
          )}

          {/* Không có kết quả */}
          {recommendationResult && results.length === 0 && (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
              <div className="text-gray-400 text-4xl mb-2">⚠️</div>
              <h3 className="text-base font-semibold text-gray-700">
                Không tìm thấy ngành phù hợp
              </h3>
              <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                Điểm hiện tại chưa đủ điểm chuẩn hoặc chưa nhập đủ môn.
                Vui lòng điều chỉnh lại.
              </p>
            </div>
          )}

          {/* Danh sách kết quả */}
          {results.length > 0 && (
            <div className="space-y-3">
              {results.map((item, idx) => (
                <MajorCard key={`major-${item.major_id ?? item.major_code}-${idx}`} item={item} index={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}