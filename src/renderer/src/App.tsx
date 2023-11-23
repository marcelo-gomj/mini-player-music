import Layout from "./components/Layout";
import { PlayerProvider } from "./contexts/PlayerContext";

function App(): JSX.Element {
  return (
    <PlayerProvider>
      <Layout />
    </PlayerProvider>
  )
}

export default App
