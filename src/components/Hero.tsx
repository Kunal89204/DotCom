import { Image } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";


interface CarouselProps {
  timeRunning?: number;
  timeAutoNext?: number;
}

const Hero: React.FC<CarouselProps> = ({
  timeRunning = 3000,
  timeAutoNext = 7000,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const autoNextTimeout = useRef<null | number>(null);
  const runTimeout = useRef<null | number>(null);

  const slides = [
    {
      img: "https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg",
      author: "Return to Pandora.",
      title: "Avatar",
      topic: "The Way of Water",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      img: "https://image.tmdb.org/t/p/original/uzIGtyS6bbnJzGsPL93WCF1FWm8.jpg",
      author: "First you watch it. Then you die.",
      title: "Pirates of the Caribbean:",
      topic: "On Stranger Tides",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      img: "https://image.tmdb.org/t/p/original/y3aWOInifbGKXM34KjtcMITrZRZ.jpg",
      author: "Death has never been closer.",
      title: "Final Destination",
      topic: "5",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      img: "https://image.tmdb.org/t/p/original//3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      author: "Venom",
      title: "Venom",
      topic: "The Last Dance",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      img: "https://image.tmdb.org/t/p/original//oHPoF0Gzu8xwK4CtdXDaWdcuZxZ.jpg",
      author: "The Lion king",
      title: "The lion king",
      topic: "The Last Dance",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      img: "https://wallpapercat.com/w/full/7/e/b/117656-1920x1080-desktop-1080p-your-name-background.jpg",
      author: "Your Name",
      title: "Your Name",
      topic: "The Last Dance",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

  const thumbnails = [
    {
      img: "https://image.tmdb.org/t/p/original/uzIGtyS6bbnJzGsPL93WCF1FWm8.jpg",
      title: "Rings",
      description: "Description",
    },
    {
      img: "https://image.tmdb.org/t/p/original/y3aWOInifbGKXM34KjtcMITrZRZ.jpg",
      title: "Final Destination",
      description: "Description",
    },
    {
      img: "https://image.tmdb.org/t/p/original//3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      title: "Venom",
      description: "The last dance",
    },
    {
      img: "https://image.tmdb.org/t/p/original//oHPoF0Gzu8xwK4CtdXDaWdcuZxZ.jpg",
      title: "The Lion King",
      description: "Description",
    },
    {
      img: "https://wallpapercat.com/w/full/7/e/b/117656-1920x1080-desktop-1080p-your-name-background.jpg",
      title: "Your Name",
      description: "Description",
    },
    {
      img: "https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg",
      title: "Pirate",
      description: "Description",
    },
  ];

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (autoNextTimeout.current) clearTimeout(autoNextTimeout.current);
      if (runTimeout.current) clearTimeout(runTimeout.current);
    };
  }, []);

  const startAutoSlide = () => {
    if (autoNextTimeout.current) clearTimeout(autoNextTimeout.current);

    autoNextTimeout.current = setTimeout(() => {
      handleShowSlider("next");
    }, timeAutoNext);
  };

  const handleShowSlider = (type: "next" | "prev") => {
    const sliderDom = sliderRef.current;
    const thumbnailDom = thumbnailRef.current;
    const carouselDom = carouselRef.current;

    if (!sliderDom || !thumbnailDom || !carouselDom) return;

    const sliderItemsDom = Array.from(sliderDom.children);
    const thumbnailItemsDom = Array.from(thumbnailDom.children);

    if (type === "next") {
      sliderDom.appendChild(sliderItemsDom[0]);
      thumbnailDom.appendChild(thumbnailItemsDom[0]);
      carouselDom.classList.add("next");
    } else {
      sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
      thumbnailDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
      carouselDom.classList.add("prev");
    }

    if (runTimeout.current) clearTimeout(runTimeout.current);
    runTimeout.current = setTimeout(() => {
      carouselDom.classList.remove("next");
      carouselDom.classList.remove("prev");
    }, timeRunning);

    startAutoSlide();
  };

  return (
    <>
      <header>
        <nav>
          <a href="#">Home</a>
          <a href="#">Contacts</a>
          <a href="#">Info</a>
        </nav>
      </header>

      <div className="carousel" ref={carouselRef}>
        <div className="list" ref={sliderRef}>
          {slides.map((slide, index) => (
            <div className="item" key={index}>
              <img src={slide.img} alt={`Slide ${index + 1}`} />
              <Image src={slide.img} alt={`Slide ${index + 1}`} />
              <div className="content">
                <div className="author">{slide.author}</div>
                <div className="title">{slide.title}</div>
                <div className="topic">{slide.topic}</div>
                <div className="des">{slide.description}</div>
                <div className="buttons">
                  <button>SEE MORE</button>
                  <button>SUBSCRIBE</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="thumbnail" ref={thumbnailRef}>
          {thumbnails.map((thumb, index) => (
            <div className="item" key={index}>
              <Image src={thumb.img} alt={`Thumbnail ${index + 1}`} />
              <div className="content">
                <div className="title">{thumb.title}</div>
                <div className="description">{thumb.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows">
          <button id="prev" onClick={() => handleShowSlider("prev")}>{"<"}</button>
          <button id="next" onClick={() => handleShowSlider("next")}>{">"}</button>
        </div>
      </div>
    </>
  );
};

export default Hero;
