import { Users } from "./Users";
import { useState } from "react";

export const Header = () => {
  const [username, setUsername] = useState("jessjelly");

  return ( 
    <div> 
  <h2 class="font-bold p-4 text-xl "> Mayowa's News</h2>
      
      <Users 
      username={username}
      setUsername={setUsername}
    />
      </div>
  );
};
