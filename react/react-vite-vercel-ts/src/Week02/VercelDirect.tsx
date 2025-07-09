import { Link } from "react-router";

type Props = {};

export default function VercelDirect({}: Props) {
  return (
    <div>
      <Link to="/lesson09/afternoon/form01">
        <button className="p-3 bg-amber-800 font-bold mx-auto">Lesson09</button>
      </Link>
    </div>
  );
}
