// src/pages/CartPage.jsx

import { Typography, Grid, Box } from "@mui/material";
import CartItem from "../components/CartItem";

function CartPage({ cartItems, onRemove, totalPrice }) {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cartItems.map((item, index) => (
              <Grid item xs={12} key={index}>
                <CartItem
                  item={item}
                  onRemove={() => onRemove(index)}
                />
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              mt: 3,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              borderTop: "2px solid #eee",
            }}
          >
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">₹{totalPrice}</Typography>
          </Box>
        </>
      )}
    </>
  );
}

export default CartPage;
