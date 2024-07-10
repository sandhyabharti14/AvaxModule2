"use client";

import Image from "next/image";
import StudentAbi from "../artifacts/contracts/Student.sol/Student.json"
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Home() {
  const contractAddress = "0xf2f66C49F9af3eb6CE5C4D30B911c217Aa7cf101";

  const [ethWindow, setEthWindow] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [studentContract, setStudentContract] = useState();
  const [connected, setConnected] = useState(false);




  //-----------------------------------------


  const [name, SetName] = useState();
  const [id, setID] = useState();
  const [sAddress, setSAddress] = useState();

  const [registeredStudent, setRegisteredStudents] = useState()


  // for adding marks
  const [marks, setMarks] = useState();
  const [showAddMarks, setShowAddMarks] = useState(false);
  const [studentAddress, setStudentAddress] = useState();

  // for retriving marks
  const [saddr,setSaddr] = useState();
  const [sMarks,setSmarks] = useState();

  const initialize = async () => {
    if (window.ethereum) {
      console.log("Metamask is installed");
      setEthWindow(window.ethereum);
    }

    if (ethWindow) {
      const accountsArray = await ethWindow.request({ method: "eth_accounts" });
      setAccounts(accountsArray);
    }
    ConnectToMetamask();
  };

  const ConnectToMetamask = async () => {
    if (ethWindow) {
      const accounts = await ethWindow.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
      setConnected(true);
    }

    ConnectToContract();
  };

  const ConnectToContract = async () => {
    try {
      console.log("The Degen Abi is : " + StudentAbi.abi);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const studentContract = new ethers.Contract(
        contractAddress,
        StudentAbi.abi,
        signer
      );
      console.log(studentContract);
      setStudentContract(studentContract);

      console.log(studentContract);
    } catch (error) {
      console.log("can't connect with the contract");
    }
  };

  const addStudents = async () => {

    try {
      if (studentContract) {
        console.log(name, sAddress, id);
        const res = await studentContract.registerNewStudent(name, parseInt(id), sAddress);

      }
    } catch (error) {
      console.log(error);
    }

    
  }

  const addMarks = async()=>{
    try {
      if (studentContract) {
        const res = await studentContract.addStudentMarks(studentAddress,parseInt(marks));
       
        // const res = studentContract.registerNewStudent();

      }
    } catch (error) {
      console.log(error);
    }
  }
  const getStudents = async () => {
    try {
      if (studentContract) {
        const res = await studentContract.getStudents();
        setRegisteredStudents(res);
        // const res = studentContract.registerNewStudent();

      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleShowAddress = (studentAddress)=>{
    setShowAddMarks(true);

  }


  const marksShow = async()=>{
   const res = await studentContract.getMarks(saddr);
   setSmarks(res)
  }

 



  useEffect(() => {
    async function Operation() {
      await initialize();
      await ConnectToContract();

    }
    Operation();
  }, []);

  return (
    <div className="bg-black">
      <div>
      {accounts && <p>Your Connected account is : {accounts}</p>}
      <div className="grid grid-cols-3">
        <div className="grid col-start-1 col-end-4">
          <div className="col-span-4 flex flex-col items-center">
            <h1 className="text-4xl">Account</h1>
          </div>
          <div className="col-span-4 flex flex-col items-center my-10">
            <button
              className="rounded-2xl p-5 pt-3 pb-3.5 bg-rose-800 shadow-xl shadow-zinc-800"
              onClick={ConnectToMetamask}
            >
              {connected ? "Connected" : "Connect To metamask"}
            </button>
          </div>
        </div>
       


        <div className=" bg-black text-white grid grid-cols-2 m-10">
          <form className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
            <div className="flex justify-center mb-5">
              <p className="text-2xl font-bold text-white text-transparent">
                Register New Student
              </p>
            </div>
            <label className="grid col-start-1 col-end-1 ">Enter the Student Name</label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
              required
              onChange={(e) => SetName(e.target.value)}

            />
            <label className="grid col-start-1 col-end-1 ">Enter the Studnet ID</label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
              required
              onChange={(e) => setID(e.target.value)}

            />
            <label className="grid col-start-1 col-end-1 ">Enter the Student Address</label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
              required
              onChange={(e) => setSAddress(e.target.value)}

            />
          </form>

          <div className="flex justify-center col-span-2 items-center py-5">
            <button
              className="bg-blue-900 p-5 rounded-xl hover:bg-rose-900"
              onClick={addStudents}

            >
              Register New Student
            </button>
          </div>
        </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => getStudents()}
            className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 px-8 pb-2.5 pt-3 text-xs font-medium uppercase leading-normal rounded-2xl"
          >
            Show Register Students
          </button>
        </div>

       





        {registeredStudent && (
          <div className="mx-auto max-w-7xl pt-40 px-6" id="exchange-section">
            <div className="table-b bg-navyblue p-8 overflow-x-auto">
              <h3 className="text-offwhite text-2xl justify-center flex">
                Registered Student List
              </h3>
              <table className="table-auto w-full mt-10">
                <thead>
                  <tr className="text-white bg-darkblue rounded-lg">
                    <th className="px-4 py-4 text-start font-normal">S.no</th>
                    <th className="px-4 py-4 text-start font-normal">Name</th>
                    <th className="px-4 py-4 font-normal">Student ID</th>
                    <th className="px-4 py-4 font-normal">Student Address</th>
                    <th className="px-4 py-4 font-normal">Add marks to Students</th>

                  </tr>
                </thead>
                <tbody>
                  {registeredStudent.map((eachStudent, i) => (
                    <tr key={i} className="border-b border-b-darkblue">
                      <td className="px-4 py-6 text-center text-white">
                        {i + 1}
                      </td>

                      <td className="px-4 py-6 text-center text-white">
                        {eachStudent.name}
                      </td>
                      <td className={`px-4 py-6 text-center `}>
                        {parseInt(eachStudent.id)}
                      </td>
                      <td className="px-4 py-6 text-center text-white">
                        {eachStudent.studentAddress}
                      </td>
                      <td className="px-4 py-6 text-center text-white">
                        <button
                        onClick={()=> handleShowAddress()}
                          className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 px-8 pb-2.5 pt-3 text-xs font-medium uppercase leading-normal rounded-2xl"
                        >
                          Add Marks to register Students
                        </button>
                      </td>

                    

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {showAddMarks && <div> <form className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
    <div className="flex justify-center mb-5">
      <p className="text-2xl font-bold text-white text-transparent">
        Add Student marks
      </p>
    </div>
    <label className="grid col-start-1 col-end-1 ">check the Student Address</label>
    <input
      className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
      required
    onChange={(e)=>setStudentAddress(e.target.value)}

    />
    <label className="grid col-start-1 col-end-1 ">Enter the Student Marks</label>
    <input
      className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
      required
      onChange={(e) => setMarks(e.target.value)}

    />

      </form>
      
      <div className="flex justify-center col-span-2 items-center py-5">
      <button
        className="bg-blue-900 p-5 rounded-xl hover:bg-rose-900"
        onClick={addMarks}

      >
        Add Student Marks
      </button>
    </div></div>}
            
            
            </div>)}



            <div className=" bg-black text-white grid grid-cols-2 m-10">
          <form className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
            <div className="flex justify-center mb-5">
              <p className="text-2xl font-bold text-white text-transparent">
               Get Student Marks
              </p>
            </div>
            <label className="grid col-start-1 col-end-1 ">Enter the Student Address</label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
              required
              onChange={(e) => setSaddr(e.target.value)}

            />
            </form>
            </div>

            <div className="flex justify-center">
          <button
            onClick={() => marksShow()}
            className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 px-8 pb-2.5 pt-3 text-xs font-medium uppercase leading-normal rounded-2xl"
          >
           Show student marks
          </button>
        </div>

                 
       {sMarks && <div className="mx-auto max-w-7xl pt-40 px-6" id="exchange-section">
            <div className="table-b bg-navyblue p-8 overflow-x-auto">
              <h3 className="text-offwhite text-2xl justify-center flex">
                Student Marks
              </h3>
              <table className="table-auto w-full mt-10">
                <thead>
                  <tr className="text-white bg-darkblue rounded-lg">
                    <th className="px-4 py-4 text-start font-normal">S.no</th>
                    <th className="px-4 py-4 text-start font-normal">Student Adddress</th>
                    <th className="px-4 py-4 font-normal">Student Marks</th>
                   

                  </tr>
                </thead>
                <tbody>
               
                  {sMarks.map((eachMarks, i) => (
                    <tr key={i} className="border-b border-b-darkblue">
                      <td className="px-4 py-6 text-center text-white">
                        {i + 1}
                      </td>
                     
                      <td className="px-4 py-6 text-center text-white">
                        {saddr}
                      </td>

                      <td className="px-4 py-6 text-center text-white">
                        {parseInt(eachMarks)}
                      </td>
                    
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>

            }





      </div></div>)
}
// right click and lick format