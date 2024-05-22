// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
Sheet,
SheetClose,
SheetContent,
SheetDescription,
SheetFooter,
SheetHeader,
SheetTitle,
SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { auth, db } from '../../config/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { login, logout } from '@/redux/slice/authSlice';
import { doc, setDoc } from 'firebase/firestore';
import { clearReminders } from '@/redux/slice/reminderSlice';


export const AuthComponent = () => {
const [isRegistering, setIsRegistering] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const dispatch = useDispatch();
const loggedIn=useSelector(state=>state.auth.loggedIn);



const handleLogin = async (e) => {
e.preventDefault();
try {
await signInWithEmailAndPassword(auth, email, password);
dispatch(login());
} catch (error) {
alert(error);
}
};

const handleRegister = async (e) => {
e.preventDefault();
try {
const {user}=await createUserWithEmailAndPassword(auth, email, password);
const userData = {email, password};
await setDoc(doc(db,"users", user.uid), userData);
dispatch(login());
alert("user registered")
} catch (error) {
alert(error);
}
};

const handleLogout = async ()=>{
try {
await signOut(auth);
dispatch(logout());
dispatch(clearReminders());
} catch (error) {
console.log(error);
}

};

const handleGuest = () => {
    alert("Dear guest user, all your data will be lost once the browser is closed/refreshed")
};

return (

<>
<div className='flex justify-end'>
    
{loggedIn?(<div>{auth?.currentUser.email}
    <Button className="m-[5px]"onClick={handleLogout}>Logout</Button></div>):(<Sheet>
        <SheetTrigger><Button>Login</Button></SheetTrigger>
        <SheetContent side="top">
            <SheetHeader>
                <SheetTitle>
                    <center>
                        <h1>{isRegistering ? 'Register' : 'Login'}</h1>
                    </center>
                </SheetTitle>
            </SheetHeader>
            <SheetDescription>
                <div className='flex justify-center'>
                    <div className='flex  justify-center'>
                        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                            <div>
                                <Input className="m-[5px] " type="email" value={email} onChange={(e)=>
                                setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                />
                            </div>
                            <div>
                                <Input className="m-[5px] " type="password" value={password} onChange={(e)=>
                                setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                />
                            </div>
                            <div className='flex flex-row'>
                                <Button className="m-[5px] w-1/4" type="submit">{isRegistering ? 'Register' :
                                    'Login'}</Button>
                                <Button variant="link" onClick={()=> setIsRegistering(!isRegistering)}>
                                    {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </SheetDescription>
            <SheetFooter>
                <SheetClose asChild>
                    <Button onClick={handleGuest}>Continue as Guest</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>)}

</div>


    
</>


);
};