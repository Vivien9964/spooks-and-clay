import { useForm } from "react-hook-form"
import { useNavigate, useLocation } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginValues } from "@/features/auth/authSchema"
import { loginUser } from "@/services/auth"
import { useAuthStore } from "@/store/authStore"
import type { ApiError } from "@/types/api"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { toast } from "sonner"


function isApiError(err: unknown): err is ApiError {
    return typeof err === "object" && err !== null && "fieldErrors" in err
}

function LoginForm() {

    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema)
    })

    const login = useAuthStore((s) => s.login)
    const navigate = useNavigate()

    const location = useLocation()
    const from = location.state?.from?.pathname ?? "/account"

    const onSubmit = async (data: LoginValues) => {

        try {

            const response = await loginUser(data)
            login(response)
            navigate(from, { replace: true })

        } catch( err ) {

            if(isApiError(err) && err.fieldErrors) {
                Object.entries(err.fieldErrors).forEach(([field, messages]) => {
                    setError(field as keyof LoginValues, {
                        type: "manual",
                        message: messages[0]
                    })
                })

            } else {

                toast.error("Login failed. Please try again.")

            }
        }
        
    }




    return (
        <form className="flex flex-col gap-5 mt-6" onSubmit={handleSubmit(onSubmit)}>
            <Input 
                label="Email"
                type="email"
                error={errors.email?.message}
                {...register("email")}
            />
             <Input 
                label="Password"
                type="password"
                error={errors.password?.message}
                {...register("password")}
            />
            <Button type="submit" className="w-full mt-2 py-3 text-base">Log in</Button>



        </form>
    )
}

export default LoginForm