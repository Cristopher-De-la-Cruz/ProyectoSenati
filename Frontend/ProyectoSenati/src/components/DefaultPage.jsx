import SideBar from "./Layout/SideBar"
import NavBar from "./Layout/NavBar"
import './Default.css'

function DefaultPage(){
    return (
        <>
        <div style={{ display: 'flex' }}>
                <SideBar/>
                <div className="nav-width-default">
                    <div className="">
                        <NavBar/>
                        <div className="Content-page"> 
                            <div className="w-95-percent p-a-10 m-a-20">
                            
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </>
    )
}
export default DefaultPage