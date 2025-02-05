import { Comprobante } from "./components/comprobante/comprobante"
import { Formulario } from "./components/formulario/formulario"
import { BrowserRouter, Routes,Route } from 'react-router-dom'

function App() {
  

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Formulario/>} />
    <Route path="/comprobante" element={<Comprobante />} />
   </Routes>
   
   </BrowserRouter>
     
  )
}

export default App
