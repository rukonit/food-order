import React from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
