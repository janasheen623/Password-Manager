import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-slate-800 text-white ">
            <div className="mycontainer p-4 flex justify-between items-center">


                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </div>

                

                <button className="git bg-green-700 flex justify-center items-center gap-2 px-2 py-1 rounded-full ring-white ring-1">
                    <img className="invert" src="icons/github.svg" width="30" alt="github" />
                    <span className="text-bold">GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
