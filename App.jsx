
import AppRouter from "./src/router/AppRouter";
import AuthContexComponent from "./src/context/AuthContex";


const App = () => {
  return (
      <AuthContexComponent>
          <AppRouter />
      </AuthContexComponent>
    
  );
};

export default App;
