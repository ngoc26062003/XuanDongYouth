import { supabase } from "@/lib/supabase";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ListOrdered, Play, Lock, CheckCircle2, MessageSquare, Star, User, BookOpen, Clock, ArrowRight } from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  duration?: string;
  videoUrl?: string;
};

type CourseVm = {
  id: string;
  title: string;
  description?: string;
  instructor?: string;
  videoUrl?: string;
  lessons: Lesson[];
};

function toText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  return "";
}

function toId(value: unknown, fallback: string): string {
  const v = toText(value).trim();
  return v.length > 0 ? v : fallback;
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function tryParseJson(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const s = value.trim();
  if (!s) return value;
  if (!(s.startsWith("[") || s.startsWith("{"))) return value;
  try {
    return JSON.parse(s);
  } catch {
    return value;
  }
}

function normalizeYouTubeEmbedUrl(url: string): string | null {
  const u = url.trim();
  if (!u) return null;
  try {
    const parsed = new URL(u);
    const host = parsed.hostname.toLowerCase();

    if (host.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();
      if (!id) return null;
      return `https://www.youtube.com/embed/${id}`;
    }

    if (host.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (parsed.pathname.startsWith("/embed/")) return u;
    }
  } catch {
    return null;
  }
  return null;
}

function parseLessonsFromRow(row: Record<string, unknown>): Lesson[] {
  const candidateKeys = [
    "lessons",
    "lesson_list",
    "curriculum",
    "outline",
    "modules",
    "units",
    "chapters",
    "content",
  ];

  for (const key of candidateKeys) {
    const raw = tryParseJson(row[key]);
    if (Array.isArray(raw)) {
      const lessons = raw
        .map((item, index): Lesson | null => {
          const fallbackId = String(index + 1);
          if (typeof item === "string") {
            const title = item.trim();
            if (!title) return null;
            return { id: fallbackId, title };
          }
          if (item && typeof item === "object") {
            const obj = item as Record<string, unknown>;
            const title =
              toText(obj.title).trim() ||
              toText(obj.name).trim() ||
              `Bài ${index + 1}`;
            const duration =
              toText(obj.duration).trim() || toText(obj.time).trim();
            const videoUrl =
              toText(obj.video_url).trim() ||
              toText(obj.videoUrl).trim() ||
              toText(obj.url).trim();
            return {
              id: toId(obj.id, fallbackId),
              title,
              duration: duration || undefined,
              videoUrl: videoUrl || undefined,
            };
          }
          return null;
        })
        .filter((x): x is Lesson => Boolean(x));

      if (lessons.length > 0) return lessons;
    }
  }

  const count =
    toNumber(row.lessons_count) ??
    (typeof row.lessons === "number" ? row.lessons : null) ??
    toNumber(row.total_lessons);

  const safeCount = Math.min(Math.max(count ?? 6, 1), 50);
  return Array.from({ length: safeCount }).map((_, i) => ({
    id: String(i + 1),
    title: `Bài ${i + 1}`,
  }));
}

function toCourseVm(row: Record<string, unknown>): CourseVm {
  const lessons = parseLessonsFromRow(row);
  const title = toText(row.title).trim() || toText(row.name).trim() || "Khóa học";
  const description =
    toText(row.description).trim() ||
    toText(row.summary).trim() ||
    toText(row.content).trim() ||
    undefined;
  const instructor =
    toText(row.instructor).trim() ||
    toText(row.instructor_name).trim() ||
    toText(row.teacher).trim() ||
    undefined;
  const videoUrl =
    toText(row.video_url).trim() ||
    toText(row.videoUrl).trim() ||
    toText(row.preview_url).trim() ||
    lessons.find((l) => l.videoUrl)?.videoUrl ||
    undefined;

  return {
    id: toId(row.id, "unknown"),
    title,
    description,
    instructor,
    videoUrl,
    lessons,
  };
}

function Skeleton() {
  return (
    <div className="px-6 py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-9 w-24 rounded bg-gray-100 animate-pulse" />
        <div className="h-9 w-80 rounded bg-gray-100 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
        <div className="rounded-xl border border-rose-100 bg-white overflow-hidden">
          <div className="aspect-video bg-gray-100 animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="h-6 w-2/3 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
        <div className="rounded-xl border border-rose-100 bg-white overflow-hidden">
          <div className="p-4">
            <div className="h-5 w-40 bg-gray-100 rounded animate-pulse mb-3" />
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-full bg-gray-100 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mockReviews = [
  { id: 1, user: "Nguyễn Thu Hà", rating: 5, date: "12/03/2026", comment: "Khóa học rất thực tế và dễ hiểu. Tôi đã áp dụng và thấy hiệu quả ngay cho gian hàng của mình." },
  { id: 2, user: "Trần Thị Mai", rating: 5, date: "05/03/2026", comment: "Giảng viên hướng dẫn tận tình. Chất lượng video rất tốt. Rất đáng thời gian học!" },
  { id: 3, user: "Lê Ngọc Điệp", rating: 4, date: "28/02/2026", comment: "Nội dung hay, tuy nhiên phần cuối hơi nhiều thông tin, cần xem đi xem lại vài lần mới nắm hết." }
];

export default function Page() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [course, setCourse] = useState<CourseVm | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [enrolled, setEnrolled] = useState<boolean | null>(null);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [enrollBusy, setEnrollBusy] = useState(false);
  const [progressBusy, setProgressBusy] = useState(false);
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'intro' | 'reviews'>('intro');

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      setError(null);
      setCourse(null);
      setEnrolled(null);
      setEnrollmentId(null);
      setEnrollmentProgress(0);

      try {
        const res = await supabase
          .from("courses")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (cancelled) return;

        if (res.data) {
          const vm = toCourseVm(res.data as Record<string, unknown>);
          setCourse(vm);
          setActiveLessonId(vm.lessons[0]?.id ?? null);
        } else {
          throw new Error("No data");
        }
      } catch (err) {
        if (cancelled) return;
        // DỮ LIỆU MẪU (MOCK DATA) NẾU CHƯA SETUP DATABASE
        const courseTitles: Record<string, string> = {
          c1: "Tạo tài khoản Dịch vụ công bằng VNeID",
          c2: "Thủ tục Đăng ký khai sinh trực tuyến",
          c3: "Đăng ký kết hôn trên cổng DVC Quốc gia",
          c4: "Hướng dẫn thanh toán lệ phí an toàn",
          c5: "Thanh toán nghĩa vụ tài chính về đất đai",
          c6: "Cấp lại, đổi thẻ BHYT do mất/hỏng",
          c7: "Thủ tục xin cấp Phiếu Lý lịch tư pháp"
        };
        const vm: CourseVm = {
          id: id as string,
          title: courseTitles[id as string] || "Hướng dẫn Dịch vụ công",
          description: "Video hướng dẫn thực hiện thủ tục hành chính trực tuyến tại Cổng Dịch vụ công. Bạn có thể xem từng bước để hoàn thành hồ sơ một cách nhanh chóng và chính xác.",
          instructor: "Tổ Công Nghệ Số Cộng Đồng",
          videoUrl: "https://www.youtube.com/watch?v=dBzERaXwSco&t=1217s",
          lessons: Array.from({ length: 8 }).map((_, i) => ({
            id: `lesson-${i+1}`,
            title: `Bước ${i+1}: ${['Chuẩn bị hồ sơ', 'Đăng nhập hệ thống', 'Điền tờ khai trực tuyến', 'Đính kèm tài liệu', 'Kiểm tra thông tin', 'Thanh toán lệ phí', 'Nộp hồ sơ', 'Tra cứu kết quả'][i]}`,
            duration: `0${Math.floor(Math.random() * 3 + 2)}:${Math.floor(Math.random() * 50 + 10)}`,
            videoUrl: "https://www.youtube.com/watch?v=dBzERaXwSco&t=1217s"
          }))
        };
        setCourse(vm);
        setActiveLessonId(vm.lessons[0]?.id ?? null);
      }

      try {
        const userRes = await supabase.auth.getUser();
        if (cancelled) return;
        const user = userRes.data?.user;
        if (user) {
          const enrollRes = await supabase
            .from("enrollments")
            .select("id, progress_percent")
            .eq("user_id", user.id)
            .eq("course_id", id)
            .maybeSingle();

          if (!cancelled && enrollRes.data) {
            const row = enrollRes.data as Record<string, unknown>;
            const eid = toText(row.id).trim();
            setEnrollmentId(eid || null);
            setEnrollmentProgress(toNumber(row.progress_percent) || 0);
            setEnrolled(true);
            return;
          }
        }
      } catch (err) {
        // Bỏ qua lỗi Auth nếu Supabase chưa cấu hình
      }
      
      if (!cancelled) setEnrolled(false);
    }

    load().catch(() => {
      if (!cancelled) setError("Không thể tải dữ liệu khóa học.");
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const activeLesson = useMemo(() => {
    if (!course) return null;
    if (!activeLessonId) return course.lessons[0] ?? null;
    return course.lessons.find((l) => l.id === activeLessonId) ?? null;
  }, [course, activeLessonId]);

  const activeIndex = useMemo(() => {
    if (!course || !activeLessonId) return 0;
    const idx = course.lessons.findIndex(l => l.id === activeLessonId);
    return idx >= 0 ? idx : 0;
  }, [course, activeLessonId]);

  const maxUnlockedIndex = useMemo(() => {
    if (!enrolled || !course) return -1;
    if (enrollmentProgress >= 100) return course.lessons.length;
    return Math.floor((enrollmentProgress / 100) * course.lessons.length);
  }, [enrolled, course, enrollmentProgress]);

  const videoUrl = activeLesson?.videoUrl || course?.videoUrl || "";
  const youtubeEmbed = videoUrl ? normalizeYouTubeEmbedUrl(videoUrl) : null;

  async function enrollNow() {
    if (enrollBusy || !id) return;
    setEnrollBusy(true);

    try {
      const userRes = await supabase.auth.getUser();
      const user = userRes.data?.user;
      if (user) {
        const insertRes = await supabase
          .from("enrollments")
          .insert({ user_id: user.id, course_id: id })
          .select("id")
          .maybeSingle();

        if (!insertRes.error && insertRes.data) {
          const eid = toText((insertRes.data as Record<string, unknown>).id).trim();
          setEnrollmentId(eid || null);
          setEnrolled(true);
          setEnrollBusy(false);
          return;
        }
      }
    } catch (err) {}

    // Chế độ Demo (khi Database chưa có)
    setTimeout(() => {
      setEnrollmentId("demo-enrollment");
      setEnrolled(true);
      setEnrollBusy(false);
    }, 600);
  }

  function selectLesson(lessonId: string, index: number) {
    if (!course || enrolled !== true || !id) return;
    if (index > maxUnlockedIndex) return; // Khóa, không cho phép click
    setActiveLessonId(lessonId);
  }

  async function markLessonComplete() {
    if (!course || enrolled !== true || !id || progressBusy) return;
    const currentIndex = course.lessons.findIndex((l) => l.id === activeLessonId);
    if (currentIndex < 0) return;

    setProgressBusy(true);
    const nextIndex = currentIndex + 1;
    const newProgressRaw = Math.max(enrollmentProgress, Math.round((nextIndex / course.lessons.length) * 100));
    const newProgress = Math.min(newProgressRaw, 100);

    try {
      if (enrollmentId && enrollmentId !== "demo-enrollment") {
        await supabase
          .from("enrollments")
          .update({
            progress_percent: newProgress,
            last_lesson_title: course.lessons[currentIndex].title,
            last_watched_at: new Date().toISOString(),
          })
          .eq("id", enrollmentId);
      }
    } catch (err) {}

    setEnrollmentProgress(newProgress);
    setProgressBusy(false);

    // Mở video tiếp theo nếu chưa hết khóa
    if (nextIndex < course.lessons.length) {
      setActiveLessonId(course.lessons[nextIndex].id);
    }
  }

  if (!course && !error) return <Skeleton />;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-col gap-2">
          <Link
          to="/courses"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Trở lại Thư viện số
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-100 bg-white p-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {course && enrolled === false ? (
        <div className="bg-white rounded-3xl border border-rose-100 overflow-hidden shadow-xl shadow-rose-100/20 mb-8">
          <div className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-indigo-900 to-[#5c3373] text-white relative">
            <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
                <BookOpen className="w-3.5 h-3.5" /> Tài liệu hướng dẫn
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 leading-tight">{course.title}</h1>
              {course.instructor && <div className="text-indigo-200 mb-6 flex items-center gap-2"><User className="w-4 h-4"/> Đơn vị thực hiện: <span className="text-white font-medium">{course.instructor}</span></div>}
              <p className="text-indigo-100 text-lg leading-relaxed mb-8">{course.description || "Tài liệu này được biên soạn nhằm hỗ trợ người dân dễ dàng tiếp cận và hoàn thành các thủ tục hành chính trực tuyến tại nhà."}</p>
              <div className="flex flex-wrap items-center gap-4">
                <button onClick={enrollNow} disabled={enrollBusy} className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3.5 rounded-xl font-medium text-lg transition-all shadow-lg shadow-rose-500/30 flex items-center gap-2">
                  {enrollBusy ? "Đang xử lý..." : "Lưu vào Thư viện của tôi"} <ArrowRight className="w-5 h-5"/>
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 bg-white">
            <div>
              <h3 className="font-serif text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
                <ListOrdered className="w-6 h-6 text-rose-500" /> Các bước thực hiện
              </h3>
              <div className="space-y-3">
                {course.lessons.map((l, i) => (
                  <div key={l.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center text-xs font-bold">{i+1}</div>
                      <span className="text-sm font-medium text-gray-800">{l.title}</span>
                    </div>
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-rose-500" /> Phản hồi từ người dân
              </h3>
              <div className="space-y-4">
                {mockReviews.map(r => (
                  <div key={r.id} className="p-5 rounded-2xl border border-rose-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-rose-100 flex items-center justify-center text-indigo-900 font-bold">{r.user.charAt(0)}</div>
                        <div>
                          <div className="text-sm font-bold text-gray-800">{r.user}</div>
                          <div className="text-xs text-gray-500">{r.date}</div>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({length: 5}).map((_, idx) => (
                          <Star key={idx} className={`w-4 h-4 ${idx < r.rating ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : course ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-rose-100 bg-white overflow-hidden shadow-sm">
            <div className="bg-black">
              <div className="aspect-video w-full">
                {youtubeEmbed ? (
                  <iframe
                    className="h-full w-full"
                    src={youtubeEmbed}
                    title={course.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : videoUrl ? (
                  <video className="h-full w-full" src={videoUrl} controls />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white/80">
                    <div className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      Chưa có video cho bước này
                    </div>
                  </div>
                )}
              </div>
            </div>
              <div className="p-5 border-b border-gray-100 flex flex-wrap items-center justify-between bg-white gap-4">
                <div>
                  <div className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-1">Đang theo dõi</div>
                  <div className="font-serif text-indigo-900 text-2xl font-bold">{activeLesson?.title || "Bước thực hiện"}</div>
                </div>
                <button 
                  onClick={markLessonComplete} 
                  disabled={progressBusy || activeIndex < maxUnlockedIndex} 
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                    activeIndex < maxUnlockedIndex 
                      ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed' 
                      : 'bg-indigo-900 text-white hover:bg-indigo-800 shadow-md'
                  }`}
                >
                  {activeIndex < maxUnlockedIndex ? <><CheckCircle2 className="w-4 h-4"/> Đã hoàn thành</> : 'Hoàn thành & Tiếp tục'}
                </button>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-8 px-6 bg-gray-50 border-b border-gray-200">
                <button onClick={() => setActiveTab('intro')} className={`py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'intro' ? 'border-indigo-900 text-indigo-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Thông tin chung</button>
                <button onClick={() => setActiveTab('reviews')} className={`py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-indigo-900 text-indigo-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Bình luận ({mockReviews.length})</button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'intro' && (
                  <div className="prose prose-sm max-w-none text-gray-600">
                    <p className="leading-relaxed">{course.description || "Video hướng dẫn này sẽ giúp bạn dễ dàng hoàn thiện hồ sơ trên cổng dịch vụ công mà không cần phải đến trực tiếp ủy ban."}</p>
                    {course.instructor && (
                      <div className="mt-6 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-900 font-bold text-lg">{course.instructor.charAt(0)}</div>
                        <div>
                          <div className="text-xs text-indigo-500 font-semibold uppercase tracking-wider mb-0.5">Đơn vị biên soạn</div>
                          <div className="font-bold text-indigo-900">{course.instructor}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {mockReviews.map(r => (
                      <div key={r.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-900 font-bold text-xs">{r.user.charAt(0)}</div>
                          <div>
                            <div className="text-sm font-bold text-gray-800">{r.user}</div>
                            <div className="flex text-amber-400">
                              {Array.from({length: 5}).map((_, idx) => (
                                <Star key={idx} className={`w-3 h-3 ${idx < r.rating ? 'fill-current' : 'text-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                          <span className="ml-auto text-xs text-gray-400">{r.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 ml-11">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-rose-100 bg-white overflow-hidden shadow-sm h-fit sticky top-24">
            <div className="p-5 border-b border-rose-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-white">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-lg font-serif">
                <ListOrdered className="h-5 w-5 text-rose-500" />
                Các bước chi tiết
              </div>
              <div className="text-xs font-medium text-rose-600 bg-rose-100 px-2 py-1 rounded-md">
                {course.lessons.length} bước
              </div>
            </div>
            
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex justify-between text-xs text-indigo-900 font-semibold mb-2">
                <span>Tiến trình theo dõi</span>
                <span className="text-emerald-600">{enrollmentProgress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{width: `${enrollmentProgress}%`}}></div>
              </div>
            </div>

            <div className="p-3 overflow-y-auto max-h-[60vh] space-y-1">
                {course.lessons.map((lesson, index) => {
                  const active = lesson.id === activeLessonId;
                const isLocked = index > maxUnlockedIndex;
                const isCompleted = index < maxUnlockedIndex;
                
                  return (
                    <button
                      key={lesson.id}
                      type="button"
                    disabled={isLocked}
                    onClick={() => selectLesson(lesson.id, index)}
                      className={
                      "w-full text-left rounded-xl px-4 py-3 transition-all flex items-center gap-3 " +
                        (active
                        ? "bg-indigo-50 border border-indigo-100 shadow-sm"
                        : isLocked 
                          ? "opacity-50 cursor-not-allowed hover:bg-transparent border border-transparent"
                          : "hover:bg-gray-50 border border-transparent")
                      }
                    >
                    <div className="shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : active ? (
                        <Play className="w-5 h-5 text-indigo-600 fill-indigo-600" />
                      ) : isLocked ? (
                        <Lock className="w-5 h-5 text-gray-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`font-medium truncate ${active ? 'text-indigo-900 font-bold' : isLocked ? 'text-gray-500' : 'text-gray-700'}`}>
                        {index + 1}. {lesson.title}
                      </div>
                      {lesson.duration && (
                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {lesson.duration}
                        </div>
                      )}
                    </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
