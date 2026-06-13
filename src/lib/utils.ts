import { Major } from "@/data/Major";
import { HollandResult, RIASE_RESULT } from "@/data/RIASEC";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// =========================
// CAREER MATCHING ENGINE
// =========================
export function getIndustriesWithScore(topCode: string) {
  const MAX_DISTANCE = 9;
  return RIASE_RESULT.map((item) => {
    const a = topCode.split('');
    const b = item.code.split('');

    let distance = 0;

    a.forEach((char, i) => {
      const j = b.indexOf(char);

      if (j === -1) {
        distance += 3;
      } else {
        distance += Math.abs(i - j);
      }
    });

    const matchPercent = Math.max(
      0,
      (1 - distance / MAX_DISTANCE) * 100
    );

    return {
      ...item,
      distance: distance,
      matchPercent: matchPercent,
    };
  })
    .filter((i) => i.matchPercent > 0)
    .sort((a, b) => b.matchPercent - a.matchPercent);
}

// =========================
// CAREER MATCHING ENGINE
// =========================
export function getMajorResult(topCode: string, majorData: Major[]) {
  const result: HollandResult[] = [];
  const industriesWithScore = getIndustriesWithScore(topCode);

  majorData.forEach(element => {
    result.push({
      code: element.code,
      matchPercent: industriesWithScore.find(item => item.code === element.riasec_code)?.matchPercent ?? 0
    })
  });

  return result;
}

