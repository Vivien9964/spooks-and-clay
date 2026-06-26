import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterValues } from "@/features/auth/registerSchema"
import { registerUser } from "@/services/auth"
import { useAuthStore } from "@/store/authStore"
import type { ApiError } from "@/types/api"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { toast } from "sonner"


function isApiError(err: unknown): err is ApiError {
    return typeof err === "object" && err !== null && "fieldErrors" in err
}

function RegisterForm() {

    const login = useAuthStore((s) => s.login)
    const navigate = useNavigate()


    const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterValues) => {

        try {
            
            const response = await registerUser(data)
            login(response)
            navigate("/account")

        } catch ( err ) {

            if(isApiError(err)  && err.fieldErrors) {
                Object.entries(err.fieldErrors).forEach(([field, messages]) => {
                    setError(field as keyof RegisterValues, {
                        type: "manual",
                        message: messages[0]
                    })
                })

            } else {

                toast.error("Registration failed. Please try again.")     
            }
        }
       
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