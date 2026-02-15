import { Link } from "react-router-dom";
import { Item, ItemContent, ItemTitle } from "./ui/item";

function Sidebar({className}: {className?: string}) {
  return (
    <div className={`sidebar w-64 bg-gray-800 text-white p-4 ${className || ''}`}>
      <h2 className="text-xl font-bold px-4 py-2" >Name App</h2>
      <Item asChild>
        <Link to={"/"}>
          <ItemContent>
            <ItemTitle>Dashboard</ItemTitle>
          </ItemContent>
        </Link>
      </Item>
      <Item asChild>
        <Link to={"/ruangan"}>
          <ItemContent>
            <ItemTitle>Ruangan</ItemTitle>
          </ItemContent>
        </Link>
      </Item>
      <Item asChild>
        <Link to={"/booking"}>
          <ItemContent>
            <ItemTitle>Booking</ItemTitle>
          </ItemContent>
        </Link>
      </Item>
    </div>
  );
}

export default Sidebar;
