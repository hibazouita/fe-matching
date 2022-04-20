import * as React from 'react';
import { useContext, useState, useRef, useEffect } from 'react'
import WebViewer from '@pdftron/webviewer';

import { Worker } from '@react-pdf-viewer/core'; // install this library
import { Viewer } from '@react-pdf-viewer/core'; // install this library

import './style.css';
import FileItem from '../FileItem/FileItem';
import Upload from '../upload/Upload';
import { Button } from 'react-bootstrap';
//import { Button } from 'react-md';
import  {multiStepContext } from '../../StepContext';
import "bootstrap/dist/css/bootstrap.css";
//import { TextField } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { TextField} from '@mui/material';
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Box } from '@material-ui/core';
const FileUpload=()=>{
  
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const {setStep,userData,setUserData,files, setFiles,view, setView,sommaire,setSommaire,pdfFileError, setPdfFileError,filePath,setFilePath}=useContext(multiStepContext)
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
//startt
const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    WebViewer(
      {
        path: 'lib',
        initialDoc: '/files/AKWEL1.pdf',
      },
      viewer.current,
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;

      documentViewer.addEventListener('documentLoaded', () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          // values are in page coordinates with (0, 0) in the top left
          X: 100,
          Y: 150,
          Width: 200,
          Height: 50,
          Author: annotationManager.getCurrentUser()
        });

        annotationManager.addAnnotation(rectangleAnnot);
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        annotationManager.redrawAnnotation(rectangleAnnot);
      });
    });
  }, []);
//end
  const fileType=['application/pdf'];
  const[test,setTest]=useState(); 
  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))

  }
  const handleSommaire=(e)=>{
    setSommaire(e.target.result)
  }
 
  const nextStep=()=>{
    if(files.length==2){
      setStep(2)

    const formData = new FormData();
    console.log(files)
    formData.append('file1', files[0]);
    formData.append('file2', files[1]);

      axios.post('http://localhost:3000/uploadfile',formData
     
       )
       .then(res=>{
         console.log(res);
         const {filePath1,filePath2}=res.data
         console.log(res.data);
         setFilePath({filePath1,filePath2})
       }).catch(err=>{
        console.log(err);

       })


    }
    else{
      setPdfFileError('Select deux PDF 2');


    }
  }
   
  

  return (
    <div className="App">
    
                 <div> <Box> 
                 
                   <TextField label="Enter le sommaire"  name="Enter le sommaire" className='input-sommaire' value={sommaire} onChange={handleSommaire}/></Box> </div>
                  
                 <Grid container  rowSpacing={2} columnSpacing={3}>
                    <Grid item md={6}>
                   
                          <Upload inputnama="file1"/>
                    </Grid>
                 <Grid item md={6}>
                             <Upload inputnama="file2"/>
                     </Grid>

                   </Grid>
                   {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
   
        <Button onClick={nextStep}> Next </Button>
      
            

        


        <>

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
        <div className="webviewer" ref={viewer}></div>




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