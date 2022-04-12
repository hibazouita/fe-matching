import * as React from 'react';
import { Axios } from 'axios';
import { useContext, useState } from 'react'
import './style.css';
import FileItem from '../FileItem/FileItem';
import Upload from '../upload/Upload';
import Retrain from '../retrain/Retrain';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dragDropIcon from './file-download.png'
import { Button } from 'react-bootstrap';
//import { Button } from 'react-md';
import  {multiStepContext } from '../../StepContext';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
import "bootstrap/dist/css/bootstrap.css";
//import { TextField } from '@material-ui/core';
import Grid from '@mui/material/Grid';

import { TextField} from '@mui/material';
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import { Box } from '@material-ui/core';
import { Col,Row ,Container } from 'react-bootstrap';
const FileUpload=()=>{
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const {setStep,userData,setUserData,files, setFiles,view, setView,sommaire,setSommaire,pdfFileError, setPdfFileError}=useContext(multiStepContext)
  //const [files, setFiles] = useState([])
  //let {PythonShell}=require(python-shell)
  // let options ={
  //   scriptPath : "./",
  //   args :[files[0],files[1]]
  // };
  // const requestScript=()=>{
  //   PythonShell.run("compare.py",options,(err,res)=>{
  //    if (res) console.log(res);
  //   })
  // }

  const fileType=['application/pdf'];
  const[nbFile,setNbFile]=useState(0)
  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))

  }
  const handleSommaire=(e)=>{
    setSommaire(e.target.result)
  }
 
  const nextStep=()=>{
    if(files.length==2){
      // Axios.post('url',
      // {files}
      // )
      // .then(res=>{
      //   console.log(res);
      // })

      setStep(2)

    }
    else{
      setPdfFileError('Select deux PDF 2');


    }
  }

  return (
    <div className="App">
    
                 <div> <Box> <TextField label="Enter le sommaire"  name="Enter le sommaire" className='input-sommaire' value={sommaire} onChange={handleSommaire}/></Box> </div>
                 <Grid container  rowSpacing={2} columnSpacing={3}>
                    <Grid item md={6}>
                          <Upload/>
                    </Grid>
                 <Grid item md={6}>
                             <Upload/>
                     </Grid>
                   </Grid>

      
            

        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
   

        <>
        <Button  onClick={nextStep} > Next </Button>
        <Button >testtt</Button>
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
      
        
    </div>
  );
    

}
export default FileUpload;