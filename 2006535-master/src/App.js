import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [trains,setTrains] = useState();

  useEffect(()=> {
    const call = async() => {
      const res = await axios.get("http://localhost:4000/train/trains");
      console.log(res.data)
      setTrains(res.data);
    }
    call();
  },[])

  return <>

    <h3>
     { trains?.map((train,i) => (<p key={i}> {train?.trainName}</p>))}
    </h3>

  </>
}

export default App;
