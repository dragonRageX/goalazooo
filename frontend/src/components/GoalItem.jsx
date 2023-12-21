import React from "react";
import axios from "axios";
import utilsContext from "../context/utilsContext";
import { toast } from "react-toastify";

export default function GoalItem({goal})
{
    const [USER_API_URL, GOALS_API_URL, user, setUser, goals, setGoals] = React.useContext(utilsContext);

    async function deleteGoal(e, goalId)
    {
        e.stopPropagation();

        console.log(goalId);

        try {
            const response = await axios.delete(`${GOALS_API_URL}/${goalId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            console.log("Response: " + JSON.stringify(response.data));
            if(response.status === 200)
            {
                setGoals((prevGoals) => {
                    let newGoals = prevGoals.filter((goal) => goal._id !== response.data.id)   //update the 'goals' global context by parsing through each goal and removing the goal from the 'goals' array, that matches the on-clicked goal's id
                    return newGoals;
                });
                console.log(goals);
                toast.success(response.data.message);
            }
        } catch (error) {
            const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.error(errorMessage);
            toast.error(errorMessage);
        }
    }

    return (
        <div className="goal">
            <div>
                {new Date(goal.createdAt).toLocaleString("en-US")}
            </div>
            <h2>{goal.text}</h2>
            <button className="close" onClick={(e) => deleteGoal(e, goal._id)}>X</button>
        </div>
    )
}