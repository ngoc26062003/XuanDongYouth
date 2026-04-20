import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Flower2, 
  Palette, 
  Sprout, 
  MapPin,
  Star,
  Store,
  BookOpen
} from "lucide-react";
import StoryPanel from "@/components/StoryPanel";

const featuredShops = [
  { id: 1, category: "Thủ công mỹ nghệ", name: "Len Sắc Màu Hội An", owner: "Nguyễn Thị Lan", location: "Quảng Nam", imageUrl: "https://images.unsplash.com/photo-1531685250784-afb348722080?q=80&w=600&auto=format&fit=crop" },
  { id: 2, category: "Nông sản đặc sản", name: "Cà Phê Buôn Ma Thuột", owner: "H'Bia Niê", location: "Đắk Lắk", imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop" },
  { id: 3, category: "Mỹ phẩm thiên nhiên", name: "Vườn Hoa Đà Lạt", owner: "Trần Thị Hương", location: "Lâm Đồng", imageUrl: "https://images.unsplash.com/photo-1512496015851-a1c848daae54?q=80&w=600&auto=format&fit=crop" },
  { id: 4, category: "Gốm sứ truyền thống", name: "Gốm Bát Tràng Gia Truyền", owner: "Lê Thị Nhung", location: "Hà Nội", imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0e49be848e?q=80&w=600&auto=format&fit=crop" },
  { id: 6, category: "Thời trang dân tộc", name: "Thổ Cẩm Sapa Xanh", owner: "Sùng Thị Mỷ", location: "Lào Cai", imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=600&auto=format&fit=crop" }
];

const featuredCourses = [
  { id: "c1", tag: "Tài khoản", title: "Hướng dẫn tạo tài khoản DVC bằng VNeID", duration: "10 phút", lessons: 3, rating: 5.0, students: 1240, imageUrl: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=600&auto=format&fit=crop" },
  { id: "c2", tag: "Hộ tịch", title: "Thủ tục Đăng ký khai sinh trực tuyến", duration: "15 phút", lessons: 4, rating: 4.8, students: 870, imageUrl: "https://images.unsplash.com/photo-1555252113-d5fc399e5251?q=80&w=600&auto=format&fit=crop" },
  { id: "c3", tag: "Hộ tịch", title: "Đăng ký kết hôn trên cổng DVC Quốc gia", duration: "20 phút", lessons: 5, rating: 4.9, students: 520, imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop" },
  { id: "c4", tag: "Lệ phí", title: "Hướng dẫn thanh toán lệ phí an toàn", duration: "8 phút", lessons: 2, rating: 4.7, students: 1560, imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop" }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[88vh] flex items-center bg-gradient-to-br from-navy via-[#2e3799] to-[#5c3373] overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[55%] h-[65%] bg-lav/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 left-0 w-[35%] h-[45%] bg-blush/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
          <div className="max-w-2xl w-full">
            <div className="inline-flex items-center gap-2 bg-lav/10 border border-lav/20 text-white/80 text-xs font-medium px-4 py-2 rounded-full mb-8 tracking-wide shadow-sm">
              ✦ Tổ công nghệ số cộng đồng
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.15] mb-6">
              Tuổi trẻ<br />
              <em className="text-blush-mid italic font-serif">Xuân Đông</em><br />
              tiên phong chuyển đổi số
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-xl font-light">
              Đoàn thanh niên xã Xuân Đông xung kích vì cộng đồng, đồng hành cùng người dân trong công tác cải cách hành chính và sử dụng dịch vụ công trực tuyến.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/exhibition" 
                className="bg-coral text-white px-8 py-4 rounded-full text-base font-medium hover:translate-y-[-2px] hover:shadow-lg hover:shadow-coral/40 transition-all flex items-center gap-2"
              >
                ✦ Hoạt động thanh niên
              </Link>
              <Link 
                to="/courses" 
                className="bg-transparent text-white border border-white/30 px-8 py-4 rounded-full text-base font-medium hover:bg-white/10 transition-all flex items-center gap-2"
              >
                Vào thư viện số <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Hero KPI Cards */}
          <div className="hidden lg:flex flex-col gap-5 w-full max-w-[320px]">
          {[
            { value: "1,248", label: "Hồ sơ DVC được hỗ trợ", progress: 85 },
            { value: "45", label: "Đoàn viên nòng cốt" },
            { value: "100%", label: "Tỷ lệ giải quyết đúng hạn" }
          ].map((kpi, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full shadow-xl hover:bg-white/15 transition-colors">
              <div className="font-serif text-4xl text-white leading-none">{kpi.value}</div>
                <div className="text-[11px] text-white/70 mt-2 uppercase tracking-wider font-medium">{kpi.label}</div>
              {kpi.progress && (
                  <div className="h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-coral rounded-full" style={{ width: `${kpi.progress}%` }} />
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* SHOPS SECTION */}
      <section className="bg-white py-20 pl-6 md:pl-16">
        <div className="flex items-end justify-between pr-6 md:pr-16 mb-10">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blush mb-2">Sản phẩm thanh niên</div>
            <h2 className="font-serif text-3xl md:text-4xl text-navy">Mô hình kinh tế thanh niên tiêu biểu</h2>
          </div>
          <Link to="/exhibition" className="text-sm font-medium text-blush border-b border-blush-mid pb-1 hover:text-navy transition-colors">
            Xem tất cả →
          </Link>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
          {featuredShops.map((shop) => (
            <Link 
              to={`/exhibition/${shop.id}`} 
              key={shop.id} 
              className="min-w-[280px] md:min-w-[320px] snap-start bg-white rounded-2xl border border-rose-100 overflow-hidden hover:shadow-xl hover:shadow-rose-100/40 transition-all duration-300 group flex flex-col"
            >
              <div className="h-48 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                <Store className="w-8 h-8 text-gray-300 z-0" />
                <img src={shop.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-[10px] font-bold tracking-wider uppercase text-rose-500 mb-2">{shop.category}</div>
                <h3 className="font-serif text-xl font-bold text-indigo-900 mb-1">{shop.name}</h3>
                <div className="text-xs text-gray-500 mb-4 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-rose-400"/> {shop.owner} · {shop.location}</div>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-900 bg-indigo-50 px-3 py-1.5 rounded-lg group-hover:bg-indigo-900 group-hover:text-white transition-colors">Xem gian hàng</span>
                  <ArrowRight className="w-4 h-4 text-indigo-900 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STORIES SECTION */}
      <section className="bg-ivory py-20 px-6 md:px-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blush mb-2">Tin tức & Phong trào</div>
            <h2 className="font-serif text-3xl md:text-4xl text-navy">Hoạt động tuổi trẻ nổi bật</h2>
          </div>
          <Link to="/stories" className="text-sm font-medium text-blush border-b border-blush-mid pb-1 hover:text-navy transition-colors">
            Đọc thêm →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StoryPanel
            tag="Tình nguyện"
            title="Ra quân Ngày Chủ nhật xanh: Dọn dẹp vệ sinh môi trường"
            excerpt="Hơn 50 đoàn viên thanh niên xã Xuân Đông đã tham gia dọn dẹp, phát quang bụi rậm và thu gom rác thải tại các tuyến đường chính..."
            author="Đoàn xã Xuân Đông"
            date="12/04/2026"
            likes={128}
            claps={64}
            icon={<Flower2 />}
            headerGradient="from-navy to-[#5c3373]"
            href="/stories/fallback-s1"
          />
          <StoryPanel
            tag="Chuyển đổi số"
            title="Hỗ trợ người dân thực hiện dịch vụ công trực tuyến"
            excerpt="Tổ công nghệ số cộng đồng trực tiếp xuống các nhà văn hóa ấp để hướng dẫn bà con tạo tài khoản và nộp hồ sơ trực tuyến..."
            author="Ban Chấp Hành"
            date="05/04/2026"
            likes={94}
            claps={41}
            icon={<Sprout />}
            headerGradient="from-emerald-700 to-emerald-900"
            href="/stories/fallback-s2"
          />
          <StoryPanel
            tag="Đền ơn đáp nghĩa"
            title="Thăm hỏi và tặng quà các gia đình chính sách trên địa bàn"
            excerpt="Nhân dịp kỷ niệm ngày thành lập Đoàn, chi đoàn đã tổ chức thăm hỏi và trao tặng 20 suất quà ý nghĩa cho các Mẹ VNAH..."
            author="Đoàn xã Xuân Đông"
            date="26/03/2026"
            likes={211}
            claps={88}
            icon={<Palette />}
            headerGradient="from-[#5c2d6b] to-[#3a1a5c]"
            href="/stories/fallback-s3"
          />
        </div>
      </section>

      {/* COURSES SECTION */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blush mb-2">Thư viện số</div>
            <h2 className="font-serif text-3xl md:text-4xl text-navy">Video hướng dẫn Dịch vụ công</h2>
          </div>
          <Link to="/courses" className="text-sm font-medium text-blush border-b border-blush-mid pb-1 hover:text-navy transition-colors">
            Xem tất cả →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((c) => (
            <Link to={`/courses/${c.id}`} key={c.id} className="group flex flex-col bg-white rounded-2xl border border-rose-100 overflow-hidden hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="h-32 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-gray-300 z-0" />
                <img src={c.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-[10px] font-semibold text-rose-500 tracking-wider uppercase mb-2">{c.tag}</div>
                <h3 className="font-serif text-lg font-bold text-indigo-900 leading-tight mb-2 group-hover:text-rose-600 transition-colors">{c.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-medium">{c.lessons} bước</span>
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
      </section>

      {/* EVENTS SECTION */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blush mb-2">Lịch trình</div>
            <h2 className="font-serif text-3xl md:text-4xl text-navy">Sự kiện & Hoạt động sắp diễn ra</h2>
          </div>
          <Link to="/activities" className="text-sm font-medium text-blush border-b border-blush-mid pb-1 hover:text-navy transition-colors">
            Xem tất cả →
          </Link>
        </div>
        
        <div className="border border-lav-lt rounded-2xl overflow-hidden divide-y divide-lav-lt">
          {[
            { day: "20", mo: "Th4", title: "Lớp tập huấn Chuyển đổi số cho cán bộ Đoàn", meta: "08:00 – 11:30 · UBND Xã Xuân Đông · 50 người", badge: "Trực tiếp", badgeClass: "bg-blush-lt text-rose-800" },
            { day: "25", mo: "Th4", title: "Chương trình Tiếp sức Mùa thi 2026", meta: "Cả ngày · Trường THPT địa phương", badge: "Tình nguyện", badgeClass: "bg-emerald-100 text-emerald-800" },
            { day: "05", mo: "Th5", title: "Lễ kết nạp Đoàn viên mới", meta: "14:00 – 16:00 · Nhà văn hóa xã", badge: "Trực tiếp", badgeClass: "bg-blush-lt text-rose-800" },
            { day: "19", mo: "Th5", title: "Hành trình về nguồn: Thăm khu di tích lịch sử", meta: "07:00 – 17:00 · Di tích lịch sử cấp Tỉnh", badge: "Hoạt động", badgeClass: "bg-lav-lt text-navy" }
          ].map((ev, idx) => (
            <div key={idx} className="flex items-center gap-6 p-6 hover:bg-ivory transition-colors cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-navy-lt flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-lav transition-colors">
                <span className="font-serif text-2xl font-semibold text-navy leading-none">{ev.day}</span>
                <span className="text-[10px] text-blush font-semibold tracking-wide uppercase">{ev.mo}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-dark group-hover:text-navy transition-colors">{ev.title}</h4>
                <p className="text-xs text-muted mt-1">{ev.meta}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap ${ev.badgeClass}`}>
                {ev.badge}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
