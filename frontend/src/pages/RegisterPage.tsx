import RegisterForm from "@/features/auth/RegisterForm"
import Button from "@/components/ui/Button"

import { Link } from "react-router-dom"

function RegisterPage() {
    return (
        <div className="max-w-md mx-auto mt-20 mb-12 bg-cream-50 rounded-2xl border border-cream-300 shadow-sm p-8">
            <h1 className="font-display text-2xl text-bark-900">Create an account</h1>
            <RegisterForm />

            <p className="font-body text-sm text-bark-500 mt-6 pt-5 border-t border-cream-300">Already have an account?</p>
            <Link to="/login">
                <Button variant="ghost" className="text-sm text-pumpkin-700 hover:text-pumpkin-500 px-0">
                    Log in
                </Button>
            </Link>

        </div>
    )
}

export default RegisterPage