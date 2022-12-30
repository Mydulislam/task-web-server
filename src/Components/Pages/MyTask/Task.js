import React from 'react';
import { Button } from 'react-bootstrap';

const Task = ({ tasks, handleDelete }) => {
    const { title, details, image } = tasks;
    return (
        <div>
            <div className="col">
                <div className="card">
                    <img src={image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{details}</p>
                    </div>
                    <div className='p-2 d-flex justify-content-around mb-3'>
                        <Button variant="success">Completed</Button>
                        <Button variant="info">Update</Button>
                        <Button variant="danger" onClick={()=>handleDelete(tasks)}>Delete</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;