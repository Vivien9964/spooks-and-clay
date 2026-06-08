import LoginForm from "@/features/auth/LoginForm"
import Button from "@/components/ui/Button"

import { Link } from "react-router-dom"



function LoginPage() {
    return (
        <div className="max-w-md mx-auto mt-20 mb-12 bg-cream-50 rounded-2xl border border-cream-300 shadow-sm p-8">

            <h1 className="font-display text-2xl text-bark-900">Welcome back!</h1>
            <LoginForm />

            <p className="font-body text-sm text-bark-500 mt-6 pt-5 border-t border-cream-300">Don't have an account?</p>
            
        <Link to="/register">
            <Button variant="ghost" className="text-sm text-pumpkin-700 hover:text-pumpkin-500 px-0">
                Sign up
            </Button>
        </Link>


        </div>
    )
}

export default LoginPage