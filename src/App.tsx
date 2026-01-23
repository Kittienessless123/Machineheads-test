import React from "react";
import "./App.css";
import { AppRouter , Providers} from "./app/index.tsx";

 
const App = () => {
   return (
    <Providers>
       <AppRouter />
    </Providers>
  );
};

export default App;