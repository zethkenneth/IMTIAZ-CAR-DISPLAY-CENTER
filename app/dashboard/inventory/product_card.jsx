import React from "react";

const ProductCard = ({ image, name, price }) => {
  return (
    <div
      style={{ width: "14rem" }}
      className="max-w-sm w-full sm:w-1/3 h-90 flex flex-col shadow-lg rounded-lg overflow-hidden m-4"
    >
      <div
        className="flex-shrink-0 p-2 h-36 bg-contain repeat-none bg-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          mixBlendMode: "multiply",
        }}
      ></div>
      <div className="flex-1 w-full p-4 pt-2 flex flex-col justify-between leading-normal">
        <div className="mb-2">
          <h2 className="text-gray-900 font-bold text-md mb-2">{name}</h2>
        </div>
        <div className="mb-2">
          <p className="text-gray-900 text-sm">
            Price: <strong>${price.toFixed(2)}</strong>
          </p>
        </div>
        <button className="w-full bg-blue-500 mt-2 text-white font-medium py-1 px-2 rounded-lg hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
