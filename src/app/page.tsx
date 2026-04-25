import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  MapPin,
  Store,
  BookOpen,
  Play
} from "lucide-react";
import FacebookPageEmbed from "@/components/FacebookPageEmbed";
import logoImg from "@/lib/logo.png";

const featuredShops = [
  { 
    id: 1, 
    category: "Mô hình nông nghiệp", 
    name: "Sản xuất Nấm mối đen Anh Minh", 
    owner: "Phan Tuấn Anh", 
    location: "Xuân Đông", 
    imageUrl: "https://dongnai.gov.vn/uploads/binhphuoc/news/2024/11/85242ceb04302a48181f67da8fb0bfd1-2024-11-21.08-31-44.jpg",
    link: "https://dongnai.gov.vn/vi/news/tin-hoat-dong-linh-vuc-nganh/anh-phan-tuan-anh-chu-mo-hinh-san-xuat-nam-moi-den-anh-minh-tai-xa-xuan-dong-huyen-cam-my-vinh-du-duoc-chon-trao-giai-thuong-luong-dinh-cua-lan-thu-xix-48904.html"
  }
];

const featuredCourses = [
  { 
    id: "x_-gWKYVAwM", 
    tag: "Hướng dẫn", 
    title: "Hướng dẫn đăng ký kết hôn trực tuyến MỚI NHẤT 2026", 
    published: "25/04/2026", 
    views: 100, 
    imageUrl: "https://i.ytimg.com/vi/x_-gWKYVAwM/hqdefault.jpg" 
  },
  { 
    id: "7Qfjr-MPZ-8", 
    tag: "Hướng dẫn", 
    title: "Hướng dẫn đổi giấy phép lái xe ô tô online MỚI NHẤT", 
    published: "22/04/2026", 
    views: 340, 
    imageUrl: "https://i.ytimg.com/vi/7Qfjr-MPZ-8/hqdefault.jpg" 
  },
  { 
    id: "JBHfnwni0hI", 
    tag: "Hướng dẫn", 
    title: "Hướng dẫn cập nhật số tài khoản ngân hàng lên ứng dụng VNeID để hưởng an sinh xã hội", 
    published: "18/04/2026", 
    views: 520, 
    imageUrl: "https://i.ytimg.com/vi/JBHfnwni0hI/hqdefault.jpg" 
  },
  { 
    id: "g0yPx1KwfMg", // Thay ID video YouTube thứ 3 vào đây
    tag: "Hướng dẫn", 
    title: "Hướng dẫn Đăng ký tạm trú trên Cổng Dịch vụ công năm 2026", 
    published: "18/04/2026", 
    views: 520, 
    imageUrl: "https://i.ytimg.com/vi/g0yPx1KwfMg/hqdefault.jpg" 
  }
];

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* HERO SECTION */}
      <section className="relative min-h-[88vh] flex items-center bg-gradient-to-br from-navy via-[#2e3799] to-[#5c3373] overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[55%] h-[65%] bg-lav/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 left-0 w-[35%] h-[45%] bg-blush/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
          <div className="max-w-2xl w-full">
            <img 
              src={typeof logoImg === 'object' ? (logoImg as any).src : logoImg} 
              alt="Logo Tuổi trẻ Xuân Đông" 
              className="h-24 md:h-32 w-auto mb-8 md:mb-10 object-contain drop-shadow-2xl"
            />
            
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
            <a 
              href="#courses" 
                className="bg-transparent text-white border border-white/30 px-8 py-4 rounded-full text-base font-medium hover:bg-white/10 transition-all flex items-center gap-2"
              >
                Vào thư viện số <ArrowRight size={18} />
            </a>
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

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        {/* CỘT TRÁI (NỘI DUNG CHÍNH) */}
        <main className="flex-1 flex flex-col gap-12 w-full min-w-0">
          
          {/* SHOPS SECTION */}
          <section className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-rose-100">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blush mb-2">Sản phẩm thanh niên</div>
                <h2 className="font-serif text-3xl text-navy">Mô hình kinh tế tiêu biểu</h2>
              </div>
              <Link href="/exhibition" className="text-sm font-medium text-blush border-b border-blush-mid pb-1 hover:text-navy transition-colors shrink-0">
                Xem tất cả →
              </Link>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-hide">
              {featuredShops.map((shop) => (
                <Link 
                  to={shop.link || `/exhibition/${shop.id}`} 
                  target={shop.link ? "_blank" : undefined}
                  rel={shop.link ? "noopener noreferrer" : undefined}
                  key={shop.id} 
                  className="min-w-[280px] sm:min-w-[320px] snap-start bg-white rounded-2xl border border-rose-100 overflow-hidden hover:shadow-xl hover:shadow-rose-100/40 transition-all duration-300 group flex flex-col"
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
                      <span className="text-xs font-semibold text-indigo-900 bg-indigo-50 px-3 py-1.5 rounded-lg group-hover:bg-indigo-900 group-hover:text-white transition-colors">{shop.link ? "Xem bài báo" : "Xem gian hàng"}</span>
                      <ArrowRight className="w-4 h-4 text-indigo-900 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* COURSES SECTION */}
          <section id="courses" className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-rose-100">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blush mb-2">Thư viện số</div>
                <h2 className="font-serif text-3xl text-navy">Video hướng dẫn Dịch vụ công</h2>
              </div>
              <a 
                href="https://www.youtube.com/@dichvucongonline" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blush bg-blush/10 px-4 py-2 rounded-full hover:bg-blush hover:text-white transition-all shrink-0"
              >
                Xem kênh YouTube <ArrowRight size={16} />
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredCourses.map((c) => (
            <Link 
              to={`/courses/${c.id}`} 
              key={c.id} 
              className="group flex flex-col bg-white rounded-2xl border border-rose-100 overflow-hidden hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-32 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-gray-300 z-0" />
                <img src={c.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10" onError={(e) => e.currentTarget.style.display = 'none'} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-20 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg"><Play className="w-4 h-4 text-white fill-white ml-1" /></div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-[10px] font-semibold text-rose-500 tracking-wider uppercase mb-2">{c.tag}</div>
                <h3 className="font-serif text-lg font-bold text-indigo-900 leading-tight mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">{c.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-medium">{c.published}</span>
                  <span className="px-2 py-1 bg-rose-50 text-rose-600 rounded-md text-[10px] font-medium">Miễn phí</span>
                </div>
                <div className="pt-4 border-t border-rose-50 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <BookOpen className="h-3.5 w-3.5 text-gray-400" />
                    <span className="font-medium text-gray-700">{c.views.toLocaleString("vi-VN")} lượt xem</span>
                  </div>
                  <span className="text-xs font-semibold text-indigo-900 bg-indigo-50 px-3 py-1.5 rounded-lg group-hover:bg-indigo-900 group-hover:text-white transition-colors">Xem chi tiết</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

          {/* EVENTS SECTION */}
          <section className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-rose-100">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blush mb-2">Lịch trình</div>
                <h2 className="font-serif text-3xl text-navy">Sự kiện & Hoạt động sắp diễn ra</h2>
              </div>
              <Link to="/activities" className="text-sm font-medium text-blush border-b border-blush-mid pb-1 hover:text-navy transition-colors shrink-0">
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
        </main>

        {/* CỘT PHẢI (SIDEBAR - TIN TỨC & PHONG TRÀO) */}
        <aside className="w-full lg:w-[400px] xl:w-[450px] shrink-0 lg:sticky lg:top-24 flex flex-col gap-8">
          <section className="bg-ivory/60 rounded-3xl p-4 sm:p-6 border border-rose-200 shadow-sm flex flex-col">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blush mb-1">Tin tức & Phong trào</div>
                <h2 className="font-serif text-2xl text-navy leading-tight">Hoạt động nổi bật</h2>
              </div>
              <Link to="/stories" className="text-sm font-medium text-blush border-b border-blush-mid pb-0.5 hover:text-navy transition-colors shrink-0">
                Đọc thêm →
              </Link>
            </div>
            
            <div className="flex flex-col gap-4 w-full">
              {/* Nhúng Timeline của Fanpage */}
              <div className="w-full flex justify-center bg-white rounded-xl overflow-hidden border border-rose-100 shadow-sm">
                <FacebookPageEmbed url="https://www.facebook.com/oantnxuantay" height="850" />
              </div>

              <a 
                href="https://www.facebook.com/oantnxuantay" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#0866ff] hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md mt-2"
              >
                Xem thêm trên Facebook <ArrowRight size={18} />
              </a>
            </div>
          </section>
        </aside>

      </div>
    </div>
  );
}
