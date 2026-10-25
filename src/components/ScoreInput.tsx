'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const MIN_SCORE = 0;
const MAX_SCORE = 10;

// Cho phép gõ: tối đa 2 chữ số nguyên, dấu "," hoặc ".", tối đa 2 chữ số thập phân.
// Các ký tự khác (chữ, dấu âm, e...) bị chặn ngay khi gõ.
const TYPING_PATTERN = /^\d{0,2}([.,]\d{0,2})?$/;

function parseScore(text: string): number | null {
  const normalized = text.trim().replace(',', '.');
  if (normalized === '' || normalized === '.') return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

// Hiển thị theo thói quen Việt Nam: 8,5
function formatScore(n: number): string {
  return String(n).replace('.', ',');
}

interface ScoreInputProps {
  /** Điểm đã nhập; undefined nghĩa là chưa nhập (ô để trống) */
  value: number | undefined;
  /** Gọi với số hợp lệ (0–10), hoặc null khi ô trống / không hợp lệ */
  onChange: (value: number | null) => void;
  /** Tên môn, dùng cho trình đọc màn hình */
  label: string;
}

export function ScoreInput({ value, onChange, label }: ScoreInputProps) {
  // Chỉ lấy giá trị ban đầu từ props. Sau đó ô tự giữ chuỗi đang gõ,
  // vì "8." hay "8," chưa phải là một số hoàn chỉnh.
  const [text, setText] = useState(value === undefined ? '' : formatScore(value));
  const [outOfRange, setOutOfRange] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (!TYPING_PATTERN.test(next)) return;

    setText(next);
    const n = parseScore(next);

    if (n === null) {
      setOutOfRange(false);
      onChange(null);
      return;
    }

    if (n < MIN_SCORE || n > MAX_SCORE) {
      // Giữ nguyên chữ người dùng gõ để họ tự sửa, nhưng không coi là điểm hợp lệ
      setOutOfRange(true);
      onChange(null);
      return;
    }

    setOutOfRange(false);
    onChange(n);
  };

  // Rời ô: chuẩn hoá cách hiển thị ("8." → "8", "8.50" → "8,5")
  const handleBlur = () => {
    const n = parseScore(text);
    if (n !== null && n >= MIN_SCORE && n <= MAX_SCORE) {
      setText(formatScore(n));
    }
  };

  // Enter: nhảy sang ô điểm kế tiếp; hết ô thì thoát khỏi ô hiện tại
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    const inputs = Array.from(
      document.querySelectorAll<HTMLInputElement>('input[data-score-input]')
    );
    const next = inputs[inputs.indexOf(e.currentTarget) + 1];

    if (next) next.focus();
    else e.currentTarget.blur();
  };

  return (
    <div>
      <input
        data-score-input
        type="text"
        inputMode="decimal"
        autoComplete="off"
        placeholder="0 – 10"
        aria-label={`Điểm môn ${label}`}
        aria-invalid={outOfRange}
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={(e) => e.currentTarget.select()}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-20 px-2 py-1 border rounded text-sm text-center tabular-nums',
          'focus:outline-none focus:ring-2 focus:ring-blue-300',
          outOfRange ? 'border-red-400 bg-red-50' : 'border-slate-300'
        )}
      />
      {outOfRange && (
        <p className="mt-1 text-[11px] text-red-500">Từ 0 đến 10</p>
      )}
    </div>
  );
}
