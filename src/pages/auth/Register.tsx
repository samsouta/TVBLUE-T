import React from 'react'
import RegisterForm from '../../components/UI/auth/RegisterForm'

const Register: React.FC = () => {
    return (
        <div className=" flex flex-col items-center justify-center p-4">
            

            <div className='w-full rounded-xl max-w-md p-8 bg-black/20 backdrop:blur-lg' > 
            <RegisterForm />
            </div>

            
        </div>
    )
}

export default Register