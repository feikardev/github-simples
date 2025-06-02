import { useState } from 'react'
import { Loader, Heart, HeartOff } from 'lucide-react'

export default function Repositorio() {
  const [clicou, setClicou] = useState(false)
  const [pesquisou, setPesquisou] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [repositorios, setRepositorios] = useState([])
  const [erro, setErro] = useState(null)
  const array10 = repositorios.slice(0, 10)

  async function handlePesquisar(formData) {
    const usuario = formData.get("usuario")
    setPesquisou(usuario)
    await fetchRepositorios(usuario)
  }

  function handleClicou(id) {
    // console.log(id)
    setClicou((prevClicou) => ({
      ...prevClicou, [id]: !prevClicou[id]
    }))
  }

  async function fetchRepositorios(usuario) {
    setCarregando(true)
    setErro(null)
    const res = await fetch(`https://api.github.com/users/${usuario}/repos`)
    const data = await res.json()
    setRepositorios(data)
    if (repositorios != []) {
      setCarregando(false)
      // console.log(carregando)
    }
    if (res.status === 404) {
      setCarregando(false)
      setErro(`Usuário "${usuario}" não encontrado.`)
      setRepositorios([])
    } else if (res.status === 403) {
      setErro("Limite de pesquisas excedido.")
    }
    if (data.length === 0) {
      setErro("Nenhum repositório.")
    }
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

      {carregando ? <Loader  className="loader"/> : null}
      {pesquisou ?
        (
          <>
            {erro ? <p className="p-erro">{erro}</p> : <h1 className="h1-repositorio">Repositórios de {pesquisou}</h1>}
            {array10.map((repositorio) => (
              <div className="div-repositorio" key={repositorio.id}>
                <ul className="list-usuario">
                  <li>{repositorio.name}</li>
                  {repositorio.description ? <li>{repositorio.description}</li> : null}
                  <li>Avaliação: {repositorio.stargazers_count}</li>
                  <li><a href={repositorio.html_url}>Link</a></li>
                  <li onClick={() =>handleClicou(repositorio.id)}>
                    {clicou[repositorio.id] ? (<HeartOff />) : (<Heart />)}
                  </li>
                </ul>
              </div>
          ))}
          </>
        ) : null}
    </>
  )
}