const Product = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        margin: "10px 5px",
        background: "white",
        borderRadius: "12px",
        overflow: "hidden",
        width: "100%"
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <img src="/product.jpg" style={{ width: "60px", height: "60px" }} />
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
