import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditExercisePage = ({ exercise }) => {

    const [name, setName]       = useState(exercise.name)
    const [reps, setReps]       = useState(exercise.reps)
    const [weight, setWeight]   = useState(exercise.weight)
    const [unit, setUnit]       = useState(exercise.unit)
    const [date, setDate]       = useState(exercise.date)
    
    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited exercise!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update exercise. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit a exercise in the workout</h2>
            <p>
                Need to update an existing workout? No problem! Just make the 
                changes below and submit them. We will let you know if the operation 
                was successful or not.
            </p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Which exercise are you editing?</legend>
                    <label for="name">Exercise</label>
                    <input
                        type="text"
                        placeholder="Name of the exercise"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" />
                    
                    <label for="reps">Reps</label>
                    <input
                        type="number"
                        value={reps}
                        placeholder="Reps completed"
                        onChange={e => setReps(e.target.value)} 
                        id="reps" />

                    <label for="weight">Weight</label>
                    <input
                        type="number"
                        placeholder="Weight lifted"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" />

                    <label for="unit">Unit</label>
                    <select
                        type="text"
                        placeholder="weight units"
                        value={unit}
                        onChange={e => setUnit(e.target.value)} 
                        id="unit" >
                        <option>lbs</option>
                        <option>kg</option>
                    </select>

                    <label for="date">Date</label>
                    <input
                        type="date"
                        placeholder="Date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        id="date" />


                    <label for="submit">
                    <button
                        onClick={editExercise}
                        id="submit"
                    >Save</button> updates to the workout</label>
                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditExercisePage;