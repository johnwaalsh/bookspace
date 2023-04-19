import React, {useState} from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginThunk, registerThunk } from "../services/auth-thunks";

const LoginComponent = ()=> {
    let [createAccount, setCreateAccount] = useState(false);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [firstname, setFirstName] = useState("");
    let [lastname, setLastname] = useState("");
    let [email, setEmail] = useState("");
    let [role, setRole] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginHandler = async () => {
        if (username && password) {
            try {
                await dispatch(loginThunk({ username, password }));
                navigate("/profile");
            } catch (e) {
                alert(e);
            }
        }
    };
    const registerHandler = async () => {
        if (username && password && firstname && lastname && email && role) {
            try {
                await dispatch(registerThunk({ username, password, firstname, lastname, email, role }));
                navigate("/profile");
            } catch (e) {
                alert(e);
            }
        }
    };
    const createAccountHandler = () => {
        setCreateAccount(true);
    }
    const cancelCreateAccountHandler = () => {
        setCreateAccount(false);
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column m-3 col-3">
                <input className="form-control rounded-2 mb-3 border-2 border-dark" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <input className="form-control rounded-2 mb-3 border-2 border-dark" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <>{createAccount &&
                    <div className="d-flex flex-column">
                        <input className="form-control rounded-2 mb-3 border-2 border-dark" placeholder="First Name" value={firstname} onChange={(event) => setFirstName(event.target.value)}></input>
                        <input className="form-control rounded-2 mb-3 border-2 border-dark" placeholder="Last Name" value={lastname} onChange={(event) => setLastname(event.target.value)}></input>
                        <input className="form-control rounded-2 mb-3 border-2 border-dark" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                        <span className="mb-2 align-self-center">Select your role:</span>
                        <div className="d-flex justify-content-around mb-3">
                            <div>
                                <input className="me-1" id="reader" name="role" type="radio" value="READER" onChange={(event) => {
                                    setRole("Reader");
                                }}></input>
                                <label htmlFor="reader"> Reader</label>
                            </div>
                            <div>
                                <input className="me-1" id="author" name="role" type="radio" value="AUTHOR" onChange={(event) => {
                                    setRole("Author");
                                }}></input>
                                <label htmlFor="author"> Author</label>
                            </div>
                            <div>
                                <input className="me-1" id="critic" name="role" type="radio" value="CRITIC" onChange={(event) => {
                                    setRole("Critic");
                                }}></input>
                                <label htmlFor="critic"> Critic</label>
                            </div>
                        </div>
                    </div>}
                </>
                <>{!createAccount &&
                    <div className="d-flex justify-content-around">
                        <button className="rounded-2 border-0" onClick={loginHandler}>Log In</button>
                        <button className="rounded-2 border-0" onClick={createAccountHandler}>Create an Account</button>
                    </div>}
                </>
                <>{createAccount &&
                    <div className="d-flex justify-content-around">
                        <button className="rounded-2 border-0" onClick={cancelCreateAccountHandler}>Cancel</button>
                        <button className="rounded-2 border-0" onClick={registerHandler}>Create Account</button>
                    </div>}
                </>
            </div>
        </div>
    )

}

export default LoginComponent;