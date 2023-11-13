import React from "react"
import { FaSignInAlt } from "react-icons/fa"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import utilsContext from "../context/utilsContext";
import { toast } from "react-toastify";

export default function Login()
{
    let [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    const [USER_API_URL] = React.useContext(utilsContext);
    const navigate = useNavigate();

    function handleChange(e)
    {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: [e.target.value]
        }));
    }

    async function handleSubmit(e)
    {
        e.preventDefault();

        try {
            const response = await axios.post(`${USER_API_URL}/login`, {
                email: String(formData.email),
                password: String(formData.password)
            });

            // console.log("Response: " + JSON.stringify(response.data));
            // console.log("Token: " + (response.data.data.token));
            if(response.status === 200)
            {
                localStorage.setItem("user", JSON.stringify(response.data.data));
                navigate("/");
            }
        } catch (error) {
            const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.error(errorMessage);
            toast.error(errorMessage);
        }
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting your Goals!</p>
            </section>
            <section className="form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email"
                            value={formData.email} 
                            placeholder="Enter your email" 
                            onChange={(e) => handleChange(e)} 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="password" 
                            value={formData.password} 
                            placeholder="Enter password" 
                            onChange={(e) => handleChange(e)} 
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}