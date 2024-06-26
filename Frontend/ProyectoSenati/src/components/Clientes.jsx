
import { useEffect } from 'react';
import SideBar from "./Layout/SideBar"
import NavBar from "./Layout/NavBar"
import './Default.css'

function Clientes(){
    const allModals = ['main-modal', `modal-update-${1}`];

    useEffect(() => {
        allModals.forEach((modal) => {
          const modalSelected = document.querySelector('#' + modal);
          if (modalSelected) {
            modalSelected.classList.remove('fadeIn');
            modalSelected.classList.add('fadeOut');
            modalSelected.style.display = 'none';
          }
        });
      }, [allModals]);

    const modalClose = (modal) => {
        const modalToClose = document.querySelector('#' + modal);
        modalToClose.classList.remove('fadeIn');
        modalToClose.classList.add('fadeOut');
        setTimeout(() => {
        modalToClose.style.display = 'none';
        }, 500);
    };

    const openModal = (modal) => {
        const modalToOpen = document.querySelector('#' + modal);
        modalToOpen.classList.remove('fadeOut');
        modalToOpen.classList.add('fadeIn');
        modalToOpen.style.display = 'flex';
    };

    return (
        <>
        <div style={{ display: 'flex' }}>
                <SideBar/>
                <div className="nav-width-default">
                    <div className="">
                        <NavBar/>
                        <div className="Content-page"> 
                            <div className="w-95-percent p-a-10 m-a-20">
                            <div className="container">
                                <div className="flex">
                                    <div className="cont-80-percent flex jus-cnt-center ali-items-center">
                                        <div className="mb-8"><b>CLIENTES</b></div>
                                    </div>
                                    <div className="cont-20-percent">
                                        <button onClick={() => openModal('main-modal')} className="bg-green-600 font-semibold text-white p-1.5 w-32 rounded-full hover:bg-green-700 shadow-lg hover:shadow-none transition-all duration-300 m-2">
                                            Agregar
                                        </button>
                                    </div>
                                </div>
                                <div id='main-modal' className="fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster" style={{ background: 'rgba(0,0,0,.7)' }}>
                                    <div className="border border-blue-500 shadow-lg modal-container bg-white w-4/12 md:max-w-11/12 mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
                                        <div className="modal-content py-4 text-left px-6">
                                            {/* Title */}
                                            <div className="flex justify-between items-center pb-3">
                                                <p className="text-2xl font-bold text-gray-500">Agregar Cliente</p>
                                                <div className="modal-close cursor-pointer z-50" onClick={() => modalClose('main-modal')}>
                                                    <svg className="fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="my-5 mr-5 ml-5 flex justify-center">
                                                <form action="" method="POST" id="add_caretaker_form" className="w-full">
                                                    <div>

                                                        <div>
                                                            <label htmlFor="names" className="text-md text-gray-600">Nombre</label>
                                                        </div>
                                                        <div>
                                                            <input type="text" id="names" autoComplete="off" name="names" className="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md" placeholder="Example. John Doe" />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="names" className="text-md text-gray-600">Tipo de Cliente</label>
                                                        </div>
                                                        <div>
                                                            <select id='tipo_cliente' defaultValue="" autoComplete="off" className="select-h w-full border-2 border-gray-300 mb-5 rounded-md" placeholder="Tipo de Cliente...">
                                                                <option value="" className='text-gray-color' disabled>Tipo de Cliente...</option>
                                                                <option value="1">Persona</option>
                                                                <option value="2">Empresa</option>
                                                                <option value="3">Independiente</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="dni" className="text-md text-gray-600">DNI</label>
                                                        </div>
                                                        <div>
                                                            <input type="number" id="dni" autoComplete="off" name="dni" className="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md" placeholder="Ingrese DNI..." />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="ruc" className="text-md text-gray-600">RUC</label>
                                                        </div>
                                                        <div>
                                                            <input type="number" id="ruc" autoComplete="off" name="ruc" className="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md" placeholder="Ingrese Ruc..." />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* Footer */}
                                            <div className="flex justify-end pt-2 space-x-14">
                                                <button className="px-4 bg-gray-200 p-3 rounded text-black hover:bg-gray-300 font-semibold" onClick={() => modalClose('main-modal')}>Cancel</button>
                                                <button className="px-4 bg-blue-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400" onClick= "validateForm(document.getElementById('add_caretaker_form'))">Confirm</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <table className="text-left w-full">
                                    <thead className="bg-black flex text-white w-full">
                                        <tr className="flex w-full mb-4">
                                            <th className="p-4 w-1/6">ID</th>
                                            <th className="p-4 w-1/6">Nombre</th>
                                            <th className="p-4 w-1/6">DNI</th>
                                            <th className="p-4 w-1/6">RUC</th>
                                            <th className="p-4 w-1/6">Tipo de Cliente</th>
                                            <th className="p-4 w-1/6">Estado</th>
                                            <th className="p-4 w-1/6">Operaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full" style={{height : '50vh'}}>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/6">1</td>
                                            <td className="p-4 w-1/6">Martín Perez Gomez</td>
                                            <td className="p-4 w-1/6">78412671</td>
                                            <td className="p-4 w-1/6">NULL</td>
                                            <td className="p-4 w-1/6">Persona</td>
                                            <td className="p-4 w-1/6">Activo</td>
                                            <td className="p-4 w-1/6 flex justify-center">
                                                <div className="flex space-x-5">
                                                    <button onClick={() => openModal(`modal-update-${1}`)} className='bg-blue-600 font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">border_color</i></button>
                                                    <button className='bg-red-600  font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">delete</i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <div id={`modal-update-${1}`} className="main-modal fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster" style={{ background: 'rgba(0,0,0,.7)' }}>
                                            <div className="border border-blue-500 shadow-lg modal-container bg-white w-4/12 md:max-w-11/12 mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
                                                <div className="modal-content py-4 text-left px-6">
                                                    {/* Title */}
                                                    <div className="flex justify-between items-center pb-3">
                                                        <p className="text-2xl font-bold text-gray-500">Editar Cliente</p>
                                                        <div className="modal-close cursor-pointer z-50" onClick={() => modalClose(`modal-update-${1}`)}>
                                                            <svg className="fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    {/* Body */}
                                                    <div className="my-5 mr-5 ml-5 flex justify-center">
                                                        <form action="" method="POST" id="add_caretaker_form" className="w-full">
                                                            <div>

                                                                <div>
                                                                    <label htmlFor="names" className="text-md text-gray-600">Nombre</label>
                                                                </div>
                                                                <div>
                                                                    <input type="text" id="names" autoComplete="off" name="names" className="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md" placeholder="Example. John Doe" />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="names" className="text-md text-gray-600">Tipo de Cliente</label>
                                                                </div>
                                                                <div>
                                                                    <select id='tipo_cliente' defaultValue="" autoComplete="off" className="select-h w-full border-2 border-gray-300 mb-5 rounded-md" placeholder="Tipo de Cliente...">
                                                                        <option value="" className='text-gray-color' disabled>Tipo de Cliente...</option>
                                                                        <option value="1">Persona</option>
                                                                        <option value="2">Empresa</option>
                                                                        <option value="3">Independiente</option>
                                                                    </select>
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="dni" className="text-md text-gray-600">DNI</label>
                                                                </div>
                                                                <div>
                                                                    <input type="number" id="dni" autoComplete="off" name="dni" className="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md" placeholder="Ingrese DNI..." />
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="ruc" className="text-md text-gray-600">RUC</label>
                                                                </div>
                                                                <div>
                                                                    <input type="number" id="ruc" autoComplete="off" name="ruc" className="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md" placeholder="Ingrese Ruc..." />
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    {/* Footer */}
                                                    <div className="flex justify-end pt-2 space-x-14">
                                                        <button className="px-4 bg-gray-200 p-3 rounded text-black hover:bg-gray-300 font-semibold" onClick={() => modalClose(`modal-update-${1}`)}>Cancel</button>
                                                        <button className="px-4 bg-blue-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400" onClick= "validateForm(document.getElementById('add_caretaker_form'))">Confirm</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/6">2</td>
                                            <td className="p-4 w-1/6">Codecta</td>
                                            <td className="p-4 w-1/6">NULL</td>
                                            <td className="p-4 w-1/6">20135467889</td>
                                            <td className="p-4 w-1/6">Empresa</td>
                                            <td className="p-4 w-1/6">Activo</td>
                                            <td className="p-4 w-1/6 flex justify-center">
                                                <div className="flex space-x-5">
                                                    <button className='bg-blue-600 font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">border_color</i></button>
                                                    <button className='bg-red-600  font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">delete</i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/6">3</td>
                                            <td className="p-4 w-1/6">J&P PERIFERICOS SAC</td>
                                            <td className="p-4 w-1/6">NULL</td>
                                            <td className="p-4 w-1/6">20210237855</td>
                                            <td className="p-4 w-1/6">Empresa</td>
                                            <td className="p-4 w-1/6">Activo</td>
                                            <td className="p-4 w-1/6 flex justify-center">
                                                <div className="flex space-x-5">
                                                    <button className='bg-blue-600 font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">border_color</i></button>
                                                    <button className='bg-red-600  font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">delete</i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/6">4</td>
                                            <td className="p-4 w-1/6">Daniel Quespe Torris</td>
                                            <td className="p-4 w-1/6">41253783</td>
                                            <td className="p-4 w-1/6">10214227855</td>
                                            <td className="p-4 w-1/6">Independiente</td>
                                            <td className="p-4 w-1/6">Activo</td>
                                            <td className="p-4 w-1/6 flex justify-center">
                                                <div className="flex space-x-5">
                                                    <button className='bg-blue-600 font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">border_color</i></button>
                                                    <button className='bg-red-600  font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">delete</i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/6">5</td>
                                            <td className="p-4 w-1/6">GetByte</td>
                                            <td className="p-4 w-1/6">NULL</td>
                                            <td className="p-4 w-1/6">20210237855</td>
                                            <td className="p-4 w-1/6">Empresa</td>
                                            <td className="p-4 w-1/6">Inactivo</td>
                                            <td className="p-4 w-1/6 flex justify-center">
                                                <div className="flex space-x-5">
                                                    <button className='bg-blue-600 font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">border_color</i></button>
                                                    <button className='bg-red-600  font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">delete</i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/6">6</td>
                                            <td className="p-4 w-1/6">Daniel Quespe Torris</td>
                                            <td className="p-4 w-1/6">41253783</td>
                                            <td className="p-4 w-1/6">10214227855</td>
                                            <td className="p-4 w-1/6">Independiente</td>
                                            <td className="p-4 w-1/6">Activo</td>
                                            <td className="p-4 w-1/6 flex justify-center">
                                                <div className="flex space-x-5">
                                                    <button className='bg-blue-600 font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">border_color</i></button>
                                                    <button className='bg-red-600  font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">delete</i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/6">7</td>
                                            <td className="p-4 w-1/6">GetByte</td>
                                            <td className="p-4 w-1/6">NULL</td>
                                            <td className="p-4 w-1/6">20210237855</td>
                                            <td className="p-4 w-1/6">Empresa</td>
                                            <td className="p-4 w-1/6">Inactivo</td>
                                            <td className="p-4 w-1/6 flex justify-center">
                                                <div className="flex space-x-5">
                                                    <button className='bg-blue-600 font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">border_color</i></button>
                                                    <button className='bg-red-600  font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">delete</i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/6">8</td>
                                            <td className="p-4 w-1/6">Daniel Quespe Torris</td>
                                            <td className="p-4 w-1/6">41253783</td>
                                            <td className="p-4 w-1/6">10214227855</td>
                                            <td className="p-4 w-1/6">Independiente</td>
                                            <td className="p-4 w-1/6">Activo</td>
                                            <td className="p-4 w-1/6 flex justify-center">
                                                <div className="flex space-x-5">
                                                    <button className='bg-blue-600 font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">border_color</i></button>
                                                    <button className='bg-red-600  font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">delete</i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/6">9</td>
                                            <td className="p-4 w-1/6">GetByte</td>
                                            <td className="p-4 w-1/6">NULL</td>
                                            <td className="p-4 w-1/6">20210237855</td>
                                            <td className="p-4 w-1/6">Empresa</td>
                                            <td className="p-4 w-1/6">Inactivo</td>
                                            <td className="p-4 w-1/6 flex justify-center">
                                                <div className="flex space-x-5">
                                                    <button className='bg-blue-600 font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">border_color</i></button>
                                                    <button className='bg-red-600  font-semibold text-white cuadrado-35 rounded-full hover:bg-black shadow-lg hover:shadow-none transition-all duration-300 m-2"'><i style={{fontSize:"23px"}} className="material-icons">delete</i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </>
    )
}
export default Clientes