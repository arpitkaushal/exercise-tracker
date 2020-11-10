import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios"


// this is the child component  (fucnitonal Component - 
// it doesn't have state and lifecycle (componentDidMount) methods)
// so if all we want to do is accept props and return jsx, use functional
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id} className="btn btn-primary">Edit</Link> </td><td>
            <input type="submit" href="#" value="Delete" className="btn btn-primary" onClick={() => { props.deleteExercise(props.exercise._id) }} /> 
        </td>
    </tr>
)


// this is the parent component    (class Component)
export default class ExercisesList extends Component { 

    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {exercises: []}
        //   exercise = [];
    }
    
    componentDidMount () {
     
        axios.get("http://localhost:8080/exercises/")
        .then(res => {
            this.setState({ exercises: res.data })
        })
        .catch( err => { console.log(err); })
    }

    deleteExercise (id) {
        axios.delete('http://localhost:8080/exercises/'+id)
            .then(res => console.log(res.data));
        // whenever you set state it'll automatically update the page with that new state
        this.setState({
            exercises: this.state.exercises.filter ( element => element._id !== id )
        })

    }

    exercisesList () {
        // fetches the exercises array 
        return this.state.exercises.map(
            element_exercise => {       // for every element in array it'll return a component
                return <Exercise 
                            exercise={element_exercise} 
                            deleteExercise={this.deleteExercise}
                            key={element_exercise._id}
                        />
            }
        )
    }

    render () {
        
        return (

            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thread-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration (in minutes)</th>
                            <th>Date</th>
                            {/* <th>Actions</th> */}
                            <th/>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exercisesList() }
                    </tbody> 
                </table>
            </div>

        )

    }

}
