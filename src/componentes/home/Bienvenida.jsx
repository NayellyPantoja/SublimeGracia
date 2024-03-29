import imgBack from "../../assets/imgWebp/Backgrounds/BackgroundHome.webp";

const Bienvenida = () => {
  return (
    <div className="containerBienvenida">
      <div className="containerImgBgHome">
        <img className="backgroundHome" src={imgBack} alt="Fondo pantalla principal" />
      </div>
      <div className="containerTextoBienvenida">
        <h1 className="tituloBienvenida">
          ¡Bienvenidos a <span>Sublime Gracia!</span>
        </h1>
        <p className="textoBienvenida solas">
          Más que una iglesia, somos una familia.
        </p>
      </div>
    </div>
  );
};

export default Bienvenida;
