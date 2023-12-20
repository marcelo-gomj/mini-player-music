import Layout from "./components/Layout";
import { ModalProvider } from "./contexts/ModalContainer";
import { PlayerProvider } from "./contexts/PlayerContext";
import "./globalCss.css";

function App(): JSX.Element {
  return (
    <PlayerProvider>
      <ModalProvider>
        <Layout />
      </ModalProvider>
    </PlayerProvider>
  )
}

export default App
