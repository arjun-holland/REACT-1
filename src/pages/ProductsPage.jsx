// src/pages/ProductsPage.jsx

import {
  Typography,
  Grid,
  Select,
  MenuItem,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import ProductCard from "../components/ProductCard";

function ProductsPage({ products, onAddToCart, onSelectProduct  }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2000);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const priceMatch = product.price <= maxPrice;
    return categoryMatch && priceMatch;
  });

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Eyeglasses Collection
      </Typography>

      {/* FILTERS */}
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Filters</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Category</Typography>
              <Select fullWidth value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Men">Men</MenuItem>
                <MenuItem value="Women">Women</MenuItem>
                <MenuItem value="Kids">Kids</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2"> Max Price: ₹{maxPrice}</Typography>
              <Slider
                value={maxPrice}
                min={500}
                max={2000}
                step={100}
                onChange={(e, val) => setMaxPrice(val)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* PRODUCT GRID */}
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={9}>
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  onAddToCart={() => onAddToCart(product)}
                  onSelect={() => onSelectProduct(product)}  // CONDITIONAL RENDERING
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductsPage;




/**
REACT RENDER's When the STATE CHANGES --> CONDITIONAL RENDERING


User clicks
↓
Event handler updates state
↓
React re-renders UI
↓
Page appears
↓
useEffect runs AFTER render

 */