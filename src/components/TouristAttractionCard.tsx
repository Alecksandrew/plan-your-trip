import { IoTimeOutline } from "react-icons/io5";
// import Swiper bundle with all modules installed
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Importa os estilos principais do Swiper
import "swiper/css";

// Importa os estilos para os módulos de navegação (botões)
import "swiper/css/navigation";

//Interfaces
import type { TouristAttractionCardProps } from "../sharedInterfaces/TouristAttractionInterface";

export default function TouristAttractionCard({
  title,
  description,
  openingHours,
}: TouristAttractionCardProps) {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <span>
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
        className="custom-container aspect-video"
      >
        <SwiperSlide>
          <img src="" alt={`Imagem do ${title}`} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="" alt={`Imagem do ${title}`} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="" alt={`Imagem do ${title}`} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
