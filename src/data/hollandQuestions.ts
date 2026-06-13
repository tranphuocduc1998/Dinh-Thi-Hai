export interface HollandQuestion {
  id: string; // Sử dụng mã Q01, Q02... để đồng bộ với file dữ liệu
  category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  question: string;
  isCore?: boolean;
}

export const HOLLAND_QUESTIONS: HollandQuestion[] = [
  // --- Nhóm R: Thực tế (7 câu) ---
  // Câu cốt lõi: Q01, Q03
  // Lý do:
  // - Đây là các câu có tính thực hành, thao tác, kỹ thuật rất rõ.
  // - Ít chồng lấp với các nhóm khác.
  { id: 'Q01', category: 'R', question: 'Tôi thích sửa chữa đồ vật, máy móc hoặc thiết bị.', isCore: true },
  { id: 'Q02', category: 'R', question: 'Tôi thích làm việc thực hành hơn là ngồi bàn giấy.' },
  { id: 'Q03', category: 'R', question: 'Tôi thích các công việc cần dùng tay và công cụ.', isCore: true },
  { id: 'Q04', category: 'R', question: 'Tôi thích lắp ráp, tháo dỡ hoặc chế tạo sản phẩm.' },
  { id: 'Q05', category: 'R', question: 'Tôi cảm thấy hứng thú khi làm việc ngoài trời.' },
  { id: 'Q06', category: 'R', question: 'Tôi thích những công việc có tính kỹ thuật và thao tác cụ thể.' },
  { id: 'Q07', category: 'R', question: 'Tôi thích nhìn thấy kết quả thực tế sau khi hoàn thành công việc.' },

  // --- Nhóm I: Khám phá / Nghiên cứu (7 câu) ---
  // Câu cốt lõi: Q08, Q09
  // Lý do:
  // - Hai câu này thể hiện tư duy phân tích và điều tra, đúng bản chất nhóm I.
  { id: 'Q08', category: 'I', question: 'Tôi thích tìm hiểu nguyên nhân của các vấn đề phức tạp.', isCore: true },
  { id: 'Q09', category: 'I', question: 'Tôi thích phân tích số liệu và thông tin.', isCore: true },
  { id: 'Q10', category: 'I', question: 'Tôi thích học các môn khoa học hoặc nghiên cứu.' },
  { id: 'Q11', category: 'I', question: 'Tôi thích đặt câu hỏi và tìm lời giải cho các hiện tượng.' },
  { id: 'Q12', category: 'I', question: 'Tôi thích công việc cần tư duy logic và suy luận.' },
  { id: 'Q13', category: 'I', question: 'Tôi thích khám phá kiến thức mới một cách độc lập.' },
  { id: 'Q14', category: 'I', question: 'Tôi thích giải quyết vấn đề bằng phân tích hơn là cảm tính.' },

  // --- Nhóm A: Nghệ thuật (7 câu) ---
  // Câu cốt lõi: Q15, Q19
  // Lý do:
  // - Một câu về sáng tạo hình ảnh, một câu về sáng tạo ngôn ngữ; đều rất đại diện cho A.
  { id: 'Q15', category: 'A', question: 'Tôi thích vẽ, thiết kế hoặc tạo ra sản phẩm mang tính sáng tạo.', isCore: true },
  { id: 'Q16', category: 'A', question: 'Tôi thích các hoạt động nghệ thuật, âm nhạc hoặc biểu diễn.' },
  { id: 'Q17', category: 'A', question: 'Tôi thích thể hiện ý tưởng theo cách độc đáo của riêng mình.' },
  { id: 'Q18', category: 'A', question: 'Tôi thích những công việc không quá rập khuôn.' },
  { id: 'Q19', category: 'A', question: 'Tôi thích viết lách, sáng tác hoặc kể chuyện.', isCore: true },
  { id: 'Q20', category: 'A', question: 'Tôi thích làm việc trong môi trường khuyến khích sáng tạo.' },
  { id: 'Q21', category: 'A', question: 'Tôi thường có nhiều ý tưởng mới cho một vấn đề.' },

  // --- Nhóm S: Xã hội (7 câu) ---
  // Câu cốt lõi: Q22, Q25
  // Lý do:
  // - Đây là cặp câu thể hiện rõ hành vi hỗ trợ và tương tác xã hội.
  { id: 'Q22', category: 'S', question: 'Tôi thích giúp đỡ người khác khi họ gặp khó khăn.', isCore: true },
  { id: 'Q23', category: 'S', question: 'Tôi thích làm việc cùng người khác hơn là làm một mình.' },
  { id: 'Q24', category: 'S', question: 'Tôi thích lắng nghe và chia sẻ với mọi người.' },
  { id: 'Q25', category: 'S', question: 'Tôi thích các công việc liên quan đến chăm sóc, hướng dẫn hoặc tư vấn.', isCore: true },
  { id: 'Q26', category: 'S', question: 'Tôi cảm thấy vui khi làm việc vì lợi ích của người khác.' },
  { id: 'Q27', category: 'S', question: 'Tôi thích tham gia các hoạt động nhóm và cộng đồng.' },
  { id: 'Q28', category: 'S', question: 'Tôi dễ đồng cảm với cảm xúc của người khác.' },

  // --- Nhóm E: Quản lý / Thuyết phục (7 câu) ---
  // Câu cốt lõi: Q29, Q30
  // Lý do:
  // - Hai câu này phản ánh năng lực ảnh hưởng, lãnh đạo và điều phối.
  { id: 'Q29', category: 'E', question: 'Tôi thích thuyết phục người khác chấp nhận ý kiến của mình.', isCore: true },
  { id: 'Q30', category: 'E', question: 'Tôi thích dẫn dắt hoặc tổ chức nhóm làm việc.', isCore: true },
  { id: 'Q31', category: 'E', question: 'Tôi thích các công việc liên quan đến kinh doanh hoặc bán hàng.' },
  { id: 'Q32', category: 'E', question: 'Tôi thích cạnh tranh và thử thách để đạt mục tiêu.' },
  { id: 'Q33', category: 'E', question: 'Tôi thích đưa ra quyết định nhanh trong công việc.' },
  { id: 'Q34', category: 'E', question: 'Tôi thích nói trước đám đông hoặc trình bày ý tưởng.' },
  { id: 'Q35', category: 'E', question: 'Tôi thích tạo ảnh hưởng và thúc đẩy người khác hành động.' },

  // --- Nhóm C: Nghiệp vụ / Quy trình (7 câu) ---
  // Câu cốt lõi: Q36, Q38
  // Lý do:
  // - Đây là 2 câu mô tả rõ tính hệ thống, cấu trúc, và tổ chức.
  { id: 'Q36', category: 'C', question: 'Tôi thích làm việc theo kế hoạch và quy trình rõ ràng.', isCore: true },
  { id: 'Q37', category: 'C', question: 'Tôi thích công việc cần sự chính xác và cẩn thận.' },
  { id: 'Q38', category: 'C', question: 'Tôi thích sắp xếp, phân loại và quản lý thông tin.', isCore: true },
  { id: 'Q39', category: 'C', question: 'Tôi thích làm việc với số liệu, bảng biểu hoặc dữ liệu.' },
  { id: 'Q40', category: 'C', question: 'Tôi cảm thấy thoải mái khi mọi thứ được tổ chức ngăn nắp.' },
  { id: 'Q41', category: 'C', question: 'Tôi thích hoàn thành công việc đúng hạn và đúng quy định.' },
  { id: 'Q42', category: 'C', question: 'Tôi thích những công việc có tính ổn định và rõ ràng.' }
];

// Khai báo mảng cấu trúc thang điểm Likert 5 mức để render giao diện tự động
export const LIKERT_OPTIONS = [
  { value: '1', label: 'Hoàn toàn không đồng ý' },
  { value: '2', label: 'Không đồng ý' },
  { value: '3', label: 'Phân vân / Trung lập' },
  { value: '4', label: 'Đồng ý' },
  { value: '5', label: 'Hoàn toàn đồng ý' }
];