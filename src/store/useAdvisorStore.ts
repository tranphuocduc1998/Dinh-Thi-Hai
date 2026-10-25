// src/store/useAdvisorStore.ts

import { create } from 'zustand';

// ============================================================
// KIỂU DỮ LIỆU — Khớp với response schema của FastAPI
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
  setGeoFilter: (
    provinceId: string | null,
    districtId: string | null
  ) => void;
  setAdmissionYear: (year: number) => void;

  // Baseline
  selectedBaseline: BaselineType;
  setSelectedBaseline: (baseline: BaselineType) => void;

  // Kết quả API
  recommendationResult: RecommendationResponse | null;
  isLoading: boolean;
  error: string | null;
  setRecommendationResult: (result: RecommendationResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Tiến trình
  currentStep: 1 | 2 | 3;
  setCurrentStep: (step: 1 | 2 | 3) => void;

  // Reset
  resetAll: () => void;
}

const initialStudentProfile: StudentProfile = {
  subjectScores: {},
  provinceId: null,
  districtId: null,
  admissionYear: 2026,
};

export const useAdvisorStore = create<AdvisorState>((set) => ({
  // Tầng 1
  hollandResult: null,
  setHollandResult: (result) =>
    set({ hollandResult: result, currentStep: 2 }),

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

  // Baseline
  selectedBaseline: 'proposed',
  setSelectedBaseline: (baseline) => set({ selectedBaseline: baseline }),

  // Kết quả API
  recommendationResult: null,
  isLoading: false,
  error: null,
  setRecommendationResult: (result) =>
    set({ recommendationResult: result, currentStep: 3, isLoading: false, error: null }),
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
      recommendationResult: null,
      isLoading: false,
      error: null,
      currentStep: 1,
      selectedBaseline: 'proposed',
    }),
}));