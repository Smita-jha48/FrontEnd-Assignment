import { useState } from "react";
import makeRequestAuth from "../../utils/makeRequestAuth";
import { CREATE_USER } from "../../constants/authEndPoints";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "email":
        setSignupData({ ...signupData, email: e.target.value });
        break;
      case "password":
        setSignupData({ ...signupData, password: e.target.value });
    }
  };
  const handleSubmit = async() => {
    try{
        const data = await makeRequestAuth(CREATE_USER, {data: signupData});
        if(data){
            navigate("/login");
        }
        setSignupData({email: "", password: ""});
    }catch(e){
        console.log(e);
        setSignupData({email: "", password: ""});
    }
 }
  return (
    <>
      <div>
        <div>
          <p>Email</p>
          <input
            type="email"
            value={signupData.email}
            name="email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type="text"
            value={signupData.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button onClick={handleSubmit}>Sign Up</button>
      </div>
    </>
  );
};

export default Register;
