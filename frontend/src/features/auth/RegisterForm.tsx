import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterValues } from "@/features/auth/registerSchema"
import { registerUser } from "@/services/auth"
import { useAuthStore } from "@/store/authStore"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"


function RegisterForm() {

    const login = useAuthStore((s) => s.login)
    const navigate = useNavigate()


    const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterValues) => {
        const response = await registerUser(data)
        login(response)
        navigate("/account")
    }


    return (
        <form className="flex flex-col gap-5 mt-6" onSubmit={handleSubmit(onSubmit)}>
            <Input 
                label="Full Name"
                type="text"
                error={errors.name?.message}
                {...register("name")}
            />
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
            <Input 
                label="Confirm password"
                type="password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
            />
            <Button type="submit" className="w-full mt-2 py-3 text-base">Register</Button>



        </form>
    )

}


export default RegisterForm