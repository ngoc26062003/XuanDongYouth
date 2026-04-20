import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Search, Star } from "lucide-react";

type CourseVm = {
  id: string;
  title: string;
  tag: string;
  description: string;
  lessonsCount: number;
  duration: string;
  students: number;
  rating: number;
  emoji: string;
  gradient: string;
  imageUrl?: string;
};

export default function Page() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const filters = ["Tất cả", "Tài khoản", "Hộ tịch", "Đất đai", "Bảo hiểm", "Lệ phí", "Khác"];

  const courses = useMemo<CourseVm[]>(
    () => [
      {
        id: "c1",
        tag: "Tài khoản",
        title: "Tạo tài khoản Dịch vụ công bằng VNeID",
        description: "Hướng dẫn chi tiết từng bước cách đăng nhập và tạo tài khoản DVC Quốc gia thông qua ứng dụng VNeID.",
        lessonsCount: 3,
        duration: "10 phút",
        students: 1240,
        rating: 5.0,
        emoji: "🤖",
        gradient: "from-indigo-100 to-rose-100",
        imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "c2",
        tag: "Hộ tịch",
        title: "Thủ tục Đăng ký khai sinh trực tuyến",
        description: "Video hướng dẫn điền tờ khai điện tử và đính kèm hồ sơ hợp lệ để đăng ký khai sinh cho trẻ mới sinh.",
        lessonsCount: 4,
        duration: "15 phút",
        students: 870,
        rating: 4.8,
        emoji: "⚡",
        gradient: "from-amber-100 to-orange-100",
        imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "c3",
        tag: "Hộ tịch",
        title: "Đăng ký kết hôn trên cổng DVC Quốc gia",
        description: "Quy trình nộp hồ sơ xin cấp giấy chứng nhận kết hôn dành cho công dân cư trú tại xã.",
        lessonsCount: 5,
        duration: "20 phút",
        students: 520,
        rating: 4.9,
        emoji: "📣",
        gradient: "from-rose-100 to-amber-50",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "c4",
        tag: "Lệ phí",
        title: "Hướng dẫn thanh toán lệ phí an toàn",
        description: "Cách sử dụng ngân hàng số, Momo hoặc VNPay để thanh toán biên lai lệ phí hành chính công.",
        lessonsCount: 2,
        duration: "8 phút",
        students: 1560,
        rating: 4.7,
        emoji: "🛒",
        gradient: "from-blue-100 to-indigo-100",
        imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "c5",
        tag: "Đất đai",
        title: "Thanh toán nghĩa vụ tài chính về đất đai",
        description: "Thao tác tra cứu và thanh toán thuế, lệ phí trước bạ khi làm thủ tục chuyển nhượng quyền sử dụng đất.",
        lessonsCount: 3,
        duration: "12 phút",
        students: 940,
        rating: 4.7,
        emoji: "📊",
        gradient: "from-emerald-100 to-teal-100",
        imageUrl: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "c6",
        tag: "Bảo hiểm",
        title: "Cấp lại, đổi thẻ BHYT do mất/hỏng",
        description: "Hướng dẫn đề nghị cơ quan BHXH cấp lại thẻ Bảo hiểm y tế trực tuyến gửi về tận nhà.",
        lessonsCount: 4,
        duration: "15 phút",
        students: 620,
        rating: 4.9,
        emoji: "📸",
        gradient: "from-pink-100 to-rose-100",
        imageUrl: "https://images.unsplash.com/photo-1512413913411-209258957864?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "c7",
        tag: "Khác",
        title: "Thủ tục xin cấp Phiếu Lý lịch tư pháp",
        description: "Quy trình khai báo và xin cấp Phiếu lý lịch tư pháp hoàn toàn qua mạng internet.",
        lessonsCount: 5,
        duration: "18 phút",
        students: 3420,
        rating: 4.9,
        emoji: "📦",
        gradient: "from-orange-100 to-rose-100",
        imageUrl: "https://images.unsplash.com/photo-1556742031-c6961e85bb06?q=80&w=600&auto=format&fit=crop"
      }
    ],
    []
  );

  const filteredCourses = courses.filter((c) => {
    const matchFilter = activeFilter === "Tất cả" || c.tag === activeFilter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-rose-500">Thư viện số</div>
        <h1 className="font-serif text-3xl text-indigo-900 mt-2">Video Hướng dẫn Dịch vụ công trực tuyến</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu, thủ tục..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-rose-100 bg-white text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
          />
        </div>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${activeFilter === f ? "bg-rose-500 border-rose-500 text-white" : "bg-white border-rose-100 text-gray-600 hover:bg-rose-50"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((c) => (
          <Link to={`/courses/${c.id}`} key={c.id} className="group flex flex-col bg-white rounded-2xl border border-rose-100 overflow-hidden hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300 hover:-translate-y-1">
            <div className={`h-32 flex items-center justify-center text-5xl relative overflow-hidden bg-gradient-to-br ${c.gradient}`}>
                <span className="z-0 drop-shadow-sm">{c.emoji}</span>
                {c.imageUrl && <img src={c.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10" onError={(e) => e.currentTarget.style.display = 'none'} />}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="text-[10px] font-semibold text-rose-500 tracking-wider uppercase mb-2">{c.tag}</div>
              <h3 className="font-serif text-lg font-bold text-indigo-900 leading-tight mb-2 group-hover:text-rose-600 transition-colors">{c.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2 mb-4 flex-1 leading-relaxed">{c.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-medium">{c.lessonsCount} bước</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-medium">{c.duration}</span>
                <span className="px-2 py-1 bg-rose-50 text-rose-600 rounded-md text-[10px] font-medium">Miễn phí</span>
              </div>
              <div className="pt-4 border-t border-rose-50 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-gray-700">{c.rating}</span>
                  <span>({c.students.toLocaleString("vi-VN")})</span>
                </div>
                <span className="text-xs font-semibold text-indigo-900 bg-indigo-50 px-3 py-1.5 rounded-lg group-hover:bg-indigo-900 group-hover:text-white transition-colors">Xem Video</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}