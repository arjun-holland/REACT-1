import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

// here {name, price, image} are Props = data coming from outside.

function ProductCard({ name, price, image, onAddToCart, onSelect }) {
  return (
    <Card
      sx={{ maxWidth: 280, cursor: "pointer" }}
      onClick={onSelect}    //“Someone clicked me.” // CONDITIONAL RENDERING
    >
      <CardMedia component="img" height="140" image={image} alt={name} />

      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6">{name}</Typography>

        <Typography variant="body2" color="text.secondary">
          ₹{price}
        </Typography>

        <Button
          variant="contained"
          size="small"
          sx={{ mt: 1 }}
          onClick={(e) => {
            e.stopPropagation(); // 🔥 IMPORTANT :: Add to cart ✅, ALSO trigger card click ❌
            onAddToCart();
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;

