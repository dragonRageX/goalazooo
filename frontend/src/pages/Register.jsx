import React from "react"
import { FaUser } from "react-icons/fa"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import utilsContext from "../context/utilsContext";
import { toast } from "react-toastify";

export default function Register()
{
    let [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const [USER_API_URL, user, setUser] = React.useContext(utilsContext);
    const navigate = useNavigate();

    function handleChange(e)
    {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    }

    async function handleSubmit(e)
    {
        e.preventDefault();

        if(formData.password != formData.password2)
        {
            toast.error("Passwords do not match!");
        }
        else
        {
            try {
                const response = await axios.post(`${USER_API_URL}`, {
                    name: String(formData.name),
                    email: String(formData.email),
                    password: String(formData.password)
                });
    
                console.log("Response: " + JSON.stringify(response.data));
                console.log("Token: " + (response.data.data.token));
                if(response.status === 201)
                {
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                    setUser(response.data.data);   //set the 'user' global state
                    console.log(user);
                    toast.success(response.data.message);
                    navigate("/");
                }
            } catch (error) {
                const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                console.error(errorMessage);
                toast.error(errorMessage);
            }
        }

    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            placeholder="Enter your name" 
                            onChange={(e) => handleChange(e)} 
                        />
                    </div>
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
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password2" 
                            name="password2" 
                            value={formData.password2} 
                            placeholder="Confirm Password" 
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