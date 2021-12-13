import { useState } from "react";

import Reservations from "./contents/main/reservations";
import Selector from "./contents/main/selector";
import CreateReserve from "./contents/main/createReserve";

function App() {
  const [page, setPage] = useState("createReserve");

  const [state, setState] = useState({
    date: "2021-12-1",
    roomId: 1
  });

  if (page === "selector") {
    return (<>
      <Selector setState={setState} setPage={setPage}/>
    </>);
  } else if (page === "createReserve") {
    return (<>
      <CreateReserve state={state} setPage={setPage} />
    </>);
  } else {
    return (<>
      <Reservations state={state} setPage={setPage} />
    </>);
  }
}

export default App;
