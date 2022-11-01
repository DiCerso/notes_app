import React, {useState} from 'react';
import '../../assets/css/home/task.css';
import Modal from './modal';

const Task = (props) => {

    const [modaldat, setmodaldat] = useState(false);


    return (
        
        <div className="task">
            <div className="title_cont">
                <p className="task_title" >{props.title}</p>
            </div>
            <div className="description_cont">
                <p cols="30" rows="10" className="task_description" >{props.description}</p>
            </div>
            <button onClick={() => {setmodaldat(true)}} className="botonEditar">editar</button>
            <Modal estado={modaldat} changeEst={setmodaldat} id={props.id} setchange={props.setchange} />
        </div>
    );
}

export default Task;
