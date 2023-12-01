import React from "react"
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import GoalForm from "../components/GoalForm";

export function loader()
{
    const user = JSON.parse(localStorage.getItem("user"));   //I couldn't use the React.useContext() hook to get the global 'user' state here, as hooks can only be used inside functional components in React
    if(!user)   //protect the dashboard from being seen by unauthorized users - make a protected route
    {
        toast.error("You must login first!");
        throw redirect("/login");
    }
    else
    {
        return user;   //perform some fetch operation like fetching the logged-in users goals
    }
}

export default function Dashboard()
{
    const user = useLoaderData();
    console.log(user);

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>

            <GoalForm />
        </>
    );
}