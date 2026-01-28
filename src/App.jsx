import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";

import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const products = [
  {
    id: 1,
    name: "Classic Black Frame",
    price: 1299,
    category: "Men",
    image: "https://pngimg.com/uploads/glasses/glasses_PNG54354.png",
  },
  {
    id: 2,
    name: "Round Blue Frame",
    price: 1599,
    category: "Women",
    image: "https://pngimg.com/uploads/glasses/glasses_PNG54354.png",
  },
  {
    id: 3,
    name: "Kids Flexible Frame",
    price: 999,
    category: "Kids",
    image: "https://pngimg.com/uploads/glasses/glasses_PNG54354.png",
  },
  {
    id: 4,
    name: "Kids Flexible Frame",
    price: 999,
    category: "Kids",
    image: "https://pngimg.com/uploads/glasses/glasses_PNG54354.png",
  },
];


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [page, setPage] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const totalPrice = cartItems.reduce((sum, i) => sum + i.price, 0);

  return (
    <>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography onClick={() => setPage("products")} sx={{ cursor: "pointer" }}>
            VisionCart
          </Typography>

          <Typography onClick={() => setPage("cart")} sx={{ cursor: "pointer" }}>
            Cart ({cartItems.length})
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} sx={{ mt: 3 }}>
        {page === "products" && (
          <ProductsPage
            products={products}
            onAddToCart={handleAddToCart}
            onSelectProduct={(product) => {   
              setSelectedProduct(product);
              setPage("details");
            }} //“When a product is selected, remember it and go to details page.  --> Conditional Rendering”
          />
        )}

        {page === "cart" && (
          <CartPage
            cartItems={cartItems}
            onRemove={handleRemoveFromCart}
            totalPrice={totalPrice}
          />
        )}

        {page === "details" && selectedProduct && (
          <ProductDetailsPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
          />
        )}
      </Container>
    </>
  );
}

export default App;


/**
Your question:
“Is it good that we are not opening a new page but rendering conditionally?”

Answer:
✅ Yes — this is EXACTLY how Single Page Applications work.

| Thing          | Responsibility                 |
| -------------- | ------------------------------ |
| `useState`     | Controls WHAT is shown         |
| `useEffect`    | Reacts AFTER something changes |
| Event handlers | Trigger state changes          |
| Router         | Syncs state with URL           |
| Rendering      | Pure UI description            |

---

Your current navigation:
const [page, setPage] = useState("products");  
and then when user clicks on cart  then the page = cart
and then when user clicks on card  then the page = details  :: SAP

This is fine for learning, but bad for real apps because:
❌ No URLs (/products/1)
❌ Refresh breaks navigation
❌ Back/forward browser buttons useless
❌ Cannot deep-link

Product companies expect React Router.


---- EXPLANATION OF REACT FundeMENTALS ----
1️⃣ Component
One-liner:
A React component is a reusable function that returns UI based on props and state.

What they’re testing: Reusability,  Separation of concerns
Don’t say: ❌ “A component is a UI block” (too shallow)


2️⃣ Props
One-liner:
Props are read-only inputs passed from a parent component to configure a child component.

What they’re testing: Data flow understanding
Don’t say: ❌ “Props are variables” (wrong)


3️⃣ useState
One-liner:
useState lets a component hold and update local state, triggering a re-render when the state changes.

useState is a React Hook that lets you add a state variable to your component.
    Syntax: const [state, setState] = useState(initialState)
        Where state: current state value:
              setState: function to update the state
              initialState: initial value of the state     
        Ex: const [age, setAge] = useState(28);
        import { useState } from "react";
        function Counter() {
          const [count, setCount] = useState(0);
          return (
            <>
              <p>Count: {count}</p>
              <button onClick={() => setCount(count + 1)}>
                Increment
              </button>
            </>
          );
        }

What they’re testing: State vs variables, React’s reactivity model
Don’t say: ❌ “useState changes the UI” (state change causes re-render, not direct UI change)

When State Changes, Component Re-renders:
When you call the state updater function (e.g., setAge(29)), React schedules a re-render of the component.
During this re-render, the component function is executed again, and the UI is updated to reflect the new state value.


4️⃣ Re-render
One-liner:
A re-render happens when React re-executes a component function due to a state or prop change.

What they’re testing:React’s functional execution model

Don’t say: ❌ “React updates only the changed part” (it re-runs the function, DOM diff happens later)


5️⃣ Conditional Rendering
One-liner:
Conditional rendering means showing different UI based on state or props using JavaScript conditions.
  Ex : Scenario :: Show “Your cart is empty” when there are no items, otherwise show the cart list.
        function Cart({ cartItems }) {
          return (
            <>
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <p>You have {cartItems.length} items in your cart</p>
              )}
            </>
          );
        }
  What they’re testing:  Control flow, Dynamic UI thinking

Don’t say: ❌ “React has if-else rendering” (it’s just JS) 


6️⃣ useEffect
One-liner:
useEffect runs side-effect code after a render when specified dependencies change.

useEffect is a React Hook that lets you synchronize a component with an external system.
    syntax: useEffect(() => {
                // side-effect logic here
            }, [dependencies]);
                       OR
            useEffect(setup, dependencies?)
        Where setup: function containing side-effect logic
              dependencies: array of variables that trigger the effect when changed
        Ex: useEffect(() => {
                document.title = `You clicked ${count} times`;
            }, [count]);
    
     Ex:
      import { useState, useEffect } from "react";
      function Page() {
        const [title, setTitle] = useState("Home");

        useEffect(() => {
          document.title = title;
        }, [title]);

        return (
          <button onClick={() => setTitle("Profile")}>
            Change Title
          </button>
        );
      }
      “Whenever the title state changes, the effect runs after render and updates the browser tab title.”
       as we see when button is clicked the title changes from Home to Profile in the browser tab. 

What they’re testing: Lifecycle understanding, Side-effect separation

Don’t say: ❌ “useEffect is used to render data” (wrong)


7️⃣ Side Effects
One-liner:
Side effects are operations outside rendering, like API calls, subscriptions, DOM updates, or logging.

What they’re testing: Clean architecture,  Non-UI logic placement


8️⃣ Dependency Array (useEffect)
One-liner:
The dependency array tells React when to re-run the effect based on specific state or prop changes.

If any one value in the dependency array changes, useEffect runs.
It is NOT necessary for all values to change.
        🧠 Three legal dependency patterns (memorize)
        1, Run once (on mount) : "useEffect with an empty dependency array runs once after the component mounts and does not run again on state or prop updates."
        useEffect(() => {}, []);

        2, Run on specific changes
        useEffect(() => {}, [a, b]);

        3, Run every render
        useEffect(() => {});
What they’re testing: Controlled execution, Performance awareness

Don’t say:
❌ “It prevents re-render” (it controls effect execution, not render)

9️⃣ Event Handling
One-liner:
Event handlers are functions passed to (HTML) elements that update state in response to user actions.
   Example: Button click updates count
          return (
            <>
              <p>Count: {count}</p>
              <button onClick={handleClick}>Increment</button>
            </>
          );
   “Here, the button receives an event handler. When the user clicks, the handler updates state, and React re-renders the UI. The event triggers state change, and data flows down again.”
What they’re testing: Unidirectional data flow

🔟 State Lifting
One-liner:
State lifting means moving state to the closest common parent so multiple components can share it.
        ✅ Example: Two children need same state
        ❌ Wrong design (state duplicated)
              function ChildA() {
                const [count, setCount] = useState(0);
              }
              function ChildB() {
                const [count, setCount] = useState(0);
              }
        State is not shared.

        ✅ Correct design (state lifted)
              function Parent() {
                const [count, setCount] = useState(0);
                return (
                  <>
                    <ChildA count={count} />
                    <ChildB setCount={setCount} />
                  </>
                );
              }
  “Since both children need access to the same state, I lift the state to their closest common parent and pass data down via props and updates via callbacks.”
What they’re testing: Architecture decisions


1️⃣1️⃣ Unidirectional Data Flow
One-liner:
React follows unidirectional data flow where data flows down via props and events flow up via callbacks.
      🧠 What this means in plain English
          -> Parents own state
          -> Children receive data
          -> Children cannot directly change parent state
          -> Children request changes via functions (callbacks)
          This makes the app:
          Easy to reason about, Easy to debug, Easy to scale

      🔹 Clear Example (Cart Counter)
          <-----Parent Component (owns the state)---->
          function App() {
            const [count, setCount] = useState(0);
            return (
              <Counter
                count={count}
                onIncrement={() => setCount(count + 1)}
              />
            );
          }

          <----Child Component (receives data + emits event)--->
          function Counter({ count, onIncrement }) {
            return (
              <>
                <p>Count: {count}</p>
                <button onClick={onIncrement}>+</button>
              </>
            );
          }

      🔄 Flow Explained Step-by-Step
          1️, Data flows DOWN ---> count State → Counter Child Component via props
          2️, User clicks button in child  ---> onIncrement()
          3️, Event flows UP  --> App updates state
          4️, React re-renders ---> New count flows down again
          This loop is predictable and controlled.
“In React, state lives in one place and flows down via props.
Child components never mutate state directly — they notify the parent through callbacks.
This makes the data flow predictable and easier to debug.”

What they’re testing: Predictability, Debuggability

1️⃣2️⃣ Material UI (MUI)
One-liner:
Material UI is a React component library that provides pre-built, customizable UI components following Material Design.
    
How MUI connects to Vite (IMPORTANT):
  “Vite is responsible for bundling and serving the app, 
   while Material UI is just a React component library that runs inside the Vite-powered React
   environment.”

🧩 Practical connection (SMALL EXAMPLE)
< ---Install MUI in a Vite project--->
npm install @mui/material @emotion/react @emotion/styled

  import { Button } from "@mui/material";
  function App() {
    return <Button variant="contained">Click Me</Button>;
  }
  
<---npm install @mui/icons-material---> (Optional icons)

“In a Vite-based React app, Vite handles fast bundling and hot reload, while Material UI provides reusable, theme-aware React components. They’re independent but work together seamlessly.”
What they’re testing: Productivity tools,Design system usage

Don’t say:❌ “Material UI is CSS” (it’s component-based)

1️⃣3️⃣ MUI sx Prop
One-liner:
The sx prop allows inline, theme-aware styling directly on Material UI components.

    <Button variant="contained" sx={{ mt: 2, backgroundColor: "primary.main" }} >
      Add to Cart
    </Button>

“The sx prop lets me style Material UI components using JavaScript objects that automatically respect the theme, breakpoints, and design tokens.”
What they’re testing:Styling strategy, Theming awareness

1️⃣4️⃣ SPA (Single Page Application)
One-liner:
An SPA loads a single HTML page and updates the UI dynamically without full page reloads.

What they’re testing: Modern frontend architecture

1️⃣5️⃣ Vite
One-liner:
Vite is a modern frontend build tool that provides fast development using native ES modules and optimized builds.

“Vite starts the dev server instantly by serving files using native ES modules instead of bundling everything upfront.”

      CRA / Webpack:
      Bundle everything first ❌
      Then start dev server ❌

      Vite:
      Serve files instantly using ES modules ✅
      Bundle only for production using Rollup ✅

import http from "http"; ---> ES MOdule
const http = require("http");   ---> Common JS

What they’re testing:Tooling awareness, Performance understanding

Don’t say:❌ “Vite is a React framework” (it’s a build tool)

1️⃣6️⃣ JSX
One-liner:
JSX is a syntax extension that lets us write HTML-like code inside JavaScript, compiled into React elements.
  ✅ Small example
    const element = <h1>Hello World</h1>;
    What React actually sees:
  React.createElement("h1", null, "Hello World");
  🧠 How to explain
    “JSX is not HTML. It’s compiled at build time into React.createElement calls.”
What they’re testing: Compile-time understanding

1️⃣7️⃣ Key (in lists)
One-liner:
Keys help React identify which list items have changed to optimize re-rendering.
  ✅ Small example
    {products.map((product) => (
      <li key={product.id}>{product.name}</li>
    ))}
  🧠 How to explain
    “Keys give React a stable identity for list items during reconciliation.”
    ❌ Don’t use index unless no unique ID exists.
What they’re testing: Reconciliation knowledge

1️⃣8️⃣ Controlled Components
One-liner:
A controlled component is a form element whose value is fully controlled by React state.
  ✅ Small example
    function Input() {
      const [value, setValue] = useState("");
      return (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    }
  🧠 How to explain
  “The input’s value comes from state, and every change updates that state.”
What they’re testing: Form handling

1️⃣9️⃣ Immutability
One-liner:
React state should be treated as immutable, meaning updates return new objects instead of modifying existing ones.

    1️⃣ How React decides to re-render (THIS IS THE CORE)
    React does not deeply compare objects.It uses reference comparison.
    In simple terms, React checks:
            oldState === newState
    If same reference → React assumes “nothing changed”
    If new reference → React re-renders
    That’s it. No magic.

    2️⃣ What goes wrong with mutation (step-by-step)
    ❌ Your “wrong” example
    cartItems.push(newItem); setCartItems(cartItems);
    What actually happens in memory:

    cartItems  --->  [item1, item2]
                      ↑
                  same array

    .push() mutates the same array
    Reference stays the same

    React sees: prevState === nextState // true
    React thinks: “Nothing changed”

    💥 Result:
    UI may not update, Bugs appear randomly,  Debugging becomes hell

    3️⃣ Why the correct version works
    ✅ Correct code : setCartItems([...cartItems, newItem]);

    What happens now:
      oldCartItems ---> [item1, item2]
      newCartItems ---> [item1, item2, newItem]

    Spread operator creates a new array, New reference in memory
    React sees: prevState !== nextState // true

    React re-renders correctly
    This is how React is designed to work.

    4️⃣ Immutability is NOT about “don’t change data”
    This is where most people misunderstand.
      ❌ Wrong belief:
      “Immutability means you never change data”

    ✅ Correct understanding:
      “Immutability means you never change existing state references”
      You can still “change” values — you just do it by creating new copies.

What they’re testing: Predictability, Performance

2️⃣0️⃣ Component Responsibility
One-liner:
Each component should have a single responsibility to keep the UI modular and maintainable.

What they’re testing: Clean code mindset


 */