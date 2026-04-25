"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    FB: any;
  }
}

export default function FacebookEmbed({ url, width = "auto" }: { url: string; width?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tạo thẻ #fb-root cần thiết cho Facebook SDK nếu nó chưa tồn tại
    if (!document.getElementById("fb-root")) {
      const fbRoot = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.appendChild(fbRoot);
    }

    // Tải Facebook SDK bất đồng bộ
    if (typeof window !== "undefined" && !window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);

      script.onload = () => {
        if (window.FB && containerRef.current) {
          window.FB.XFBML.parse(containerRef.current);
        }
      };
    } else if (window.FB && containerRef.current) {
      // SDK đã tải -> Gọi hàm parse lại giao diện
      window.FB.XFBML.parse(containerRef.current);
    }
  }, [url]);

  return (
    <div 
      ref={containerRef} 
      className="w-full max-w-[500px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex items-center justify-center min-h-[300px]"
    >
      <div 
        className="fb-post w-full" 
        data-href={url}
        data-width={width} // Bỏ trống sẽ dùng fluid width (responsive)
        data-show-text="false"
      ></div>
    </div>
  );
}