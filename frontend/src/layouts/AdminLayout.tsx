import { Outlet, NavLink } from "react-router-dom"

function AdminLayout() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <nav className="md:w-56 border-b md:border-b-0 md:border-r border-bark-200 p-4 flex md:flex-col gap-2">
                <NavLink to="/admin/products" className={({ isActive }) => isActive ? "font-bold" : ""}>
                    Products
                </NavLink>
                <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "font-bold" : ""}>
                    Orders
                </NavLink>
            </nav>
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout