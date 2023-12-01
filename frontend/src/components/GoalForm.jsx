import React from "react";
import axios from "axios";
import utilsContext from "../context/utilsContext";
import { toast } from "react-toastify";

export default function GoalForm()
{
    const [text, setText] = React.useState("");

    const [USER_API_URL, GOALS_API_URL, user, setUser, goals, setGoals] = React.useContext(utilsContext);

    async function handleSubmit(e)
    {
        e.preventDefault();

        try {
            const response = await axios.post(`${GOALS_API_URL}`, {
                text: text
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            console.log("Response: " + JSON.stringify(response.data));
            if(response.status === 201)
            {
                toast.success(response.data.message);
            }
        } catch (error) {
            const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.error(errorMessage);
            toast.error(errorMessage);
        }

        setText("");
    }

    return (
        <section className="form">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input 
                        type="text" 
                        name="text"  
                        id="text" 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">Add Goal</button>
                </div>
            </form>
        </section>
    );
}