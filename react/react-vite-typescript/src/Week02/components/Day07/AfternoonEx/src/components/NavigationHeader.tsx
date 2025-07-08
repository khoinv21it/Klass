import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router";

type Props = {};

export default function NavigationHeader({}: Props) {
  return (
    <div className="mx-auto flex justify-between gap-16 p-3 bg-amber-500 items-center shadow-amber-100 flex-wrap">
      <div className="text-3xl text-amber-50 font-bold">
        <p>Magazine</p>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex gap-3 text-amber-50">
          <NavLink
            to={`/`}
            style={({ isActive }) =>
              isActive ? { fontWeight: "bold", color: "black" } : undefined
            }
          >
            Home
          </NavLink>
          <NavLink
            to={`/blog`}
            style={({ isActive }) =>
              isActive ? { fontWeight: "bold", color: "black" } : undefined
            }
          >
            Blog
          </NavLink>
          <a>Category</a>
          <NavLink
            to={`/product/category/all`}
            style={({ isActive }) =>
              isActive ? { fontWeight: "bold" } : undefined
            }
          >
            Products
          </NavLink>
          <a>Login</a>
          <a>Customer</a>
        </div>

        <div className="flex bg-amber-50 items-center rounded gap-2 p-1 justify-around text-amber-500 ">
          <span>
            <AiOutlineShoppingCart />
          </span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
}
