This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Cấu trúc thư mục
job-prediction-frontend/
├── src/
│   ├── app/                      # Nơi định tuyến các trang (App Router)
│   │   ├── page.tsx              # Trang chủ (Giới thiệu hệ thống)
│   │   ├── holland-test/         # TẦNG 1: Giao diện 30 câu hỏi trắc nghiệm
│   │   │   └── page.tsx
│   │   ├── knowledge-filter/     # TẦNG 2: Giao diện nhập điều kiện & hiển thị Nhóm ngành
│   │   │   └── page.tsx
│   │   └── score-ranking/        # TẦNG 3: Giao diện nhập điểm bạ & hiển thị Top 3 trường
│   │       └── page.tsx
│   │
│   ├── components/               # Các thành phần giao diện dùng chung
│   │   ├── ui/                   # Chứa nút bấm, thanh tiến trình (từ Shadcn/NextUI)
│   │   ├── QuestionCard.tsx      # Thẻ hiển thị câu hỏi trắc nghiệm
│   │   └── MajorGroupBox.tsx     # Hộp hiển thị nhóm ngành ở tầng 2
│   │
│   ├── data/                     # Chứa dữ liệu tĩnh cục bộ nếu cần
│   │   ├── hollandQuestions.ts   # Lưu 30 câu hỏi dạng JSON giống như bên Python
│   │   └── hollandResults.ts     # Lưu kết quả nhóm ngành theo test holland
│   │
│   └── services/                 # Nơi viết các hàm gọi API sang Backend Django
│       └── api.ts                # Hàm gửi kết quả test, gửi điểm số sang Python