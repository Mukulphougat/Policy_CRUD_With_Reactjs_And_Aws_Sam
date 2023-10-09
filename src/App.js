import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import TablePage from "./components/TablePage";
import CreatePolicyPage from "./components/CreatePolicyPage";
import {ToastContainer} from "react-toast";
// import EditPolicyPage from "./components/EditPolicyPage";

function App() {
  return(
      <BrowserRouter>
          <ToastContainer/>
          <Header/>
          <Routes>
              <Route path={"/"} element={<TablePage/>}/>
              <Route path={"/createPolicy"} element={<CreatePolicyPage/>} />
              {/*<Route path={"/editPolicy"} element={<EditPolicyPage/>} />*/}
          </Routes>
      </BrowserRouter>
  )
}

export default App;
