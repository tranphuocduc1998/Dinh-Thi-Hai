// src/lib/api/advisor.ts
// Tất cả API call của hệ thống tư vấn
// Import và dùng trực tiếp trong các trang

import { apiClient } from './client';
import type { RecommendationResponse } from '@/store/useAdvisorStore';

// ============================================================
// REQUEST TYPES — khớp với FastAPI schema
// ============================================================

interface HybridRequest {
  top_code: string;
  student_scores: Record<string, number>;
  admission_year: number;
  top_n: number;
  province_id?: string | null;
  district_id?: string | null;
}

interface RandomRequest {
  admission_year: number;
  top_n: number;
  province_id?: string | null;
  district_id?: string | null;
}

interface ContentBasedRequest {
  top_code: string;
  admission_year: number;
  top_n: number;
  province_id?: string | null;
  district_id?: string | null;
}

// ============================================================
// API FUNCTIONS
// ============================================================

// Baseline 1 — Random
export async function fetchBaseline1(
  params: RandomRequest
): Promise<RecommendationResponse> {
  const query = new URLSearchParams({
    admission_year: String(params.admission_year),
    top_n: String(params.top_n),
    ...(params.province_id ? { province_id: params.province_id } : {}),
    ...(params.district_id ? { district_id: params.district_id } : {}),
  });

  return apiClient.get<RecommendationResponse>(
    `/api/v1/baseline1/recommend?${query}`
  );
}

// Baseline 2 — Content-Based
export async function fetchBaseline2(
  params: ContentBasedRequest
): Promise<RecommendationResponse> {
  const query = new URLSearchParams({
    top_code: params.top_code,
    admission_year: String(params.admission_year),
    top_n: String(params.top_n),
    ...(params.province_id ? { province_id: params.province_id } : {}),
    ...(params.district_id ? { district_id: params.district_id } : {}),
  });

  return apiClient.get<RecommendationResponse>(
    `/api/v1/baseline2/recommend?${query}`
  );
}

// Baseline 3 — Hybrid Fixed
export async function fetchBaseline3(
  params: HybridRequest
): Promise<RecommendationResponse> {
  return apiClient.post<RecommendationResponse>(
    '/api/v1/baseline3/recommend',
    params
  );
}

// Baseline 4 — Proposed Method (mặc định)
export async function fetchBaseline4(
  params: HybridRequest
): Promise<RecommendationResponse> {
  return apiClient.post<RecommendationResponse>(
    '/api/v1/baseline4/recommend',
    params
  );
}

// ============================================================
// UNIFIED FETCHER — dùng trong knowledge-filter
// Tự động chọn đúng API theo baseline đang chọn
// ============================================================

import type { BaselineType } from '@/store/useAdvisorStore';

interface UnifiedRequest {
  baseline: BaselineType;
  topCode: string;
  studentScores: Record<string, number>;
  admissionYear: number;
  topN: number;
  provinceId: string | null;
  districtId: string | null;
}

export async function fetchRecommendation(
  req: UnifiedRequest
): Promise<RecommendationResponse> {  
  const base = {
    admission_year: req.admissionYear,
    top_n: req.topN,
    province_id: req.provinceId,
    district_id: req.districtId,
  };

  const hybrid = {
    ...base,
    top_code: req.topCode,
    student_scores: req.studentScores,
  };

  switch (req.baseline) {
    case 'random':
      return fetchBaseline1(base);

    case 'content_based':
      return fetchBaseline2({ ...base, top_code: req.topCode });

    case 'hybrid_fixed':
      return fetchBaseline3(hybrid);

    case 'proposed':
    default:
      return fetchBaseline4(hybrid);
  }
}

// Health check — dùng để kiểm tra API còn sống không
export async function checkApiHealth(): Promise<boolean> {
  try {
    await apiClient.get('/health');
    return true;
  } catch {
    return false;
  }
}

// ============================================================
// ĐỊA LÝ: danh sách Tỉnh/Thành và Phường/Xã có trường đào tạo
// ============================================================

export interface GeoUnit {
  id: string;
  name: string;
}

export async function fetchProvinces(): Promise<GeoUnit[]> {
  return apiClient.get<GeoUnit[]>('/api/v1/geo/provinces');
}

export async function fetchWards(provinceId: string): Promise<GeoUnit[]> {
  return apiClient.get<GeoUnit[]>(
    `/api/v1/geo/provinces/${provinceId}/wards`
  );
}