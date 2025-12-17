import { useState } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'
export default function UserProvider({children}) {
 
const userFromStorage = sessionStorage.getItem('user');
const [user, setUser] = useState(userFromStorage ? JSON.parse(userFromStorage) : { email: '', password: '', token: '' });

 
 const signUp = async () => {
  const headers = { headers: { 'Content-Type': 'application/json' } };
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, JSON.stringify({ user }), headers);

  const { user: userData, token } = response.data;
  setUser({ ...userData, token });
  sessionStorage.setItem('user', JSON.stringify({ ...userData, token }));
}


 const signIn = async () => {
  const headers = { headers: { 'Content-Type': 'application/json' } };
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signin`, JSON.stringify({ user }), headers);

  const { user: userData, token } = response.data;
  setUser({ ...userData, token });          
  sessionStorage.setItem('user', JSON.stringify({ ...userData, token }));
}


 return (
 <UserContext.Provider value={{ user, setUser, signUp, signIn }}>
 {children}
 </UserContext.Provider>
 );
}