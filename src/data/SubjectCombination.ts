export interface SubjectCombination {
    code: string;
    subjects: [string, string, string];
}

export const subjectCombinationsData: SubjectCombination[] = [
    { code: "A00", subjects: ["Toán", "Vật lý", "Hóa học"] },
    { code: "A01", subjects: ["Toán", "Vật lý", "Tiếng Anh"] },
    { code: "A02", subjects: ["Toán", "Vật lý", "Sinh học"] },
    { code: "A03", subjects: ["Toán", "Vật lý", "Lịch sử"] },
    { code: "A04", subjects: ["Toán", "Vật lý", "Địa lý"] },
    { code: "A05", subjects: ["Toán", "Hóa học", "Lịch sử"] },
    { code: "A06", subjects: ["Toán", "Hóa học", "Địa lý"] },
    { code: "A07", subjects: ["Toán", "Lịch sử", "Địa lý"] },
    { code: "A08", subjects: ["Toán", "Lịch sử", "Giáo dục KT&PL"] },

    { code: "B00", subjects: ["Toán", "Hóa học", "Sinh học"] },
    { code: "B01", subjects: ["Toán", "Sinh học", "Lịch sử"] },
    { code: "B02", subjects: ["Toán", "Sinh học", "Địa lý"] },
    { code: "B03", subjects: ["Toán", "Ngữ văn", "Sinh học"] },

    { code: "C00", subjects: ["Ngữ văn", "Lịch sử", "Địa lý"] },
    { code: "C01", subjects: ["Toán", "Ngữ văn", "Vật lý"] },
    { code: "C02", subjects: ["Toán", "Ngữ văn", "Hóa học"] },
    { code: "C03", subjects: ["Toán", "Ngữ văn", "Lịch sử"] },
    { code: "C04", subjects: ["Ngữ văn", "Toán", "Địa lý"] },
    { code: "C05", subjects: ["Ngữ văn", "Vật lý", "Hóa học"] },
    { code: "C06", subjects: ["Ngữ văn", "Vật lý", "Sinh học"] },
    { code: "C07", subjects: ["Ngữ văn", "Vật lý", "Lịch sử"] },
    { code: "C08", subjects: ["Ngữ văn", "Hóa học", "Sinh học"] },
    { code: "C09", subjects: ["Ngữ văn", "Vật lý", "Địa lý"] },
    { code: "C10", subjects: ["Ngữ văn", "Hóa học", "Lịch sử"] },
    { code: "C11", subjects: ["Ngữ văn", "Địa lý", "Hóa học"] },
    { code: "C12", subjects: ["Ngữ văn", "Sinh học", "Lịch sử"] },
    { code: "C13", subjects: ["Ngữ văn", "Sinh học", "Địa lý"] },

    { code: "D01", subjects: ["Ngữ văn", "Toán", "Tiếng Anh"] },
    { code: "D02", subjects: ["Ngữ văn", "Toán", "Tiếng Nga"] },
    { code: "D03", subjects: ["Ngữ văn", "Toán", "Tiếng Pháp"] },
    { code: "D04", subjects: ["Ngữ văn", "Toán", "Tiếng Trung"] },
    { code: "D05", subjects: ["Ngữ văn", "Toán", "Tiếng Đức"] },
    { code: "D06", subjects: ["Ngữ văn", "Toán", "Tiếng Nhật"] },

    { code: "D07", subjects: ["Toán", "Hóa học", "Tiếng Anh"] },
    { code: "D08", subjects: ["Toán", "Sinh học", "Tiếng Anh"] },
    { code: "D09", subjects: ["Toán", "Tiếng Anh", "Lịch sử"] },
    { code: "D10", subjects: ["Toán", "Tiếng Anh", "Địa lý"] },

    { code: "D11", subjects: ["Ngữ văn", "Vật lý", "Tiếng Anh"] },
    { code: "D12", subjects: ["Ngữ văn", "Hóa học", "Tiếng Anh"] },
    { code: "D13", subjects: ["Ngữ văn", "Sinh học", "Tiếng Anh"] },
    { code: "D14", subjects: ["Ngữ văn", "Lịch sử", "Tiếng Anh"] },
    { code: "D15", subjects: ["Ngữ văn", "Địa lý", "Tiếng Anh"] },

    { code: "D18", subjects: ["Toán", "Địa lý", "Tiếng Nhật"] },
    { code: "D19", subjects: ["Toán", "Địa lý", "Tiếng Pháp"] },
    { code: "D20", subjects: ["Toán", "Địa lý", "Tiếng Trung"] },

    { code: "D21", subjects: ["Toán", "Hóa học", "Tiếng Đức"] },
    { code: "D22", subjects: ["Toán", "Hóa học", "Tiếng Nga"] },
    { code: "D23", subjects: ["Toán", "Hóa học", "Tiếng Nhật"] },
    { code: "D24", subjects: ["Toán", "Hóa học", "Tiếng Pháp"] },
    { code: "D25", subjects: ["Toán", "Hóa học", "Tiếng Trung"] },

    { code: "D26", subjects: ["Toán", "Vật lý", "Tiếng Đức"] },
    { code: "D27", subjects: ["Toán", "Vật lý", "Tiếng Nga"] },
    { code: "D28", subjects: ["Toán", "Vật lý", "Tiếng Nhật"] },
    { code: "D29", subjects: ["Toán", "Vật lý", "Tiếng Pháp"] },
    { code: "D30", subjects: ["Toán", "Vật lý", "Tiếng Trung"] },

    { code: "D31", subjects: ["Toán", "Sinh học", "Tiếng Đức"] },
    { code: "D32", subjects: ["Toán", "Sinh học", "Tiếng Nga"] },
    { code: "D33", subjects: ["Toán", "Sinh học", "Tiếng Nhật"] },
    { code: "D34", subjects: ["Toán", "Sinh học", "Tiếng Pháp"] },
    { code: "D35", subjects: ["Toán", "Sinh học", "Tiếng Trung"] },

    { code: "D36", subjects: ["Toán", "Lịch sử", "Tiếng Đức"] },
    { code: "D37", subjects: ["Toán", "Lịch sử", "Tiếng Nga"] },
    { code: "D38", subjects: ["Toán", "Lịch sử", "Tiếng Nhật"] },
    { code: "D39", subjects: ["Toán", "Lịch sử", "Tiếng Pháp"] },
    { code: "D40", subjects: ["Toán", "Lịch sử", "Tiếng Trung"] },

    { code: "D41", subjects: ["Ngữ văn", "Địa lý", "Tiếng Đức"] },
    { code: "D42", subjects: ["Ngữ văn", "Địa lý", "Tiếng Nga"] },
    { code: "D43", subjects: ["Ngữ văn", "Địa lý", "Tiếng Nhật"] },
    { code: "D44", subjects: ["Ngữ văn", "Địa lý", "Tiếng Pháp"] },
    { code: "D45", subjects: ["Ngữ văn", "Địa lý", "Tiếng Trung"] },

    { code: "D50", subjects: ["Ngữ văn", "Hóa học", "Tiếng Trung"] },
    { code: "D55", subjects: ["Ngữ văn", "Vật lý", "Tiếng Trung"] },

    { code: "D61", subjects: ["Ngữ văn", "Lịch sử", "Tiếng Đức"] },
    { code: "D63", subjects: ["Ngữ văn", "Lịch sử", "Tiếng Nhật"] },
    { code: "D64", subjects: ["Ngữ văn", "Lịch sử", "Tiếng Pháp"] },
    { code: "D65", subjects: ["Ngữ văn", "Lịch sử", "Tiếng Trung"] },

    { code: "D68", subjects: ["Ngữ văn", "Giáo dục KT&PL", "Tiếng Nga"] },
    { code: "D70", subjects: ["Ngữ văn", "Giáo dục KT&PL", "Tiếng Pháp"] },
    { code: "D71", subjects: ["Ngữ văn", "Giáo dục KT&PL", "Tiếng Đức"] },

    { code: "DD2", subjects: ["Ngữ văn", "Toán", "Tiếng Hàn"] },

    { code: "DH1", subjects: ["Ngữ văn", "Địa lý", "Tiếng Hàn"] },
    { code: "DH2", subjects: ["Ngữ văn", "Hóa học", "Tiếng Hàn"] },
    { code: "DH3", subjects: ["Ngữ văn", "Vật lý", "Tiếng Hàn"] },
    { code: "DH4", subjects: ["Ngữ văn", "Sinh học", "Tiếng Hàn"] },
    { code: "DH5", subjects: ["Ngữ văn", "Lịch sử", "Tiếng Hàn"] },

    { code: "H00", subjects: ["Ngữ văn", "Năng khiếu Vẽ Nghệ thuật 1", "Năng khiếu Vẽ Nghệ thuật 2"] },
    { code: "H01", subjects: ["Toán", "Ngữ văn", "Vẽ Mỹ thuật"] },
    { code: "H02", subjects: ["Toán", "Vẽ Hình họa mỹ thuật", "Vẽ trang trí màu"] },
    { code: "H04", subjects: ["Toán", "Tiếng Anh", "Vẽ Năng khiếu"] },
    { code: "H06", subjects: ["Ngữ văn", "Ngoại ngữ", "Vẽ mỹ thuật"] },
    { code: "H07", subjects: ["Toán", "Vẽ Hình họa", "Vẽ Trang trí"] },
    { code: "H08", subjects: ["Ngữ văn", "Lịch sử", "Vẽ Mỹ thuật"] },
    { code: "H09", subjects: ["Ngữ văn", "Địa lý", "Năng khiếu"] },

    { code: "M00", subjects: ["Ngữ văn", "Toán", "Đọc diễn cảm, Hát"] },
    { code: "M01", subjects: ["Ngữ văn", "Lịch sử", "Năng khiếu"] },
    { code: "M02", subjects: ["Toán", "Năng khiếu 1", "Năng khiếu 2"] },
    { code: "M03", subjects: ["Ngữ văn", "Năng khiếu 1", "Năng khiếu 2"] },
    { code: "M05", subjects: ["Ngữ văn", "Khoa học xã hội", "Năng khiếu"] },
    { code: "M06", subjects: ["Ngữ văn", "Toán", "Năng khiếu Giáo dục mầm non"] },
    { code: "M07", subjects: ["Ngữ văn", "Địa lý", "Năng khiếu đọc diễn cảm và Hát"] },

    { code: "M08", subjects: ["Ngữ văn", "Năng khiếu 1", "Năng Khiếu 2"] },
    { code: "M09", subjects: ["Toán", "NK Mầm non 1( kể chuyện, đọc, diễn cảm)", "NK Mầm non 2 (Hát)"] },
    { code: "M10", subjects: ["Toán", "Tiếng Anh", "Năng khiếu 1"] },
    { code: "M11", subjects: ["Ngữ văn", "Năng khiếu báo chí", "Tiếng Anh"] },
    { code: "M13", subjects: ["Toán", "Sinh học", "Năng khiếu"] },
    { code: "M14", subjects: ["Ngữ văn", "Năng khiếu báo chí", "Toán"] },

    { code: "N00", subjects: ["Ngữ văn", "Năng khiếu Âm nhạc 1", "Năng khiếu Âm nhạc 2"] },
    { code: "N01", subjects: ["Ngữ văn", "Xướng âm", "Biểu diễn nghệ thuật"] },
    { code: "N02", subjects: ["Ngữ văn", "Ký xướng âm", "Hát/Biểu diễn nhạc cụ"] },
    { code: "N05", subjects: ["Ngữ văn", "Xây dựng kịch bản sự kiện", "Năng khiếu"] },

    { code: "S00", subjects: ["Ngữ văn", "Năng khiếu SKĐA 1", "Năng khiếu SKĐA 2"] },

    { code: "T00", subjects: ["Toán", "Sinh học", "Năng khiếu TDTT"] },
    { code: "T01", subjects: ["Toán", "Ngữ văn", "Năng khiếu TDTT"] },
    { code: "T02", subjects: ["Ngữ văn", "Sinh học", "Năng khiếu TDTT"] },
    { code: "T03", subjects: ["Ngữ văn", "Địa lý", "Năng khiếu TDTT"] },
    { code: "T04", subjects: ["Toán", "Vật lý", "Năng khiếu TDTT"] },
    { code: "T06", subjects: ["Toán", "Địa lý", "Năng khiếu TDTT"] },
    { code: "T07", subjects: ["Ngữ văn", "Địa lý", "Năng khiếu TDTT"] },
    { code: "T08", subjects: ["Toán", "Giáo dục KT&PL", "Năng khiếu TDTT"] },
    { code: "T09", subjects: ["Ngữ văn", "Lịch sử", "Năng khiếu TDTT"] },

    { code: "V00", subjects: ["Toán", "Vật lý", "Vẽ Hình họa mỹ thuật"] },
    { code: "V01", subjects: ["Toán", "Ngữ văn", "Vẽ Hình họa mỹ thuật"] },
    { code: "V02", subjects: ["Toán", "Tiếng Anh", "Vẽ Mỹ thuật"] },
    { code: "V03", subjects: ["Toán", "Hóa học", "Vẽ Mỹ thuật"] },
    { code: "V05", subjects: ["Ngữ văn", "Vật lý", "Vẽ Mỹ thuật"] },
    { code: "V06", subjects: ["Toán", "Địa lý", "Vẽ Mỹ thuật"] },
    { code: "V07", subjects: ["Toán", "Tiếng Đức", "Vẽ Mỹ thuật"] },
    { code: "V08", subjects: ["Toán", "Tiếng Nga", "Vẽ Mỹ thuật"] },
    { code: "V09", subjects: ["Toán", "Tiếng Nhật", "Vẽ Mỹ thuật"] },

    { code: "X01", subjects: ["Toán", "Ngữ văn", "Giáo dục KT&PL"] },
    { code: "X02", subjects: ["Toán", "Ngữ văn", "Tin học"] },
    { code: "X03", subjects: ["Toán", "Ngữ văn", "Công nghệ công nghiệp"] },
    { code: "X04", subjects: ["Toán", "Ngữ văn", "Công nghệ nông nghiệp"] },

    { code: "X05", subjects: ["Toán", "Vật lý", "Giáo dục KT&PL"] },
    { code: "X06", subjects: ["Toán", "Vật lý", "Tin học"] },
    { code: "X07", subjects: ["Toán", "Vật lý", "Công nghệ công nghiệp"] },
    { code: "X08", subjects: ["Toán", "Vật lý", "Công nghệ nông nghiệp"] },

    { code: "X09", subjects: ["Toán", "Hóa học", "Giáo dục KT&PL"] },
    { code: "X10", subjects: ["Toán", "Hóa học", "Tin học"] },
    { code: "X11", subjects: ["Toán", "Hóa học", "Công nghệ công nghiệp"] },
    { code: "X12", subjects: ["Toán", "Hóa học", "Công nghệ nông nghiệp"] },

    { code: "X13", subjects: ["Toán", "Sinh học", "Giáo dục KT&PL"] },
    { code: "X14", subjects: ["Toán", "Sinh học", "Tin học"] },
    { code: "X15", subjects: ["Toán", "Sinh học", "Công nghệ công nghiệp"] },
    { code: "X16", subjects: ["Toán", "Sinh học", "Công nghệ nông nghiệp"] },

    { code: "X18", subjects: ["Toán", "Lịch sử", "Tin học"] },
    { code: "X19", subjects: ["Toán", "Lịch sử", "Công nghệ công nghiệp"] },
    { code: "X20", subjects: ["Toán", "Lịch sử", "Công nghệ nông nghiệp"] },

    { code: "X21", subjects: ["Toán", "Địa lý", "Giáo dục KT&PL"] },
    { code: "X22", subjects: ["Toán", "Địa lý", "Tin học"] },
    { code: "X23", subjects: ["Toán", "Địa lý", "Công nghệ công nghiệp"] },
    { code: "X24", subjects: ["Toán", "Địa lý", "Công nghệ nông nghiệp"] },

    { code: "X25", subjects: ["Toán", "Giáo dục KT&PL", "Tiếng Anh"] },
    { code: "X26", subjects: ["Toán", "Tiếng Anh", "Tin học"] },
    { code: "X27", subjects: ["Toán", "Tiếng Anh", "Công nghệ công nghiệp"] },
    { code: "X28", subjects: ["Toán", "Tiếng Anh", "Công nghệ nông nghiệp"] },

    { code: "X29", subjects: ["Toán", "Giáo dục KT&PL", "Tiếng Nga"] },
    { code: "X30", subjects: ["Toán", "Tin học", "Tiếng Nga"] },

    { code: "X33", subjects: ["Toán", "Giáo dục KT&PL", "Tiếng Pháp"] },
    { code: "X34", subjects: ["Toán", "Tin học", "Tiếng Pháp"] },

    { code: "X37", subjects: ["Toán", "Giáo dục KT&PL", "Tiếng Trung"] },
    { code: "X38", subjects: ["Toán", "Tin học", "Tiếng Trung"] },
    { code: "X39", subjects: ["Toán", "Công nghệ công nghiệp", "Tiếng Trung"] },
    { code: "X40", subjects: ["Toán", "Công nghệ nông nghiệp", "Tiếng Trung"] },

    { code: "X41", subjects: ["Toán", "Giáo dục KT&PL", "Tiếng Đức"] },
    { code: "X42", subjects: ["Toán", "Tin học", "Tiếng Đức"] },

    { code: "X45", subjects: ["Toán", "Giáo dục KT&PL", "Tiếng Nhật"] },
    { code: "X46", subjects: ["Toán", "Tiếng Nhật", "Tin học"] },

    { code: "X49", subjects: ["Toán", "Giáo dục KT&PL", "Tiếng Hàn"] },
    { code: "X50", subjects: ["Toán", "Tin học", "Tiếng Hàn"] },

    { code: "X53", subjects: ["Toán", "Giáo dục KT&PL", "Tin học"] },
    { code: "X54", subjects: ["Toán", "Giáo dục KT&PL", "Công nghệ công nghiệp"] },
    { code: "X55", subjects: ["Toán", "Giáo dục KT&PL", "Công nghệ nông nghiệp"] },
    { code: "X56", subjects: ["Toán", "Tin học", "Công nghệ công nghiệp"] },
    { code: "X57", subjects: ["Toán", "Tin học", "Công nghệ nông nghiệp"] },

    { code: "X58", subjects: ["Ngữ văn", "Vật lý", "Giáo dục KT&PL"] },
    { code: "X59", subjects: ["Ngữ văn", "Vật lý", "Tin học"] },
    { code: "X60", subjects: ["Ngữ văn", "Vật lý", "Công nghệ công nghiệp"] },
    { code: "X61", subjects: ["Ngữ văn", "Vật lý", "Công nghệ nông nghiệp"] },

    { code: "X62", subjects: ["Ngữ văn", "Hóa học", "Giáo dục KT&PL"] },
    { code: "X63", subjects: ["Ngữ văn", "Hóa học", "Tin học"] },
    { code: "X64", subjects: ["Ngữ văn", "Hóa học", "Công nghệ công nghiệp"] },
    { code: "X65", subjects: ["Ngữ văn", "Hóa học", "Công nghệ nông nghiệp"] },

    { code: "X66", subjects: ["Ngữ văn", "Sinh học", "Giáo dục KT&PL"] },
    { code: "X67", subjects: ["Ngữ văn", "Sinh học", "Tin học"] },
    { code: "X68", subjects: ["Ngữ văn", "Sinh học", "Công nghệ công nghiệp"] },
    { code: "X69", subjects: ["Ngữ văn", "Sinh học", "Công nghệ nông nghiệp"] },

    { code: "X70", subjects: ["Ngữ văn", "Lịch sử", "Giáo dục KT&PL"] },
    { code: "X71", subjects: ["Ngữ văn", "Lịch sử", "Tin học"] },
    { code: "X72", subjects: ["Ngữ văn", "Lịch sử", "Công nghệ công nghiệp"] },
    { code: "X73", subjects: ["Ngữ văn", "Lịch sử", "Công nghệ nông nghiệp"] },

    { code: "X74", subjects: ["Ngữ văn", "Địa lý", "Giáo dục KT&PL"] },
    { code: "X75", subjects: ["Ngữ văn", "Địa lý", "Tin học"] },
    { code: "X76", subjects: ["Ngữ văn", "Địa lý", "Công nghệ công nghiệp"] },
    { code: "X77", subjects: ["Ngữ văn", "Địa lý", "Công nghệ nông nghiệp"] },

    { code: "X78", subjects: ["Ngữ văn", "Giáo dục KT&PL", "Tiếng Anh"] },
    { code: "X79", subjects: ["Ngữ văn", "Tiếng Anh", "Tin học"] },
    { code: "X80", subjects: ["Ngữ văn", "Tiếng Anh", "Công nghệ công nghiệp"] },
    { code: "X81", subjects: ["Ngữ văn", "Tiếng Anh", "Công nghệ nông nghiệp"] },

    { code: "X86", subjects: ["Ngữ văn", "Giáo dục KT&PL", "Tiếng Pháp"] },
    { code: "X87", subjects: ["Ngữ văn", "Tin học", "Tiếng Pháp"] },

    { code: "X90", subjects: ["Ngữ văn", "Giáo dục KT&PL", "Tiếng Trung"] },
    { code: "X94", subjects: ["Ngữ văn", "Giáo dục KT&PL", "Tiếng Đức"] },
    { code: "X98", subjects: ["Ngữ văn", "Giáo dục KT&PL", "Tiếng Nhật"] },

    { code: "Y03", subjects: ["Ngữ văn", "Giáo dục KT&PL", "Tiếng Hàn"] },
    { code: "Y04", subjects: ["Ngữ văn", "Tin học", "Tiếng Hàn"] },

    { code: "Y07", subjects: ["Ngữ văn", "Giáo dục KT&PL", "Tin học"] },
    { code: "Y08", subjects: ["Ngữ văn", "Giáo dục KT&PL", "Công nghệ công nghiệp"] },
    { code: "Y09", subjects: ["Ngữ văn", "Giáo dục KT&PL", "Công nghệ nông nghiệp"] },
    { code: "Y10", subjects: ["Ngữ văn", "Tin học", "Công nghệ công nghiệp"] },
    { code: "Y11", subjects: ["Ngữ văn", "Tin học", "Công nghệ nông nghiệp"] }
];