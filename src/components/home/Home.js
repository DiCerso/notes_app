import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import '../../assets/css/home/home.css'
import Task from './task';
import Modal from './modal';

const Home = () => {

    const navegacion = useNavigate();

    const [task, settask] = useState([]);
    const [newtask, setnewtask] = useState(false);
    const [deslogueo, setdeslogueo] = useState(false);
    const [deleted, setdeleted] = useState(false);
    const [modal1, setmodal1] = useState(false);
    const [change, setchange] = useState(false);


    const user = JSON.parse(window.localStorage.getItem('userLogin'))

    useEffect(() => {
        tareas();
    }, []);

    useEffect(() => {
        tareas();
        setchange(false);
    }, [change]);

    useEffect(() => {
        tareas();
        setnewtask(false);
    }, [newtask])

    useEffect(() => {
        if (deslogueo) {
            window.localStorage.removeItem('userLogin');
            navegacion("/login")
        }
    }, [deslogueo]);

    useEffect(() => {
        if (deleted) {
            borrarUser(user.mail);
            window.localStorage.removeItem('userLogin');
            navegacion("/login")
        }
    }, [deleted]);

    let borrarUser = async (mail) => {
        try {
            let respuesta = await fetch(`${process.env.REACT_APP_DATABASE_URI}/user/delete`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mail
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    let tareas = async () => {
        try {
            let respuesta = await fetch(`${process.env.REACT_APP_DATABASE_URI}/task/list/${user.id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let lista = await respuesta.json()
            settask(lista.data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {
            user ? 
            <div>
            <header>
                <div className='tareas_cont'>
                    <h1 className='tareas'>Tareas</h1>
                </div>
                <ul>
                    <li className="userOptions">
                        <span>{user.name}</span>
                        <ul className="menu-vertical">
                            <li><Link onClick={() => { setdeleted(true) }}>Borrar cuenta</Link></li>
                            <li><Link onClick={() => { setdeslogueo(true) }}>Deslogueate</Link></li>
                            <li><Link onClick={() => { setmodal1(!modal1)}}>Crear ntoa</Link></li>
                        </ul>
                    </li>
                </ul>
            </header>
            <main className="board">
                {task ?
                    task.map(({ title, description, id }) => {
                        return (
                            <Task key={id + "tarea"} id={id} title={title} description={description} setchange={setchange} />
                        )
                    })
                    :
                    <h1 className='notask'>no hay tareas</h1>
                }
                <Modal estado={modal1} changeEst={setmodal1} nuevatarea={setnewtask} />
            </main>
        </div>
            :
            <Navigate to="/login"/>
        }
        </>
    );
}

export default Home;
