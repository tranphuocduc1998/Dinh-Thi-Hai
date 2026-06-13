export interface Major {
    code: string;
    name: string;
    riasec_code: string;
    reason?: string;
}

export const majorData: Major[] = [
    // PHẦN 1: KHỐI NGÀNH KÝ TỰ ĐẶC BIỆT (ALPHANUMERIC - NHÓM CÔNG NGHỆ, KỸ THUẬT & QUẢN LÝ TỰ ĐỘNG)
    {
        code: "BF-E12",
        name: "Kỹ thuật Thực phẩm (Chương trình tiên tiến)",
        riasec_code: "IRC",
        reason: "Yêu cầu tư duy nghiên cứu chuyên sâu về thành phần dinh dưỡng (I), vận hành máy móc thiết bị chế biến thực phẩm thực tế (R) và tuân thủ nghiêm ngặt quy trình an toàn vệ sinh (C)."
    },
    {
        code: "BF-E19",
        name: "Kỹ thuật Sinh học (Chương trình tiên tiến)",
        riasec_code: "IRC",
        reason: "Thiên về hoạt động thí nghiệm, nghiên cứu vi sinh và tế bào (I), kết hợp thao tác kỹ thuật công nghệ sinh học (R) và quản lý dữ liệu mẫu chuẩn xác (C)."
    },
    {
        code: "BF1",
        name: "Kỹ thuật Sinh học",
        riasec_code: "IRC",
        reason: "Đòi hỏi tư duy logic phân tích mẫu sinh học (I), ứng dụng công nghệ thiết bị trong phòng lab (R) và thực hiện báo cáo kỹ thuật theo quy chuẩn (C)."
    },
    {
        code: "BF2",
        name: "Kỹ thuật Thực phẩm",
        riasec_code: "IRC",
        reason: "Kết hợp nghiên cứu phát triển công thức sản phẩm mới (I), vận hành hệ thống máy móc nhà máy (R) và kiểm soát chất lượng sản phẩm đầu ra (C)."
    },
    {
        code: "CH-E11",
        name: "Kỹ thuật Hóa dược (Chương trình tiên tiến)",
        riasec_code: "IRC",
        reason: "Nghiên cứu cấu trúc phân tử và tổng hợp dược chất (I), làm việc trực tiếp với dụng cụ, thiết bị thí nghiệm (R) và tuân thủ quy trình kiểm định nghiêm ngặt của ngành y dược (C)."
    },
    {
        code: "CH1",
        name: "Kỹ thuật Hóa học",
        riasec_code: "RIC",
        reason: "Trọng tâm là vận hành dây chuyền công nghệ sản xuất hóa chất (R), nghiên cứu cải tiến các phản ứng hóa học (I) và tổ chức hệ thống sản xuất an toàn (C)."
    },
    {
        code: "ED2",
        name: "Hóa học",
        riasec_code: "IRC",
        reason: "Đi sâu vào bản chất khoa học lý thuyết và thực nghiệm hóa học (I), thao tác phân tích công cụ thí nghiệm (R) và lưu trữ dữ liệu phản ứng bài bản (C)."
    },
    {
        code: "ED3",
        name: "Công nghệ giáo dục",
        riasec_code: "SAI",
        reason: "Định hướng hỗ trợ, cải tiến phương pháp học tập cho con người (S), ứng dụng công cụ, hệ thống phần mềm công nghệ (I) và sáng tạo giải pháp giảng dạy đổi mới (A)."
    },
    {
        code: "EE-E18",
        name: "Hệ thống điện và năng lượng tái tạo (Chương trình tiên tiến)",
        riasec_code: "RIE",
        reason: "Thao tác thiết kế kỹ thuật điện, lưới điện thông minh (R), nghiên cứu giải pháp tối ưu năng lượng xanh (I) và tham gia quản lý, điều phối dự án năng lượng thương mại (E)."
    },
    {
        code: "EE-E8",
        name: "Kỹ thuật Điều khiển - Tự động hoá (Chương trình tiên tiến)",
        riasec_code: "RIC",
        reason: "Lập trình hệ thống vi điều khiển, robot công nghiệp (R), tư duy phân tích hệ thống điều khiển phức tạp (I) và chuẩn hóa quy trình kỹ thuật hệ thống (C)."
    },
    {
        code: "EE-EP",
        name: "Tin học công nghiệp và Tự động hóa (Chương trình Việt - Pháp PFIEV)",
        riasec_code: "RIC",
        reason: "Ứng dụng các thuật toán máy tính vào điều khiển sản xuất thực tế (R), phân tích tích hợp hệ thống phần cứng/phần mềm (I) và kiểm tra chuẩn hóa dữ liệu công nghiệp (C)."
    },
    {
        code: "EE1",
        name: "Kỹ thuật Điện",
        riasec_code: "RIC",
        reason: "Trực tiếp lắp đặt, bảo trì, sửa chữa mạng lưới và thiết bị điện lực (R), tính toán các thông số kỹ thuật (I) và làm việc theo các tiêu chuẩn kỹ thuật an toàn điện (C)."
    },
    {
        code: "EE2",
        name: "Kỹ thuật Điều khiển - Tự động hóa",
        riasec_code: "RIC",
        reason: "Thiết kế mạch, lắp đặt tủ điện và lập trình PLC cho dây chuyền tự động (R), tư duy giải quyết sự cố hệ thống logic (I) và tuân thủ hồ sơ bản vẽ kỹ thuật (C)."
    },
    {
        code: "EM-E13",
        name: "Phân tích kinh doanh (Chương trình tiên tiến)",
        riasec_code: "EIC",
        reason: "Tìm kiếm các cơ hội thương mại, tối ưu hóa lợi nhuận doanh nghiệp (E), sử dụng tư duy phân tích dữ liệu và thuật toán (I) trên các nền tảng báo cáo quy chuẩn (C)."
    },
    {
        code: "EM-E14",
        name: "Logistics và Quản lý chuỗi cung ứng (Chương trình tiên tiến)",
        riasec_code: "EIC",
        reason: "Lãnh đạo, đàm phán và điều phối dòng dịch chuyển hàng hóa toàn cầu (E), phân tích bài toán tối ưu hóa chi phí vận hành (I) và quản lý hệ thống chứng từ, kho bãi ngăn nắp (C)."
    },
    {
        code: "EM1",
        name: "Quản lý năng lượng",
        riasec_code: "ERC",
        reason: "Điều hành các dự án tiết kiệm năng lượng tại doanh nghiệp (E), kiểm tra hạ tầng kỹ thuật trạm điện/nhà máy (R) và lập báo cáo kiểm toán năng lượng đúng quy trình pháp lý (C)."
    },
    {
        code: "EM2",
        name: "Quản lý công nghiệp",
        riasec_code: "ERC",
        reason: "Quản trị bộ máy sản xuất, tối ưu hóa năng suất lao động (E), giám sát vận hành máy móc thiết bị nhà xưởng (R) và kiểm soát quy trình quản lý chất lượng (C)."
    },
    {
        code: "EM3",
        name: "Quản trị kinh doanh",
        riasec_code: "ESC",
        reason: "Thiên hướng lãnh đạo, hoạch định chiến lược kinh doanh và ra quyết định (E), tương tác giao tiếp thúc đẩy năng lực nhân sự (S) và quản lý vận hành tổ chức theo hệ thống bài bản (C)."
    },
    {
        code: "EM4",
        name: "Kế toán",
        riasec_code: "CIE",
        reason: "Yêu cầu hàng đầu sự tỉ mỉ, chính xác trong ghi nhận thu chi tài chính (C), tư duy phân tích báo cáo thuế và kiểm toán số liệu (I) nhằm tham mưu dòng tiền cho lãnh đạo (E)."
    },
    {
        code: "EM5",
        name: "Tài chính - Ngân hàng",
        riasec_code: "CEI",
        reason: "Xử lý các nghiệp vụ giao dịch tiền tệ, hồ sơ vay tín dụng theo đúng nguyên tắc quy chuẩn (C), thuyết phục khách hàng sử dụng dịch vụ đầu tư (E) và phân tích rủi ro tài chính (I)."
    },
    {
        code: "ET-E16",
        name: "Truyền thông số và Kỹ thuật đa phương tiện (Chương trình tiên tiến)",
        riasec_code: "AES",
        reason: "Sáng tạo nội dung hình ảnh, video, giao diện trải nghiệm số mang tính nghệ thuật (A), ứng dụng các công cụ phần mềm đồ họa kỹ thuật máy tính (E) và làm việc nhóm định hướng truyền thông xã hội (S)."
    },
    {
        code: "ET-E4",
        name: "Kỹ thuật Điện tử - Viễn thông (Chương trình tiên tiến)",
        riasec_code: "RIC",
        reason: "Chế tạo phần cứng mạch điện tử và hạ tầng mạng truyền dẫn (R), nghiên cứu các thuật toán xử lý tín hiệu thông tin (I) và tối ưu thiết kế theo quy chuẩn quốc tế (C)."
    },
    {
        code: "ET-E5",
        name: "Kỹ thuật Y sinh (Chương trình tiên tiến)",
        riasec_code: "SIR",
        reason: "Định hướng phụng sự hỗ trợ công nghệ cho y tế, sức khỏe con người (S), nghiên cứu cơ chế tương tác giữa thiết bị và cơ thể sinh học (I) và trực tiếp thao tác sửa chữa máy móc y tế lâm sàng (R)."
    },
    {
        code: "ET-E9",
        name: "Hệ thống nhúng thông minh và IoT (Chương trình tiên tiến)",
        riasec_code: "RIC",
        reason: "Lắp ráp, lập trình các thiết bị phần cứng thông minh và cảm biến (R), tư duy phân tích kiến trúc kết nối mạng IoT đám mây (I) và kiểm thử chất lượng mã nguồn hệ thống (C)."
    },
    {
        code: "ET-LUH",
        name: "Điện tử - Viễn thông (hợp tác với ĐH Leibniz Hannover - Đức)",
        riasec_code: "RIC",
        reason: "Thực hành thiết kế và đo đạc các thông số viễn thông trên thiết bị chuẩn Đức (R), phân tích lý thuyết sóng và xử lý thông tin (I) và lưu trữ quy trình kỹ thuật đồng bộ (C)."
    },
    {
        code: "ET1",
        name: "Kỹ thuật Điện tử - Viễn thông",
        riasec_code: "RIC",
        reason: "Vận hành, kiểm thử linh kiện điện tử và lắp đặt hạ tầng mạng viễn thông băng thông rộng (R), nghiên cứu công nghệ vi mạch (I) và tổ chức tài liệu kỹ thuật chuẩn xác (C)."
    },
    {
        code: "ET2",
        name: "Kỹ thuật Y sinh",
        riasec_code: "SIR",
        reason: "Làm việc trong môi trường bệnh viện để phối hợp với bác sĩ hỗ trợ bệnh nhân (S), phân tích nguyên lý hoạt động của máy đo điện tim, MRI (I) và trực tiếp bảo trì thiết bị (R)."
    },

    // PHẦN 2: KHỐI NGÀNH CÔNG NGHỆ, MÔI TRƯỜNG, VẬT LÝ KỸ THUẬT VÀ DỆT MAY
    {
        code: "EV1",
        name: "Kỹ thuật Môi trường",
        riasec_code: "IRC",
        reason: "Yêu cầu năng lực nghiên cứu giải pháp xử lý chất thải, ô nhiễm (I), khảo sát và vận hành hệ thống trắc quan thực địa (R) và kiểm soát các chỉ số an toàn môi trường theo luật quy định (C)."
    },
    {
        code: "EV2",
        name: "Quản lý Tài nguyên và Môi trường",
        riasec_code: "ERC",
        reason: "Phối hợp điều hành, quy hoạch các dự án khai thác tài nguyên bền vững (E), đo đạc kiểm tra hiện trạng đất, nước, rừng thực tế (R) và lưu trữ hệ thống hồ sơ pháp lý môi trường bài bản (C)."
    },
    {
        code: "PR1",
        name: "Kỹ thuật In",
        riasec_code: "RCE",
        reason: "Vận hành hệ thống máy móc, thiết bị in ấn công nghiệp quy mô lớn (R), quản lý quy trình kỹ thuật, pha màu chuẩn xác (C) và giám sát tiến độ đơn hàng sản xuất thương mại (E)."
    },
    {
        code: "PH1",
        name: "Kỹ thuật Hạt nhân",
        riasec_code: "IRC",
        reason: "Đòi hỏi tư duy nghiên cứu lý thuyết vật lý hạt nhân lý tưởng (I), thao tác cẩn trọng với các thiết bị đo phóng xạ, lò phản ứng (R) và tuân thủ tuyệt đối quy trình an toàn bức xạ nghiêm ngặt (C)."
    },
    {
        code: "PH2",
        name: "Vật lý Kỹ thuật",
        riasec_code: "IRA",
        reason: "Nghiên cứu nguyên lý vật lý hiện đại và công nghệ bán dẫn (I), ứng dụng chế tạo và thử nghiệm thiết bị phần cứng (R) và tư duy thiết kế, đổi mới công nghệ sáng tạo (A)."
    },
    {
        code: "TE1",
        name: "Công nghệ Dệt, May",
        riasec_code: "RCE",
        reason: "Vận hành dây chuyền sản xuất dệt may tự động và thiết bị cắt may (R), kiểm soát tiêu chuẩn chất lượng sợi/vải và định mức kỹ thuật (C) và điều phối tổ chức xưởng may công nghiệp (E)."
    },
    {
        code: "TE2",
        name: "Kỹ thuật Dệt",
        riasec_code: "RIC",
        reason: "Tập trung trực tiếp vào cơ cấu máy dệt, cấu trúc vật lý sợi và công nghệ nhuộm (R), nghiên cứu cải tiến đặc tính độ bền vật liệu (I) và quản lý quy trình công nghệ chuẩn (C)."
    },
    {
        code: "TX1",
        name: "Công nghệ Da giày",
        riasec_code: "RCE",
        reason: "Thực hành quy trình xử lý da thuộc và gia công phom dáng giày dép (R), quản lý định mức nguyên vật liệu và quy trình kỹ thuật bao gói (C) và điều hành chuỗi sản xuất thương mại (E)."
    },

    // PHẦN 3: KHỐI NGÀNH NGHỆ THUẬT, THIẾT KẾ VÀ NHÂN VĂN (NGÔN NGỮ)
    {
        code: "7210403",
        name: "Thiết kế đồ họa",
        riasec_code: "AER",
        reason: "Sáng tạo các ấn phẩm truyền thông, bộ nhận diện thương hiệu mang tính thẩm mỹ cao (A), ứng dụng linh hoạt công nghệ số và phần mềm thiết kế (E), phối hợp chất liệu thực tế và bố cục trực quan (R)."
    },
    {
        code: "7210404",
        name: "Thiết kế thời trang",
        riasec_code: "AER",
        reason: "Đòi hỏi tư duy thẩm mỹ, sáng tạo phom dáng và bộ sưu tập độc đáo (A), am hiểu xu hướng thị trường và phát triển sản phẩm thương mại (E), kết hợp kỹ năng cắt may, dựng mẫu trên chất liệu vật lý (R)."
    },
    {
        code: "7210405",
        name: "Âm nhạc",
        riasec_code: "AES",
        reason: "Biểu diễn, sáng tác âm nhạc nghệ thuật (A), giảng dạy, kết nối cảm xúc người nghe (S) và điều hành dự án âm nhạc (E)."
    },
    {
        code: "7220201",
        name: "Ngôn ngữ Anh",
        riasec_code: "ASE",
        reason: "Làm chủ ngôn ngữ phục vụ giao tiếp đối ngoại và biên phiên dịch (A), hỗ trợ kết nối văn hóa, giáo dục và hướng dẫn con người (S), ứng dụng vào môi trường đàm phán thương mại, tổ chức sự kiện (E)."
    },
    {
        code: "7220201_1",
        name: "Ngôn ngữ Anh (Chuyên ngành Tiếng Anh thương mại)",
        riasec_code: "ESA",
        reason: "Trọng tâm là giao tiếp kinh doanh quốc tế, đàm phán hợp đồng và marketing (E), hỗ trợ dịch vụ khách hàng và kết nối nhân sự (S), đòi hỏi tư duy ngôn từ linh hoạt và nhạy cảm văn hóa (A)."
    },
    {
        code: "7220201_2",
        name: "Ngôn ngữ Anh (Chuyên ngành Biên - Phiên dịch tiếng Anh)",
        riasec_code: "ASC",
        reason: "Chuyển ngữ văn bản, hội nghị đòi hỏi sự thấu hiểu sâu sắc ngữ cảnh và tư duy nghệ thuật ngôn từ (A), hỗ trợ các bên thấu hiểu nhau (S), yêu cầu tuân thủ nghiêm ngặt cấu trúc ngữ pháp và quy chuẩn biên tập (C)."
    },
    {
        code: "7220201A",
        name: "Ngôn ngữ Anh (chuyên ngành Tiếng Anh du lịch)",
        riasec_code: "SEA",
        reason: "Hướng tới chăm sóc khách hàng, điều hành tour và hướng dẫn du lịch quốc tế (S), quản lý trải nghiệm, thuyết phục và điều phối dịch vụ lữ hành (E), sử dụng ngôn ngữ giàu cảm xúc và hình ảnh (A)."
    },
    {
        code: "7220210",
        name: "Ngôn ngữ Hàn Quốc",
        riasec_code: "ASE",
        reason: "Giao tiếp ngoại giao văn hóa Hàn Quốc (A), hướng dẫn viên, hỗ trợ nhân sự (S) và quản lý, làm việc tại văn phòng doanh nghiệp FDI (E)."
    },
    {
        code: "7220204",
        name: "Ngôn ngữ Trung Quốc",
        riasec_code: "ASE",
        reason: "Sử dụng thành thạo tiếng Trung trong tương tác văn hóa, ngoại giao (A), hỗ trợ giảng dạy, tư vấn hoặc dịch vụ khách hàng (S), tham gia các hoạt động giao thương, quản lý dịch vụ xuất nhập khẩu (E)."
    },

    // PHẦN 4: KHỐI NGÀNH KINH TẾ HỌC, BÁO CHÍ VÀ TRUYỀN THÔNG
    {
        code: "7310101",
        name: "Kinh tế",
        riasec_code: "IEC",
        reason: "Nghiên cứu sâu về các quy luật cung cầu, mô hình kinh tế vi mô và vĩ mô (I), định hướng ứng dụng vào các chiến lược phát triển tài chính của tổ chức (E) và làm việc với các hệ thống chỉ số dữ liệu quốc gia bài bản (C)."
    },
    {
        code: "7310101_1",
        name: "Kinh tế (Chuyên ngành Kinh tế và quản lý công)",
        riasec_code: "ESC",
        reason: "Hoạch định và quản lý các chính sách phát triển kinh tế vĩ mô của bộ máy nhà nước (E), hướng tới mục tiêu điều phối và phụng sự lợi ích cộng đồng xã hội (S) dựa trên việc tuân thủ các quy trình hành chính nghiêm ngặt (C)."
    },
    {
        code: "7310101_2",
        name: "Kinh tế (Chuyên ngành Kinh tế quốc tế)",
        riasec_code: "EIC",
        reason: "Thương lượng, phân tích xu hướng thương mại toàn cầu và quản lý các hoạt động đầu tư xuyên quốc gia (E), tư duy phân tích các hiệp định kinh tế phức tạp (I) và đối chiếu với các chuẩn mực pháp lý quốc tế (C)."
    },
    {
        code: "7310101_3",
        name: "Kinh tế (Chuyên ngành Toán kinh tế)",
        riasec_code: "ICR",
        reason: "Xây dựng các mô hình toán học lý thuyết để dự báo xu hướng thị trường tài chính (I), tổ chức cấu trúc dữ liệu lớn và thuật toán tối ưu (C) kết hợp sử dụng phần mềm máy tính và hệ thống máy chủ vận hành thực tế (R)."
    },
    {
        code: "7310205",
        name: "Quản lý nhà nước",
        riasec_code: "ESC",
        reason: "Điều hành bộ máy hành chính công, chính sách nhà nước (E), hỗ trợ, giải quyết thủ tục cho người dân (S) và tuân thủ pháp luật chặt chẽ (C)."
    },
    {
        code: "7310206",
        name: "Quan hệ quốc tế",
        riasec_code: "ESI",
        reason: "Đàm phán ngoại giao, xây dựng quan hệ hợp tác quốc tế (E), phân tích tình hình chính trị toàn cầu (I) và hướng tới lợi ích cộng đồng (S)."
    },
    {
        code: "7310401",
        name: "Tâm lý học",
        riasec_code: "SIA",
        reason: "Tư vấn, chữa lành và thấu hiểu tâm lý hành vi con người (S), nghiên cứu khoa học não bộ, tâm thức (I) và thấu cảm nghệ thuật (A)."
    },
    {
        code: "7310108",
        name: "Kinh tế quốc tế",
        riasec_code: "EIC",
        reason: "Phát triển thị trường, xúc tiến thương mại quốc tế và đàm phán chuỗi cung ứng toàn cầu (E), nghiên cứu các rủi ro kinh tế vĩ mô quốc tế (I) và kiểm soát các hồ sơ hải quan, quy chuẩn thương mại số liệu (C)."
    },
    {
        code: "7320106",
        name: "Quan hệ công chúng",
        riasec_code: "SAE",
        reason: "Định hướng giao tiếp, xử lý khủng hoảng truyền thông và thấu hiểu tâm lý công chúng (S), sáng tạo thông điệp truyền thông, kịch bản sự kiện độc đáo (A) và dẫn dắt, thúc đẩy hình ảnh thương hiệu phát triển (E)."
    },
    {
        code: "7320106A",
        name: "Quan hệ công chúng (Chuyên ngành Truyền thông số)",
        riasec_code: "AES",
        reason: "Sáng tạo nội dung trên nền tảng mạng xã hội, thiết kế chiến dịch viral đa phương tiện (A), sử dụng linh hoạt các công cụ phân tích thuật toán, kỹ thuật số (E) và tương tác, kết nối cộng đồng trực tuyến (S)."
    },
    {
        code: "7320104",
        name: "Truyền thông đa phương tiện",
        riasec_code: "AER",
        reason: "Sáng tạo nội dung video, hiệu ứng hình ảnh đa phương tiện (A), thao tác trực tiếp máy quay, thiết bị dựng phim (R) và sản xuất truyền thông (E)."
    },

    // PHẦN 5: KHỐI NGÀNH KINH DOANH VÀ QUẢN LÝ (ĐẦU SỐ 734)
    {
        code: "7340122",
        name: "Thương mại điện tử",
        riasec_code: "ECI",
        reason: "Xây dựng mô hình kinh doanh trực tuyến, sàn TMĐT (E), phân tích dữ liệu lượng truy cập, thuật toán số (I) và quản lý giỏ hàng, vận hành hệ thống (C)."
    },
    {
        code: "7340101",
        name: "Quản trị kinh doanh",
        riasec_code: "ESC",
        reason: "Yêu cầu năng lực dẫn dắt, hoạch định chiến lược và điều hành doanh nghiệp phát triển (E), kỹ năng giao tiếp truyền cảm hứng và làm việc nhóm với nhân sự (S) dựa trên việc thiết lập bộ máy quy trình tổ chức bài bản (C)."
    },
    {
        code: "7340101_1",
        name: "Quản trị kinh doanh (Chuyên ngành Quản trị doanh nghiệp)",
        riasec_code: "ESC",
        reason: "Đi sâu vào việc tối ưu hóa nguồn lực, quản trị vận hành nội bộ và ra quyết định kinh doanh (E), giải quyết xung đột và thúc đẩy động lực nhân sự (S) thông qua các hệ thống tiêu chuẩn quản lý đồng bộ (C)."
    },
    {
        code: "7340101_2",
        name: "Quản trị kinh doanh (Chuyên ngành Quản trị kinh doanh quốc tế)",
        riasec_code: "EIC",
        reason: "Thương lượng hợp đồng, tìm kiếm cơ hội đầu tư và xúc tiến thương mại trên thị trường quốc tế (E), nghiên cứu hành vi người tiêu dùng đa văn hóa (I) và quản lý quy trình xuất nhập khẩu, hải quan (C)."
    },
    {
        code: "7340115",
        name: "Marketing",
        riasec_code: "EAS",
        reason: "Trọng tâm là xây dựng chiến dịch quảng cáo, thúc đẩy doanh số và phát triển thương hiệu cạnh tranh (E), sáng tạo nội dung, ý tưởng truyền thông số độc đáo (A) và kết nối, thấu hiểu nhu cầu của khách hàng (S)."
    },
    {
        code: "7340115A",
        name: "Marketing (Chuyên ngành Digital Marketing)",
        riasec_code: "EAI",
        reason: "Lập chiến lược tiếp thị trên các nền tảng số và tối ưu hóa chuyển đổi thương mại (E), sáng tạo hình ảnh/video viral bắt mắt (A) kết hợp tư duy phân tích thuật toán, dữ liệu SEO/SEM và hành vi người dùng (I)."
    },
    {
        code: "7340201",
        name: "Tài chính - Ngân hàng",
        riasec_code: "CEI",
        reason: "Thực hiện chính xác các nghiệp vụ kế toán giao dịch, kiểm soát dòng tiền và hồ sơ tín dụng (C), tư vấn thuyết phục khách hàng đầu tư hoặc gửi tiết kiệm (E) và phân tích rủi ro thị trường tài chính (I)."
    },
    {
        code: "7340201_1",
        name: "Tài chính - Ngân hàng (Chuyên ngành Tài chính doanh nghiệp)",
        riasec_code: "CIE",
        reason: "Quản lý dòng vốn nội bộ, lập báo cáo tài chính và kiểm soát ngân sách theo quy chuẩn kế toán (C), phân tích hiệu quả kinh tế của các dự án đầu tư (I) và tham mưu chiến lược tài chính cho ban lãnh đạo (E)."
    },
    {
        code: "7340201_2",
        name: "Tài chính - Ngân hàng (Chuyên ngành Ngân hàng)",
        riasec_code: "CES",
        reason: "Tuân thủ nghiêm ngặt quy trình quản lý tiền tệ và bảo mật thông tin tài khoản (C), thúc đẩy doanh số chỉ tiêu và cung ứng sản phẩm tài chính (E) song song với hỗ trợ, chăm sóc khách hàng chu đáo (S)."
    },
    {
        code: "7340301",
        name: "Kế toán",
        riasec_code: "CIE",
        reason: "Đòi hỏi tính tỉ mỉ và nguyên tắc tối cao trong việc nhập liệu, ghi nhận chứng từ thu chi văn phòng (C), tư duy phân tích, kiểm toán các sắc thuế và số liệu sai lệch (I) nhằm bảo vệ sức khỏe tài chính cho doanh nghiệp (E)."
    },
    {
        code: "7340302",
        name: "Kiểm toán",
        riasec_code: "CIE",
        reason: "Kiểm tra tính trung thực, hợp pháp của báo cáo tài chính dựa trên các chuẩn mực nhà nước (C), tư duy độc lập phân tích rủi ro, lỗ hổng hệ thống quản lý (I) và phản biện, kiến nghị giải pháp cho doanh nghiệp (E)."
    },

    // PHẦN 6: KHỐI NGÀNH LUẬT VÀ KHOA HỌC TỰ NHIÊN (ĐẦU SỐ 738, 744)
    {
        code: "7380101",
        name: "Luật",
        riasec_code: "ESI",
        reason: "Yêu cầu năng lực tranh biện luận điểm, bảo vệ quyền lợi hợp pháp và đàm phán hợp đồng (E), định hướng phụng sự công lý và hỗ trợ tư vấn giải quyết xung đột cho con người (S) trên nền tảng tư duy phân tích cấu trúc điều khoản pháp lý logic (I)."
    },
    {
        code: "7380107",
        name: "Luật kinh tế",
        riasec_code: "EIC",
        reason: "Tập trung giải quyết các tranh chấp thương mại, bảo vệ lợi ích và tư vấn rủi ro pháp lý cho doanh nghiệp (E), đòi hỏi tư duy phân tích sâu sắc các bộ luật kinh tế phức tạp (I) và quản lý hệ thống hồ sơ, quy trình tố tụng chuẩn xác (C)."
    },
    {
        code: "7440112",
        name: "Hóa học",
        riasec_code: "IRC",
        reason: "Đi sâu vào nghiên cứu cấu trúc, tính chất vật chất và các phản ứng hóa học phòng thí nghiệm (I), đòi hỏi thao tác trực tiếp và cẩn trọng với các dụng cụ, hóa chất vật lý (R) và tuân thủ nghiêm ngặt quy trình an toàn, lưu trữ số liệu bài bản (C)."
    },
    {
        code: "7440301",
        name: "Chương trình tiên tiến Khoa học vật liệu",
        riasec_code: "IRC",
        reason: "Nghiên cứu phát triển vật liệu mới ở cấp độ nano và cấu trúc phân tử (I), ứng dụng các thiết bị công nghệ đo đạc hiện đại và chế tạo phôi mẫu thực tế (R) kết hợp kiểm định chất lượng theo các bộ tiêu chuẩn quốc tế nghiêm ngặt (C)."
    },

    // PHẦN 7: KHỐI NGÀNH MÁY TÍNH VÀ CÔNG NGHỆ THÔNG TIN (ĐẦU SỐ 748)
    {
        code: "7480101",
        name: "Khoa học máy tính",
        riasec_code: "IRC",
        reason: "Đi sâu vào nghiên cứu thuật toán phức tạp, kiến trúc hệ điều hành và lý thuyết tính toán trí tuệ nhân tạo (I), đòi hỏi thực hành viết mã nguồn, tối ưu hóa hệ thống trên máy tính thực tế (R) và kiểm thử chất lượng mã, chuẩn hóa cấu trúc dữ liệu nghiêm ngặt (C)."
    },
    {
        code: "7480102",
        name: "Mạng máy tính và truyền thông dữ liệu",
        riasec_code: "RIC",
        reason: "Thao tác trực tiếp với thiết bị phần cứng mạng, cấu hình Router, Switch và hạ tầng cáp viễn thông (R), tư duy phân tích kiến trúc mạng, luồng truyền tải và bảo mật dữ liệu (I) kết hợp thiết lập tài liệu sơ đồ mạng và quy trình bảo trì hệ thống (C)."
    },
    {
        code: "7480103",
        name: "Kỹ thuật phần mềm",
        riasec_code: "RIC",
        reason: "Trọng tâm là xây dựng, triển khai các ứng dụng, phần mềm và trò chơi trên máy tính/di động (R), tư duy phân tích yêu cầu nghiệp vụ hệ thống và thiết kế thuật toán (I) đi kèm việc quản lý phiên bản source code và quy trình kiểm thử lỗi chặt chẽ (C)."
    },
    {
        code: "7480104",
        name: "Hệ thống thông tin",
        riasec_code: "CIR",
        reason: "Quản trị cơ sở dữ liệu lớn, đảm bảo tính toàn vẹn và tối ưu quy trình xử lý dữ liệu của cơ quan/doanh nghiệp (C), tư duy phân tích thiết kế hệ thống thông tin quản lý (I) kết hợp vận hành máy chủ và các công cụ phần mềm văn phòng thực tế (R)."
    },
    {
        code: "7480201",
        name: "Công nghệ thông tin",
        riasec_code: "RIC",
        reason: "Tích hợp đa năng giữa cài đặt, sửa chữa phần cứng máy tính và cấu hình hệ thống phần mềm mạng (R), phân tích và xử lý nhanh các sự cố kỹ thuật số (I) cùng việc quản lý, bảo mật cơ sở dữ liệu số văn phòng theo quy chuẩn (C)."
    },
    {
        code: "7480202",
        name: "An toàn thông tin",
        riasec_code: "IRC",
        reason: "Nghiên cứu cơ chế mật mã, phân tích mã độc và phát hiện lỗ hổng bảo mật chống hacker (I), trực tiếp cấu hình hệ thống tường lửa và vận hành phòng thí nghiệm an ninh mạng (R) nhằm đảm bảo tính tuân thủ các quy tắc an toàn bảo mật dữ liệu quốc gia (C)."
    },

    // PHẦN 8: KHỐI NGÀNH CÔNG NGHỆ KỸ THUẬT (ĐẦU SỐ 751)
    {
        code: "7510601",
        name: "Quản lý công nghiệp",
        riasec_code: "ERC",
        reason: "Quản lý điều hành dây chuyền sản xuất nhà máy (E), giám sát vận hành máy móc kỹ thuật thực tế (R) và kiểm soát hệ thống chất lượng sản phẩm (C)."
    },
    {
        code: "7510605",
        name: "Logistics và quản lý chuỗi cung ứng",
        riasec_code: "EIC",
        reason: "Điều phối chuỗi cung ứng, luân chuyển hàng hóa toàn cầu (E), phân tích bài toán tối ưu chi phí vận tải (I) và quản lý kho bãi, chứng từ hải quan (C)."
    },
    {
        code: "7510102",
        name: "Công nghệ kỹ thuật công trình xây dựng",
        riasec_code: "RCE",
        reason: "Trực tiếp giám sát thi công, khảo sát trắc địa tại công trường thực tế (R), kiểm soát hồ sơ bản vẽ thiết kế, định mức vật tư và dự toán chi phí nghiệm thu (C) kết hợp quản lý tiến độ và điều phối tổ đội thi công (E)."
    },
    {
        code: "7510104",
        name: "Công nghệ kỹ thuật giao thông",
        riasec_code: "RCE",
        reason: "Thực địa khảo sát, chỉ đạo kỹ thuật thi công cầu đường và hạ tầng giao thông (R), kiểm định chất lượng bêtông, vật liệu và quản lý quy trình kỹ thuật nghiệm thu (C) đi kèm điều phối nhà thầu phụ và dự án thương mại (E)."
    },
    {
        code: "7510104",
        name: "Công nghệ kỹ thuật giao thông (chuyên ngành Xây dựng cầu đường)",
        riasec_code: "RCE",
        reason: "Tập trung chuyên sâu vào kỹ thuật thi công móng mố, kết cấu nhịp cầu và nền mặt đường (R), tuân thủ hồ sơ quy chuẩn kỹ thuật xây dựng quốc gia (C) và giám sát hiệu suất, an toàn lao động công trường (E)."
    },
    {
        code: "7510201",
        name: "Công nghệ kỹ thuật cơ khí",
        riasec_code: "RIC",
        reason: "Thao tác trực tiếp trên máy công cụ, xưởng gia công cắt gọt CNC và lắp ráp cơ cấu truyền động (R), tư duy phân tích, tính toán động học và ứng suất vật liệu (I) cùng việc quản lý hồ sơ kỹ thuật, dung sai chế tạo bài bản (C)."
    },
    {
        code: "7510201",
        name: "Công nghệ kỹ thuật cơ khí (chuyên ngành Cơ khí chế tạo)",
        riasec_code: "RIC",
        reason: "Thiết kế và vận hành quy trình gia công chi tiết máy, khuôn mẫu và đồ gá cơ khí thực tế (R), phân tích tối ưu hóa chế độ cắt gọt và độ bền bề mặt (I) kết hợp chuẩn hóa lưu trình công nghệ sản xuất (C)."
    },
    {
        code: "7510201A",
        name: "Công nghệ kỹ thuật cơ khí (chuyên ngành Thiết kế và mô phỏng số trong cơ khí)",
        riasec_code: "IRA",
        reason: "Sử dụng phần mềm CAD/CAE phân tích, tính toán độ bền ứng suất cơ học kết cấu bằng thuật toán số (I), ứng dụng thực tế vào sản phẩm cơ khí chính xác (R) và tư duy đổi mới, sáng tạo phom dáng, giải pháp cơ cấu mới (A)."
    },
    {
        code: "7510205",
        name: "Công nghệ kỹ thuật ô tô",
        riasec_code: "RIC",
        reason: "Trực tiếp thực hiện bảo dưỡng, sửa chữa máy gầm, hệ thống truyền động và điện ô tô tại xưởng (R), tư duy phân tích chẩn đoán mã lỗi bằng thiết bị quét thông minh (I) và tuân thủ lưu trình kỹ thuật hãng quy định (C)."
    },
    {
        code: "7510205A",
        name: "Công nghệ kỹ thuật ô tô (chuyên ngành Ô tô điện)",
        riasec_code: "IRC",
        reason: "Nghiên cứu nguyên lý pin lithium, cấu trúc động cơ điện xoay chiều và thuật toán điều khiển sạc (I), thao tác chẩn đoán đo đạc an toàn hệ thống cao áp trực tiếp (R) và tuân thủ các quy chuẩn kỹ thuật an toàn điện ô tô nghiêm ngặt (C)."
    },
    {
        code: "7510205KT",
        name: "Công nghệ kỹ thuật ô tô (đào tạo 2 năm đầu tại Kon Tum)",
        riasec_code: "RIC",
        reason: "Trang bị sớm kỹ năng thực hành cơ bản về tháo lắp, kiểm tra cấu kiện cơ khí và điện-điện tử ô tô tại cơ sở xưởng thực địa (R), phân tích các hư hỏng cơ học thông thường (I) và rèn luyện tính tuân thủ quy trình an toàn lao động (C)."
    },
    {
        code: "7510206",
        name: "Công nghệ kỹ thuật nhiệt",
        riasec_code: "RIC",
        reason: "Lắp đặt, sửa chữa hệ thống điều hòa không khí trung tâm, lò hơi và máy lạnh công nghiệp (R), tính toán cân bằng nhiệt, chu trình nhiệt động và tổn thất năng lượng (I) cùng việc thực hiện hồ sơ vận hành an toàn áp lực (C)."
    },
    {
        code: "7510206",
        name: "Công nghệ kỹ thuật nhiệt (chuyên ngành Nhiệt - Điện lạnh)",
        riasec_code: "RIC",
        reason: "Trọng tâm là thiết kế thi công hệ thống thông gió tòa hầm, kho lạnh thương mại và thông gió HVAC (R), phân tích tối ưu hiệu suất COP của chu trình lạnh (I) và tổ chức quy trình bảo trì, ghi chép nhật ký kỹ thuật máy (C)."
    },
    {
        code: "7510301",
        name: "Công nghệ kỹ thuật điện, điện tử",
        riasec_code: "RIC",
        reason: "Yêu cầu lắp đặt, vận hành và sửa chữa các hệ thống máy móc, thiết bị điện lưới và mạch điện tử công nghiệp (R), tư duy phân tích các thông số mạch, tải tiêu thụ (I) và tuân thủ các quy trình an toàn điện chuẩn xác (C)."
    },
    {
        code: "7510301A",
        name: "Công nghệ kỹ thuật điện, điện tử (chuyên ngành Công nghệ kỹ thuật điện tử)",
        riasec_code: "RIC",
        reason: "Trọng tâm là thiết kế, hàn mạch và thử nghiệm các bo mạch điện tử, linh kiện bán dẫn thực tế (R), phân tích sơ đồ nguyên lý mạch logic và IC (I) kết hợp kiểm thử chất lượng, sai số linh kiện quy chuẩn (C)."
    },
    {
        code: "7510301B",
        name: "Công nghệ kỹ thuật điện, điện tử (chuyên ngành Công nghệ kỹ thuật điện)",
        riasec_code: "RIC",
        reason: "Thao tác trực tiếp với hệ thống truyền tải điện năng, tủ điện phân phối và máy phát điện công suất lớn (R), tính toán sụt áp và tối ưu hóa hiệu suất truyền tải (I) cùng việc lưu trữ bản vẽ, nhật ký kỹ thuật vận hành (C)."
    },
    {
        code: "7510301_1",
        name: "Công nghệ kỹ thuật điện, điện tử (Chuyên ngành Công nghệ kỹ thuật điện)",
        riasec_code: "RIC",
        reason: "Đồng bộ kỹ năng bảo trì lưới điện tòa nhà và nhà máy, thi công cáp động lực và hệ thống chiếu sáng (R), phân tích sự cố ngắn mạch và quá tải (I) dựa trên việc tuân thủ hồ sơ quy chuẩn an toàn điện quốc gia (C)."
    },
    {
        code: "7510302",
        name: "Công nghệ kỹ thuật điện tử, viễn thông",
        riasec_code: "RIC",
        reason: "Vận hành, đo đạc các thiết bị thu phát sóng, trạm BTS và lắp đặt hạ tầng mạng viễn thông sợi quang (R), phân tích thuật toán xử lý tín hiệu và điều chế tần số (I) kết hợp ghi chép, chuẩn hóa quy trình kỹ thuật hệ thống (C)."
    },
    {
        code: "7510302A",
        name: "Công nghệ kỹ thuật điện tử, viễn thông (chuyên ngành Thiết kế vi mạch bán dẫn)",
        riasec_code: "IRC",
        reason: "Nghiên cứu kiến trúc chip bán dẫn, mô phỏng hoạt động của hàng triệu bóng bán dẫn (I), trực tiếp sử dụng phần mềm công nghệ chuyên dụng thiết kế mạch vật lý Layer (R) và kiểm thử tuân thủ các quy tắc thiết kế nghiêm ngặt (C)."
    },
    {
        code: "7510303",
        name: "Công nghệ kỹ thuật điều khiển và tự động hóa",
        riasec_code: "RIC",
        reason: "Đấu nối tủ điện, cài đặt biến tần và lập trình hệ thống PLC điều khiển cánh tay Robot, dây chuyền sản xuất (R), tư duy phân tích thuật toán điều khiển PID và logic hệ thống (I) kèm việc thiết lập hồ sơ kỹ thuật SCADA bài bản (C)."
    },
    {
        code: "7510303KT",
        name: "Công nghệ kỹ thuật điều khiển và tự động hóa (đào tạo 2 năm đầu tại Kon Tum)",
        riasec_code: "RIC",
        reason: "Tiếp cận sớm các module thực hành cơ bản về cảm biến, mạch điện động lực và khí nén tại cơ sở xưởng (R), phân tích cấu trúc hoạt động của các thiết bị chấp hành (I) và rèn luyện thói quen làm việc ngăn nắp, kỷ luật phòng lab (C)."
    },
    {
        code: "7510402",
        name: "Công nghệ vật liệu (chuyên ngành Hóa học Vật liệu mới)",
        riasec_code: "IRC",
        reason: "Nghiên cứu cơ chế liên kết hóa học để tạo ra các loại polymer, composite và vật liệu thông minh (I), trực tiếp thao tác pha chế, gia nhiệt thử nghiệm mẫu trong phòng thí nghiệm (R) và kiểm soát các thông số chất lượng theo chuẩn đầu ra (C)."
    },

    // PHẦN 10: KHỐI NGÀNH KÝ THUẬT VÀ CHẾ BIẾN, SẢN XUẤT (ĐẦU SỐ 752, 754)
    {
        code: "7520320",
        name: "Kỹ thuật môi trường",
        riasec_code: "IRC",
        reason: "Nghiên cứu thiết kế giải pháp xử lý nước thải, khí thải (I), vận hành hệ thống trắc quan môi trường thực địa (R) và kiểm soát chỉ số theo luật định (C)."
    },
    {
        code: "7520103",
        name: "Kỹ thuật cơ khí",
        riasec_code: "RIC",
        reason: "Yêu cầu trực tiếp thiết kế, gia công, lắp ráp và sửa chữa hệ thống máy móc, thiết bị cơ khí truyền động (R), tư duy phân tích động học và tính toán độ bền chi tiết máy (I) cùng việc thực hiện hồ sơ bản vẽ kỹ thuật theo tiêu chuẩn ISO (C)."
    },
    {
        code: "7520114",
        name: "Kỹ thuật cơ điện tử",
        riasec_code: "RIC",
        reason: "Trọng tâm là tích hợp cơ khí chính xác với hệ thống điều khiển điện tử và lập trình máy tính để chế tạo robot (R), tư duy phân tích hệ thống logic tuần序 và xử lý tín hiệu cảm biến (I) kết hợp kiểm thử chất lượng hệ thống đồng bộ (C)."
    },
    {
        code: "7520201",
        name: "Kỹ thuật điện",
        riasec_code: "RIC",
        reason: "Vận hành, bảo trì và khắc phục sự cố trên mạng lưới truyền tải điện, trạm biến áp và máy điện công nghiệp (R), tính toán các thông số kỹ thuật, sụt áp và phụ tải (I) dựa trên việc tuân thủ nghiêm ngặt quy trình an toàn điện (C)."
    },
    {
        code: "7520207",
        name: "Kỹ thuật điện tử - viễn thông",
        riasec_code: "RIC",
        reason: "Thực hành thiết kế bo mạch, lắp đặt và kiểm thử hạ tầng thu phát sóng, mạng cáp quang và tổng đài viễn thông (R), nghiên cứu các thuật toán mã hóa và xử lý tín hiệu số (I) kèm việc quản lý hồ sơ kỹ thuật hệ thống (C)."
    },
    {
        code: "7520216",
        name: "Kỹ thuật điều khiển và tự động hóa",
        riasec_code: "RIC",
        reason: "Thiết kế hệ thống SCADA, đấu nối thiết bị chấp hành và lập trình PLC cho các dây chuyền sản xuất tự động trong nhà máy (R), phân tích tối ưu hóa thuật toán điều khiển vòng kín (I) và chuẩn hóa tài liệu quy trình vận hành (C)."
    },
    {
        code: "7540101",
        name: "Công nghệ thực phẩm",
        riasec_code: "IRC",
        reason: "Nghiên cứu phát triển công thức sản phẩm mới, phân tích thành phần hóa sinh và vi sinh của thực phẩm (I), vận hành hệ thống máy móc thiết bị chế biến tại nhà máy (R) và kiểm soát chất lượng, tuân thủ nghiêm ngặt quy chuẩn HACCP/ISO (C)."
    },
    {
        code: "7540101_1",
        name: "Công nghệ thực phẩm (Chương trình tiên tiến)",
        riasec_code: "IRC",
        reason: "Nghiên cứu chuyên sâu về công nghệ sinh học thực phẩm và xu hướng dinh dưỡng hiện đại (I), thực hành trên các thiết bị thí nghiệm và dây chuyền mô phỏng chuẩn quốc tế (R) kết hợp kiểm định chất lượng nghiêm ngặt theo tiêu chuẩn toàn cầu (C)."
    },

    // PHẦN 11: KHỐI NGÀNH KIẾN TRÚC VÀ XÂY DỰNG (ĐẦU SỐ 758)
    {
        code: "7580101",
        name: "Kiến trúc",
        riasec_code: "AIR",
        reason: "Sáng tạo ý tưởng thiết kế hình khối, thẩm mỹ kiến trúc không gian và công năng công trình (A), tư duy giải quyết các bài toán kỹ thuật thông gió, chiếu sáng và kết cấu (I) kết hợp ứng dụng phần mềm vẽ 3D và dựng mô hình vật lý thực tế (R)."
    },
    {
        code: "7580101_1",
        name: "Kiến trúc (Chương trình tiên tiến)",
        riasec_code: "AIR",
        reason: "Sáng tạo các giải pháp kiến trúc bền vững, đô thị xanh theo xu hướng thế giới (A), nghiên cứu lý thuyết quy hoạch và tối ưu hóa năng lượng công trình (I) kết hợp thực hành thiết kế, dựng đồ án chuẩn quốc tế (R)."
    },
    {
        code: "7580201",
        name: "Kỹ thuật công trình xây dựng",
        riasec_code: "RIC",
        reason: "Trực tiếp chỉ đạo thi công, lắp đặt kết cấu bêtông, cốt thép và giàn giáo tại công trường (R), tính toán cơ học đất, sức bền vật liệu và nội lực dầm sàn (I) cùng việc quản lý hồ sơ kỹ thuật, bản vẽ hoàn công quy chuẩn (C)."
    },
    {
        code: "7580201_1",
        name: "Kỹ thuật công trình xây dựng (Chuyên ngành Xây dựng dân dụng và công nghiệp)",
        riasec_code: "RIC",
        reason: "Trọng tâm là quy trình thi công nhà cao tầng, nhà xưởng và kết cấu thép chịu lực lớn (R), phân tích mô phỏng tải trọng động đất, gió bão bằng phần mềm (I) kết hợp kiểm soát chất lượng vật liệu đầu vào chặt chẽ (C)."
    },
    {
        code: "7580302",
        name: "Quản lý xây dựng",
        riasec_code: "RCE",
        reason: "Giám sát tiến độ thực tế, quản lý an toàn lao động và kỹ thuật tại công trường công trình (R), thiết lập hồ sơ mời thầu, bóc tách khối lượng và lập dự toán chi phí bài bản (C) kèm điều phối nhân sự, đấu thầu dự án thương mại (E)."
    },

    // PHẦN 12: KHỐI NGÀNH NÔNG NGHIỆP VÀ DỊCH VỤ, DU LỊCH (ĐẦU SỐ 762, 781)
    {
        code: "7810101",
        name: "Du lịch",
        riasec_code: "ESC",
        reason: "Thiết kế tour, điều hành và kinh doanh dịch vụ lữ hành (E), hướng dẫn đoàn và chăm sóc trải nghiệm khách hàng (S) kèm quản lý thủ tục vé, lịch trình (C)."
    },
    {
        code: "7620110",
        name: "Khoa học cây trồng",
        riasec_code: "IRC",
        reason: "Nghiên cứu cơ chế sinh trưởng, di truyền và phòng trừ dịch bệnh trên cây trồng (I), trực tiếp thực hành lai tạo, chăm sóc và canh tác tại vườn ươm, đồng ruộng (R) cùng việc tuân thủ các quy trình kỹ thuật nông nghiệp hữu cơ quy chuẩn (C)."
    },
    {
        code: "7810103",
        name: "Quản trị dịch vụ du lịch và lữ hành",
        riasec_code: "ESC",
        reason: "Thiên hướng điều hành doanh nghiệp lữ hành, thiết lập mối quan hệ đối tác và bán tour dịch vụ (E), trực tiếp giao tiếp, hướng dẫn đoàn và chăm sóc trải nghiệm khách hàng (S) dựa trên việc quản lý lịch trình, thủ tục vé máy bay, visa ngăn nắp (C)."
    },
    {
        code: "7810201",
        name: "Quản trị khách sạn",
        riasec_code: "ESC",
        reason: "Hoạch định chiến lược kinh doanh, tối ưu hóa doanh thu phòng và quản lý nhân sự khách sạn (E), đón tiếp, hỗ trợ và giải quyết các khiếu nại của lưu trú khách chu đáo (S) đi kèm việc giám sát quy trình buồng phòng, lễ tân theo chuẩn 5 sao (C)."
    },

    // PHẦN 13: KHỐI NGÀNH GIÁO DỤC(ĐẦU SỐ 714)
    {
        code: "7140101",
        name: "Giáo dục học",
        riasec_code: "SAI",
        reason: "Nghiên cứu phương pháp giảng dạy (I), phát triển con người, hỗ trợ cộng đồng (S) và thiết kế giáo trình sáng tạo (A)."
    },
    {
        code: "7140201",
        name: "Giáo dục Mầm non",
        riasec_code: "SAE",
        reason: "Trực tiếp chăm sóc, giáo dục trẻ nhỏ (S), tổ chức các hoạt động múa hát nghệ thuật (A) và quản lý lớp học mầm non (E)."
    },
    {
        code: "7140202",
        name: "Giáo dục Tiểu học",
        riasec_code: "SAI",
        reason: "Tương tác, truyền đạt kiến thức nền tảng cho học sinh tiểu học (S), tư duy sư phạm giải quyết vấn đề (I) và sáng tạo bài giảng (A)."
    },
    {
        code: "7140217",
        name: "Sư phạm Ngữ văn",
        riasec_code: "ASI",
        reason: "Sáng tác, cảm thụ tác phẩm văn học nghệ thuật ngôn từ (A), truyền đạt văn hóa xã hội (S) và nghiên cứu ngôn ngữ học (I)."
    },
    {
        code: "7420201",
        name: "Công nghệ sinh học",
        riasec_code: "IRC",
        reason: "Nghiên cứu vi sinh, tế bào và công nghệ gen phòng lab (I), trực tiếp sử dụng thiết bị nuôi cấy công nghệ cao (R) và kiểm soát tiêu chuẩn chất lượng sinh học (C)."
    },
    {
        code: "7460101",
        name: "Toán học",
        riasec_code: "ICE",
        reason: "Nghiên cứu thuật toán, lý thuyết toán học thuần túy (I), xử lý dữ liệu số chính xác bài bản (C) và ứng dụng tối ưu hóa bài toán kinh tế (E)."
    },
    {
        code: "7549001",
        name: "Công nghệ chế biến lâm sản",
        riasec_code: "RIC",
        reason: "Thao tác trực tiếp quy trình công nghệ chế biến gỗ, sợi và lâm sản (R), nghiên cứu tính chất cơ lý vật liệu (I) và quản lý định mức kỹ thuật xưởng (C)."
    },
    {
        code: "7760101",
        name: "Công tác xã hội",
        riasec_code: "SIE",
        reason: "Hỗ trợ, tư vấn bảo vệ quyền lợi các đối tượng yếu thế xã hội (S), khảo sát nghiên cứu thực trạng đời sống cộng đồng (I) và điều phối dự án nhân đạo (E)."
    },
    {
        code: "7850101",
        name: "Quản lý tài nguyên và môi trường",
        riasec_code: "ERC",
        reason: "Quản lý quy hoạch dự án khai thác tài nguyên thiên nhiên (E), khảo sát đo đạc hiện trạng môi trường thực địa (R) và kiểm soát hồ sơ pháp lý môi trường (C)."
    },
    {
        code: "7850103",
        name: "Quản lý đất đai",
        riasec_code: "RCE",
        reason: "Đo đạc địa chính, lập bản đồ số hiện trạng đất đai thực tế (R), thẩm định giá, quản lý hồ sơ pháp lý nhà đất (C) và giao dịch, tư vấn bất động sản (E)."
    },
    {
        code: "7310301",
        name: "Xã hội học",
        riasec_code: "SIA",
        reason: "Khảo sát, nghiên cứu và giải quyết các vấn đề biến đổi cấu trúc xã hội (S), tư duy lý luận phân tích dữ liệu hành vi cộng đồng (I) và nhạy cảm với các yếu tố văn hóa, nghệ thuật đời sống (A)."
    },
    {
        code: "7310614",
        name: "Hàn Quốc học",
        riasec_code: "ASE",
        reason: "Thấu hiểu sâu sắc ngôn ngữ, lịch sử và bản sắc văn hóa Hàn Quốc (A), hỗ trợ kết nối, giảng dạy hoặc biên dịch (S) kết hợp tham gia điều phối, phát triển quan hệ hợp tác doanh nghiệp (E)."
    },
    {
        code: "7310615",
        name: "Nhật Bản học",
        riasec_code: "ASE",
        reason: "Cảm thụ và nghiên cứu sâu về văn hóa, tư duy con người Nhật Bản (A), làm việc trong môi trường ngoại giao, dịch vụ hoặc giáo dục hỗ trợ (S) song song với quản lý các dự án hợp tác kinh tế Việt - Nhật (E)."
    },
    {
        code: "7720201",
        name: "Dược học",
        riasec_code: "IRC",
        reason: "Nghiên cứu cơ chế tác động của dược chất, bào chế thuốc phòng thí nghiệm (I), thực hành bốc thuốc, cấp phát lâm sàng chính xác tại nhà thuốc (R) và tuân thủ tuyệt đối quy trình kiểm nghiệm an toàn ngành y tế (C)."
    },
    {
        code: "7720203",
        name: "Hóa dược",
        riasec_code: "IRC",
        reason: "Đi sâu vào thiết kế, tổng hợp các hợp chất hóa học ứng dụng làm nguyên liệu thuốc (I), trực tiếp thao tác vận hành máy móc chiết tách công nghệ cao (R) và kiểm soát chặt chẽ các chỉ số tiêu chuẩn phòng thí nghiệm (C)."
    }
];