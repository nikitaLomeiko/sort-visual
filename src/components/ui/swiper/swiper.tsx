import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface FullScreenSliderProps {
  children: React.ReactNode[];
}

export const ReactSwiper: React.FC<FullScreenSliderProps> = ({ children }) => {
  const swiperRef = useRef<any>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative w-full">
      <div className="absolute w-full z-90">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          speed={600}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            clickable: true,
            type: "bullets",
          }}
          className="h-full w-full"
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {React.Children.map(children, (child, index) => (
            <SwiperSlide key={index} className="slide-fade-in">
              <div className="h-full w-full px-20 pb-20">{child}</div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={prevRef}
          className="slide-nav-btn slide-nav-left bg-[var(--text-primary)]/20"
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft className="nav-icon" />
        </button>

        <button
          ref={nextRef}
          className="slide-nav-btn slide-nav-right bg-[var(--text-primary)]/20"
          aria-label="Следующий слайд"
        >
          <ChevronRight className="nav-icon" />
        </button>
      </div>
    </div>
  );
};
