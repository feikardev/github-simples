import Repositorio from './components/Repositorio'
import './index.css'

function App() {
  return (
    <>
      <Repositorio
        nomeRepositorio = "Tetris"
        avaliacao = {5}
        link = "https://github.com/"
      />
  </>
)
}

export default App