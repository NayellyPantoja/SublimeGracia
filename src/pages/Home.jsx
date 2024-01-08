
import Footer from "../componentes/footer/Footer";
import Header from "../componentes/header/Header";
import Bienvenida from "../componentes/home/Bienvenida";
import DescriptionHome from "../componentes/home/DescriptionHome";
import Horarios from "../componentes/home/Horarios";
import MapView from "../componentes/map/MapView";


const Home = () => {
  return (
    <>
      <Header />
      <Bienvenida/>
      <DescriptionHome/>
      <Horarios/>
      <MapView/>
      <Footer/>
    </>
  );
};

export default Home;
