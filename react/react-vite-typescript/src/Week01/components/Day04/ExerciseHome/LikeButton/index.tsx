import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
type Props = {
  isLike?: boolean;
};

export const LikeButton = ({ isLike = false }: Props) => {
  const [like, setLike] = React.useState(!isLike);
  const handleClick = () => {
    setLike((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={() => handleClick()}
        style={{ border: "none", backgroundColor: "transparent" }}
      >
        {like ? (
          <AiOutlineLike />
        ) : (
          <AiFillLike style={{ transform: "scaleY(-1)" }} />
        )}
      </button>
      <span>
        {like ? "Click like if this post is useful to you !" : "Thank you !"}
      </span>
    </div>
  );
};
