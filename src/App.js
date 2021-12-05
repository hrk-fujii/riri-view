import Reservations from "./contents/main/reservations";

function App() {
  let data = {
    roomId: 1,
    date: "2022-01-01"
  }
  
  return (
    <Reservations data={data} />
  );
}

export default App;
