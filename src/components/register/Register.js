import React, { useRef, useEffect } from 'react';
import '../../assets/css/register/register.css'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const Navigate = useNavigate();

    let name = useRef();
    let mail = useRef();
    let password = useRef();

    useEffect(() => {
        const user = window.localStorage.getItem('userLogin');
        if (user) {
            return Navigate('/');
        }
    }, []);

    let verimail = (email) => {
        if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)){
            return false
        }else{
            return true
        }
    }



    let formulario = async (e) => {
        try {
            e.preventDefault();
            if (verimail(mail.current.value)) {
                document.querySelector('.error').style.display = 'block';
                document.querySelector('.error').textContent = "ingrese un mail valido"
            }else if(!password.current.value){
                document.querySelector('.error').style.display = 'block';
                document.querySelector('.error').textContent = "ingrese la contraseña"
            } else if(!name.current.value){
                document.querySelector('.error').style.display = 'block';
                document.querySelector('.error').textContent = "ingrese un nombre"
            } else {
            let data = await register();
            if (data) {
                window.localStorage.setItem(
                    'userLogin', JSON.stringify({
                        id: data.id,
                        mail: data.mail,
                        name: data.name
                    })
                );
                return Navigate('/');
            }
        }
        } catch (error) {
            console.log(error)
        }
    }



    let register = async () => {
        try {
            let vali = await fetch(`${process.env.REACT_APP_DATABASE_URI}/user/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.current.value,
                    mail: mail.current.value,
                    password: password.current.value
                })
            })
            let response = await vali.json();
            return response.data
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <main className="register">
            <section>
                <article>
                    <h4>Register</h4>
                </article>
                <form onSubmit={formulario}>
                    <input type="text" name="user" placeholder='nombre de usuario' className='inputs' ref={name} />
                    <input type="mail" name="mail" placeholder='mail' className='inputs' ref={mail} />
                    <input type="password" name='password' placeholder='contraseña' className='inputs' ref={password} />
                    <h2 className='error'></h2>
                    <input type="submit" name='' value='ingresar' className="button" />
                </form>
                <div className="footer">
                    <Link className='linkreg' to="/login">logueate</Link>
                </div>
            </section>
        </main>
    );
}

export default Register;
