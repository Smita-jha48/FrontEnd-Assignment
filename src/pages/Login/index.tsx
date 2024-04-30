 import makeRequestAuth from "../../utils/makeRequestAuth";
 import { LOGIN_USER } from "../../constants/authEndPoints";
 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
      email: "",
      password: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      switch (e.target.name) {
        case "email":
          setLoginData({ ...loginData, email: e.target.value });
          break;
        case "password":
          setLoginData({ ...loginData, password: e.target.value });
      }
    };

    const handleSubmit = async () => {
        try {
            const response = await makeRequestAuth(LOGIN_USER, {
              data: loginData,
            });
            if (response) {
                console.log(response.data.token)
            localStorage.setItem("jwt_token",  response.data.token);
            navigate('/');
            }
        } catch (e) {
            alert("Invalid credentials")
            console.log(e);
        }
        };

    return (
      <div>
        <div>
          <p>Email</p>
          <input
            type="email"
            value={loginData.email}
            name="email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type="text"
            value={loginData.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button onClick={handleSubmit}>LOG IN</button>
      </div>
    );
}

export default Login;