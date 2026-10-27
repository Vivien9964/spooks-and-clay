import RegisterForm from "@/features/auth/RegisterForm"
import AuthShell from "@/features/auth/AuthShell"

function RegisterPage() {
    return (
        <AuthShell
            title="Create an account"
            subtitle="Make a little home for your orders and spooks."
            image={{ src: "/redesignImages/tinyPumpkinGhostieFriends-1.jpeg", bubble: "A new friend!" }}
            footer={{ text: "Already have an account?", linkTo: "/login", linkLabel: "Sign in" }}
        >
            <RegisterForm />
        </AuthShell>
    )
}

export default RegisterPage
