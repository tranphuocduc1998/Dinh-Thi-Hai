'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// ============================================================
// KIỂU DỮ LIỆU — khớp với response đã được map sang camelCase
// ============================================================

export interface HollandResult {
  topCode: string;
  rawScores: Record<string, number>;
  coreScores: Record<string, number>;
  rank: [string, number][];
}

export interface StudentProfile {
  subjectScores: Record<string, number>; // key: subject_code (MATH, PHYSICS...)
  provinceId: string | null;
  districtId: string | null;
  admissionYear: number;
}

export interface AdmissionPath {
  institution_id: string;
  institution_name: string;
  campus_id: string;
  combination_code: string;
  student_score: number;
  cutoff_score: number;
  safety_margin: number;
}

export interface DimensionBreakdown {
  label: string;
  score: number;
  weight: number;
  contribution: number;
  explanation: string;
}

export interface MajorRecommendation {
  major_id: string;
  major_code: string;
  major_name_vi: string;
  major_name_en: string | null;
  field_name_vi: string;
  group_name_vi: string;
  final_score: number;
  riasec_match_percent: number;
  best_paths: AdmissionPath[];
  dimensions: DimensionBreakdown[] | null;
  primary_reason: string | null;
}

export interface RecommendationResponse {
  baseline: string;
  riasecCode: string;
  totalCandidates: number;
  results: MajorRecommendation[];
}

export type BaselineType =
  | 'random'
  | 'content_based'
  | 'hybrid_fixed'
  | 'proposed';

// Tỉnh/phường đang chọn ở form (cùng hình dạng với GeoUnit của API client)
export interface GeoSelection {
  id: string;
  name: string;
}

// Bản nháp của form ở trang knowledge-filter: được lưu để F5 không mất
export interface FilterDraft {
  selectedSubjects: string[];
  scores: Record<string, number>; // chỉ chứa môn ĐÃ nhập điểm
  province: GeoSelection | null;
  ward: GeoSelection | null;
}

const initialFilterDraft: FilterDraft = {
  selectedSubjects: [],
  scores: {},
  province: null,
  ward: null,
};

const initialStudentProfile: StudentProfile = {
  subjectScores: {},
  provinceId: null,
  districtId: null,
  admissionYear: 2026,
};

// ============================================================
// CẤU HÌNH LƯU TRỮ
// ============================================================

const STORAGE_KEY = 'career-advisor-session';
const STORAGE_VERSION = 1; // Tăng số này khi đổi cấu trúc dữ liệu → dữ liệu cũ tự bị bỏ

// Dữ liệu quá hạn sẽ bị bỏ. Máy dùng chung (phòng tin học) nên không giữ vô thời hạn.
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 ngày

// ============================================================
// STORE
// ============================================================

interface AdvisorState {
  // Tầng 1
  hollandResult: HollandResult | null;
  setHollandResult: (result: HollandResult) => void;

  // Tầng 2
  studentProfile: StudentProfile;
  setSubjectScores: (scores: Record<string, number>) => void;
  setGeoFilter: (provinceId: string | null, districtId: string | null) => void;
  setAdmissionYear: (year: number) => void;

  // Bản nháp form (được lưu)
  filterDraft: FilterDraft;
  updateFilterDraft: (patch: Partial<FilterDraft>) => void;
  toggleSubject: (code: string) => void;
  setScore: (code: string, value: number | null) => void;

  // Baseline
  selectedBaseline: BaselineType;
  setSelectedBaseline: (baseline: BaselineType) => void;

  // Kết quả API
  recommendationResult: RecommendationResponse | null;
  isLoading: boolean; // chỉ tồn tại trong phiên, không lưu
  error: string | null; // chỉ tồn tại trong phiên, không lưu
  setRecommendationResult: (result: RecommendationResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Tiến trình
  currentStep: 1 | 2 | 3;
  setCurrentStep: (step: 1 | 2 | 3) => void;

  // Xoá toàn bộ để làm lại
  resetAll: () => void;
}

export const useAdvisorStore = create<AdvisorState>()(
  persist(
    (set) => ({
      // Tầng 1
      hollandResult: null,
      setHollandResult: (result) =>
        set({
          hollandResult: result,
          recommendationResult: null, // làm lại test thì kết quả cũ không còn đúng
          currentStep: 2,
        }),

      // Tầng 2
      studentProfile: initialStudentProfile,
      setSubjectScores: (scores) =>
        set((state) => ({
          studentProfile: { ...state.studentProfile, subjectScores: scores },
        })),
      setGeoFilter: (provinceId, districtId) =>
        set((state) => ({
          studentProfile: { ...state.studentProfile, provinceId, districtId },
        })),
      setAdmissionYear: (year) =>
        set((state) => ({
          studentProfile: { ...state.studentProfile, admissionYear: year },
        })),

      // Bản nháp form
      filterDraft: initialFilterDraft,
      updateFilterDraft: (patch) =>
        set((state) => ({ filterDraft: { ...state.filterDraft, ...patch } })),

      toggleSubject: (code) =>
        set((state) => {
          const { selectedSubjects, scores } = state.filterDraft;

          if (selectedSubjects.includes(code)) {
            const nextScores = { ...scores };
            delete nextScores[code];
            return {
              filterDraft: {
                ...state.filterDraft,
                selectedSubjects: selectedSubjects.filter((c) => c !== code),
                scores: nextScores,
              },
            };
          }

          return {
            filterDraft: {
              ...state.filterDraft,
              selectedSubjects: [...selectedSubjects, code],
            },
          };
        }),

      setScore: (code, value) =>
        set((state) => {
          const nextScores = { ...state.filterDraft.scores };
          if (value === null) delete nextScores[code];
          else nextScores[code] = value;
          return { filterDraft: { ...state.filterDraft, scores: nextScores } };
        }),

      // Baseline
      selectedBaseline: 'proposed',
      setSelectedBaseline: (baseline) => set({ selectedBaseline: baseline }),

      // Kết quả API
      recommendationResult: null,
      isLoading: false,
      error: null,
      setRecommendationResult: (result) =>
        set({
          recommendationResult: result,
          currentStep: 3,
          isLoading: false,
          error: null,
        }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error, isLoading: false }),

      // Tiến trình
      currentStep: 1,
      setCurrentStep: (step) => set({ currentStep: step }),

      // Reset
      resetAll: () =>
        set({
          hollandResult: null,
          studentProfile: initialStudentProfile,
          filterDraft: initialFilterDraft,
          recommendationResult: null,
          isLoading: false,
          error: null,
          currentStep: 1,
          selectedBaseline: 'proposed',
        }),
    }),
    {
      name: STORAGE_KEY,
      version: STORAGE_VERSION,
      storage: createJSONStorage(() => localStorage),

      // Không tự khôi phục lúc tạo store: tránh lệch HTML giữa server và client của Next.js.
      // Việc khôi phục do hook useStoreHydrated() thực hiện sau khi trang đã mount.
      skipHydration: true,

      // Chỉ lưu dữ liệu cần giữ. Trạng thái tải/lỗi là tạm thời nên không lưu.
      partialize: (state) => ({
        hollandResult: state.hollandResult,
        studentProfile: state.studentProfile,
        filterDraft: state.filterDraft,
        selectedBaseline: state.selectedBaseline,
        recommendationResult: state.recommendationResult,
        currentStep: state.currentStep,
        savedAt: Date.now(),
      }),

      // Bỏ dữ liệu quá hạn hoặc không có dấu thời gian
      merge: (persisted, current) => {
        const saved = persisted as { savedAt?: number } | undefined;
        if (!saved?.savedAt || Date.now() - saved.savedAt > MAX_AGE_MS) {
          return current;
        }
        return { ...current, ...saved } as AdvisorState;
      },
    }
  )
);

// ============================================================
// HOOK: chờ khôi phục dữ liệu đã lưu
// Trang phải chờ hook này trả về true rồi mới quyết định "chưa có dữ liệu".
// Nếu không, lần render đầu tiên luôn thấy store rỗng.
// ============================================================

export function useStoreHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Đã khôi phục ở trang trước trong cùng phiên
    if (useAdvisorStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }

    let active = true;

    // .finally để dù localStorage hỏng hay dữ liệu lỗi, trang vẫn thoát trạng thái chờ
    Promise.resolve(useAdvisorStore.persist.rehydrate()).finally(() => {
      if (active) setHydrated(true);
    });

    return () => {
      active = false;
    };
  }, []);

  return hydrated;
}
