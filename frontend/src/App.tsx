
import Button from "./components/ui/Button";
import Badge from "./components/ui/Badge";

function App() {

  return (
    <>
      <Button variant="primary">Add to cart</Button>
      <Button variant="secondary">Out of stock</Button>
      <Button variant="ghost">Learn more</Button>


      <Badge variant="warning">Out of stock</Badge>
      <Badge variant="neutral">New</Badge>
      <Badge variant="positive">50% Off</Badge>
    </>
  )
}

export default App
