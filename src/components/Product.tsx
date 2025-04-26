import { CiShare1 } from "react-icons/ci";
import { iconValues } from "../lib/constants";

const Product = () => {
  return (
    <div
      style={{
        background: "white",
        width: "270px",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative"
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <img src="/product.jpg" style={{ width: "60px", height: "60px" }} />
        <CiShare1 {...iconValues} />
        <div>
          <div className="product-name">Hey that's an amazing product.</div>
          <div className="price">999</div>
        </div>
      </div>
      <button className="addToCart-button">ADD TO CART</button>
    </div>
  );
};

export default Product;
