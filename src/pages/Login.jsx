import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/App.css";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import imgLogin from "../assets/Imagenes/Login/loginbg.png";
import { login } from "../firebaseConfig";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prevUser) => ({ ...user, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(user);
      console.log(res)
      res && navigate("/")
    } catch (error) {
      console.log(error)
      navigate("/login")
    }
    
  }

  return (
    <div className="containerForm">
      <form className="cardContainer" onSubmit={handleSubmit}>
        <img className="loginImage " src={imgLogin} />
        <div className="formulario">
          <div className="textLogin">
            <h1>BIENVENIDO DE NUEVO</h1>
          </div>

          <Grid item xs={10} md={12} paddingBottom={"2rem"}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10} md={12} paddingBottom={"2rem"}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                name="password"
                onChange={handleChange}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff color="primary" />
                      ) : (
                        <Visibility color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </FormControl>
          </Grid>
          <div className="forgetPassword">
            <Link>¿Olvidaste tu contraseña?</Link>
          </div>

          <div className="containerBoton">
            <button className="loginBoton">INICIAR SESIÓN</button>
            <Link className="registro">Crear cuenta nueva</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
