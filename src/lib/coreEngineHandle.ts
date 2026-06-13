import { Admission } from "@/data/Admission";
import { Major, majorData } from "@/data/Major";
import { HollandResult } from "@/data/RIASEC";
import { SubjectCombination } from "@/data/SubjectCombination";
import { University } from "@/data/University";


// 4. Thực thể cốt lõi của Tầng 2: Admission Path sau khi được phân rã
export interface AdmissionPath {
  schoolCode: string;
  majorCode: string;
  majorName: string;
  comboCode: string;    // Mã một tổ hợp duy nhất (v.d: "A00")
  cutoff: number;
}

// 6. Trạng thái bộ lọc địa lý của học sinh
export interface GeoFilter {
  province: string; // "" nếu không chọn
  ward: string;     // "" nếu không chọn
}

// 7. Thực thể Ngành sau khi được Gom nhóm & Xếp hạng để hiển thị ở UI bên phải
export interface RankedPath {
  schoolCode: string;
  schoolName: string;
  comboCode: string;
  studentScore: number;
  cutoff: number;
  safetyMargin: number;

  finalPathScore: number;

  explanation: {
    summary: string;
    keyReason: string;
    breakdown: {
      riasec: number;
      subject: number;
      safety: number;
      geo: number;
    };
  };
}

export interface RankedMajorResult {
  majorCode: string;
  majorName: string;
  riasecScore: number;

  bestPaths: RankedPath[]; // 🔥 thay vì 1 path

  finalScore: number;
}

const ALPHA = 0.35;
const BETA = 0.25;
const GAMMA = 0.30;
const DELTA = 0.10;
const SAFETY_RANGE = 5;

/**
 * Hàm tiện ích chặn giá trị trong khoảng [min, max]
 */
export const clip = (val: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, val));
};

function buildExplanation(params: {
  schoolCode: string;
  comboCode: string;
  safetyMargin: number;
  strongest: string;
}) {
  const { schoolCode, comboCode, safetyMargin, strongest } = params;

  return `Ngành này phù hợp qua tổ hợp ${comboCode} tại trường ${schoolCode} 
  vì bạn ${safetyMargin >= 0 ? "dư" : "thiếu"} ${Math.abs(safetyMargin).toFixed(1)} điểm. 
  Yếu tố ảnh hưởng mạnh nhất: ${strongest}.`;
}

function getStrongestFactor(input: {
  riasec: number;
  subject: number;
  safety: number;
  geo: number;
}) {
  const entries = Object.entries(input) as [string, number][];

  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

export function getKeyReason(input: {
  riasec: number;
  subject: number;
  safety: number;
  geo: number;
}) {
  const factors = [
    { key: "RIASEC", value: input.riasec },
    { key: "Subject", value: input.subject },
    { key: "Safety", value: input.safety },
    { key: "Geo", value: input.geo }
  ];

  const sorted = [...factors].sort((a, b) => b.value - a.value);

  const top = sorted[0];

  const map = {
    RIASEC: "Phù hợp định hướng nghề nghiệp",
    Subject: "Thế mạnh học tập theo tổ hợp môn",
    Safety: "Dư điểm an toàn vượt chuẩn",
    Geo: "Phù hợp ưu tiên địa lý"
  };

  return {
    key: top.key,
    label: map[top.key as keyof typeof map],
    value: top.value,
    breakdown: factors
  };
}

/**
 * CORE ENGINE: Xử lý bộ lọc tri thức và xếp hạng lai đa mục tiêu
 */
export function processKnowledgeBasedFilter(params: {
  studentScores: Record<string, number>; // key: Tên môn, value: Điểm số
  hollandResult: HollandResult[];
  geoFilter: GeoFilter;
  universities: University[];
  combinations: SubjectCombination[];
  rawAdmissionData: Admission[];
}): RankedMajorResult[] {
  const { studentScores, hollandResult, geoFilter, universities, combinations, rawAdmissionData } = params;

  // Bản đồ hóa danh sách trường để truy xuất nhanh O(1)
  const universityMap = new Map<string, University>();
  universities.forEach(u => universityMap.set(u.code, u));

  // Bước 1: Tính toán điểm cho tất cả các tổ hợp môn khả thi dựa trên điểm học sinh nhập vào
  const calculatedComboScores: Record<string, number> = {};
  combinations.forEach(combo => {
    const [m1, m2, m3] = combo.subjects;
    // Học sinh phải nhập đủ điểm cho cả 3 môn trong tổ hợp thì tổ hợp đó mới hợp lệ
    if (studentScores[m1] !== undefined && studentScores[m2] !== undefined && studentScores[m3] !== undefined) {
      calculatedComboScores[combo.code] = studentScores[m1] + studentScores[m2] + studentScores[m3];
    }
  });

  // Bước 2 & 3: Phân rã dữ liệu thành các Đường xét tuyển (Admission Path) chi tiết
  const allPaths: AdmissionPath[] = [];
  rawAdmissionData.forEach(raw => {
    // Tách chuỗi tổ hợp "A00, A01" thành mảng các mã tổ hợp riêng lẻ
    raw.combinations.forEach(comboCode => {
      allPaths.push({
        schoolCode: raw.schoolCode,
        majorCode: raw.majorCode,
        majorName: raw.majorName,
        comboCode: comboCode,
        cutoff: raw.score
      });
    });
  });

  // Lưu trữ các con đường hợp lệ sau khi chạy qua Bộ lọc cứng (Constraint Satisfaction)
  const eligiblePathsWithScores: Array<{
    path: AdmissionPath;
    studentScore: number;
    riasecMatchPercent: number;
    geoBonus: number;
  }> = [];

  // Bước 4: Kiểm tra điều kiện biên nhị phân (0 hoặc 1) cho từng Path
  allPaths.forEach(path => {
    // Điều kiện cứng 1: Ngành phải thuộc nhóm RIASEC được gợi ý từ Tầng 1
    const matchPercent = hollandResult.find(item => item.code === path.majorCode)?.matchPercent || 0;
    if (matchPercent === 0) return; // ✅ Hard filter: Fail MatchRIASEC

    const riasecScoreNorm = matchPercent / 100;

    // Điều kiện cứng 2: Học sinh phải có điểm của tổ hợp môn xét tuyển này
    const studentComboScore = calculatedComboScores[path.comboCode];
    if (studentComboScore === undefined) return; // Fail MatchCombo

    // Điều kiện cứng 3: Tổng điểm học sinh theo tổ hợp phải >= điểm chuẩn
    if (studentComboScore < path.cutoff) return; // Fail PassCutoff

    // Điều kiện cứng 4: Kiểm tra ràng buộc Địa lý nếu người dùng có cấu hình chọn
    const schoolGeo = universityMap.get(path.schoolCode);
    let geoBonus = 0; // Điểm thưởng dùng cho cấu phần xếp hạng

    if (geoFilter.province) {
      if (!schoolGeo || schoolGeo.province !== geoFilter.province) {
        return; // Fail PassGeo cấp Tỉnh/Thành
      }
      geoBonus = 0.5; // Khớp Tỉnh/Thành được cộng điểm nền địa lý

      if (geoFilter.ward) {
        if (schoolGeo.ward !== geoFilter.ward) {
          return; // Fail PassGeo cấp Phường/Xã nếu có chọn chi tiết
        }
        geoBonus = 1.0; // Khớp tối đa cả Phường/Xã/Quận/Huyện
      }
    }

    // Nếu vượt qua tất cả điều kiện cứng -> Path chính thức Hợp lệ
    eligiblePathsWithScores.push({
      path,
      studentScore: studentComboScore,
      riasecMatchPercent: matchPercent,
      geoBonus
    });
  });

  // Bước 5: Gom nhóm theo Mã Ngành (Group by majorCode) và chọn Con đường tối ưu nhất (Best Path)
  const majorGroupMap = new Map<string, typeof eligiblePathsWithScores>();
  eligiblePathsWithScores.forEach(item => {
    const majorCode = item.path.majorCode;
    if (!majorGroupMap.has(majorCode)) {
      majorGroupMap.set(majorCode, []);
    }
    majorGroupMap.get(majorCode)!.push(item);
  });

  const finalRankedMajors: RankedMajorResult[] = [];

  majorGroupMap.forEach((pathsInMajor, majorCode) => {
    const rankedPaths: RankedPath[] = [];

    let bestMajorScore = 0;

    pathsInMajor.forEach(item => {
      const riasec = item.riasecMatchPercent / 100;
      // Hoặc tách biệt hơn: normalize điểm trong khoảng [cutoff, 30]
      const subject = clip(
        (item.studentScore - item.path.cutoff) / (30 - item.path.cutoff),
        0, 1
      );
      const safety = clip(
        (item.studentScore - item.path.cutoff) / SAFETY_RANGE,
        0,
        1
      );
      const geo = item.geoBonus;

      const finalPathScore =
        ALPHA * riasec +
        BETA * subject +
        GAMMA * safety +
        DELTA * geo;

      const explanationSummary = buildExplanation({
        schoolCode: item.path.schoolCode,
        comboCode: item.path.comboCode,
        safetyMargin: item.studentScore - item.path.cutoff,
        strongest: getStrongestFactor({ riasec, subject, safety, geo })
      });

      const keyReason = getKeyReason({
        riasec,
        subject,
        safety,
        geo
      });

      rankedPaths.push({
        schoolCode: item.path.schoolCode,
        schoolName:
          universityMap.get(item.path.schoolCode)?.name ||
          item.path.schoolCode,

        comboCode: item.path.comboCode,
        studentScore: item.studentScore,
        cutoff: item.path.cutoff,
        safetyMargin: item.studentScore - item.path.cutoff,

        finalPathScore,

        explanation: {
          summary: explanationSummary,
          keyReason: keyReason.label,
          breakdown: {
            riasec,
            subject,
            safety,
            geo
          }
        }
      });

      bestMajorScore = Math.max(bestMajorScore, finalPathScore);
    });

    const avgTop3 = rankedPaths.slice(0, 3)
      .reduce((s, p) => s + p.finalPathScore, 0) / Math.min(rankedPaths.length, 3);

    // Trọng số: 80% path tốt nhất + 20% trung bình top 3
    const finalScore = 0.8 * bestMajorScore + 0.2 * avgTop3;

    // 🔥 sort paths trong ngành
    rankedPaths.sort((a, b) => b.finalPathScore - a.finalPathScore);

    finalRankedMajors.push({
      majorCode,
      majorName: pathsInMajor[0].path.majorName,
      riasecScore: pathsInMajor[0].riasecMatchPercent,

      bestPaths: rankedPaths.slice(0, 3), // 🔥 TOP 3 PATHS

      finalScore: finalScore
    });
  });

  // Bước 6: Xếp hạng toàn bộ danh sách ngành từ cao xuống thấp theo FinalScore
  return finalRankedMajors.sort((a, b) => b.finalScore - a.finalScore);
}

