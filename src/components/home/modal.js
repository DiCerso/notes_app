import React from 'react';
import { useRef, useEffect } from 'react';
import '../../assets/css/home/modal.css'

const Modal = ({ estado, changeEst, nuevatarea, id, setchange }) => {

    let title = useRef();
    let description = useRef();

    let busqueda = async () => {
        try {
            if (id) {
                let respuesta = await fetch(`${process.env.REACT_APP_DATABASE_URI}/task/find/${id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let response = await respuesta.json();
                if (title.current) {
                    title.current.value = response.data.title;
                    description.current.value = response.data.description
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        busqueda();
    }, [estado])



    let crear = async () => {
        try {
            let usuario = JSON.parse(window.localStorage.getItem('userLogin'));
            await fetch(`${process.env.REACT_APP_DATABASE_URI}/task/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title.current.value,
                    description: description.current.value,
                    user_id: usuario.id
                })
            })
            changeEst(false);
            nuevatarea(true);

        } catch (error) {
            console.log(error)
        }
    }

    let actualizar = async () => {
        try {
            await fetch(`${process.env.REACT_APP_DATABASE_URI}/task/edit/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title.current.value,
                    description: description.current.value
                })
            })
            changeEst(false);
            setchange(true);
        } catch (error) {
            console.log(error)
        }
    }
    let borrar = async () => {
        try {
            await fetch(`${process.env.REACT_APP_DATABASE_URI}/task/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title.current.value,
                    description: description.current.value
                })
            })
            changeEst(false);
            setchange(true);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {estado &&
                <div className='Overlay'>
                    <section className="modal">
                        <article className="encabezado">
                            <h1>{id ? "Actualiza tu nota" : "Crea tu nota"}</h1>
                        </article>
                        <article>
                            <div className="title_cont modaltitle">
                                <input className="task_title" placeholder='titulo' ref={title} />
                            </div>
                            <div className="description_cont">
                                <textarea cols="30" rows="10" className="task_description modaldescription" placeholder='descripcion' ref={description} />
                            </div>
                        </article>
                        <button onClick={() => changeEst(false)} className="botoncerrar"><i className="fa-solid fa-xmark"></i></button>
                        {id ?
                            <button className='botoncrear' onClick={() => actualizar() }>actualizar</button>
                            :
                            < button className='botoncrear' onClick={() => crear()} >crear</button>
                        }
                        { id && <button className='botonelimiar' onClick={() => borrar() }>borrar</button>}
                    </section>
                </div>
            }
        </>
    );
}

export default Modal;
