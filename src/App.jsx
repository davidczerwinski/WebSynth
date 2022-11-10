import './App.css'
import { useState } from 'react';
import Synth from './components/Synth'
import * as Tone from 'tone'
import { v4 as uuidv4 } from 'uuid';
// import Grid from '@mui/material/Grid';

function App() {
  const [synthBank, setSynthBank]=useState([])
  const newSynth =()=>{
    const synthBankCopy= [...synthBank]
    const synth = new Tone.Synth().toDestination()
    synth.id= uuidv4()
    synth.effectsRack=[]
    console.log('synth: ',synth)
    synthBankCopy.push(synth)
    setSynthBank(synthBankCopy)
  }

  const deleteSynth=(e)=>{
    console.log(e.target.id)
    const synthBankCopy=synthBank
     console.log(synthBankCopy)
     synthBank[e.target.id].disconnect()
     synthBankCopy.splice(e.target.id,1)
    setSynthBank([...synthBankCopy])
  }

  return (
    <div className="App">

<button onClick={newSynth} style={{backgroundColor:'white', color:'black'}}>New Synth</button>

    {synthBank&&synthBank.length>0?(
      <ul>
        {synthBank.map((synth,i)=>{
          return (
            <div style={{display:'flex'}}>
              <div>
                <Synth id={synth.id} synth={synth}/>
              </div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <button onClick={e=>deleteSynth(e)} id={i} style={{backgroundColor:'white', color:'black',height:'max-content'}}>delete</button>
                </div>
              </div>
              )
        })}
      </ul>  
    ):(
      null
      )
    } 
    </div>
  )
}

export default App
