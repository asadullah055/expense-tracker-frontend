import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPaths";
import Inputs from './../../component/Inputes/Inputs';
import AuthLayout from './../../component/layout/AuthLayout';
import axiosInstance from './../../utils/axiosInstance';
import { validateEmail } from './../../utils/helper';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter the password");
            return;
        }
        setError("");
        //Login API Call
        try {
            setIsLoading(true);

            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
            const { token, user } = response.data;
            localStorage.setItem("token", token);
            updateUser(user);
            navigate("/dashboard");

        } catch (err) {
            console.log(err);

            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <AuthLayout>
            <div>
                <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                    <p className="text-xs text-slate-700 mt-[5px] mb-6">
                        Please enter your details to log in
                    </p>
                    <form onSubmit={handleLogin}>
                        <Inputs
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="john@example.com"
                            type="text"
                        />
                        <Inputs
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />
                        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                        <button type="submit" className="btn-primary cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Log In"}
                        </button>
                        <p className="text-[13px] text-slate-800 mt-3 ">
                            Don't have an account?{" "}
                            <Link to="/signup" className="font-medium text-primary underline">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Login
