import React from 'react'
import { useState, useEffect } from 'react'
import fire from './fire';
import Mainpage from './mainpage';


const Login = () => {

    const [user, setuser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailerror, setEmailerror] = useState("");
    const [passworderror, setPassworderror] = useState("");
    const [account, setAccount] = useState(false);

    const clearInputs = () =>{
        setEmail("");
        setPassword(""); 
    }

    const clearError =()=>{
        setEmailerror("");
        setPassworderror("");
    }
    
    const handleLogin =() =>{
        clearError();
        fire
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(err =>{
            switch(err.code){
                case "auth/invalid-email":
                case "auth/user-disable":
                case "auth/user-not-found":
                    setEmailerror(err.message);
                    break;
                case "auth/wrong-password":
                    setPassworderror(err.message);
                    break;
            }
        });
    }

    const handleSignup =()=>{
        clearError();
        fire
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .catch(err =>{
            switch(err.code){
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailerror(err.message);
                    break;
                case "auth/weak-password":
                    setPassworderror(err.message);
                    break;
            }
        });
    }

    const handleLogout =()=>{
        fire.auth().signOut();
    }

    const authListner =()=>{
        fire.auth().onAuthStateChanged(user=>{
            if(user){
                clearInputs();
                setuser(user);
            }else{
                setuser("");
            }
        })
    }

    useEffect(() => {
        authListner();
    }, [])

    return (
        <div className="">
           {
               user ? (
                   <>
                      <Mainpage handleLogout={handleLogout} />
                   </>
              
               ) :(
                   <div className="maincon container">
                       <div className="row ">
                         
                        <div className="col-4 col-md-4 col-sm-12">
                        <h1 className="LoginHead pt-4">Tracelink</h1> 
                        <div className="text-center logincon">
                        <label>Username</label> &nbsp;
                            <input type="text" autoFocus required value={email} onChange={(e)=> setEmail(e.target.value)} 
                                placeholder="Enter Your Email"
                            />
                            <p className="error">{emailerror}</p>
                            <label>Password</label> &nbsp;
                            <input type="password"  required value={password} onChange={(e)=>setPassword(e.target.value)}
                                placeholder="Enter Your Password"
                            />
                            <p className="error">{passworderror}</p>
                            <div>
                                {
                                    account ? (
                                    <>
                                        <button onClick={handleLogin} className="btn">Login</button>
                                        <p>Dont have a accout ? <span onClick={()=> setAccount(!account)}>Sign Up</span></p>
                                    </>
                                    )
                                    : <>
                                            <button onClick={handleSignup} className="btn btn-outline-success">Sign up</button>
                                            <p>Have an Account <span onClick={()=> setAccount(!account)}>Login</span></p>
                                        </>
                                }
                            </div>
                        </div>
                            
                        </div>
                        <div className="col-8 col-md-8 col-sm-12 image"></div>
                    </div>
                   </div>
                    
               )
           }
          
        </div>
    )
}

export default Login
