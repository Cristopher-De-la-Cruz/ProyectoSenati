import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import DefaultPage from './components/DefaultPage'
import Clientes from './components/Clientes'
import Productos from './components/Productos'
import Proyectos from './components/Proyectos'
import Trabajadores from './components/Trabajadores'
import Contratos from './components/Contratos'
import Facturas from './components/Facturas'
import CronogramasDePago from './components/CronogramasDePago'
import Documentacion from './components/Documentacion'
import Cobranzas from './components/Cobranzas'
import AtencionAlCliente from './components/AtencionAlCliente'
import Calidad from './components/Calidad'
import RecursosHumanos from './components/RecursosHumanos'
import SeguridadLaboral from './components/SeguridadLaboral'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/default' element={<DefaultPage/>}/>
        {/* CRISTOPHER */}
        <Route path='/clientes' element={<Clientes/>}/>
        <Route path='/productos' element={<Productos/>}/>
        <Route path='/proyectos' element={<Proyectos/>}/>
        {/* JOSUE */}
        <Route path='/trabajadores' element={<Trabajadores/>}/>
        <Route path='/contratos' element={<Contratos/>}/>
        {/* LUIS */}
        <Route path='/facturas' element={<Facturas/>}/>
        <Route path='/cronogramas-de-pago' element={<CronogramasDePago/>}/>
        {/* FERNANDO */}
        <Route path='/documentacion' element={<Documentacion/>}/>
        <Route path='/cobranzas' element={<Cobranzas/>}/>
        {/* ADRIAN */}
        <Route path='/atencion-al-cliente' element={<AtencionAlCliente/>}/>
        <Route path='/calidad' element={<Calidad/>}/>
        {/* Ruth */}
        <Route path='/recursos-humanos' element={<RecursosHumanos/>}/>
        <Route path='/seguridad-laboral' element={<SeguridadLaboral/>}/>

      </Routes>
    </>
  )
}

export default App
