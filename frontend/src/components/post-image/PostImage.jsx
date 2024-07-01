import React from "react";

export default function PostImage({ src }) {
  return (
    <img
      className="object-fit-contain w-100 h-100"
      src={src}
      style={{ maxHeight: "500px" }}
    />
  );
}
