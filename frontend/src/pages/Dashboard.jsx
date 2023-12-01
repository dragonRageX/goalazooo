import React from "react"
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export function loader()
{
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user)   //protect the dashboard from being seen by unauthorized users - make a protected route
    {
        toast.error("You must login first!");
        throw redirect("/login");
    }
    else
    {
        return null;   //perform some fetch operation like fetching the logged-in users goals
    }
}

export default function Dashboard()
{
    return (
        <h1>Dashboard goes here.</h1>
    );
}