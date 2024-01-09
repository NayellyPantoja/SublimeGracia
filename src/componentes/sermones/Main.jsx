import { useEffect, useState } from "react";
import background from "../../assets/Imagenes/Backgrounds/sermones.jpg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Main = () => {
  const [isChange, setIsChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const [predicas, setPredicas] = useState([]);
  const [series, setSeries] = useState([]);

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
      const agrupadas = {};

      predicas.forEach((predica) => {
        const { serie } = predica;

        if (!serie) {
          if (!agrupadas.Predicas) {
            agrupadas.Predicas = [];
          }

          agrupadas.Predicas.push({
            titulo: predica.titulo,
            urlEmbed: predica.url,
            id: predica.id,
          });
        } else {
          if (!agrupadas[serie]) {
            agrupadas[serie] = [];
          }

          agrupadas[serie].push({
            titulo: predica.titulo,
            urlEmbed: predica.url,
            id: predica.id,
          });
        }
      });

      const seriesArray = Object.keys(agrupadas).map((serie) => {
        return {
          serie,
          predicas: agrupadas[serie],
          scrollLeft: 0,
          isDragging: false,
        };
      });

      seriesArray.sort((a, b) => a.serie.localeCompare(b.serie));

      setSeries(seriesArray);
    };

    organizarPredicas();
  }, [predicas]);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
      <section className="videos">
        {series.map((serieItem) => (
          <div key={serieItem.serie} className="containerSerie">
            <h2>{serieItem.serie}</h2>
            <div className="serie">
              <Slider {...settings}>
                {serieItem.predicas.map((predica, predicaIndex) => (
                  <iframe
                    key={predicaIndex}
                    className="carrusel"
                    src={predica.urlEmbed}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
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
