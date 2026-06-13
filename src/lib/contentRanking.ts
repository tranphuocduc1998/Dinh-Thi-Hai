import { RankedMajorResult } from "@/lib/coreEngineHandle";

// ============================================================
// TẦNG 3: CONTENT-BASED RANKING ENGINE
// Đầu vào: toàn bộ filteredAndRankedMajors từ tầng 2
// Đầu ra: danh sách ngành được xếp hạng lại theo CBScore,
//         kèm giải thích chi tiết từng chiều
// ============================================================

// Trọng số tầng 3 — cố định, không để user chỉnh
// Tổng = 1.0
const W_RIASEC   = 0.40; // Mức độ khớp tính cách Holland
const W_SUBJECT  = 0.25; // Năng lực môn học theo tổ hợp tốt nhất
const W_SAFETY   = 0.25; // Biên an toàn điểm chuẩn
const W_GEO      = 0.10; // Ưu tiên địa lý

// ============================================================
// KIỂU DỮ LIỆU ĐẦU RA TẦNG 3
// ============================================================

export interface CBDimension {
  label: string;       // Tên chiều để hiển thị UI
  score: number;       // Điểm thành phần [0, 1]
  weight: number;      // Trọng số
  contribution: number; // score × weight — đóng góp thực vào CBScore
  explanation: string; // Câu giải thích ngắn cho học sinh
}

export interface ContentRankedMajor {
  // Thông tin ngành (giữ nguyên từ tầng 2)
  majorCode: string;
  majorName: string;

  // Điểm tổng hợp tầng 3
  cbScore: number;         // [0, 1] — điểm content-based cuối cùng
  cbScorePercent: number;  // cbScore * 100 để hiển thị %

  // Chi tiết từng chiều
  dimensions: CBDimension[];

  // Nhãn xếp hạng
  rank: number;            // 1 = tốt nhất
  tier: "Rất phù hợp" | "Phù hợp" | "Có thể cân nhắc";

  // Lý do gợi ý — câu tổng hợp cho học sinh
  primaryReason: string;
  secondaryReasons: string[];

  // Giữ lại bestPaths từ tầng 2 để hiển thị chi tiết trường
  bestPaths: RankedMajorResult["bestPaths"];
}

// ============================================================
// HÀM PHỤ TRỢ
// ============================================================

function getTier(score: number): ContentRankedMajor["tier"] {
  if (score >= 0.72) return "Rất phù hợp";
  if (score >= 0.50) return "Phù hợp";
  return "Có thể cân nhắc";
}

function buildPrimaryReason(dims: CBDimension[], majorName: string): string {
  // Tìm chiều đóng góp nhiều nhất
  const top = [...dims].sort((a, b) => b.contribution - a.contribution)[0];

  const reasonMap: Record<string, string> = {
    "Định hướng nghề nghiệp": `Ngành ${majorName} phù hợp sâu với kiểu tư duy và sở thích nghề nghiệp của bạn`,
    "Năng lực học tập":       `Điểm các môn tổ hợp của bạn cho thấy thế mạnh rõ ràng cho ngành ${majorName}`,
    "Biên an toàn":           `Điểm của bạn vượt điểm chuẩn ngành ${majorName} ở mức đáng tin cậy`,
    "Ưu tiên địa lý":         `Ngành ${majorName} có trường đào tạo tại khu vực bạn mong muốn`,
  };

  return reasonMap[top.label] || `Ngành ${majorName} phù hợp tổng thể với hồ sơ của bạn`;
}

function buildSecondaryReasons(dims: CBDimension[]): string[] {
  return dims
    .filter(d => d.contribution >= 0.05) // Chỉ lấy chiều đóng góp đáng kể
    .sort((a, b) => b.contribution - a.contribution)
    .slice(1, 3) // Top 2 sau chiều đầu
    .map(d => d.explanation);
}

// ============================================================
// CORE ENGINE: CONTENT-BASED RANKING
// ============================================================

export function computeContentBasedRanking(
  tier2Results: RankedMajorResult[]
): ContentRankedMajor[] {

  if (tier2Results.length === 0) return [];

  // --- Bước 1: Tính CBScore cho từng ngành ---
  const scored = tier2Results.map((major) => {

    const bestPath = major.bestPaths[0];

    // Lấy breakdown từ tầng 2 nếu có, fallback về 0
    const t2breakdown = bestPath?.explanation?.breakdown ?? {
      riasec: 0,
      subject: 0,
      safety: 0,
      geo: 0,
    };

    // --- Chiều 1: RIASEC ---
    // Dùng riasecScore (%) từ tầng 2 — đã normalize về [0,1]
    const riasecNorm = (major.riasecScore ?? 0) / 100;

    // --- Chiều 2: Subject ---
    // Dùng subject score từ breakdown tầng 2 (đã [0,1])
    const subjectNorm = t2breakdown.subject ?? 0;

    // --- Chiều 3: Safety ---
    // Dùng safety score từ breakdown tầng 2 (đã [0,1])
    const safetyNorm = t2breakdown.safety ?? 0;

    // --- Chiều 4: Geo ---
    // Dùng geo bonus từ breakdown tầng 2 (0 | 0.5 | 1.0)
    const geoNorm = t2breakdown.geo ?? 0;

    // --- Tổng hợp CBScore ---
    const cbScore =
      W_RIASEC  * riasecNorm  +
      W_SUBJECT * subjectNorm +
      W_SAFETY  * safetyNorm  +
      W_GEO     * geoNorm;

    // --- Build dimensions cho UI ---
    const dimensions: CBDimension[] = [
      {
        label: "Định hướng nghề nghiệp",
        score: riasecNorm,
        weight: W_RIASEC,
        contribution: W_RIASEC * riasecNorm,
        explanation: riasecNorm >= 0.7
          ? `Ngành này khớp ${Math.round(riasecNorm * 100)}% với mã Holland của bạn — mức phù hợp cao`
          : `Ngành này khớp ${Math.round(riasecNorm * 100)}% với định hướng nghề nghiệp của bạn`,
      },
      {
        label: "Năng lực học tập",
        score: subjectNorm,
        weight: W_SUBJECT,
        contribution: W_SUBJECT * subjectNorm,
        explanation: subjectNorm >= 0.75
          ? `Điểm tổ hợp tốt nhất của bạn ở mức cao so với yêu cầu ngành`
          : `Điểm tổ hợp đáp ứng yêu cầu cơ bản của ngành`,
      },
      {
        label: "Biên an toàn",
        score: safetyNorm,
        weight: W_SAFETY,
        contribution: W_SAFETY * safetyNorm,
        explanation: safetyNorm >= 0.6
          ? `Điểm của bạn vượt điểm chuẩn với biên an toàn đủ để tự tin đăng ký`
          : `Điểm của bạn vừa đủ điểm chuẩn — cần cân nhắc kỹ khi đăng ký`,
      },
      {
        label: "Ưu tiên địa lý",
        score: geoNorm,
        weight: W_GEO,
        contribution: W_GEO * geoNorm,
        explanation: geoNorm > 0
          ? `Có trường đào tạo ngành này tại khu vực bạn ưu tiên`
          : `Không có ràng buộc địa lý hoặc không khớp khu vực ưu tiên`,
      },
    ];

    return {
      major,
      cbScore: Math.min(cbScore, 1), // clamp [0,1]
      dimensions,
    };
  });

  // --- Bước 2: Sort theo CBScore giảm dần ---
  scored.sort((a, b) => b.cbScore - a.cbScore);

  // --- Bước 3: Gán rank và build output ---
  return scored.map(({ major, cbScore, dimensions }, idx) => {
    const rank = idx + 1;
    const primaryReason = buildPrimaryReason(dimensions, major.majorName || major.majorCode);
    const secondaryReasons = buildSecondaryReasons(dimensions);

    return {
      majorCode: major.majorCode,
      majorName: major.majorName || major.majorCode,
      cbScore,
      cbScorePercent: Math.round(cbScore * 100),
      dimensions,
      rank,
      tier: getTier(cbScore),
      primaryReason,
      secondaryReasons,
      bestPaths: major.bestPaths,
    } satisfies ContentRankedMajor;
  });
}
