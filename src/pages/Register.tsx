import React from 'react'
import RegisterForm from '../components/UI/auth/RegisterForm';

const Register: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            

            <div className='w-full rounded-xl max-w-md p-8 bg-[var(--dark-blue)]' > 
            <RegisterForm />
            </div>

            
        </div>
    )
}

export default Register