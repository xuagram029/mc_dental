import React from 'react'

const EditPatientInfo = () => {
  return (
    <>
        <div
      className="font-pop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
    >
      <div className="relative w-full my-6 mx-auto ">
        {/*content*/}
        <div className="max-h-[90vh] overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-semibold">
              Creating Account for Dentist
            </h3>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
              <form className="mt-6 flex">
                  <div>
                  <div className="mb-2">
                      <label
                          htmlFor="firstname"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          First Name
                      </label>
                      <input
                          value={firstname}
                          onChange={(e) => {setFirstname(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="middlename"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Middlename
                      </label>
                      <input
                          value={middlename}
                          onChange={(e) => {setMiddlename(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="lastname"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Lastname
                      </label>
                      <input
                          value={lastname}
                          onChange={(e) => {setLastname(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Gender
                      </label>
                      <input
                          value={gender}
                          onChange={(e) => {setGender(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  </div>

                 <div>
                 <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Civil Status
                      </label>
                      <input
                          value={civil_status}
                          onChange={(e) => {setCivilStatus(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Birthday
                      </label>
                      <input
                          value={birthdate}
                          onChange={(e) => {setBirthdate(e.target.value)}}
                          type="date"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Age
                      </label>
                      <input
                          value={age}
                          onChange={(e) => {setAge(e.target.value)}}
                          type="number"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Religion
                      </label>
                      <input
                          value={religion}
                          onChange={(e) => {setReligion(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                 </div>

                  <div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Nationality
                      </label>
                      <input
                          value={nationality}
                          onChange={(e) => {setNationality(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Address
                      </label>
                      <input
                          value={address}
                          onChange={(e) => {setAddress(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Mobile
                      </label>
                      <input
                          value={mobile}
                          onChange={(e) => {setMobile(e.target.value)}}
                          type="number"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Occupation
                      </label>
                      <input
                          value={occupation}
                          onChange={(e) => {setOccupation(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  </div>

                  <div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Email
                      </label>
                      <input
                          value={email}
                          onChange={(e) => {setEmail(e.target.value)}}
                          type="email"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Referred By
                      </label>
                      <input
                          value={referred_by}
                          onChange={(e) => {setReferredBy(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Username
                      </label>
                      <input
                          value={username}
                          onChange={(e) => {setUsername(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Guardian
                      </label>
                      <input
                          value={guardian}
                          onChange={(e) => {setGuardian(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  </div>
                  
                  <div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Good Health
                      </label>
                      <input
                          value={good_health}
                          onChange={(e) => {setGoodHealth(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Medical Treatment
                      </label>
                      <input
                          value={m_treat}
                          onChange={(e) => {setMTreat(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Condition Being Treated
                      </label>
                      <input
                          value={c_treated}
                          onChange={(e) => {setCTreated(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Illness
                      </label>
                      <input
                          value={illness}
                          onChange={(e) => {setIllness(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Operations Details
                      </label>
                      <input
                          value={op_details}
                          onChange={(e) => {setOpDetails(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Hospitalized
                      </label>
                      <input
                          value={hozpitalized}
                          onChange={(e) => {setHozpitalized(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Hospitalization Details
                      </label>
                      <input
                          value={hozpitalized_details}
                          onChange={(e) => {setHozpitalizedDetails(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Under Medication
                      </label>
                      <input
                          value={medication}
                          onChange={(e) => {setMedication(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Medicines
                      </label>
                      <input
                          value={meds}
                          onChange={(e) => {setMeds(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Using Tobacco Products
                      </label>
                      <input
                          value={tobacco}
                          onChange={(e) => {setTobacco(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Using Alcohol or Drugs
                      </label>
                      <input
                          value={alcohol}
                          onChange={(e) => {setAlcohol(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Allergies
                      </label>
                      <input
                          value={allergies}
                          onChange={(e) => {setAllergies(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Pregnant
                      </label>
                      <input
                          value={pregnant}
                          onChange={(e) => {setPregnant(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Nursing
                      </label>
                      <input
                          value={nursing}
                          onChange={(e) => {setNursing(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Birth Control
                      </label>
                      <input
                          value={birth_control}
                          onChange={(e) => {setBirthControl(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Blood Type
                      </label>
                      <input
                          value={b_type}
                          onChange={(e) => {setBType(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Blood Pressure
                      </label>
                      <input
                          value={b_pressure}
                          onChange={(e) => {setBPressure(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Condition
                      </label>
                      <input
                          value={condition}
                          onChange={(e) => {setCondition(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Bleeding Time
                      </label>
                      <input
                          value={bleeding_time}
                          onChange={(e) => {setBleedingTime(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Clotting Time
                      </label>
                      <input
                          value={clotting_time}
                          onChange={(e) => {setClottingTime(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  {/* {err && <div className="text-red-600">{err}</div>} */}
                  <div className="mt-6">
                      <button 
                      onClick={editPatient}
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                          Update
                      </button>
                  </div>
                  {/* {error && <div className='text-red-700'>{error}</div>} */}
              </form>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              onClick={() => {setEditModal(!editModal)}}
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
  )
}

export default EditPatientInfo
