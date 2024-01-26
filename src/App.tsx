import { Route, Routes } from "react-router-dom"
import Step2 from "./pages/Step2"
import Step3 from "./pages/Step3"
import Result from "./pages/Result"
import CustomStep1 from "./pages/CustomStep1"


function App() {

  return (
    <>
      <header className=" mt-7 text-3xl text-primary text-center tracking-wider font-bold uppercase font-marker">
        The Ultimate Form
      </header>
      <Routes>
        <Route path='/' element={<CustomStep1 />} />
        <Route path='step2' element={<Step2 />} />
        <Route path='step3' element={<Step3 />} />
        <Route path='result' element={<Result />} />
      </Routes>
    </>
  )
}

export default App
