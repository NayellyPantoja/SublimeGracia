
import Footer from "../componentes/footer/Footer";
import Header from "../componentes/header/Header";
import Bienvenida from "../componentes/home/Bienvenida";
import DescriptionHome from "../componentes/home/DescriptionHome";


const Home = () => {
  return (
    <>
      <Header />
      <Bienvenida/>
      <DescriptionHome/>
      <Footer/>
    </>
  );
};

export default Home;
