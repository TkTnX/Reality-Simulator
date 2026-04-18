import axios from "axios";
import { useEffect } from "react";

const url = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const payload = {
  scope: "GIGACHAT_API_PERS",
};
const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  Accept: "application/json",
  RqUID: "019da13c-b7b3-780f-8d26-8fda473c6ffc",
  Authorization:
    "Basic MDE5ZGExM2MtYjdiMy03ODBmLThkMjYtOGZkYTQ3M2M2ZmZjOjdiNjc5MGUwLWQxY2YtNDQxMC04NzBiLTZlNzQ2ZjlkZmViNA==",
};

function App() {
  useEffect(() => {
    const fetchData = async () => {
      "use server";
      try {
        const res = await axios.post(url, payload, { headers });
        console.log(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
  return <h1>Hello world!</h1>;
}

export default App;
