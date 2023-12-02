import React from "react"
import axios from "axios";
import utilsContext from "../context/utilsContext";
import GoalItem from "../components/GoalItem";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import GoalForm from "../components/GoalForm";

export async function loader()
{
    const user = JSON.parse(localStorage.getItem("user"));   //I couldn't use the React.useContext() hook to get the global 'user' state here, as hooks can only be used inside functional components in React
    if(!user)   //protect the dashboard from being seen by unauthorized users - make a protected route
    {
        toast.error("You must login first!");
        throw redirect("/login");
    }
    else
    {
        try {
            const response = await axios.get("http://localhost:5000/api/goals", {   //get all goals of the currently logged-in user
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            console.log("Response: " + JSON.stringify(response.data));
            if(response.status === 200)
            {
                const userGoals = response.data;
                return { userGoals, user };   //perform some fetch operation like fetching the logged-in users goals
            }
        } catch (error) {
            const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.error(errorMessage);
            toast.error(errorMessage);
        }
    }
}

export default function Dashboard()
{
    const data = useLoaderData();
    const userGoals = data.userGoals;
    const loggedInUser = data.user
    console.log(loggedInUser);

    const [USER_API_URL, GOALS_API_URL, user, setUser, goals, setGoals] = React.useContext(utilsContext);

    React.useEffect(() => {
        setGoals((prevGoals) => [...prevGoals, ...userGoals]);   //merge prevGoals and userGoals array into one
    }, []);
    console.log(goals);

    return (
        <>
            <section className="heading">
                <h1>Welcome {loggedInUser && loggedInUser.name}</h1>
                <p>Goals Dashboard</p>
            </section>

            <GoalForm />

            <section className="content">
                {goals.length > 0 ? (
                    <div className="goals">
                        {goals.map((goal) => (<GoalItem key={goal._id} goal={goal} />))}
                    </div>
                ) : (
                    <h3>You have not set any goals</h3>
                )}
            </section>
        </>
    );
}