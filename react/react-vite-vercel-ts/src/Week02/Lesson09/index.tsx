import { NavLink, Outlet } from "react-router";

type Props = {};

export default function lesson09({}: Props) {
  return (
    <div>
      <Outlet />
      <div className="flex justify-evenly mt-5 bg-amber-400 text-amber-50">
        <div className="p-2 bg-indigo-500/80 hover:bg-indigo-500 hover:font-bold rounded-lg">
          <NavLink to="/lesson09/afternoon/form01">Form01</NavLink>
        </div>
        <div className="p-2 bg-indigo-500/80 hover:bg-indigo-500 hover:font-bold rounded-lg">
          <NavLink to="/lesson09/afternoon/form02">Form02</NavLink>
        </div>
        <div className="p-2 bg-indigo-500/80 hover:bg-indigo-500 hover:font-bold rounded-lg">
          <NavLink to="/lesson09/afternoon/form03">Form03</NavLink>
        </div>
      </div>
    </div>
  );
}
