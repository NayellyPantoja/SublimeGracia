import imgBack from "../../assets/imgWebp/Backgrounds/BackgroundHome.webp";

const Bienvenida = () => {
  return (
    <>
      <div className="containerImgBgHome">
        <img className="backgroundHome" src={imgBack} alt="" />
      </div>
      <div className="containerBienvenida">
        <h1 className="tituloBienvenida">
          ¡Bienvenidos a <span>Sublime Gracia!</span>
        </h1>
        <p className="textoBienvenida">
          Más que una iglesia, somos una familia.
        </p>
      </div>
    </>
  );
};

export default Bienvenida;
