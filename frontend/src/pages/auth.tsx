import { useState } from "react";
import toriiGate from "../assets/auth/torigate-auth.png"
import Button from "../components/button";
export const Auth = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        firstName: "",
        lastName: "",
    })
    const [isSignUp, setIsSignUp] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault;
        if (!emailRegex.test(formData.email)) {
            setEmailError("Invalid Email");
            return;
        };
        if (!passwordRegex.test(formData.password)) {
            setPasswordError("Must include 8 chars, one special char, uppercase, lowercase, number")
            return;
        }
        setEmailError("");
        setPasswordError("");
        console.log(formData)
    }
    return (
        <div className="h-[694px] w-[1200px] overflow-hidden rounded-[22px] bg-[#eeece7] relative shadow-[0px_0px_25px_rgba(0,0,0,0.15)] py-5">
            <div className="
                        absolute right-0 top-0
                        flex h-full w-1/2
                        flex-col justify-center
                        px-9
                        ">
                <form
                    className="flex flex-col"
                    onSubmit={handleSubmit}>
                    <h1 className="mb-3 font-nour text-[36px] leading-[1.3]">
                        <h2 className="font-helvetica mb-2 inline-block text-[#596579] text-[20px] ">Login to</h2>
                        <br />
                        Where Knowledge Comes Alive
                    </h1>
                    <span className=" mb-8 font-helvetica inline-block text-[#596579] text-[15px] font-normal font-['Helvetica_Neue']">
                        Your space to capture, organize and <br /> connect ideas that matter.
                    </span>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="
                                mb-3 h-[35px]
                                border-0 border-b border-[#5A5A5A]
                                bg-[#eeece7]
                                px-1
                                text-[17px]
                                outline-none
                                font-noto
                            "
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        className="
                                 mb-3 h-[35px]
                                border-0 border-b border-[#5A5A5A]
                                bg-[#eeece7]
                                px-1
                                text-[17px]
                                outline-none
                                font-noto
                            "
                    />
                    <a href="#" className=" text-[14px] font-helvetica text-[#0033CC]">Forgot Password?</a>
                    <span className="text-[15px] font-helvetica my-8">
                        Don't have an account?{" "}
                        <a
                            href="#"
                            className="text-[#0033CC]"
                            onClick={e => {
                                e.preventDefault();
                                setIsSignUp(true);
                            }}
                        >
                            Sign up
                        </a>
                    </span>
                    <Button type="submit">Login <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 12H19M13 6L19 12L13 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg></Button>
                </form>
            </div>

            <div className="absolute left-0 top-0
                        flex h-full w-1/2
                        flex-col justify-center
                        px-9
                    ">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <h1 className="mb-3 font-nour text-[36px] leading-[1.3]">
                        <h2 className="font-helvetica mb-2 inline-block text-[#596579] text-[20px] ">Sign up to</h2>
                        <br />
                        Bring Your Knowledge to Life
                    </h1>

                    <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                firstName: e.target.value
                            })
                        }
                        className="
                                mb-3 h-[35px]
                                border-0 border-b border-[#5A5A5A]
                                bg-[#eeece7]
                                px-1
                                text-[17px]
                                outline-none
                                font-noto
                            "
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                lastName: e.target.value
                            })
                        }
                        className="
                                mb-3 h-[35px]
                                border-0 border-b border-[#5A5A5A]
                                bg-[#eeece7]
                                px-1
                                text-[17px]
                                outline-none
                                font-noto
                            "
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                username: e.target.value
                            })
                        }
                        className="
                                mb-3 h-[35px]
                                border-0 border-b border-[#5A5A5A]
                                bg-[#eeece7]
                                px-1
                                text-[17px]
                                outline-none
                                font-noto
                            "
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }
                        className="
                                mb-3 h-[35px]
                                border-0 border-b border-[#5A5A5A]
                                bg-[#eeece7]
                                px-1
                                text-[17px]
                                outline-none
                                font-noto
                            "
                    />
                    {emailError && <p className="text-[12px] font-helvetica text-[#C0524A] mb-2 -mt-2">{emailError}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }
                        className="
                                mb-3 h-[35px]
                                border-0 border-b border-[#5A5A5A]
                                bg-[#eeece7]
                                px-1
                                text-[17px]
                                outline-none
                                font-noto
                            "
                    />
                    {passwordError && <p className="text-[12px] font-helvetica text-[#C0524A] mb-2 -mt-2">{passwordError}</p>}
                    <span className="text-[15px] font-helvetica my-8">
                        Already have an account?{" "}
                        <a
                            href="#"
                            className="text-[#0033CC]"
                            onClick={e => {
                                e.preventDefault();
                                setIsSignUp(false);
                            }}
                        >
                            Sign in
                        </a>
                    </span>
                    <Button type="submit">Sign Up</Button>
                </form>
            </div>

            <div className={` absolute left-0 top-0
                        h-full w-1/2
                        overflow-hidden
                        transition-transform duration-700 ease-in-out
                        ${isSignUp ? "translate-x-full" : "translate-x-0"}`}>
                <img src={toriiGate} alt="torii-gate" className="h-full w-full object-cover" />
            </div>

        </div>
    )
}