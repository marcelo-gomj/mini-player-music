import { ModalProvider } from "./contexts/ModalContainer";
import { PlayerProvider } from "./contexts/PlayerContext";
import { RouterProvider } from "./contexts/Router";
import "./globalCss.css";

function App(): JSX.Element {
  return (
    <PlayerProvider>
      <ModalProvider>
        <RouterProvider />
      </ModalProvider>
    </PlayerProvider>
  )
}

export default App
