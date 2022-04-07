import React, { useState ,useContext} from 'react'
import './index.css';
import FileUpload from './components/fileUpload/fileUpload';
import MatchingDoc from './components/Matching-doc/Matching-doc';
import Step3 from './components/step3/step3';
import {Stepper ,StepLabel,Step} from '@material-ui/core';
import {multiStepContext} from "./StepContext"
function App() {
  const {currentStep,finalData}= useContext(multiStepContext)
  const showStep=(step)=>{
    switch(step){
      case 1: 
      return <FileUpload/>
      case 2: 
      return <MatchingDoc/>
      case 3 : 
      return <Step3/>
    }

  }
  return(
    <div className='App' >
    <div className='center-stepper'>
      <Stepper style={{width:'100%'}} activeStep={currentStep-1} orientation="horizontal">
       <Step>
         <StepLabel> </StepLabel>
       </Step>
       <Step>
         <StepLabel></StepLabel>
       </Step>
       <Step>
         <StepLabel></StepLabel>
       </Step>
      </Stepper>
        {showStep(currentStep)}
      </div>    
    

  </div>
  )
}

export default App;
