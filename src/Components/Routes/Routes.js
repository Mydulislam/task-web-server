import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main/Main';
import About from '../Pages/About/About';
import AddTask from '../Pages/AddTask/AddTask';
import CompletedTasks from '../Pages/CompletedTasks/CompletedTasks';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import MyTask from '../Pages/MyTask/MyTask';
import SignUp from '../Pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
 const router = createBrowserRouter([
        {
            path:'/',
            element:<Main></Main>,
            children:[
                {
                    path:'/',
                    element:<Home></Home>
                },
                {
                    path:'/addTask',
                    element:<PrivateRoute><AddTask></AddTask></PrivateRoute>
                },
                {
                    path:'/myTask',
                    element:<PrivateRoute><MyTask></MyTask></PrivateRoute>
                },
                {
                    path:'/completedTasks',
                    element:<PrivateRoute><CompletedTasks></CompletedTasks></PrivateRoute>
                },
                {
                    path:'/login',
                    element:<Login></Login>
                },
                {
                    path:'/signup',
                    element:<SignUp></SignUp>
                },
                {
                    path:'/about',
                    element:<About></About>
                },
            ]
        }
    ])
export default router;