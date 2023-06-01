import { useState } from "react";
import DentistReg from "../components/DentistReg";

const DentistSignup = () => {
    
  const[sigInModal, setSignInModal] = useState(false)  

  return (
    <div className="flex items-center justify-center h-screen">
        <button onClick={() => setSignInModal(true)} className='bg-purple-600 py-4 px-8 rounded-md text-white font-bold font-pop text-lg'>
            Sign Up a Dentist
        </button>

        {sigInModal && <DentistReg setSignInModal={setSignInModal} />}

    </div>
);
}

export default DentistSignup