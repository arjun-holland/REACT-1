import { useEffect } from "react";
import { Typography, Grid, Button } from "@mui/material";

function ProductDetailsPage({ product, onAddToCart }) {

  // useEffect(() => {
  //   if (product) {
  //     console.log("Viewing product:", product.name);
  //   }
  // }, [product]);

  useEffect(() => {    //Syncing with Browser APIs :: 📌 “Update tab title”
    document.title = product.name;
  }, [product.name]);


  

  if (!product) return null;

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {product.name}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            Price: ₹{product.price}
          </Typography>

          <Typography sx={{ my: 2 }}>
            Category: {product.category}
          </Typography>

          <Button
            variant="contained"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductDetailsPage;


/**  USEEFFECT EXPLANATION:
 
“Whenever the currently viewed product changes, run some side-effect logic.” 

In your demo, that logic is just console.log().
In a real product, this is where real work happens.

🏗 REAL-WORLD USE CASES OF useEffect (IMPORTANT)
Here’s what product companies ACTUALLY use useEffect for:

1. Fetching data from APIs
2. Subscribing to events (e.g., WebSocket connections)
3. Setting up timers or intervals
4. Managing side effects like logging or analytics
5. Cleaning up resources when components unmount

useEffect(() => {     //1. Fetching data from APIs
  fetch(`/api/products/${product.id}`)
    .then(res => res.json())
    .then(data => setProductDetails(data));
}, [product.id]);


useEffect(() => {   //“Reset scroll when page changes”
  window.scrollTo(0, 0);
}, [product]);


// useEffect(() => {    //Syncing with Browser APIs
  document.title = product.name;
}, [product.name]);


 */