import React,{useState} from "react";
import App from "./App";
export const multiStepContext = React.createContext();
const StepContext =()=>{
    const [currentStep,setStep]=useState(1)
    const [userData,setUserData]=useState([])
    const [finalData,setFinalData]=useState([])
    const [files, setFiles]=useState([])
    const [view, setView]=useState([])
    const[sommaire,setSommaire]=useState("")
    const [pdfFileError, setPdfFileError]=useState('');
    const [filePath,setFilePath]=useState({})
    return (
        <div>
            <multiStepContext.Provider value={{currentStep,setStep,userData,setUserData,finalData,setFinalData,files,setFiles,view, setView,sommaire,setSommaire,pdfFileError, setPdfFileError,filePath,setFilePath}}>
                <App/>
            </multiStepContext.Provider>
        </div>
    )
}
export default StepContext;