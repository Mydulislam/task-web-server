import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';
import Loader from '../Loader/Loder';
import Task from './Task';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const url = `https://task-managment-server-one.vercel.app/mytasks?email=${user.email}`;
    const { data: myTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['myTasks'],
        queryFn: () => fetch(url)
            .then(res => res.json())
    })

    const handleDelete = (task) => {
        const agree = window.confirm('Are you sure want to delete');
        if (agree) {
            fetch(`https://task-managment-server-one.vercel.app/mytasks/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        refetch();
                        toast.success('Successfully deleted')
                    }
                    refetch();
                })
        }
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='container'>
            <h1 className='my-3'>My Tasks:</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    myTasks.map(tasks => <Task
                        key={tasks._id}
                        tasks={tasks}
                        handleDelete={handleDelete}
                    ></Task>)
                }
            </div>
        </div>
    );
};

export default MyTask;