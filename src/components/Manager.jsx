import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", user: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)

    setPasswordArray(passwords)

  }

  useEffect(() => {
    getPasswords()
  }, [])

  const copyText = (text) => {
    toast.success('Wow so easy!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordRef.current.type = "text"
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      passwordRef.current.type = "password"
      ref.current.src = "icons/eye.png";
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "icons/eyecross.png";
    }

  }


  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.user.length > 3 &&
      form.password.length > 3
    ) {

      const newPassword = {
        ...form,
        id: form.id || uuidv4()
      }

      if (form.id) {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id })
        })
      }

      setPasswordArray([...passwordArray, newPassword])

      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword)
      })

      setform({ site: "", user: "", password: "" })

      toast.success("Password saved", {
        position: "bottom-right",
        theme: "dark",
        transition: Bounce,
      })

    } else {
      toast("Error: Password not saved!")
    }
  }

  const deletePassword = async (id) => {

    console.log("Deleting password Id: ", id)

    setPasswordArray(passwordArray.filter(item => item.id !== id))
    await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })


    toast.success('Password deleted', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  const editPassword = (id) => {
    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }


  return (


    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <div className="fixed inset-0 -z-10 items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="p-6 md:mycontainer min-h-[83.4vh] text-white">
        <h1 className="text-4xl font-bold text-center">
          <span className='text-green-500'> &lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Welcome to the Manager Page
        </p>

        <div className="flex flex-col p-10 gap-4 items-center">
          <input value={form.site} onChange={handleChange} name="site" className="rounded w-full border border-green-500 text-black p-4 py-1" type="text" placeholder="Website" />

          <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
            <input value={form.user} onChange={handleChange} name="user" className="rounded w-full border border-green-500 text-black py-1 p-4" type="text" placeholder="Username" />
            <div className="relative">

              <input ref={passwordRef} value={form.password} onChange={handleChange} name="password" className="rounded w-full border border-green-500 text-black py-1 p-4" type="password" placeholder="Password" />
              <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                <img ref={ref} className="p-1" width="26" src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className="flex justify-center items-center px-4 py-2 w-fit bg-green-500 text-black rounded-full hover:bg-green-700 transition-all duration-300 gap-2">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover" >
            </lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="text-2xl font-bold my-4">
            Your passwords
          </h2>
          {passwordArray.length === 0 ? (
            <p className="text-green-700 text-lg text-center">
              No passwords saved yet.
            </p>
          ) : (

            <div className="overflow-x-auto">
              <table className="table-auto w-full rounded-md overflow-hidden">
                <thead className="bg-green-500 text-black">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-slate-800 text-white">
                  {passwordArray.map((item, index) => {
                    return <tr key={index}>
                      <td className="text-center py-2 border border-slate-700 w-32">
                        <div className="flex justify-center items-center">

                          <a href={item.site} target="_blank">{item.site}</a>
                          <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>

                        </div>
                      </td>
                      <td className="text-center py-2 border border-slate-700 w-32">
                        <div className="flex justify-center items-center">

                          <span>{item.user}</span>
                          <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.user) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>

                        </div>
                      </td>
                      <td className="text-center py-2 border border-slate-700 w-32">
                        <div className="flex justify-center items-center">

                          <span>{"*".repeat(item.password.length)}</span>
                          <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>

                        </div>
                      </td>
                      <td className="text-center py-2 border border-slate-700 w-32">
                        <div className="flex justify-center items-center invert">

                          <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ "width": "25px", "height": "25px" }}>
                            </lord-icon>
                          </span>

                          <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ "width": "25px", "height": "25px" }}>
                            </lord-icon>
                          </span>

                        </div>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Manager