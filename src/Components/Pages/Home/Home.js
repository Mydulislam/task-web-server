import React from 'react';
import './Home.css'
const Home = () => {
    return (
        <div className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="row">
                        <div className="col-md-12 mb-5 py-4">
                            <h1 className='text-center'><u>Explore Your Tasks</u></h1>
                        </div>
                        <div className="col-md-6">
                            <h1 className='text-white'><b>10 tips for mastering time management at work</b></h1>
                            <ol type='1' className='fw-bold'>
                                <li>Know how you're spending your time.</li>
                                <li>Stick to a daily schedule.</li>
                                <li>Prioritize.</li>
                                <li>Tackle the most difficult task first.</li>
                                <li>Batch-process similar tasks.</li>
                                <li>Set reasonable time limits.</li>
                                <li>Learn when to say no.</li>
                                <li>Avoid multitasking.</li>
                                <li>Keep things organized.</li>
                                <li>Use time management tools</li>
                            </ol>
                        </div>
                        <div className="col-md-6">
                            <h1 className='text-white'><b>What does it mean to prioritize tasks?</b></h1>

                            <p className='fw-bold text-justify'>
                                We all live busy lives. Sometimes it’s difficult to decide what the most important work is, and when to do it. So, what’s the solution? Well, you need to prioritize your tasks. This means deciding what order tasks should be completed based on importance and immediacy, allowing you to get things done in the most effective way possible.<br/>

                                Prioritizing your daily tasks will help you organize your time efficiently and boost your productivity. It helps you learn how to complete important tasks first, meet deadlines and have the time to finish larger tasks. The act of prioritization also allows for process improvement, and means that you strategize to make sure you – and your team – are making the best possible use of the time available.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;