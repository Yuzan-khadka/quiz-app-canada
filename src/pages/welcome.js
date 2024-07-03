import React from 'react';
import { Link } from "react-router-dom";
import '../assets/css/style.css';

function WelcomePage(){
    return(
        <div className="container">
            <div className="card-container">
                <h1>Welcome to Canada's History quiz app.</h1>
                <p>This application contains a number of quizzes that helps you to know about the Canada.</p>
                <Link to="/quiz"><button className='start-btn'>Start Quiz <i className="fas fa-play"></i></button></Link>
            </div>
        </div>


    );
}

export default WelcomePage;