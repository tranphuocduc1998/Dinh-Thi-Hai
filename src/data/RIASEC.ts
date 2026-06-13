export interface HollandResult {
  code: string;
  matchPercent: number;
}

export interface RIASECDetail {
    code: string
    name: string,
    primary: string,
    secondary: string,
    tertiary: string,
    reason: string,
}

export const RIASE_RESULT: RIASECDetail[] = [
    // KHỐI TRỘI: NHÓM R (REALISTIC - NGƯỜI THỰC TẾ)
    {
        code: "RIA",
        name: "Kiến trúc và xây dựng",
        primary: "R",
        secondary: "I",
        tertiary: "A",
        reason: "Ứng dụng kỹ thuật vật lý và tư duy thực tế vào không gian thiết kế mang tính thẩm mỹ, tạo hình hoặc quy hoạch trực quan."
    },
    {
        code: "RIC",
        name: "Máy tính và công nghệ thông tin",
        primary: "R",
        secondary: "I",
        tertiary: "C",
        reason: "Tập trung sâu vào cấu trúc phần cứng, vận hành hệ thống mạng, kiểm thử phần mềm dựa trên các quy trình nghiệp vụ số liệu chính xác."
    },
    {
        code: "RIE",
        name: "Công nghệ kỹ thuật và Quản lý",
        primary: "R",
        secondary: "I",
        tertiary: "E",
        reason: "Phối hợp giữa năng lực vận hành máy móc kỹ thuật với khả năng tối ưu hóa dây chuyền, quản trị chuỗi cung ứng vật tư của nhà máy."
    },
    {
        code: "RIS",
        name: "Khoa học sức khỏe (Mảng kỹ thuật)",
        primary: "R",
        secondary: "I",
        tertiary: "S",
        reason: "Sử dụng các trang thiết bị công nghệ cao, máy móc y tế phức tạp phục vụ mục đích kỹ thuật xét nghiệm hoặc hỗ trợ điều trị lâm sàng."
    },
    {
        code: "RCI",
        name: "Công nghệ kỹ thuật cơ khí, điện, nhiệt",
        primary: "R",
        secondary: "C",
        tertiary: "I",
        reason: "Làm việc trực tiếp với máy móc, bản vẽ kỹ thuật chi tiết và giám sát quy trình chế tạo vật lý theo tiêu chuẩn kỹ thuật nghiêm ngặt."
    },
    {
        code: "RCE",
        name: "Quản lý xây dựng và Giao thông",
        primary: "R",
        secondary: "C",
        tertiary: "E",
        reason: "Nghiêng hẳn về quản lý tiến độ, giám sát thực địa công trường, quản lý hồ sơ nghiệm thu kỹ thuật và chi phí của các công trình thực tế."
    },
    {
        code: "RSI",
        name: "Nông, lâm nghiệp và Thủy sản",
        primary: "R",
        secondary: "S",
        tertiary: "I",
        reason: "Tác động, chăm sóc và nghiên cứu thực địa trên các sinh thể sống (cây trồng, vật nuôi) hoặc các hệ sinh thái môi trường tự nhiên."
    },
    {
        code: "RSE",
        name: "Thể dục, thể thao và Quốc phòng",
        primary: "R",
        secondary: "S",
        tertiary: "E",
        reason: "Vận hành và tổ chức các hoạt động rèn luyện thể chất, quản lý các cơ sở thể thao hoặc huấn luyện thực địa mang tính hành động."
    },

    // KHỐI TRỘI: NHÓM I (INVESTIGATIVE - NGƯỜI NGHIÊN CỨU)
    {
        code: "IRC",
        name: "Máy tính và công nghệ thông tin",
        primary: "I",
        secondary: "R",
        tertiary: "C",
        reason: "Nghiên cứu chuyên sâu về thuật toán, kiến trúc hệ thống máy tính, an toàn thông tin và phát triển phần mềm dựa trên quy trình logic chặt chẽ."
    },
    {
        code: "IRB",
        name: "Khoa học tự nhiên",
        primary: "I",
        secondary: "R",
        tertiary: "",
        reason: "Khảo sát thực địa, nghiên cứu quy luật vật lý, hóa học, địa chất, môi trường tự nhiên kết hợp thao tác công cụ thí nghiệm thực tế."
    },
    {
        code: "IRN",
        name: "Khoa học tự nhiên",
        primary: "I",
        secondary: "R",
        tertiary: "",
        reason: "Khảo sát thực địa, nghiên cứu quy luật vật lý, hóa học, địa chất, môi trường tự nhiên kết hợp thao tác công cụ thí nghiệm thực tế."
    },
    {
        code: "IRS",
        name: "Sức khỏe (Khối Y - Dược)",
        primary: "I",
        secondary: "R",
        tertiary: "S",
        reason: "Nghiên cứu bệnh lý, dược lý, cơ chế sinh học của con người kết hợp kỹ năng lâm sàng thực tế và tinh thần trách nhiệm với người bệnh."
    },
    {
        code: "IRE",
        name: "Kỹ thuật (Mảng R&D / Phát triển)",
        primary: "I",
        secondary: "R",
        tertiary: "E",
        reason: "Nghiên cứu và thử nghiệm các giải pháp công nghệ mới, vật liệu tiên tiến, hệ thống năng lượng tái tạo phục vụ công nghiệp sản xuất."
    },
    {
        code: "ICR",
        name: "Toán và thống kê",
        primary: "I",
        secondary: "C",
        tertiary: "R",
        reason: "Ứng dụng toán học lý thuyết, xây dựng mô hình định lượng, thuật toán tối ưu dữ liệu lớn và thiết lập hệ thống lưu trữ số liệu bài bản."
    },
    {
        code: "ICE",
        name: "Kinh doanh và quản lý (Mảng phân tích)",
        primary: "I",
        secondary: "C",
        tertiary: "E",
        reason: "Nghiên cứu chuyên sâu về kinh tế học định lượng, quản trị rủi ro tài chính, kiểm toán số liệu và hoạch định chiến lược từ dữ liệu doanh nghiệp."
    },
    {
        code: "ICA",
        name: "Nghệ thuật (Mảng lý luận / Phê bình)",
        primary: "I",
        secondary: "C",
        tertiary: "A",
        reason: "Nghiên cứu lịch sử nghệ thuật, lý luận phê bình điện ảnh/âm nhạc, quản lý di sản văn hóa dựa trên tư duy lưu trữ và hệ thống hóa bài bản."
    },
    {
        code: "ISC",
        name: "Khoa học xã hội và hành vi",
        primary: "I",
        secondary: "S",
        tertiary: "C",
        reason: "Nghiên cứu chuyên sâu về tâm lý học hành vi, nhân học, xã hội học dựa trên các phương pháp thống kê, khảo sát dữ liệu cộng đồng nghiêm ngặt."
    },
    {
        code: "ISA",
        name: "Nhân văn (Khối ngôn ngữ học / Nghiên cứu)",
        primary: "I",
        secondary: "S",
        tertiary: "A",
        reason: "Nghiên cứu cấu trúc ngôn ngữ văn học, tư tưởng triết học, lịch sử văn hóa kết hợp tư duy phân tích học thuật và cảm quan nhân văn."
    },

    // KHỐI TRỘI: NHÓM A (ARTISTIC - NGƯỜI NGHỆ SĨ / SÁNG TẠO)
    {
        code: "AIR",
        name: "Kiến trúc và quy hoạch",
        primary: "A",
        secondary: "I",
        tertiary: "R",
        reason: "Sáng tạo hình khối, giải pháp không gian kiến trúc và cảnh quan đô thị dựa trên tính toán kỹ thuật xây dựng và khảo sát thực địa."
    },
    {
        code: "AER",
        name: "Mỹ thuật ứng dụng (Khối Thiết kế)",
        primary: "A",
        secondary: "E",
        tertiary: "R",
        reason: "Thiết kế sản phẩm tiêu dùng, thời trang, đồ họa thương mại; ứng dụng chất liệu vật lý và công cụ công nghệ vào sản phẩm thực tế."
    },
    {
        code: "ARS",
        name: "Mỹ thuật (Khối tạo hình thủ công)",
        primary: "A",
        secondary: "R",
        tertiary: "S",
        reason: "Thực hành hội họa, điêu khắc, gốm sứ hoặc phục chế nghệ thuật bằng đôi tay; tạo ra các tác phẩm vật lý phục vụ đời sống tinh thần xã hội."
    },
    {
        code: "ASI",
        name: "Báo chí và thông tin",
        primary: "A",
        secondary: "S",
        tertiary: "I",
        reason: "Sáng tạo nội dung truyền thông, sản xuất tin tức báo chí, ảnh báo chí dựa trên sự nhạy cảm xã hội và tư duy phân tích thông tin."
    },
    {
        code: "AIE",
        name: "Nghệ thuật nghe nhìn (Nghe - Nhìn)",
        primary: "A",
        secondary: "I",
        tertiary: "E",
        reason: "Biên kịch, đạo diễn phim, sản xuất âm thanh, hoạt hình kỹ thuật số dựa trên việc làm chủ thiết bị công nghệ số và quản lý dự án sản xuất."
    },
    {
        code: "ASE",
        name: "Nghệ thuật trình diễn",
        primary: "A",
        secondary: "S",
        tertiary: "E",
        reason: "Biểu diễn âm nhạc, nhạc cụ, vũ đạo, sân khấu điện ảnh trực tiếp trước công chúng; có năng lực biểu cảm và truyền cảm hứng mạnh mẽ."
    },
    {
        code: "ASC",
        name: "Nhân văn (Khối Sáng tác / Ngôn ngữ)",
        primary: "A",
        secondary: "S",
        tertiary: "C",
        reason: "Viết văn, sáng tác tác phẩm văn học, biên tập nội dung, phê bình văn học dựa trên tư duy ngôn từ phong phú và cấu trúc ngữ pháp chặt chẽ."
    },
    {
        code: "ACE",
        name: "Quản lý văn hóa (Khối dịch vụ nghệ thuật)",
        primary: "A",
        secondary: "C",
        tertiary: "E",
        reason: "Tổ chức sự kiện nghệ thuật, quản lý các không gian triển lãm, bảo tàng hoặc điều phối các dự án sáng tạo theo quy trình nghiệp vụ bài bản."
    },

    // KHỐI TRỘI: NHÓM S (SOCIAL - NGƯỜI XÃ HỘI / GIÁO DỤC)
    {
        code: "SAI",
        name: "Khoa học giáo dục và đào tạo giáo viên",
        primary: "S",
        secondary: "A",
        tertiary: "I",
        reason: "Truyền đạt tri thức, đào tạo thế hệ trẻ và phát triển năng lực con người; kết hợp cảm quan nghệ thuật sáng tạo và tư duy nghiên cứu sư phạm."
    },
    {
        code: "SIA",
        name: "Khoa học xã hội và hành vi",
        primary: "S",
        secondary: "I",
        tertiary: "A",
        reason: "Đi sâu vào hỗ trợ đời sống tinh thần, tư vấn tâm lý, nghiên cứu hành vi con người và các hiện tượng xã hội dựa trên nền tảng đồng cảm sâu sắc."
    },
    {
        code: "SIR",
        name: "Sức khỏe",
        primary: "S",
        secondary: "I",
        tertiary: "R",
        reason: "Trực tiếp chăm sóc, điều trị lâm sàng và hỗ trợ phục hồi thể chất cho người bệnh; đòi hỏi tinh thần phụng sự kết hợp am hiểu y học và kỹ thuật y tế."
    },
    {
        code: "SEC",
        name: "Du lịch, khách sạn, thể thao và dịch vụ cá nhân",
        primary: "S",
        secondary: "E",
        tertiary: "C",
        reason: "Hướng tới việc cung cấp dịch vụ hiếu khách, điều hành chu đáo các hoạt động lữ hành, lưu trú, quản lý trải nghiệm khách hàng theo quy trình chuẩn."
    },
    {
        code: "SEI",
        name: "Kinh doanh và quản lý (Mảng Nhân sự / Tổ chức)",
        primary: "S",
        secondary: "E",
        tertiary: "I",
        reason: "Tập trung vào mảng phát triển nguồn nhân lực, quản trị tổ chức hành chính công, kết nối nội bộ doanh nghiệp và giải quyết các xung đột con người."
    },
    {
        code: "SCE",
        name: "Dịch vụ xã hội",
        primary: "S",
        secondary: "C",
        tertiary: "E",
        reason: "Thực hiện các hoạt động bảo trợ xã hội, công tác cứu trợ, hỗ trợ cộng đồng yếu thế dựa trên các quy định pháp lý và quy trình quản lý hành chính bài bản."
    },
    {
        code: "SAE",
        name: "Báo chí và thông tin (Mảng Quan hệ công chúng)",
        primary: "S",
        secondary: "A",
        tertiary: "E",
        reason: "Hướng vào các công việc tương tác cộng đồng, truyền thông xã hội, quan hệ công chúng (PR), tổ chức sự kiện mang tính sáng tạo và tạo sức ảnh hưởng."
    },
    {
        code: "SRE",
        name: "An ninh, Quốc phòng / Quản lý trật tự",
        primary: "S",
        secondary: "R",
        tertiary: "E",
        reason: "Tham gia vào các lực lượng thực thi pháp luật, bảo vệ an ninh trật tự và an toàn xã hội; đòi hỏi kỷ luật hành động thực tế và trách nhiệm cộng đồng."
    },

    // KHỐI TRỘI: NHÓM E (ENTERPRISING - NGƯỜI DÁM NGHĨ DÁM LÀM / QUẢN LÝ)
    {
        code: "ESC",
        name: "Kinh doanh và Quản trị",
        primary: "E",
        secondary: "S",
        tertiary: "C",
        reason: "Tập trung vào năng lực dẫn dắt, hoạch định chiến lược, quản trị nhân sự và điều hành bộ máy tổ chức doanh nghiệp dựa trên quy trình hệ thống."
    },
    {
        code: "ECS",
        name: "Tài chính - Ngân hàng - Bảo hiểm",
        primary: "E",
        secondary: "C",
        tertiary: "S",
        reason: "Giao dịch, thương lượng và thuyết phục trong môi trường đầu tư, quản lý dòng tiền, thẩm định dự án và rủi ro bảo hiểm theo các chuẩn mực bài bản."
    },
    {
        code: "ESI",
        name: "Luật",
        primary: "E",
        secondary: "S",
        tertiary: "I",
        reason: "Biện hộ, lập luận sắc bén bảo vệ quyền lợi, tư vấn pháp lý thương mại cho doanh nghiệp hoặc tham gia xây dựng chính sách dựa trên tư duy phân tích."
    },
    {
        code: "EIC",
        name: "Thu mua, Logistics và Thương mại điện tử",
        primary: "E",
        secondary: "I",
        tertiary: "C",
        reason: "Khai thác các mô hình kinh doanh trên nền tảng số, tối ưu hóa chuỗi cung ứng vật tư và thương mại quốc tế dựa trên việc phân tích dữ liệu thị trường."
    },
    {
        code: "ESA",
        name: "Khách sạn, nhà hàng, du lịch và dịch vụ",
        primary: "E",
        secondary: "S",
        tertiary: "A",
        reason: "Điều hành, quản lý dịch vụ hiếu khách, lữ hành, tổ chức sự kiện; đòi hỏi sự năng động vượt trội kết hợp khả năng giao tiếp và thấu hiểu tâm lý khách hàng."
    },
    {
        code: "EAR",
        name: "Báo chí và thông tin (Mảng Quảng cáo / Thương hiệu)",
        primary: "E",
        secondary: "A",
        tertiary: "R",
        reason: "Xây dựng chiến dịch marketing, định vị thương hiệu, truyền thông tích hợp và quản lý các dự án sáng tạo nghệ thuật mang tính thương mại cạnh tranh."
    },
    {
        code: "ERC",
        name: "Quản lý công nghiệp và năng lượng",
        primary: "E",
        secondary: "R",
        tertiary: "C",
        reason: "Điều phối các dự án hạ tầng kỹ thuật, giám sát vận hành kinh doanh thương mại vật tư trong môi trường sản xuất công nghiệp và nhà máy thực tế."
    },

    // KHỐI TRỘI: NHÓM C (CONVENTIONAL - NGƯỜI TRUYỀN THỐNG / TỔ CHỨC / NGHIỆP VỤ)
    {
        code: "CIE",
        name: "Kế toán - Kiểm toán",
        primary: "C",
        secondary: "I",
        tertiary: "E",
        reason: "Kiểm tra, phân tích chứng từ và kiểm soát tính hợp pháp của các số liệu tài chính; đòi hỏi tư duy phân tích logic, sự cẩn trọng và chuẩn xác tối đa."
    },
    {
        code: "CSE",
        name: "Quản trị văn phòng",
        primary: "C",
        secondary: "S",
        tertiary: "E",
        reason: "Vận hành bộ máy hành chính, quản lý văn thư, lưu trữ hồ sơ tài liệu và điều phối các hoạt động hậu cần văn phòng một cách ngăn nắp, chu đáo."
    },
    {
        code: "CEI",
        name: "Tài chính - Ngân hàng - Bảo hiểm",
        primary: "C",
        secondary: "E",
        tertiary: "I",
        reason: "Kiểm soát giao dịch tiền tệ, quản lý hồ sơ tín dụng, vận hành đại lý bảo hiểm và đảm bảo tính tuân thủ các quy tắc tài chính nghiêm ngặt."
    },
    {
        code: "CIR",
        name: "Máy tính và công nghệ thông tin (Quản trị dữ liệu)",
        primary: "C",
        secondary: "I",
        tertiary: "R",
        reason: "Quản trị cơ sở dữ liệu, kiểm thử phần mềm, nhập liệu và phân tích hệ thống thông tin văn phòng dựa trên các quy trình kỹ thuật định sẵn."
    },
    {
        code: "CRE",
        name: "Thống kê / Vận tải (Mảng Khai thác / Điều độ)",
        primary: "C",
        secondary: "R",
        tertiary: "E",
        reason: "Thu thập và xử lý số liệu thống kê, hoặc lập kế hoạch điều độ, quản lý chứng từ logistics, kiểm soát quy trình vận tải thực tế."
    },
    {
        code: "CSI",
        name: "Thông tin - Thư viện",
        primary: "C",
        secondary: "S",
        tertiary: "I",
        reason: "Phân loại, mã hóa, số hóa và lưu trữ hệ thống tư liệu, sách báo, hồ sơ y tế hoặc các tài nguyên thông tin số phục vụ nhu cầu tra cứu."
    },
    {
        code: "CAE",
        name: "Xuất bản, in ấn và truyền thông",
        primary: "C",
        secondary: "A",
        tertiary: "E",
        reason: "Biên tập bản thảo, kiểm soát quy chuẩn chế bản in ấn, quản lý bản quyền văn bản và định dạng tài liệu theo đúng quy định pháp lý xuất bản."
    }

]
