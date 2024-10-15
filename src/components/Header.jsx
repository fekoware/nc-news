import { Users } from "./Users";
import { Link } from "react-router-dom";

export const Header = ({ user }) => {
  return (
    <div>
      <div>
        <Link to={"/add-article"}>
          <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md transition-transform duration-200 ease-in-out hover:opacity-80">
            Add Article
          </button>
        </Link>
      </div>
    </div>
  );
};
