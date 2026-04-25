"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    FB: any;
  }
}

export default function FacebookPageEmbed({ url, height = "800" }: { url: string; height?: string }) {
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
      window.FB.XFBML.parse(containerRef.current);
    }
  }, [url]);

  return (
    <div ref={containerRef} className="w-full bg-white flex items-center justify-center">
      <div 
        className="fb-page w-full" 
        data-href={url}
        data-tabs="timeline"
        data-width="500" // Chiều rộng tối đa, SDK sẽ tự co lại nếu màn hình nhỏ hơn
        data-height={height} // Giới hạn chiều cao để hiển thị tầm 3-4 bài
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      ></div>
    </div>
  );
}