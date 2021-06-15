import React from "react";
import "./App.css";
import { Symfoni } from "./hardhat/SymfoniContext";

import { Greeter } from "./components/Greeter";
import { Token } from "./components/Token";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Symfoni autoInit={true}>
          <Greeter />
          <hr />
          <Token />
        </Symfoni>
      </header>
    </div>
  );
}

export default App;
