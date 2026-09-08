import { Outlet } from "react-router-dom";
import background from "../assets/background/background.png"

export const BackgroundLayout = () => {
    return (
        <div className="bg-no-repeat bg-cover bg-fixed min-h-screen "
            style={{ backgroundImage: `url(${background})` }}
        >
            <Outlet />
        </div>
    )
}