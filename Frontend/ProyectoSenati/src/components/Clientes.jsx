import SideBar from "./Layout/SideBar"
import NavBar from "./Layout/NavBar"
import './Default.css'

function Clientes(){
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
                                <h1 className="mb-8"><b>CLIENTES</b>
                                    
                                </h1>
                                <table className="text-left w-full">
                                    <thead className="bg-black flex text-white w-full">
                                        <tr className="flex w-full mb-4">
                                            <th className="p-4 w-1/4">One</th>
                                            <th className="p-4 w-1/4">Two</th>
                                            <th className="p-4 w-1/4">Three</th>
                                            <th className="p-4 w-1/4">Four</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full" style={{height : '50vh'}}>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/4">Dogs</td>
                                            <td className="p-4 w-1/4">Cat</td>
                                            <td className="p-4 w-1/4">Fish</td>
                                            <td className="p-4 w-1/4">Birds</td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/4">Dogs</td>
                                            <td className="p-4 w-1/4">Cat</td>
                                            <td className="p-4 w-1/4">Fish</td>
                                            <td className="p-4 w-1/4">Birds</td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/4">Dogs</td>
                                            <td className="p-4 w-1/4">Cat</td>
                                            <td className="p-4 w-1/4">Fish</td>
                                            <td className="p-4 w-1/4">Birds</td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/4">Dogs</td>
                                            <td className="p-4 w-1/4">Cat</td>
                                            <td className="p-4 w-1/4">Fish</td>
                                            <td className="p-4 w-1/4">Birds</td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/4">Dogs</td>
                                            <td className="p-4 w-1/4">Cat</td>
                                            <td className="p-4 w-1/4">Fish</td>
                                            <td className="p-4 w-1/4">Birds</td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/4">Dogs</td>
                                            <td className="p-4 w-1/4">Cat</td>
                                            <td className="p-4 w-1/4">Fish</td>
                                            <td className="p-4 w-1/4">Birds</td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/4">Dogs</td>
                                            <td className="p-4 w-1/4">Cat</td>
                                            <td className="p-4 w-1/4">Fish</td>
                                            <td className="p-4 w-1/4">Birds</td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/4">Dogs</td>
                                            <td className="p-4 w-1/4">Cat</td>
                                            <td className="p-4 w-1/4">Fish</td>
                                            <td className="p-4 w-1/4">Birds</td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="p-4 w-1/4">Dogs</td>
                                            <td className="p-4 w-1/4">Cat</td>
                                            <td className="p-4 w-1/4">Fish</td>
                                            <td className="p-4 w-1/4">Birds</td>
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