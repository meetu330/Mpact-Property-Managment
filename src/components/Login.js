import React, { useState, useEffect} from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';

import { setProducts } from '../redux/actions/productActions'

const Login = () => 
{
    const dispatch = useDispatch();
    var answer = window.location.href;
    const answer_array = answer.split("/");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const [ErrorEmail, setErrorEmail] = useState("");
    const [ErrorPassword, setErrorPassword] = useState("");

    let history = useHistory();

    const something = (event) => {
        if (event.keyCode === 13) {
            login();
        }
    };
    // const AddtocartProduct = async () => {
    //     if (answer_array[2] == "localhost:3000") {
    //         var urls = `http://localhost/react_app/backend/api/csv`;
    //     } else {
    //         var urls = "https://mpact.justcodenow.com/react_app/api/csv";
    //     }
    //     const homepagedata = await axios.get(urls);
      
    //     if (homepagedata.data.data) {
    //         dispatch(setProducts(homepagedata.data.data));
    //     }
    // };
    // useEffect(() => {
    //     AddtocartProduct();
    // }, []);

    const HomepageArrays = useSelector((state) => state.Homepage.HomepageArray);
    

    function login() {
        if (Email) {
            setErrorEmail('');
        }
        else {
            setErrorEmail('Please Enter Email Address');
        }
        if (Password) {
            setErrorPassword('')
        }
        else {
            setErrorPassword('Please Enter Password');
        }

        if (Email && Password) 
        {
            
            if (answer_array[2] === "localhost:3000") {
                var url = "http://localhost/react_app/backend/api/login";
            } else {
                var url = "https://mpact.justcodenow.com/backend/api/login";
            }

            const fd = new FormData();
            fd.append('vEmail', Email);
            fd.append('vPassword', Password);

            const dataa = axios.post(url, fd)
                .then(res => {
                    if (res.data.estatus == '0') 
                    {
                        var now = new Date().getTime();
                        localStorage.setItem("iAdminId", res.data.data.iAdminId);
                        localStorage.setItem("vUserName", res.data.data.vUserName);
                        localStorage.setItem("setupTime", now);

                        swal("Login", res.data.message, "success");
                        setTimeout(function () {
                            history.push("/");
                            window.location.reload(1);
                        }, 1000);
                    }
                    else {
                        swal("Error", res.data.message, "error");
                    }
                })
                .catch(error => {
                })
        }
    }
    return (
        <div class="login_body">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-offset- col-md-4 text-center">

                        <h1 className='text-white mb-4'>Mpact Login</h1>
                        <div className="form-login">
                            <h4 className="mb-4">Secure Login</h4>

                            <input type="text" id="email" value={Email} onChange={(e) => setEmail(e.target.value)} className="form-control input-sm chat-input mt-1" placeholder="Email" />
                            <span className="red">{ErrorEmail}</span>
                            <input type="password" onKeyDown={(e) => something(e)} value={Password} onChange={(e) => setPassword(e.target.value)} id="userPassword" className="form-control input-sm chat-input mt-4" placeholder="password" />
                            <span className="red">{ErrorPassword}</span>

                            <div className="wrapper">
                                <span className="group-btn">
                                    <a href="javascript:;" onClick={login} className="btn loginBtn  mt-4">login <i className="fa fa-sign-in"></i></a>
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4">

                    </div>


                </div>

            </div>
        </div>
    );
}
export default Login;
