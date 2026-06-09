export interface HollandResultDetail {
  name: string;
  vietnameseName: string;
  description: string;
  careers: string[];
}

export const HOLLAND_RESULTS_MAP: Record<string, HollandResultDetail> = {
  R: {
    name: 'Realistic',
    vietnameseName: 'Người thực tế',
    description: 'Thường có khả năng về kỹ thuật, công nghệ, hệ thống; ưa thích làm việc với đồ vật, máy móc, động thực vật; thích làm các công việc ngoài trời.',
    careers: [
      'Kiến trúc', 'An toàn lao động', 'Nghề mộc', 'Xây dựng', 'Thủy sản', 
      'Kỹ thuật', 'Máy tàu thủy', 'Lái xe', 'Huấn luyện viên', 'Nông – Lâm nghiệp', 
      'Cơ khí (Chế tạo máy, bảo trì, sửa chữa)', 'Điện - Điện tử', 
      'Địa lý - Địa chất (Đo đạc, vẽ bản đồ)', 'Dầu khí', 'Hải dương học', 'Quản lý công nghiệp'
    ]
  },
  I: {
    name: 'Investigative',
    vietnameseName: 'Người nghiên cứu',
    description: 'Có khả năng về quan sát, khám phá, phân tích đánh giá và giải quyết các vấn đề.',
    careers: [
      'Khoa học tự nhiên (Toán, Lý, Hóa, Sinh, Địa lý, Thống kê...)', 
      'Khoa học xã hội (Nhân học, Tâm lý...)', 
      'Y - Dược (Bác sĩ gây mê, hồi sức, phẫu thuật, nha sĩ...)', 
      'Khoa học công nghệ (Công nghệ thông tin, Môi trường, Điện, Vật lý kỹ thuật...)', 
      'Nông lâm (Nông học, Thú y...)'
    ]
  },
  A: {
    name: 'Artistic',
    vietnameseName: 'Người có tính nghệ sĩ',
    description: 'Có khả năng về nghệ thuật, khả năng về trực giác, khả năng tưởng tượng cao, thích làm việc trong các môi trường mang tính ngẫu hứng, không khuôn mẫu.',
    careers: [
      'Văn chương', 'Báo chí (Bình luận viên, dẫn chương trình...)', 
      'Điện ảnh', 'Sân khấu', 'Mỹ thuật', 'Ca nhạc', 'Múa', 'Kiến trúc', 
      'Thời trang', 'Hội họa', 'Giáo viên dạy Sử / Anh văn', 'Bảo tàng', 'Bảo tồn'
    ]
  },
  S: {
    name: 'Social',
    vietnameseName: 'Người có tính xã hội',
    description: 'Có khả năng về ngôn ngữ, giảng giải, thích làm những việc như giảng dạy, cung cấp thông tin, sự chăm sóc, giúp đỡ, hoặc huấn luyện cho người khác.',
    careers: [
      'Sư phạm / Giảng viên', 'Huấn luyện viên điền kinh', 'Tư vấn - Hướng nghiệp', 
      'Công tác xã hội', 'Sức khỏe cộng đồng', 'Thuyền trưởng', 'Thư viện', 
      'Bác sĩ chuyên khoa', 'Thẩm định giá', 'Nghiên cứu quy hoạch đô thị', 
      'Kinh tế gia đình', 'Tuyển dụng nhân sự', 'Cảnh sát', 'Xã hội học', 'Chuyên gia dinh dưỡng'
    ]
  },
  E: {
    name: 'Enterprising',
    vietnameseName: 'Dám nghĩ, dám làm',
    description: 'Có khả năng về kinh doanh, mạnh bạo, dám nghĩ dám làm, có thể gây ảnh hưởng, thuyết phục người khác, có khả năng quản lý.',
    careers: [
      'Quản trị kinh doanh (Quản lý khách sạn, quản trị nhân sự...)', 
      'Thương mại', 'Marketing', 'Kế toán – Tài chính', 'Luật sư', 
      'Dịch vụ khách hàng', 'Tiếp viên hàng không', 'Thông dịch viên', 
      'Pha chế rượu', 'Kỹ sư công nghiệp', 'Bác sĩ cấp cứu', 
      'Quy hoạch đô thị', 'Bếp trưởng', 'Báo chí (Phóng viên, biên tập viên...)'
    ]
  },
  C: {
    name: 'Conventional',
    vietnameseName: 'Người công chức / Quy trình',
    description: 'Có khả năng về số học, thích thực hiện những công việc chi tiết, thích làm việc với những số liệu, theo chỉ dẫn của người khác hoặc các công việc văn phòng.',
    careers: [
      'Hành chính', 'Thống kê', 'Thanh tra ngành', 'Người giữ trẻ', 
      'Điện thoại viên', 'Kế toán văn phòng', 'Lưu trữ văn thư', 'Quản lý kho dữ liệu'
    ]
  }
};