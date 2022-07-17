import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "product 1",
    description: "The first book I ever wrote",
  },
  {
    id: "p2",
    price: 16,
    title: "product 2",
    description: "The second book I ever wrote",
  },
  {
    id: "p3",
    price: 8,
    title: "lalSingh",
    description: "Try to understand ",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem key={product.id} id={product.id} title={product.title} price={product.price} description={product.description} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
