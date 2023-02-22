import React, { useState } from 'react'

function App() {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email Must be feeled out');
    const [passwordError, setPaasswordError] = useState('Password Must be feeled out')

    const blurHandler = (e) => {
        switch (e.target.getAttribute('name') || e.target.getAttribute('password')) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    return (
        <div className='app'>
            <form>
                <h1>Registration</h1>
                {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
                <input onBlur={e => blurHandler(e)} name='email' type='text' placeholder='Enter Your Email'/>
                {(passwordDirty && passwordDirty) && <div style={{color: 'red'}}>{passwordError}</div>}
                <input onBlur={e => blurHandler(e)} name='password' type='password' placeholder='Enter Your Password'/>
                <button type='submit'>Registration</button>
            </form>
        </div>
     )
}

export default App;