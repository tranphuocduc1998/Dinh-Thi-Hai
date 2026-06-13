'use client';

import { clip, GeoFilter, processKnowledgeBasedFilter } from "@/lib/coreEngineHandle";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from 'react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { ContentRankingSection } from '@/components/custom/ContentRankingSection';

import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { cn, getMajorResult } from "@/lib/utils";
import { universitiesData } from "@/data/University";

import { getIndustriesWithScore } from '@/lib/utils';
import { subjectCombinationsData } from "@/data/SubjectCombination";
import { admissions } from "@/data/Admission";
import { majorData } from "@/data/Major";
import { SubjectData } from "@/data/Subject";

export default function HollandTestPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [topCode, setTopCode] = useState<string>("");
    const [rawScores, setRawScores] = useState<Record<string, number>>({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });

    // Danh sách các môn học học sinh kích hoạt để nhập điểm
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [open, setOpen] = useState(false);

    // Trong knowledge-filter page
    useEffect(() => {
        const stored = sessionStorage.getItem('hollandResult');
        if (!stored) { router.push('/holland-test'); return; }
        const data = JSON.parse(stored);
        setTopCode(data.topCode);
        setRawScores(data.rawScores); // dùng cho FinalScore tầng 3
    }, []);


    // --- CÁC HÀM XỬ LÝ SỰ KIỆN GIAO DIỆN ---
    const handleSubjectToggle = (subject: string) => {
        if (selectedSubjects.includes(subject)) {
            setSelectedSubjects(selectedSubjects.filter(s => s !== subject));

            setScores(prev => {
                const newScores = { ...prev };
                delete newScores[subject];
                return newScores;
            });

            return;
        }

        setSelectedSubjects([...selectedSubjects, subject]);

        setScores(prev => ({
            ...prev,
            [subject]: prev[subject] ?? 0,
        }));
    };

    const handleScoreChange = (subject: string, value: string) => {
        const numScore = parseFloat(value);
        if (isNaN(numScore)) return;
        setScores({
            ...scores,
            [subject]: clip(numScore, 0, 10) // Khống chế điểm số trong thang điểm 10 điểm trường học
        });
    };

    const [geoFilter, setGeoFilter] = useState<GeoFilter>({
        province: "",
        ward: ""
    });

    const cities = useMemo(() => {
        return Array.from(new Set(universitiesData.map(u => u.province)));
    }, [universitiesData]);

    const wards = useMemo(() => {
        if (!geoFilter.province) return [];

        return Array.from(
            new Set(
                universitiesData
                    .filter(u => u.province === geoFilter.province)
                    .map(u => u.ward)
            )
        );
    }, [universitiesData, geoFilter.province]);

    const handleCityChange = (city: string) => {
        if (geoFilter.province === city) {
            setGeoFilter({ province: "", ward: "" });
        } else {
            setGeoFilter({ province: city, ward: "" });
        }
    };

    const filteredUniversities = useMemo(() => {
        return universitiesData.filter(u => {
            const matchCity = geoFilter.province ? u.province === geoFilter.province : true;
            const matchWard = geoFilter.ward ? u.ward === geoFilter.ward : true;

            return matchCity && matchWard;
        });
    }, [universitiesData, geoFilter.province, geoFilter.ward]);


    // =========================
    // CAREER MATCHING ENGINE
    // =========================
    const industriesWithScore = getMajorResult(topCode, majorData);

    // --- TÍNH TOÁN REAL-TIME KHI STATE THAY ĐỔI ---
    const filteredAndRankedMajors = useMemo(() => {
        // Chỉ truyền đi điểm của các môn đang được bật tích chọn ở UI
        const activeScores: Record<string, number> = {};
        selectedSubjects.forEach(sub => {
            if (scores[sub] !== undefined) {
                activeScores[sub] = scores[sub];
            }
        });

        return processKnowledgeBasedFilter({
            studentScores: activeScores,
            hollandResult: industriesWithScore,
            geoFilter,
            universities: universitiesData,
            combinations: subjectCombinationsData,
            rawAdmissionData: admissions
        });
    }, [scores, selectedSubjects, geoFilter, industriesWithScore, universitiesData, subjectCombinationsData, admissions]);

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6 font-sans">
            {/* Header của Dashboard */}
            <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800">Tầng 2: Hệ Thống Sàng Lọc Tri Thức & Định Tuyến Xét Tuyển</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Chuyển đổi mô hình định hướng từ cấp "Ngành phù hợp" sang <span className="font-semibold text-blue-600">"Đường xét tuyển tối ưu (Admission Path)"</span> qua bộ lọc cứng và cơ chế chấm điểm đa mục tiêu thực tế.
                </p>
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs bg-purple-100 text-purple-800 font-medium px-2.5 py-0.5 rounded">
                        Mã Holland của bạn: {topCode}
                    </span>
                </div>
            </div>

            {/* Thân chính cấu trúc dạng Sidebar - Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* ================= BAR CẤU HÌNH BÊN TRÁI ================= */}
                <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit space-y-6">
                    {/* Tiểu mục 1: Lựa chọn môn học động */}
                    <div>
                        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                            1. Chọn môn học bạn có điểm
                        </h2>

                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className="w-full justify-between"
                                >
                                    Chọn môn học...
                                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Tìm môn học..." />
                                    <CommandEmpty>Không tìm thấy môn</CommandEmpty>

                                    <CommandGroup>
                                        {SubjectData.map((subject) => {
                                            const isSelected = selectedSubjects.includes(subject);

                                            return (
                                                <CommandItem
                                                    key={subject}
                                                    onSelect={() => handleSubjectToggle(subject)}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            isSelected ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {subject}
                                                </CommandItem>
                                            );
                                        })}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    {/* Tiểu mục 2: Nhập điểm số động */}
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
                                        <th className="p-3 text-right">Hành động</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {selectedSubjects.map((subject) => (
                                        <tr key={subject} className="border-t">
                                            <td className="p-3 font-medium">{subject}</td>

                                            <td className="p-3">
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="10"
                                                    value={scores[subject] ?? ""}
                                                    onChange={(e) => handleScoreChange(subject, e.target.value)}
                                                    className="w-24 px-2 py-1 border rounded"
                                                />
                                            </td>

                                            <td className="p-3 text-right">
                                                <button
                                                    onClick={() => handleSubjectToggle(subject)}
                                                    className="text-red-500 hover:underline text-xs"
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Tiểu mục 3: Bộ lọc ràng buộc địa lý */}
                    <div>
                        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">3. Ràng buộc địa lý (Tùy chọn)</h2>
                        <div className="space-y-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-600">Tỉnh / Thành Phố</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between">
                                            {geoFilter.province || "Chọn tỉnh / thành"}
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="p-0">
                                        <Command>
                                            <CommandInput placeholder="Tìm tỉnh..." />

                                            <CommandGroup>
                                                {cities.map((city) => (
                                                    <CommandItem
                                                        key={city}
                                                        onSelect={() => handleCityChange(city)}
                                                    >
                                                        {city}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {geoFilter.province && (
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-gray-600">Phường/Xã</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-between">
                                                {geoFilter.ward || "Chọn Phường/Xã"}
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Tìm quận/huyện..." />

                                                <CommandGroup>
                                                    {wards.map((ward) => (
                                                        <CommandItem
                                                            key={ward}
                                                            onSelect={() => setGeoFilter({ ...geoFilter, ward: ward || "" })}
                                                        >
                                                            {ward}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ================= BẢNG HIỂN THỊ KẾT QUẢ BÊN PHẢI TẦNG 3 (CONTENT-BASE) (REAL-TIME) ================= */}
                <div className="lg:col-span-8 space-y-4">
                    {filteredAndRankedMajors.length === 0 ? (
                        <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
                            <div className="text-gray-400 text-4xl mb-2">⚠️</div>
                            <h3 className="text-base font-semibold text-gray-700">Không tìm thấy ngành nào phù hợp</h3>
                            <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                                Lý do có thể do tổng điểm tổ hợp hiện tại của bạn thấp hơn điểm chuẩn của các trường, hoặc không khớp địa lý hay mã nhóm ngành RIASEC. Vui lòng điều chỉnh lại thanh điểm hoặc bộ lọc bên trái.
                            </p>
                        </div>
                    ) : <ContentRankingSection
                        tier2Results={filteredAndRankedMajors}
                        riasecCode={topCode}
                    />
                    }
                </div>
            </div>
        </div>
    );
}