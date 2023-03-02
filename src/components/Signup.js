import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom' ;
import {motion} from "framer-motion"
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: " ",email:" ",password:" ",cpassword:" "});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();
  const onPasswordChange = (event) => {
    setPasswordStrength(event.target.value);
    onChange(event);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
   const  {name,email,password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({name,email,password})
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        //Save the signup auth token and redirect
        localStorage.setItem('token',json.authtoken);
        navigate("/");
        props.showAlert(" Account Created Successfully " ,"success")

      }
      else{
        props.showAlert("Invalid Crendentials" ,"danger")
      }
}
const onChange= (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className='container mt-2'>
      <h2>Signup to continue to MeNotes</h2>
      <motion.form className='container'onSubmit={handleSubmit}
        initial ={{
          x : '-100%',
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
          <label htmlFor="name onChange={onChange}" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password
          <span className="pointer" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
          </label>
          <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" onChange={onPasswordChange} minLength={5} required />
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
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
          <input type={showPassword ? "text" : "password"} className="form-control" id="cpassword" name="cpassword" onChange={onChange}  minLength={5} required/>
          
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </motion.form>
    </div>
  )
}

export default Signup
