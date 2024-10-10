import { Users } from "./Users";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = ({ user }) => {
  return (
    <div>
      <div class="grid grid-cols-1">

        <Link to={"/add-article"}>
          <button> Add Article</button>
        </Link>

      </div>
    </div>
  );
};
