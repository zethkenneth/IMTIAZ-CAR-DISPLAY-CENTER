"use client";

import InventoryNavBar from "./inventory_nav_bar";
import ProductCard from "./product_card";

const Inventory = () => {
  const products = [
    {
      image:
        "https://www.thewheelexchange.com/cdn/shop/files/17584_d0891bbb-c3af-411a-9e14-5d4605404e57_2048x.jpg?v=1709694411",
      name: "Ford Wheel",
      description: "chief",
      stocks: "25 pcs",
      price: 250,
      vat: 50,
      category: "rim",
    },
    {
      image:
        "https://www.cjponyparts.com/media/catalog/product/cache/41573c7cc04735120df5cb9016ff5ad7/m/1/m1007ks2295sb_1.1281_1.jpg",
      name: "Ford Performance Wheel 22",
      description: "chief",
      stocks: "25 pcs",
      price: 250,
      vat: 50,
      category: "rim",
    },
    {
      image:
        "https://img.lazcdn.com/g/p/adf369dbd13c624b4179fc20d288ad40.jpg_2200x2200q80.jpg_.webp",
      name: "Pochi",
      description: "chief",
      stocks: "25 pcs",
      price: 250,
      vat: 50,
    },
    {
      image:
        "https://img.lazcdn.com/g/p/adf369dbd13c624b4179fc20d288ad40.jpg_2200x2200q80.jpg_.webp",
      name: "Pochi",
      description: "chief",
      stocks: "25 pcs",
      price: 250,
      vat: 50,
    },
    {
      image:
        "https://img.lazcdn.com/g/p/adf369dbd13c624b4179fc20d288ad40.jpg_2200x2200q80.jpg_.webp",
      name: "Pochi",
      description: "chief",
      stocks: "25 pcs",
      price: 250,
      vat: 50,
    },
  ];

  return (
    <>
      <InventoryNavBar />
      <main>
        <div className="flex flex-wrap p-5">
          {products.map((product, i) => (
            <ProductCard key={i} {...product} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Inventory;
