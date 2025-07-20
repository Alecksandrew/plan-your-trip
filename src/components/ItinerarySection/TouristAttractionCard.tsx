import { IoTimeOutline } from "react-icons/io5";
// import Swiper bundle with all modules installed
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Importa os estilos principais do Swiper
import "swiper/css";

// Importa os estilos para os módulos de navegação (botões)
import "swiper/css/navigation";

//Interfaces
import type { TouristAttractionCardProps } from "../../types/TouristAttractionInterface";

//
import placeholderImage from "@/assets/placeholder-image.jpg";


export default function TouristAttractionCard({
  title,
  description,
  openingHours,
  photos
}: TouristAttractionCardProps) {
  return (
    <div className="sm:flex sm:gap-x-1">
      <div className="sm:w-4/5">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="leading-tight">{description}</p>
        <span className="flex items-center gap-2  mt-1 mb-3">
          <IoTimeOutline /> {openingHours}
        </span>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="custom-container aspect-video sm:w-2/5"
      >
        {(photos.length > 0 ? photos : [placeholderImage]).map((photo, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <img src={photo} alt={`Imagem do ${title}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
