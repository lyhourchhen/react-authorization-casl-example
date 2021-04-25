import React, { useState } from "react";
import "./App.css";
import { buildAbilityFor } from "./casl/ability";
import { AbilityContext } from "./casl/Can";
import Todo from "./Todo";
function App() {
  const [role, setRole] = useState("admin");
  const ability = buildAbilityFor(role);
  return (
    <div className="App">
      <AbilityContext.Provider value={ability}>
        <Todo role={(role) => setRole(role)} />
      </AbilityContext.Provider>
    </div>
  );
}

export default App;
