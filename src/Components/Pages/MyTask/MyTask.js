import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import Loader from '../Loader/Loder';
import Task from './Task';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/mytasks?email=${user.email}`;
    const { data: myTasks = [], isLoading } = useQuery({
        queryKey: ['myTasks'],
        queryFn: () => fetch(url)
            .then(res => res.json())
    })
    if(isLoading){
        return <Loader></Loader>
    }
    return (
        <div className='container'>
            <h1>This is my task length: {myTasks.length}</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    myTasks.map(tasks => <Task
                    key={tasks._id}
                    tasks = {tasks}
                    ></Task>)
                }
            </div>
        </div>
    );
};

export default MyTask;