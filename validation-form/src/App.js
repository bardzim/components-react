import React, { useEffect, useState } from 'react'

const useValidation = (value, validations) => {

    const [isEmpty, setIsEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(true)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    useEffect(()=> {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true)
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break;
                case 'isEmail':
                    const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    regEmail.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;
                
            }
        }
    },[value])

    useEffect(() => {
        if(isEmpty || maxLengthError || minLengthError || emailError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, maxLengthError, minLengthError, emailError])
    

    return {
        isEmpty,
        minLengthError,
        emailError,
        maxLengthError,
        inputValid
    }
}


const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}


function App() {

    const email = useInput('', {isEmpty: true, minLength: 3, isEmail: true})
    const password = useInput('', {isEmpty: true, minLength: 5, maxLength: 8})

    return (
        <div className='app'>
            <form>
                <h1>Registration</h1>

                {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>Field Cant be Empty</div>}
                {(email.isDirty && email.minLengthError) && <div style={{color: 'red'}}>Incorrect Length</div>}
                {(email.isDirty && email.emailError) && <div style={{color: 'red'}}>Email Error</div>}

                <input 
                    onChange={e => email.onChange(e)} 
                    onBlur={ e => email.onBlur(e)} 
                    value={email.value} 
                    name='email' 
                    type='text' 
                    placeholder='Enter Your Email'
                />

                {(password.isDirty && password.isEmpty) && <div style={{color: 'red'}}>Field Cant be Empty</div>}
                {(password.isDirty && password.minLengthError) && <div style={{color: 'red'}}>Incorrect Length</div>}

                <input 
                    onChange={e => password.onChange(e)} 
                    onBlur={ e => password.onBlur(e)} 
                    value={password.value} 
                    name='password' 
                    type='password' 
                    placeholder='Enter Your Password...'
                />

                <button disabled={!email.inputValid || !password.inputValid} type='submit'>Registration</button>
            </form>
        </div>
     )
}

export default App;