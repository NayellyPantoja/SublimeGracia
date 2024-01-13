import { useEffect, useRef, useState } from "react";
import background from "../../assets/Imagenes/Backgrounds/sermones.jpg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FadeLoader } from "react-spinners";
import Slider from "react-slick";

const Main = () => {
  const [isChange, setIsChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [predicas, setPredicas] = useState([]);
  const [series, setSeries] = useState([]);
  const [predicaSelected, setPredicaSelected] = useState({});
  const [isPredicaSelected, setIsPredicaSelected] = useState(false);
  const [predicaAleatoria, setPredicaAleatoria] = useState({});
  const containerVideoFrameRef = useRef(null);

  useEffect(() => {
    setIsChange(false);
    const dataFetch = async () => {
      try {
        let predicasCollection = collection(db, "predicas");
        const resPredicas = await getDocs(predicasCollection);
        const newRes = resPredicas.docs.map((predica) => {
          return { ...predica.data(), id: predica.id };
        });
        setPredicas(newRes);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    dataFetch();
  }, [isChange]);

  useEffect(() => {
    const organizarPredicas = () => {
      const agrupadas = predicas.reduce((acc, predica) => {
        const { serie } = predica;
        const key = serie || "Predicas";

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push({
          ...predica,
          titulo: predica.titulo,
          urlEmbed: predica.url,
          id: predica.id,
        });

        return acc;
      }, {});

      const seriesArray = Object.keys(agrupadas).map((serie) => ({
        serie,
        predicas: agrupadas[serie],
        scrollLeft: 0,
        isDragging: false,
      }));

      seriesArray.sort((a, b) => a.serie.localeCompare(b.serie));

      setSeries(seriesArray);
    };

    organizarPredicas();
  }, [predicas]);

  useEffect(() => {
    setLoading(true);

      if (predicas.length > 0) {
        const randomIndex = Math.floor(Math.random() * predicas.length);
        setPredicaAleatoria(predicas[randomIndex]);
        setLoading(false);
      }
      
  }, [predicas]);

  const handleVideoClick = (predica) => {
    setPredicaSelected(predica);
    setIsPredicaSelected(true);

    containerVideoFrameRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 655,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="containerBienvenida sermones">
      <div className="containerImgBgHome sermones">
        <img className="backgroundHome" src={background} alt="" />
      </div>
      <section className="mainVideo" ref={containerVideoFrameRef}>
        {isPredicaSelected ? (
          <div className="containerVideoIframe">
            <iframe
              className="carrusel"
              src={predicaSelected.url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <h3>{`${predicaSelected.titulo} | ${predicaSelected.cita} | ${predicaSelected.predicador}`}</h3>
          </div>
        ) : (
          <div className="containerVideoIframe">
            {loading ? (
              <div className="spinnerSection"><FadeLoader color="#7CAC41" /></div>
            ) : (
              <>
                <iframe
                  className="carrusel"
                  src={predicaAleatoria.url}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                <h3>{`${predicaAleatoria.titulo} | ${predicaAleatoria.cita} | ${predicaAleatoria.predicador}`}</h3>
              </>
            )}
          </div>
        )}
      </section>
      <section className="videos">
        {series.map((serieItem) => (
          <div key={serieItem.serie} className="containerSerie">
            <h2>{serieItem.serie}</h2>
            <div className="serie">
            <Slider {...settings}>
              {serieItem.predicas.map((predica, predicaIndex) => (
                <div
                  key={predicaIndex}
                  onClick={() => handleVideoClick(predica)}
                  className="carrusel"
                >
                  <img src={predica.img} alt="Preview" />
                  <p>
                    {predica.titulo} | {predica.cita} | {predica.predicador}
                  </p>
                </div>
              ))}
              </Slider>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Main;
