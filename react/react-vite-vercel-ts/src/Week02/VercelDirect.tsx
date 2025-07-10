import { Link } from "react-router";

type Props = {};

export default function VercelDirect({}: Props) {
  return (
    <div className="flex gap-3 justify-center">
      <Link to="/lesson09/afternoon/form01">
        <button className="p-3 bg-amber-800 font-bold mx-auto">Lesson09</button>
      </Link>
      <Link to="/lesson10">
        <button className="p-3 bg-amber-800 font-bold mx-auto">Lesson10</button>
      </Link>
    </div>
  );
}
