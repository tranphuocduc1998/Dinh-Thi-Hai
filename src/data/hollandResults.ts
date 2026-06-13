export interface HollandResultDetail {
  name: string;
  vietnameseName: string;
  description: string;
}

export const HOLLAND_RESULTS_MAP: Record<string, HollandResultDetail> = {
  R: {
    name: 'Realistic',
    vietnameseName: 'Tính cách thực tế',
    description: 'Có tính tự lập, thực tế, có đầu óc cơ khí và thao tác kỹ thuật tốt. Thích làm việc với công cụ, máy móc, bản vẽ hoặc động vật, cây cối ngoài trời hơn là ngồi bàn giấy. Phù hợp với các ngành: Kỹ thuật, Công nghệ ô tô, Công nghệ thông tin, Cơ khí, Nông nghiệp, Chế tạo và Logistics.',
  },
  I: {
    name: 'Investigative',
    vietnameseName: 'Tính cách nghiên cứu',
    description: 'Thích quan sát, tìm tòi, khám phá và phân tích các vấn đề phức tạp. Có tư duy logic, suy nghĩ mạch lạc, chặt chẽ, thích giải quyết các bài toán khoa học một cách độc lập. Phù hợp với các ngành: Y khoa, Sinh học hải dương, Hóa học, Công nghệ vi mạch bán dẫn, Tâm lý học học thuật và Nghiên cứu dữ liệu.',
  },
  A: {
    name: 'Artistic',
    vietnameseName: 'Tính cách nghệ sĩ',
    description: 'Giàu trí tưởng tượng, dễ xúc động, thích làm việc trong môi trường tự do, sáng tạo, không rập khuôn mẫu. Có năng khiếu hoặc nhạy cảm cao với nghệ thuật, âm nhạc, văn học hoặc thiết kế. Phù hợp với các ngành: Kiến trúc, Thiết kế nội thất, Truyền thông đa phương tiện, Báo chí, Đồ họa và Nghệ thuật biểu diễn.',
  },
  S: {
    name: 'Social',
    vietnameseName: 'Tính cách xã hội',
    description: 'Thích giúp đỡ, chăm sóc, lắng nghe và chia sẻ với người khác. Có khả năng giao tiếp tốt, dễ đồng cảm, thích làm việc đội nhóm hoặc tham gia hoạt động cộng đồng thay vì làm việc với máy móc. Phù hợp với các ngành: Sư phạm/Giáo dục, Điều dưỡng, Trị liệu tâm lý, Quản trị dịch vụ du lịch, Quan hệ công chúng và Dịch vụ khách hàng.',
  },
  E: {
    name: 'Enterprising',
    vietnameseName: 'Tính cách dám nghĩ, dám làm',
    description: 'Có thiên hướng lãnh đạo, mạnh bạo, quyết đoán và thích đương đầu với thử thách. Có khả năng diễn thuyết, thuyết phục người khác tốt; đam mê kinh doanh, quản lý và thúc đẩy tổ chức hành động. Phù hợp với các ngành: Quản trị kinh doanh, Marketing, Luật sư, Tài chính - Ngân hàng, Thương mại quốc tế và Kinh doanh bất động sản.',
  },
  C: {
    name: 'Conventional',
    vietnameseName: 'Tính cách cẩn trọng và nguyên tắc',
    description: 'Thích làm việc với số liệu, quy trình rõ ràng, có kế hoạch và tổ chức ngăn nắp. Có sự tỉ mỉ, chú ý đến từng chi tiết nhỏ, thực hiện tốt các công việc văn phòng, hành chính hoặc theo chỉ dẫn. Phù hợp với các ngành: Kế toán, Kiểm toán, Quản trị văn phòng, Thống kê dữ liệu, Thanh tra/Thẩm định và Quản lý hồ sơ y tế.',
  }
};