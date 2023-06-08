import { styled } from "styled-components"
import ConnectFourGame from "./components/ConnectFourGame";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const App = () => {
  return (
    <Container>
      <h1>Connect Four</h1>
      <ConnectFourGame />
    </Container>
  )
}

export default App
