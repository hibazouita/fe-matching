import { useContext, useState } from 'react'
import './style.css';
import FileItem from '../FileItem/FileItem';
import Retrain from '../retrain/Retrain';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dragDropIcon from './file-download.png'
import { Button } from 'react-md';
import  {multiStepContext } from '../../StepContext';
import { Viewer } from '@react-pdf-viewer/core'; // install this library

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
const FileUpload=()=>{
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const {setStep,userData,setUserData,files, setFiles,view, setView}=useContext(multiStepContext)
  //const [files, setFiles] = useState([])
  const fileType=['application/pdf'];
  const [pdfFileError, setPdfFileError]=useState('');
  const[nbFile,setNbFile]=useState(0)
  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    if(file){
      if(file&&fileType.includes(file.type)){
        file.isUploading = true;
        let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) =>{
              let f=e.target.result
              if (files.length<2){
                setFiles([...files, file])
                setView([...view,f])
                
                setPdfFileError('');
                
              }
              else{
                setPdfFileError('Maximum File 2');


              }
              
            }
      }
      else{
        setPdfFileError('Please select valid pdf file');
      }
    }
    else{
      console.log('select your file');
    }
    
  }
  const nextStep=()=>{
    if(files.length==2){
      setStep(2)

    }
    else{
      setPdfFileError('Select deux PDF 2');


    }
  }

  return (
    <div className="App">
      <>

                <div className="file-card">

                <div className="file-inputs">
                    <input type="file" onChange={uploadHandler} className="input-file" />
                    
                    <button className='btn-icon'>
                     
                            <img src={dragDropIcon} alt="icon" width={40} height={40}  />
                        
                    </button>                       
                </div>

                <p className="main">Supported files</p>
                <p className="info"> Only PDF</p>

            </div>

                

        </>
            

        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
   

        <>
        <Button  onClick={nextStep} > Next </Button>
        <br></br>
        <div className="file-list">
            {
                files &&
                files.map(f => (<FileItem
                    key={f.name}
                    file={f}
                    deleteFile={removeFile} />))
            }
           
        </div>
        <>
        {/* {
                view &&
                view.map(v => (
                   
                        <div className='pdf-container'>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                                <Viewer fileUrl={v}
                                       plugins={[defaultLayoutPluginInstance]} />
                            </Worker>
                        
                    </div>
                    )
                
                    )
            } */}
        </>
        </>
        <Retrain />
        
        
    </div>
  );
    

}
export default FileUpload;