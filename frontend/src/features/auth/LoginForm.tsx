import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginValues } from "@/features/auth/authSchema"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"



function LoginForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = (data: LoginValues) => {
        console.log(data)
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