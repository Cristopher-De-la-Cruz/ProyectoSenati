import SideBar from "./SideBar"
import NavBar from "./NavBar"

function SideNavBar(){
    return (
        <>
            <div style={{ display: 'flex' }}>
                <SideBar/>
                <NavBar/>
            </div>
        </>
    )
}

export default SideNavBar