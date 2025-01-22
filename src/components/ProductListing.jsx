import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Circles } from "react-loader-spinner";
import ContentLoader from "react-content-loader";

// for Loading Skeleton Component
const LoadingSkeleton = ({ width, height, viewBox, radius = 5 }) => (
  <ContentLoader
    speed={2}
    width={width}
    height={height}
    viewBox={viewBox}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx={radius} ry={radius} width="100%" height="100%" />
  </ContentLoader>
);

const ProductListing = ({ filters, currentPage, setCurrentPage }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const staticProducts = [
    {
      id: 1,
      name: "Dell Inspiron",
      battery: "5000mAh",
      screen: "15-inch",
      ram: "16GB",
      brand: "Dell",
      price: "₹69000",
      description:
        "A powerful laptop with long-lasting battery and great performance, perfect for everyday tasks and work.",
    },
    {
      id: 2,
      name: "HP Pavilion",
      battery: "3000mAh",
      screen: "17-inch",
      ram: "32GB",
      brand: "HP",
      price: "₹60000",
      description:
        "High performance laptop with a large screen and high RAM for multitasking and gaming.",
    },
    {
      id: 3,
      name: "MacBook Pro",
      battery: "2000mAh",
      screen: "13-inch",
      ram: "8GB",
      brand: "Apple",
      price: "₹100000",
      description:
        "Lightweight and powerful laptop with Retina display, ideal for creative professionals and productivity.",
    },
    {
      id: 4,
      name: "Dell XPS",
      battery: "5000mAh",
      screen: "13-inch",
      ram: "16GB",
      brand: "Dell",
      price: "₹570000",
      description:
        "Premium laptop with excellent build quality, fast performance, and stunning visuals, ideal for professionals.",
    },
    {
      id: 5,
      name: "HP EliteBook",
      battery: "3000mAh",
      screen: "15-inch",
      ram: "8GB",
      brand: "HP",
      price: "₹62000",
      description:
        "Business laptop with robust security features, perfect for working on the go and corporate environments.",
    },
    {
      id: 6,
      name: "MacBook Air",
      battery: "2000mAh",
      screen: "13-inch",
      ram: "16GB",
      brand: "Apple",
      price: "₹47000",
      description:
        "Thin, lightweight, and ultra-portable, this MacBook offers solid performance for everyday tasks and media consumption.",
    },
    {
      id: 7,
      name: "Acer Aspire",
      battery: "3000mAh",
      screen: "15-inch",
      ram: "16GB",
      brand: "Acer",
      price: "₹87000",
      description:
        "Affordable and reliable laptop with solid performance for students and casual users, featuring a large screen.",
    },
    {
      id: 8,
      name: "Lenovo ThinkPad",
      battery: "5000mAh",
      screen: "14-inch",
      ram: "8GB",
      brand: "Lenovo",
      price: "₹72000",
      description:
        "Business laptop with durability and performance, ideal for professionals who need a dependable machine.",
    },
    {
      id: 9,
      name: "Asus ZenBook",
      battery: "2000mAh",
      screen: "13-inch",
      ram: "16GB",
      brand: "Asus",
      price: "₹750000",
      description:
        "Sleek and stylish ultrabook with high performance, ideal for professionals who need power and portability.",
    },
    {
      id: 10,
      name: "Microsoft Surface",
      battery: "3000mAh",
      screen: "12-inch",
      ram: "8GB",
      brand: "Microsoft",
      price: "₹90000",
      description:
        "A hybrid laptop-tablet device with a detachable keyboard, offering versatility and solid performance for professionals.",
    },
  ];

  const itemsPerPage = 4;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = staticProducts.filter((product) => {
    const matchesBattery =
      !filters.battery || product.battery === filters.battery;
    const matchesScreen =
      !filters["screen size"] || product.screen === filters["screen size"];
    const matchesRam = !filters.ram || product.ram === filters.ram;
    const matchesBrand = !filters.brand || product.brand === filters.brand;

    return matchesBattery && matchesScreen && matchesRam && matchesBrand;
  });

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + itemsPerPage);

  const handleProductClick = (product) => {
    setIsDetailLoading(true);
    setSelectedProduct(product);
    setTimeout(() => {
      setIsDetailLoading(false);
    }, 2000);
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Circles color="#3498db" height={80} width={80} />
        </div>
      ) : (
        <>
          {!selectedProduct && (
            <h1 className="text-2xl font-bold mb-6 text-center">
              Products List
            </h1>
          )}

          {selectedProduct ? (
            <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg flex">
              <div className="flex-shrink-0 w-1/3">
                {isDetailLoading ? (
                  <LoadingSkeleton
                    width={300}
                    height={200}
                    viewBox="0 0 300 200"
                  />
                ) : (
                  <img
                    src={`https://picsum.photos/300/200?random=${selectedProduct.id}`}
                    alt={selectedProduct.name}
                    className="h-40 w-full object-cover rounded-md"
                  />
                )}
              </div>
              <div className="ml-6 w-2/3">
                <h2 className="text-3xl font-bold">
                  {isDetailLoading ? (
                    <LoadingSkeleton
                      width={400}
                      height={40}
                      viewBox="0 0 400 40"
                    />
                  ) : (
                    selectedProduct.name
                  )}
                </h2>
                <p className="mt-2 text-gray-700">
                  {isDetailLoading ? (
                    <LoadingSkeleton
                      width={400}
                      height={20}
                      viewBox="0 0 400 20"
                    />
                  ) : (
                    selectedProduct.description
                  )}
                </p>
                <p className="mt-2">
                  {isDetailLoading ? (
                    <LoadingSkeleton
                      width={400}
                      height={20}
                      viewBox="0 0 400 20"
                    />
                  ) : (
                    `Battery: ${selectedProduct.battery}`
                  )}
                </p>
                <p className="mt-2">
                  {isDetailLoading ? (
                    <LoadingSkeleton
                      width={400}
                      height={20}
                      viewBox="0 0 400 20"
                    />
                  ) : (
                    `Screen: ${selectedProduct.screen}`
                  )}
                </p>
                <p className="mt-2">
                  {isDetailLoading ? (
                    <LoadingSkeleton
                      width={400}
                      height={20}
                      viewBox="0 0 400 20"
                    />
                  ) : (
                    `RAM: ${selectedProduct.ram}`
                  )}
                </p>
                <p className="mt-2 font-bold">
                  {isDetailLoading ? (
                    <LoadingSkeleton
                      width={400}
                      height={20}
                      viewBox="0 0 400 20"
                    />
                  ) : (
                    `Price: ${selectedProduct.price}`
                  )}
                </p>
                <button
                  className="mt-4 text-blue-500"
                  onClick={() => setSelectedProduct(null)}
                >
                  Back to Product Listing
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-6">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 bg-white shadow-lg rounded-lg flex flex-col items-start hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <img
                        src={`https://picsum.photos/300/200?random=${product.id}`}
                        alt={product.name}
                        className="h-40 w-full object-cover rounded-md"
                      />
                      <div className="mt-2 w-full">
                        <h3 className="font-semibold text-left">
                          {product.name}
                        </h3>
                        <p className="font-bold text-left">{product.price}</p>
                      </div>
                      <div className="flex justify-center mt-4">
                        <button
                          className="py-1 px-2 bg-emerald-500 text-white text-sm rounded w-auto hover:bg-emerald-700"
                          onClick={() => handleProductClick(product)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-3 text-center text-gray-500">
                    No products match the selected filters.
                  </p>
                )}
              </div>

              {pageCount > 1 && (
                <div className="mt-4 flex justify-center">
                  <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"flex space-x-2"}
                    pageClassName={"px-3 py-1 border rounded-md cursor-pointer"}
                    activeClassName={"bg-gray-800 text-white"}
                    previousClassName={
                      "px-3 py-1 border rounded-md cursor-pointer"
                    }
                    nextClassName={"px-3 py-1 border rounded-md cursor-pointer"}
                    disabledClassName={"text-gray-400 cursor-not-allowed"}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListing;
