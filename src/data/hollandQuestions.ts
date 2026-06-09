export interface HollandQuestion {
  id: string; // Sử dụng mã Q01, Q02... để đồng bộ với file dữ liệu
  category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  question: string;
}

export const HOLLAND_QUESTIONS: HollandQuestion[] = [
  // --- Nhóm R: Thực tế (7 câu) ---
  { id: 'Q01', category: 'R', question: 'Tôi thích sửa chữa đồ vật, máy móc hoặc thiết bị.' },
  { id: 'Q02', category: 'R', question: 'Tôi thích làm việc thực hành hơn là ngồi bàn giấy.' },
  { id: 'Q03', category: 'R', question: 'Tôi thích các công việc cần dùng tay và công cụ.' },
  { id: 'Q04', category: 'R', question: 'Tôi thích lắp ráp, tháo dỡ hoặc chế tạo sản phẩm.' },
  { id: 'Q05', category: 'R', question: 'Tôi cảm thấy hứng thú khi làm việc ngoài trời.' },
  { id: 'Q06', category: 'R', question: 'Tôi thích những công việc có tính kỹ thuật và thao tác cụ thể.' },
  { id: 'Q07', category: 'R', question: 'Tôi thích nhìn thấy kết quả thực tế sau khi hoàn thành công việc.' },

  // --- Nhóm I: Khám phá / Nghiên cứu (7 câu) ---
  { id: 'Q08', category: 'I', question: 'Tôi thích tìm hiểu nguyên nhân của các vấn đề phức tạp.' },
  { id: 'Q09', category: 'I', question: 'Tôi thích phân tích số liệu và thông tin.' },
  { id: 'Q10', category: 'I', question: 'Tôi thích học các môn khoa học hoặc nghiên cứu.' },
  { id: 'Q11', category: 'I', question: 'Tôi thích đặt câu hỏi và tìm lời giải cho các hiện tượng.' },
  { id: 'Q12', category: 'I', question: 'Tôi thích công việc cần tư duy logic và suy luận.' },
  { id: 'Q13', category: 'I', question: 'Tôi thích khám phá kiến thức mới một cách độc lập.' },
  { id: 'Q14', category: 'I', question: 'Tôi thích giải quyết vấn đề bằng phân tích hơn là cảm tính.' },

  // --- Nhóm A: Nghệ thuật (7 câu) ---
  { id: 'Q15', category: 'A', question: 'Tôi thích vẽ, thiết kế hoặc tạo ra sản phẩm mang tính sáng tạo.' },
  { id: 'Q16', category: 'A', question: 'Tôi thích các hoạt động nghệ thuật, âm nhạc hoặc biểu diễn.' },
  { id: 'Q17', category: 'A', question: 'Tôi thích thể hiện ý tưởng theo cách độc đáo của riêng mình.' },
  { id: 'Q18', category: 'A', question: 'Tôi thích những công việc không quá rập khuôn.' },
  { id: 'Q19', category: 'A', question: 'Tôi thích viết lách, sáng tác hoặc kể chuyện.' },
  { id: 'Q20', category: 'A', question: 'Tôi thích làm việc trong môi trường khuyến khích sáng tạo.' },
  { id: 'Q21', category: 'A', question: 'Tôi thường có nhiều ý tưởng mới cho một vấn đề.' },

  // --- Nhóm S: Xã hội (7 câu) ---
  { id: 'Q22', category: 'S', question: 'Tôi thích giúp đỡ người khác khi họ gặp khó khăn.' },
  { id: 'Q23', category: 'S', question: 'Tôi thích làm việc cùng người khác hơn là làm một mình.' },
  { id: 'Q24', category: 'S', question: 'Tôi thích lắng nghe và chia sẻ với mọi người.' },
  { id: 'Q25', category: 'S', question: 'Tôi thích các công việc liên quan đến chăm sóc, hướng dẫn hoặc tư vấn.' },
  { id: 'Q26', category: 'S', question: 'Tôi cảm thấy vui khi làm việc vì lợi ích của người khác.' },
  { id: 'Q27', category: 'S', question: 'Tôi thích tham gia các hoạt động nhóm và cộng đồng.' },
  { id: 'Q28', category: 'S', question: 'Tôi dễ đồng cảm với cảm xúc của người khác.' },

  // --- Nhóm E: Quản lý / Thuyết phục (7 câu) ---
  { id: 'Q29', category: 'E', question: 'Tôi thích thuyết phục người khác chấp nhận ý kiến của mình.' },
  { id: 'Q30', category: 'E', question: 'Tôi thích dẫn dắt hoặc tổ chức nhóm làm việc.' },
  { id: 'Q31', category: 'E', question: 'Tôi thích các công việc liên quan đến kinh doanh hoặc bán hàng.' },
  { id: 'Q32', category: 'E', question: 'Tôi thích cạnh tranh và thử thách để đạt mục tiêu.' },
  { id: 'Q33', category: 'E', question: 'Tôi thích đưa ra quyết định nhanh trong công việc.' },
  { id: 'Q34', category: 'E', question: 'Tôi thích nói trước đám đông hoặc trình bày ý tưởng.' },
  { id: 'Q35', category: 'E', question: 'Tôi thích tạo ảnh hưởng và thúc đẩy người khác hành động.' },

  // --- Nhóm C: Nghiệp vụ / Quy trình (7 câu) ---
  { id: 'Q36', category: 'C', question: 'Tôi thích làm việc theo kế hoạch và quy trình rõ ràng.' },
  { id: 'Q37', category: 'C', question: 'Tôi thích công việc cần sự chính xác và cẩn thận.' },
  { id: 'Q38', category: 'C', question: 'Tôi thích sắp xếp, phân loại và quản lý thông tin.' },
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