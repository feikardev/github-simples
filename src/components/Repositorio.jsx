import { useState } from 'react'
import { Heart, HeartOff } from 'lucide-react';


export default function Repositorio(props) {
  const [clicou, setClicou] = useState(false)
  const [pesquisou, setPesquisou] = useState(props.nomeUsuario)
  const array10 = Array.from({ length: 10 })
  
  function handlePesquisar(formData) {
    const usuario = formData.get("usuario")
    setPesquisou(usuario)
  }

  function handleClicou(id) {
    // console.log(id)
    setClicou((prevClicou) => ({
      ...prevClicou, [id]: !prevClicou[id]
    }))
  } 

  return (
    <>
      <header className="header1"><b>GitHub, mas simples</b></header>
      <form className="form-pesquisar" action={handlePesquisar}>
        <input
          className="input-pesquisar"
          type="search"
          name="usuario"
          placeholder="Usuário"
          >
        </input>
        <button className="button1">Pesquisar</button>
      </form> 
      {pesquisou ?
      (
      <>
        <h1 className="h1-repositorio">Repositórios de {pesquisou}</h1>
        {array10.map((_, index) => (
          <div className="div-repositorio" key={index}>
            <ul className="list-usuario">
              <li>{props.nomeRepositorio}</li>
              {props.descricao && <li>{props.descricao}</li>}
              <li>Avaliação: {props.avaliacao}</li>
              <li><a href={props.link}>Link</a></li>
              <li onClick={() =>handleClicou(index)}>
                {clicou[index] ? (<HeartOff />) : (<Heart />)}
              </li>
            </ul>
          </div>
        ))}
      </>
      ) : null}
    </>
  )
}