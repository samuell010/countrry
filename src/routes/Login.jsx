import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, loginWithEmailAndPassword, registerWithEmailAndPassword } from "../auth/firebase";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
 
const Login = () => {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
 
    const login = () => {
       loginWithEmailAndPassword(email, password);
            }
                useEffect(() => {
                    if(loading) return;
                    if(user) navigate('/countries');
                    if(user) console.log("User info: ", user);
                }, [user, loading]);
 
                return (
                    <div>
                        <h1>Login</h1>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <Button onClick={login}>Login</Button>
                    </div>
                );
        }
 
export default Login;