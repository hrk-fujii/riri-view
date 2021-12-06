import Reservations from "./contents/main/reservations";

function App() {
  let data = {
    roomId: 1,
    date: "2021-12-1"
  }
  
  return (
    <Reservations data={data} />
  );
}

export default App;
