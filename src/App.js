import { useState } from "react";

import Reservations from "./contents/main/reservations";
import Selector from "./contents/main/selector";

function App() {
  const [page, setPage] = useState("selector");

  const [state, setState] = useState({});

  if (page === "selector") {
    return (<>
      <Selector setState={setState} setPage={setPage}/>
    </>);
  } else {
    return (<>
      <Reservations state={state} />
    </>);
  }
}

export default App;
