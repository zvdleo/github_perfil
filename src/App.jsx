import { useState } from "react";

import Perfil from "./components/Perfil";
import Formulario from "./components/Perfil/Formulario";
import ReposList from "./components/ReposList";


function App () {
  const [formularioEstaVisivel, setFormularioEstaVisivel] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState('');

  return (
    <>
      <header className="header">
        <h1 className="title">Perfil do GitHub</h1>
        <input className="input" type="text" onBlur={(e) => setNomeUsuario(e.target.value)} placeholder="Usuário" />
        <button className="button" onClick={() => setFormularioEstaVisivel(formularioEstaVisivel)} type="button">Buscar</button>
      </header>

      {nomeUsuario.length > 4 && (
        <>
          <Perfil nomeUsuario={nomeUsuario} />
          <ReposList nomeUsuario={nomeUsuario} />
        </>
      )}

      {/* {formularioEstaVisivel && (
        <Formulario />
      )}

       */}
    </>
  )
}

export default App