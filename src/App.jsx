import './App.css'
import { useState } from 'react';
import Synth from './components/Synth'
import Header from './components/Header'
import * as Tone from 'tone'
import { v4 as uuidv4 } from 'uuid';
import { Grid } from '@mui/material';

function App() {
  const [synthBank, setSynthBank]=useState([])
  const newSynth =()=>{
    const synthBankCopy= [...synthBank]
    const synth = new Tone.Synth().toDestination()
    synth.id= uuidv4()
    synth.volume.value='-60'
    synth.effectsRack=[]
    synthBankCopy.push(synth)
    setSynthBank(synthBankCopy)
  }
  const deleteSynth=(e)=>{
    const synthBankCopy=synthBank
     synthBank[e.target.id].disconnect()
     synthBankCopy.splice(e.target.id,1)
    setSynthBank([...synthBankCopy])
  }
  const addEffect=(e)=>{
    console.log(e)
  }

  return (
    <div className="App" >
      <Header newSynth={newSynth}/>
    {synthBank&&synthBank.length>0?(
      <Grid container direction='column'xs={1} paddingTop={8}>
        {synthBank.map((synth,i)=>{
          return (<>
            <Grid item key={`synth_${i}`} style={{display:'flex', flexDirection:'column',border:'1px solid white', backgroundColor:'#eee5'}}>
                <Synth id={synth.id} synth={synth}/>
                <div style={{display:'flex', justifyContent:'center'}}>
                  <button onClick={e=>deleteSynth(e)} id={i} style={{backgroundColor:'white', color:'black',height:'max-content'}}>delete</button>
                </div>
              </Grid>
              <select style={{width:'min-content'}}id='effect_selection' onChange={addEffect}>
                <option value='' disabled selected hidden>Effects</option>
                <option value='phase'>Phase</option>
              </select>
              {synth.effectsRack.length>0?(
                synth.effectsRack.map((effect,i)=>{
                    return 'hello'
                })
              ):'oops'
            }
            </> )
        })}
      </Grid>  
    ):(
      null
      )
    } 
    </div>
  )
}

export default App
