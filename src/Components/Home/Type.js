import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Parlons Accessibilité",
          "Naviguez sans Barrières",
          "Inclusif et Convivial",
          "Chacun Mérite de Se Connecter",
          "Sans Limites, Juste Naviguer",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 40,
        delay: 100, 
        pauseFor: 5000, 
      }}
    />
  );
}

export default Type;
