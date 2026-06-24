import { useForm } from "react-hook-form"
import { useNavigate, useLocation } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginValues } from "@/features/auth/authSchema"
import { loginUser } from "@/services/auth"
import { useAuthStore } from "@/store/authStore"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"



function LoginForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema)
    })

    const login = useAuthStore((s) => s.login)
    const navigate = useNavigate()

    const location = useLocation()
    const from = location.state?.from?.pathname ?? "/account"

    const onSubmit = async (data: LoginValues) => {
        const response = await loginUser(data)
        login(response)
        navigate(from, { replace: true })
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