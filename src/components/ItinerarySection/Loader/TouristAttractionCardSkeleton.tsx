// import Swiper bundle with all modules installed
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Importa os estilos principais do Swiper
import "swiper/css";

// Importa os estilos para os módulos de navegação (botões)
import "swiper/css/navigation";

//Interfaces


export default function TouristAttractionCardSkeleton() {
  return (
    <div className="sm:flex sm:gap-x-1">
      <div className="sm:w-4/5">
        <h2 className="text-2xl font-bold h-6 bg-gray-500 animate-pulse rounded"></h2>
        <div className="mt-2 flex flex-col gap-1">
            <p className="leading-tight h-2 bg-gray-500 animate-pulse rounded"></p>
            <p className="leading-tight h-2 bg-gray-500 animate-pulse rounded"></p>
            <p className="leading-tight h-2 bg-gray-500 animate-pulse rounded"></p>
        </div>
        <span className="flex items-center gap-2  mt-2 mb-3 w-1/5 h-4 bg-gray-500 animate-pulse rounded">
        </span>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="custom-container aspect-video sm:w-2/5"
      >
          <SwiperSlide className="flex justify-center">
            <img className="w-full h-full object-cover bg-gray-500 animate-pulse" />
          </SwiperSlide>

      </Swiper>
    </div>
  );
}
