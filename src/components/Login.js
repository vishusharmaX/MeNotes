import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom' ;
import {motion} from "framer-motion"
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:" ",password:" "});
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const onPasswordChange = (event) => {
        setPasswordStrength(event.target.value);
        onChange(event);
      };
      
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({email:credentials.email , password: credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //Save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in Successfully " ,"success")
            navigate("/");
          }
          else{
            props.showAlert("Invalid Details" ,"danger")
          }
    }
    const onChange= (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
        }
    return (
        <>
        <div className='login'>
        <div className='mt-3'>
            <h2>Login to continue to MeNotes</h2>
            <motion.form onSubmit={handleSubmit}
            initial ={{
                x : "-100%",
                opacity : 0,

            }}
            whileInView ={{
                x : 0,
                opacity : 1,

            }}
            transition={{
                delay : 1,
              }}
            
            >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email'  value={credentials.email}onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password 
                        <span className="pointer" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>                
                    </label>
                    <input type={showPassword ? "text" : "password"} className="form-control" id="password" value={credentials.password} onChange={onPasswordChange}
                    name='password'/>
                    <div className="form-text lb">
                    {passwordStrength.length > 0 ? (
                        passwordStrength.length < 8 || !/[A-Z]/.test(passwordStrength) || !/[!@#$%^&*]/.test(passwordStrength) ? (
                        "Password is weak,use special character"
                        ) : (
                        "Password is strong"
                        )
                    ) : (
                        ""
                    )}
                    </div>

                                          
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </motion.form>
        </div>
        </div>
        </>
    )
}

export default Login
