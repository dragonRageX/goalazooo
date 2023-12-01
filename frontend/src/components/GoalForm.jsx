import React from "react";

export default function GoalForm()
{
    const [text, setText] = React.useState("");

    function handleSubmit(e)
    {
        e.preventDefault();

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