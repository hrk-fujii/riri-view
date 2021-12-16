import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

import Top from "./contents/main/top";

function App() {
  return (
    <Container style={{"max-width": "720px"}}>
      <Top />
    </Container>
  );
}

export default App;
