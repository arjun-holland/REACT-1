// src/components/CartItem.jsx

import { Box, Typography } from "@mui/material";

function CartItem({ item, onRemove }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 1,
      }}
    >
    <Typography>{item.name}</Typography>

    <Box sx={{ display: "flex", gap: 2 }}>
        <Typography>₹{item.price}</Typography>
        <Typography sx={{ color: "red", cursor: "pointer" }} onClick={onRemove}>
          Remove
        </Typography>
      </Box>
    </Box>
  );
}

export default CartItem;
