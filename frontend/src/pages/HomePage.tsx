
import { Link } from "react-router-dom"
import Button from "@/components/ui/Button"



function HomePage() {

    return (
        <div className="flex flex-col gap-8 items-center">

            <div className="flex flex-col gap-8 items-center justify-center">
                <h1>Handmade Spooks, straight from the Cauldron</h1>
                <p>Because life needs <span>whimsical</span>!</p>

              
                <Link to="/shop">
                    <Button variant="primary">Shop Now</Button>                        
                </Link>
                
            </div>

            <div className="flex flex-col items-center justify-center gap-8 ">
                <h2>Featured Products</h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div>
                        <h3>Title1</h3>
                        <p>Placeholder text</p>
                    </div>
                     <div>
                        <h3>Title1</h3>
                        <p>Placeholder text</p>
                    </div>
                     <div>
                        <h3>Title1</h3>
                        <p>Placeholder text</p>
                    </div>
                </div>



            </div>
            

        </div>
    )
}

export default HomePage;