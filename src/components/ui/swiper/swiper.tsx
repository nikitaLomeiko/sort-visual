import React, { useRef, useEffect } from "react";
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

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;

      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, []);

  return (
    <div className="relative w-full flex">
      <div className="w-full z-90 flex">
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
        >
          {React.Children.map(children, (child, index) => (
            <SwiperSlide key={index} className="slide-fade-in">
              <div className="h-full w-full sm:px-20 px-5 pb-20">{child}</div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={prevRef}
          className="slide-nav-btn slide-nav-left bg-[var(--text-primary)]/20 sm:flex hidden"
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft className="nav-icon" />
        </button>

        <button
          ref={nextRef}
          className="slide-nav-btn slide-nav-right bg-[var(--text-primary)]/20 sm:flex hidden"
          aria-label="Следующий слайд"
        >
          <ChevronRight className="nav-icon" />
        </button>
      </div>
    </div>
  );
};
