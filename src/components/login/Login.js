import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/login/login.css'

const Login = () => {


    let mail = useRef();
    let password = useRef();
    let Navigate = useNavigate();


    let formulario = async (e) => {
        try {
            e.preventDefault();
            if (!mail.current.value) {
                document.querySelector('.error').style.display = 'block';
                document.querySelector('.error').textContent = "ingrese un mail"
            }else if(!password.current.value){
                document.querySelector('.error').style.display = 'block';
                document.querySelector('.error').textContent = "ingrese la contraseña"
            } else {
                let data = await login();
                if (data.meta.status === 200) {
                    window.localStorage.setItem(
                        'userLogin', JSON.stringify({
                            id: data.data.id,
                            mail: data.data.mail,
                            name: data.data.name
                        })
                    );
                    return Navigate('/');
                } else if (data.meta.status === 400) {
                    console.log("error")
                    document.querySelector('.error').style.display = 'block';
                    document.querySelector('.error').textContent = "credenciales invalidas"
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    let login = async () => {
        try {
            let valor = await fetch(`${process.env.REACT_APP_DATABASE_URI}/user/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mail: mail.current.value,
                    password: password.current.value
                })
            });
            let response = await valor.json();
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="login">
            <section >
                <article>
                    <h4>Login</h4>
                </article>
                <form onSubmit={formulario}>
                    <input type="text" name="user" placeholder='mail' className='inputs' ref={mail} />
                    <input type="password" name='password' placeholder='contraseña' className='inputs' ref={password} />
                    <h2 className='error'></h2>
                    <input type="submit" name='' value='ingresar' className="button" />
                </form>
                <div className="footer">
                    <Link className='linkreg' to="/register">Registrate</Link>
                </div>
            </section>
        </main>
    );
}

export default Login;
