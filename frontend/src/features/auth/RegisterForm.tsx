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

    // Get login from authStore
    const login = useAuthStore((s) => s.login)
    const navigate = useNavigate()

    // Validate input against registerSchema
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema)
    })

    // Register user 
    const onSubmit = async (data: RegisterValues) => {

        try {
            
            // Upon successful registration login user and navigate to account page
            const response = await registerUser(data)
            login(response)
            navigate("/account")

        } catch ( err ) {
            // In case fields contain errors inform the user
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
                label="Full name"
                type="text"
                autoComplete="name"
                error={errors.name?.message}
                {...register("name")}
            />
            <Input 
                label="Email"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
            />
             <Input 
                label="Password"
                type="password"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register("password")}
            />
            <Input 
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
            />

            
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full mt-2">
                {isSubmitting ? "Creating account..." : "Create account"}
            </Button>



        </form>
    )

}


export default RegisterForm