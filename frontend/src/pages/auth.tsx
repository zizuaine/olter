import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authTorii from "../assets/auth/torigate-auth.png"
import Button from "../components/button";
import { useAuth } from "../context/authContext";
import { div } from "motion/react-client";

export const Auth = () => {
    const [signupData, setSignupData] = useState({
        email: "",
        password: "",
        username: "",
        firstName: "",
        lastName: "",
    })

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate();
    const { login } = useAuth();

    const [isSignUp, setIsSignUp] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailRegex.test(signupData.email)) {
            setEmailError("Invalid Email");
            return;
        };
        if (!passwordRegex.test(signupData.password)) {
            setPasswordError("Must include 8 chars, one special char, uppercase, lowercase, number")
            return;
        }
        setEmailError("");
        setPasswordError("");
        console.log(signupData)

        try {
            const endPoint = "http://localhost:3000/api/v1/user/signup";
            const res = await fetch(endPoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupData)
            });
            const data = await res.json();
            console.log(data)

            if (!res.ok) {
                setServerError(data.message);
                return;
            }

            setIsSignUp(false);
            setServerError("");
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailRegex.test(loginData.email)) {
            setEmailError("Invalid Email");
            return;
        };
        if (!passwordRegex.test(loginData.password)) {
            setPasswordError("Must include 8 chars, one special char, uppercase, lowercase, number")
            return;
        }
        setEmailError("");
        setPasswordError("");
        console.log(loginData)

        try {
            const endPoint = "http://localhost:3000/api/v1/user/signin";
            const res = await fetch(endPoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData)
            });
            const data = await res.json();
            console.log(data)

            if (!res.ok) {
                setServerError(data.message);
                return;
            }

            await login(data.token)
            setServerError("");
            navigate("/")
        } catch (error) {
            console.log(error)
        }


    }
    return (

        <div className="min-h-screen w-full flex justify-center items-center">
            <div className="h-[694px] w-[1200px] overflow-hidden rounded-[22px] bg-[#eeece7] relative shadow-[0px_0px_25px_rgba(0,0,0,0.15)] py-5">

                <div className="
                        absolute right-0 top-0
                        flex h-full w-1/2
                        flex-col justify-center
                        px-9
                        ">
                    <form
                        className="flex flex-col"
                        onSubmit={handleLogin}>
                        <h2 className="font-helvetica mb-2 inline-block text-[#596579] text-[20px] ">Login to</h2>
                        <h1 className="mb-3 font-nour text-[36px] leading-[1.3]">
                            Where Knowledge Comes Alive
                        </h1>
                        <span className=" mb-8 font-helvetica inline-block text-[#596579] text-[15px]">
                            Your space to capture, organize and <br /> connect ideas that matter.
                        </span>
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={e => setLoginData({ ...loginData, email: e.target.value })}
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
                            value={loginData.password}
                            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
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
                                    setServerError("");
                                    setIsSignUp(true);
                                }}
                            >
                                Sign up
                            </a>
                        </span>

                        {serverError && (
                            <p className="text-[12px] font-helvetica text-[#C0524A] mb-2 -mt-2">
                                {serverError}
                            </p>
                        )}
                        <Button type="submit">Login
                            <svg
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
                            </svg>
                        </Button>
                    </form>
                </div>

                <div className="absolute left-0 top-0
                        flex h-full w-1/2
                        flex-col justify-center
                        px-9
                    ">

                    <form onSubmit={handleSignUp} className="flex flex-col">
                        <h2 className="font-helvetica text-[#596579] text-[20px] ">Sign up to</h2>
                        <h1 className="mb-3 font-nour text-[36px] leading-[1.3]">
                            Bring Your Knowledge to Life
                        </h1>

                        <input
                            type="text"
                            placeholder="First Name"
                            value={signupData.firstName}
                            onChange={e =>
                                setSignupData({
                                    ...signupData,
                                    firstName: e.target.value
                                })
                            }
                            className="
                                my-3 h-[35px]
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
                            value={signupData.lastName}
                            onChange={e =>
                                setSignupData({
                                    ...signupData,
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
                            value={signupData.username}
                            onChange={e =>
                                setSignupData({
                                    ...signupData,
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
                            value={signupData.email}
                            onChange={e =>
                                setSignupData({
                                    ...signupData,
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
                            value={signupData.password}
                            onChange={e =>
                                setSignupData({
                                    ...signupData,
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
                                    setServerError("");
                                    setIsSignUp(false);
                                }}
                            >
                                Sign in
                            </a>
                        </span>

                        {serverError && (
                            <p className="text-[12px] font-helvetica text-[#C0524A] mb-2 -mt-2">
                                {serverError}
                            </p>
                        )}
                        <Button type="submit">Sign Up</Button>
                    </form>
                </div>

                <div className={` absolute left-0 top-0
                        h-full w-1/2
                        overflow-hidden
                        transition-transform duration-700 ease-in-out
                        ${isSignUp ? "translate-x-full" : "translate-x-0"}`}>
                    <img src={authTorii} alt="torii-gate" className="h-full w-full object-cover" />
                </div>

            </div>
        </div>
    )
}
