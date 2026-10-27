import LoginForm from "@/features/auth/LoginForm"
import AuthShell from "@/features/auth/AuthShell"



function LoginPage() {
    return (
        <AuthShell
            title="Welcome back!"
            subtitle="Sign in to check out and see your orders."
            image={{ src: "/redesignImages/surprisedGhostieWithPumpkin-3.jpeg", bubble: "Oh, it's you!" }}
            footer={{ text: "New here?", linkTo: "/register", linkLabel: "Create an account" }}
        >
            <LoginForm />
        </AuthShell>
    )
}

export default LoginPage
