import { Users } from "./Users";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [username, setUsername] = useState([]);

  return (
    <div>
      <h2 class="font-bold p-4 text-xl "> Mayowa's News</h2>

      <Users username={username} setUsername={setUsername} />

      <Link to={"/topics"}>
        <button> Add Topic</button>
      </Link>


      <Link to={"/add-article"}>
<button> Add Article</button>
</Link>

<Link to={"/user-details"}>
<button> View User</button>
</Link>



    </div>



  
  );
};
