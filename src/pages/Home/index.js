import React, { useEffect, useState } from "react";
import "./Home.css";
import ProductCard from "../../components/common/ProductCard";
import { productService } from "../../services/productService";
import makeAnimated from "react-select/animated";
import { transactionService } from "../../services/transactionService";
const animatedComponents = makeAnimated();

const Home = () => {
  const [products, setProducts] = useState([]);
  const [chosenProducts, setChosenProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleClick = (str) => {
    console.log(str);
  };

  useEffect(() => {
    async function fetchProducts() {
      const products = await productService.get();
      setProducts(products);
    }
    fetchProducts();

    // const savedChosenProducts = JSON.parse(
    //   localStorage.getItem("chosenProducts")
    // );
    // if (savedChosenProducts) {
    //   setChosenProducts(savedChosenProducts);
    //   const sumPriceProducts = chosenProducts.reduce(
    //     (previousProduct, currentProduct) =>
    //       previousProduct.price + currentProduct.price,
    //     0
    //   );
    //   setTotalPrice(sumPriceProducts);
    //   console.log(totalPrice);
    // }
  }, []);

  const handlePay = async () => {
    console.log("pay");
    if(totalPrice) {
      console.log("send transaction with chosenProducts")
      await transactionService.create({
        products: chosenProducts,
        totalPrice,
      });
    }
    
    setTotalPrice(0);
    setChosenProducts([]);
    // localStorage.setItem(
    //   "chosenProducts",
    //   JSON.stringify([])
    // );
  }

  const handleBuy = (product) => {
    setChosenProducts([...chosenProducts, product]);
    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price);

    // const chosenProductsLocalStorage = [...chosenProducts];

    // var index;
    // console.log("chosenProducts", chosenProducts);
    // if (!chosenProducts.includes(product)) {
    //   setChosenProducts([...chosenProducts, product]);
    //   chosenProductsLocalStorage.push(product);
    // } else {
    //   setChosenProducts(
    //     chosenProducts.filter((fproduct) => fproduct !== product)
    //   );
    //   index = chosenProductsLocalStorage.indexOf(product);
    //   chosenProductsLocalStorage.splice(index, 1);
    // }

    // const sumPriceProducts = chosenProductsLocalStorage.reduce(
    //   (sum, currentProduct) => {
    //     return sum + currentProduct.price;
    //   },
    //   0
    // );
    // setTotalPrice(sumPriceProducts);

    // localStorage.setItem(
    //   "chosenProducts",
    //   JSON.stringify(chosenProductsLocalStorage)
    // );
  };

  return (
    <>
      <select name="productsList" id="productsList">
        {chosenProducts &&
          chosenProducts.map((product) => (
            <option value={product._id}>
              {product.title + "      " + product.price + "$"}
            </option>
          ))}
        {totalPrice && (
          <option>{"Total Price       " + totalPrice + "$"}</option>
        )}
        {/* <option className="btn btn-primary" onClick={handlePay}>
          <button className="btn btn-primary" onClick={handlePay}>PAY</button>
        </option> */}
      </select>
      <button className="btn btn-primary" onClick={handlePay}>PAY</button>
      {/* <Select options={products} components={animatedComponents}
              isMulti /> */}
      <div className="container-products">
        {products &&
          products.map((product) => (
            <div className="container-product">
              <ProductCard
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                handleClick={() => handleBuy(product)}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
