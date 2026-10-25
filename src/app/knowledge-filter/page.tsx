'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, ChevronDown, Loader2, RotateCcw } from 'lucide-react';

import {
  useAdvisorStore,
  useStoreHydrated,
  type MajorRecommendation,
} from '@/store/useAdvisorStore';
import {
  fetchProvinces,
  fetchRecommendation,
  fetchWards,
  type GeoUnit,
} from '@/lib/api/advisor';
import { BaselineSelector } from '@/components/BaselineSelector';
import { NoHollandResult } from '@/components/NoHollandResult';
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

// Máy chủ miễn phí có thể mất ~30 giây để khởi động lại; sau ngần này giây thì báo cho người dùng
const SLOW_LOADING_HINT_MS = 6000;

// ============================================================
// SUB-COMPONENT: THẺ NGÀNH
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

        <div className="flex flex-col items-end flex-shrink-0">
          <span className="text-xs text-gray-400">Điểm phù hợp</span>
          <span className="text-2xl font-black text-blue-600 font-mono">
            {(item.final_score * 100).toFixed(1)}%
          </span>
          <span className="text-[11px] text-gray-400">
            Holland: {item.riasec_match_percent.toFixed(1)}%
          </span>
        </div>
      </div>

      {item.primary_reason && (
        <p className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
          {item.primary_reason}
        </p>
      )}

      {bestPath && (
        <div className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
          <p className="text-sm font-semibold text-slate-700">
            {bestPath.institution_name}
          </p>
          <div className="flex items-center gap-4 flex-wrap text-xs text-gray-500">
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
              Chuẩn: <b className="font-mono">{bestPath.cutoff_score}</b>
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

      {item.dimensions && item.dimensions.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            {expanded ? 'Ẩn chi tiết ▲' : 'Xem chi tiết đánh giá ▼'}
          </button>

          {expanded && (
            <div className="space-y-2 pt-1">
              {item.dimensions.map((dim) => (
                <div key={dim.label} className="space-y-1">
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
  const hydrated = useStoreHydrated();

  const {
    hollandResult,
    studentProfile,
    filterDraft,
    updateFilterDraft,
    toggleSubject,
    setScore,
    setSubjectScores,
    setGeoFilter,
    recommendationResult,
    setRecommendationResult,
    isLoading,
    setLoading,
    error,
    setError,
    selectedBaseline,
    resetAll,
  } = useAdvisorStore();

  // Môn, điểm, tỉnh, phường đều lấy từ store nên F5 không mất
  const { selectedSubjects, scores, province, ward } = filterDraft;

  // Trạng thái giao diện tạm thời (không cần lưu)
  const [openSubjects, setOpenSubjects] = useState(false);
  const [openProvince, setOpenProvince] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  const [provinces, setProvinces] = useState<GeoUnit[]>([]);
  const [wards, setWards] = useState<GeoUnit[]>([]);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [isSlow, setIsSlow] = useState(false);

  // ── Tải danh sách tỉnh/thành một lần ──────────────────────
  useEffect(() => {
    fetchProvinces()
      .then((data) => {
        setProvinces(data);
        setGeoError(null);
      })
      .catch(() =>
        setGeoError('Không tải được danh sách tỉnh/thành. Bạn có thể bỏ qua mục này.')
      );
  }, []);

  // ── Tải phường/xã mỗi khi tỉnh thay đổi ───────────────────
  // Lưu ý: KHÔNG xoá phường ở đây. Việc xoá phường nằm ở hàm chọn tỉnh,
  // nếu không thì mỗi lần F5 phường đã lưu sẽ bị xoá ngay.
  const provinceId = province?.id ?? null;
  useEffect(() => {
    if (!provinceId) {
      setWards([]);
      return;
    }

    let cancelled = false; // tránh ghi đè khi người dùng đổi tỉnh nhanh
    fetchWards(provinceId)
      .then((data) => {
        if (!cancelled) setWards(data);
      })
      .catch(() => {
        if (!cancelled) setGeoError('Không tải được danh sách phường/xã.');
      });

    return () => {
      cancelled = true;
    };
  }, [provinceId]);

  // ── Nếu chờ lâu, báo người dùng là máy chủ đang khởi động ──
  useEffect(() => {
    if (!isLoading) {
      setIsSlow(false);
      return;
    }
    const timer = setTimeout(() => setIsSlow(true), SLOW_LOADING_HINT_MS);
    return () => clearTimeout(timer);
  }, [isLoading]);

  // ── Điều kiện được phép tìm ngành ─────────────────────────
  const missingCodes = selectedSubjects.filter((c) => scores[c] === undefined);
  const canSubmit = selectedSubjects.length >= 3 && missingCodes.length === 0;

  // ── Gọi API (dùng cho cả nút "Tìm ngành" và "Thử lại") ─────
  const handleSubmit = async () => {
    if (!hollandResult || !canSubmit) return;

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
      setError(
        err instanceof Error ? err.message : 'Có lỗi xảy ra. Vui lòng thử lại.'
      );
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      'Xoá kết quả bài test và toàn bộ điểm đã nhập để làm lại từ đầu?'
    );
    if (!confirmed) return;

    resetAll();
    useAdvisorStore.persist.clearStorage();
    router.push('/holland-test');
  };

  // ============================================================
  // CÁC TRẠNG THÁI TRƯỚC KHI HIỆN FORM
  // ============================================================

  // Đang khôi phục dữ liệu đã lưu: chưa được kết luận "chưa có dữ liệu"
  if (!hydrated) {
    return (
      <div className="w-full min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse space-y-4 max-w-5xl mx-auto">
          <div className="h-24 bg-gray-200 rounded-xl" />
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  // Khôi phục xong mà vẫn không có kết quả test (chưa làm hoặc đã hết hạn)
  if (!hollandResult) {
    return <NoHollandResult />;
  }

  const results = recommendationResult?.results ?? [];

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Tầng 2 & 3: Lọc Ngành & Xếp Hạng Phù Hợp
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Nhập điểm số để hệ thống tìm ngành phù hợp nhất với bạn.
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-gray-500"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Làm lại từ đầu
          </Button>
        </div>

        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="text-xs bg-purple-100 text-purple-800 font-medium px-2.5 py-0.5 rounded">
            Mã Holland: {hollandResult.topCode}
          </span>
          <Link
            href="/holland-test/result"
            className="text-xs text-blue-600 hover:underline"
          >
            Xem lại kết quả Holland
          </Link>
          <span className="text-xs text-gray-400">
            Dữ liệu được lưu tự động trên thiết bị này
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── SIDEBAR ────────────────────────────────────────── */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit space-y-6">
          {/* 1. Chọn môn học */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              1. Chọn môn học có điểm
            </h2>

            <Popover open={openSubjects} onOpenChange={setOpenSubjects}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between font-normal"
                >
                  {selectedSubjects.length > 0
                    ? `Đã chọn ${selectedSubjects.length} môn`
                    : 'Chọn môn học...'}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                  <CommandInput placeholder="Tìm môn học..." />
                  <CommandEmpty>Không tìm thấy môn</CommandEmpty>
                  <CommandGroup>
                    {AVAILABLE_SUBJECTS.map((subject) => {
                      const isSelected = selectedSubjects.includes(subject.code);
                      return (
                        <CommandItem
                          key={`subject-${subject.code}`}
                          value={subject.nameVi}
                          onSelect={() => toggleSubject(subject.code)}
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
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                2. Nhập điểm số
              </h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="p-3">Môn học</th>
                      <th className="p-3">Điểm</th>
                      <th className="p-3 text-right">Bỏ</th>
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
                            {subject?.nameVi ?? code}
                          </td>
                          <td className="p-3">
                            {/* Chỉ hiện sau khi khôi phục xong nên ô nhận đúng điểm đã lưu */}
                            <ScoreInput
                              value={scores[code]}
                              onChange={(v) => setScore(code, v)}
                              label={subject?.nameVi ?? code}
                            />
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => toggleSubject(code)}
                              className="text-red-500 hover:underline text-xs"
                            >
                              Bỏ
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

          {/* 3. Địa điểm học */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              3. Địa điểm học (tùy chọn)
            </h2>

            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">
                  Tỉnh / Thành phố
                </label>
                <Popover open={openProvince} onOpenChange={setOpenProvince}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between font-normal"
                    >
                      {province?.name ?? 'Tất cả tỉnh/thành'}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                    <Command>
                      <CommandInput placeholder="Tìm tỉnh/thành..." />
                      <CommandEmpty>Không tìm thấy</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="tat-ca"
                          onSelect={() => {
                            updateFilterDraft({ province: null, ward: null });
                            setOpenProvince(false);
                          }}
                        >
                          Tất cả tỉnh/thành
                        </CommandItem>
                        {provinces.map((p) => (
                          <CommandItem
                            key={p.id}
                            value={p.name}
                            onSelect={() => {
                              // Đổi tỉnh thì phường cũ không còn hợp lệ
                              updateFilterDraft({ province: p, ward: null });
                              setOpenProvince(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                province?.id === p.id
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {p.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {province && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-600">Phường / Xã</label>
                  <Popover open={openWard} onOpenChange={setOpenWard}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between font-normal"
                      >
                        {ward?.name ?? 'Tất cả phường/xã'}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <Command>
                        <CommandInput placeholder="Tìm phường/xã..." />
                        <CommandEmpty>Không tìm thấy</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value="tat-ca"
                            onSelect={() => {
                              updateFilterDraft({ ward: null });
                              setOpenWard(false);
                            }}
                          >
                            Tất cả phường/xã
                          </CommandItem>
                          {wards.map((w) => (
                            <CommandItem
                              key={w.id}
                              value={w.name}
                              onSelect={() => {
                                updateFilterDraft({ ward: w });
                                setOpenWard(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  ward?.id === w.id
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
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

          {/* Chọn baseline (phục vụ nghiên cứu) */}
          <BaselineSelector />

          {/* Gợi ý vì sao chưa bấm được */}
          {selectedSubjects.length > 0 && !canSubmit && (
            <p className="text-xs text-amber-600">
              {selectedSubjects.length < 3
                ? 'Chọn ít nhất 3 môn để hệ thống ghép được tổ hợp xét tuyển.'
                : `Còn ${missingCodes.length} môn chưa nhập điểm.`}
            </p>
          )}

          <Button
            type="button"
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
        </div>

        {/* ── KẾT QUẢ ────────────────────────────────────────── */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              Danh sách ngành phù hợp
              {results.length > 0 && !isLoading && (
                <span className="ml-2 text-blue-600">({results.length})</span>
              )}
            </h2>
            {recommendationResult && !isLoading && (
              <span className="text-xs text-gray-400 font-mono">
                Tổng ứng viên: {recommendationResult.totalCandidates}
              </span>
            )}
          </div>

          {/* Đang tải */}
          {isLoading && (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto mb-3" />
              <p className="text-sm text-gray-600">
                Đang phân tích hồ sơ của bạn...
              </p>
              {isSlow && (
                <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                  Máy chủ đang khởi động sau một thời gian không dùng, có thể mất
                  khoảng 30 giây. Bạn không cần làm gì, kết quả sẽ tự hiện.
                </p>
              )}
            </div>
          )}

          {/* Lỗi: giữ nguyên dữ liệu đã nhập, cho thử lại ngay */}
          {error && !isLoading && (
            <div className="bg-white p-6 rounded-xl border border-red-200 space-y-3">
              <h3 className="text-base font-semibold text-red-700">
                Chưa lấy được kết quả
              </h3>
              <p className="text-sm text-gray-600">{error}</p>
              <p className="text-xs text-gray-400">
                Điểm và lựa chọn của bạn vẫn được giữ nguyên, không cần nhập lại.
              </p>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                variant="outline"
              >
                Thử lại
              </Button>
            </div>
          )}

          {/* Chưa tìm lần nào */}
          {!recommendationResult && !isLoading && !error && (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
              <h3 className="text-base font-semibold text-gray-600">
                Chọn ít nhất 3 môn và nhập điểm để bắt đầu
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Hệ thống sẽ gợi ý ngành phù hợp nhất với bạn
              </p>
            </div>
          )}

          {/* Có kết quả nhưng rỗng */}
          {recommendationResult &&
            results.length === 0 &&
            !isLoading &&
            !error && (
              <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
                <h3 className="text-base font-semibold text-gray-700">
                  Không tìm thấy ngành phù hợp
                </h3>
                <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                  Điểm hiện tại chưa đủ điểm chuẩn của ngành nào trong dữ liệu,
                  hoặc các môn đã chọn chưa ghép được thành tổ hợp xét tuyển. Hãy
                  thử thêm môn hoặc bỏ bớt bộ lọc địa lý.
                </p>
              </div>
            )}

          {/* Danh sách kết quả */}
          {results.length > 0 && !isLoading && (
            <div className="space-y-3">
              {results.map((item, idx) => (
                <MajorCard key={item.major_id} item={item} index={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
