
import { Outlet } from "react-router";

type Props = {};

export default function MainPage({}: Props) {
  return (
    <div>
      <Outlet />
    </div>
  );
}
