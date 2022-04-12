import  {multiStepContext } from '../../StepContext';
import { useContext } from 'react'
import { Button } from 'react-md';
import Grid from '@mui/material/Grid';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

const MatchingDoc=()=>{
const {setStep,userData,setUserData,files, setFiles,view,setView}=useContext(multiStepContext)
const defaultLayoutPluginInstance = defaultLayoutPlugin();
const returnFile=()=>{
    setStep(1)
    setFiles(...files)
}
    return(
        <div className='pdf-center'>

          {
                view && 
                view.map(v => (
                   
                   <div  className='pdf-container' >
                       <Grid container  rowSpacing={2} columnSpacing={3}>
                       <Grid item md={6}>
                       <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                           <Viewer fileUrl={v}
                                  plugins={[defaultLayoutPluginInstance]} />
                       </Worker> 
                        </Grid>
                       
                       
               </Grid>
               </div>
               )
           
               )
                
                
            }

        MATCHING DOC
        <br></br>
        <Button onClick={()=>setStep(1)} >Previous</Button>
        <Button onClick={()=>setStep(3) }>Next</Button>

        </div>
    )
}
export default MatchingDoc