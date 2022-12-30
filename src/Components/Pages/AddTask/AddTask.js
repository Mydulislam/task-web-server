import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()
    const imgHostKey = process.env.REACT_APP_imgbb_key;
    const handleAddTask = (data) => {
        const image = data.photo[0];
        console.log(image);
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const tasks = {
                        title: data.title,
                        image: imgData.data.url,
                        details: data.details,
                        email: user.email
                    }
                    // Tasks insert kora
                    fetch('https://task-managment-server-one.vercel.app/addtasks', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(tasks)
                    })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        toast.success(`Inserted successfuly`);
                        navigate('/myTask')
                    })
                    .catch(err => console.error(err))
                }
            })
            .catch(err => console.error(err))
    }

    // const saveTaskDatabase = (title, details, email)=>{
    //     const tasksInfo = {title, details, email}
    //     fetch('https://task-managment-server-one.vercel.app/addtasks',{
    //         method: 'POST',
    //         headers:{
    //             'content-type':'application/json'
    //         },
    //         body: JSON.stringify(tasksInfo)
    //     })
    // }
    return (
        <div className='container'>
            <div className='w-50 mx-auto'>
                <h1 className='text-4xl text-center mb-3'>Please Add your Task</h1>
                <div className='border border-solid p-4 rounded-md'>
                    <form onSubmit={handleSubmit(handleAddTask)}>
                        <div className="w-100 mb-3">
                            <label className="label mb-2"><span className="label-text">Title</span></label>
                            <input type="text"
                                {...register("title", { required: "Title is Required" })}
                                placeholder="Your Title"
                                className="input p-2 border border-1 rounded w-100" />
                            {errors.title && <p className='text-danger' role='alert'>{errors.title?.message}</p>}
                        </div>

                        <div className="w-100 mb-3">
                            <label className="label mb-2"><span className="label-text">Image</span></label>
                            <input type="file"
                                {...register("photo", { required: "Photo is Required" })}
                                className="input p-2 border border-1 rounded w-100" />
                            {errors.photo && <p className='text-danger' role='alert'>{errors.photo?.message}</p>}
                        </div>

                        <div className="w-100">
                            <label className="label mb-2"><span className="label-text">Details</span></label>
                            <textarea {
                                ...register("details",
                                {
                                    required:'Details is Required'
                                }
                                )

                            } placeholder="Details your tasks" 
                            className="input p-2 border border-1 rounded w-100" />
                            {errors.details && <p className='text-danger' role='alert'>{errors.details?.message}</p>}
                        </div>

                        <input className='btn btn-primary w-100 text-white mt-3' value='Submit Task' type="submit" />
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddTask;