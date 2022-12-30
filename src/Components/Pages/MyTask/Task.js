import React from 'react';

const Task = ({tasks}) => {
    const {title, details, image} = tasks
    return (
        <div>
            <div className="col">
                    <div className="card">
                        <img src={image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{details}</p>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Task;