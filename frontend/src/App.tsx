
// Path aliases to simplify import paths as the application grows
// vite.config.ts -> added resolve: { alias: { "@": path.resolve(_dirname, "src")}}
// tsconfig.app.json -> added in compilerOptions "baseUrl": ".", "paths": { "@/*": ["src/*"]}
import HomePage from "@/pages/HomePage"
import ShopPage from "@/pages/ShopPage"
import ProductPage from "@/pages/ProductPage"
import OrdersPage from "@/pages/OrdersPage" 
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"

import { Routes, Route } from "react-router-dom"
import RootLayout from "@/layouts/RootLayout"

function App() {

  return (
    <>
      <Routes>
          <Route element={<RootLayout /> }>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
