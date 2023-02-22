import React, { useEffect, useState } from 'react'

function App() {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email Must be feeled out')
    const [passwordError, setPaasswordError] = useState('Password Must be feeled out')
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])
    

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
        if (!emailRegex.test(String(e.target.value).toLocaleLowerCase())) {
            setEmailError('Email is incorrect')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{4,}$/;
        if (!passwordRegex.test(String(e.target.value))) {
            setPaasswordError('Password is incorrect')
        } else {
            setPaasswordError('')
        }
    }
 
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
                <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type='text' placeholder='Enter Your Email'/>
                {(passwordDirty && passwordDirty) && <div style={{color: 'red'}}>{passwordError}</div>}
                <input onChange={e => passwordHandler(e)}  value={password} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='Enter Your Password'/>
                <button disabled={!formValid} type='submit'>Registration</button>
            </form>
        </div>
     )
}

export default App;