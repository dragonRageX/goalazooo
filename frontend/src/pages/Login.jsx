import React from "react"
import { FaSignInAlt } from "react-icons/fa"

export default function Login()
{
    let [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    function handleChange(e)
    {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: [e.target.value]
        }));
    }

    function handleSubmit(e)
    {
        e.preventDefault();
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