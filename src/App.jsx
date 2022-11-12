import './App.css'
import { useState } from 'react';
import Synth from './components/Synth'
import Header from './components/Header'
import * as Tone from 'tone'
import { v4 as uuidv4 } from 'uuid';
import { Grid,Button } from '@mui/material';

function App() {
  const [synthBank, setSynthBank]=useState([])
  const newSynth =()=>{
    const synthBankCopy= [...synthBank]
    const synth = new Tone.Synth().toDestination()
    // const tremolo = new Tone.Tremolo(9, 0.75).toDestination().start();
    // synth.connect(tremolo)
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
    // console.log(synth.id)
    console.log(e)
    const {value} = e.target
    if(!value){
      alert('no effect selected')
    }
    if(value==='reverb'){

    }
  }

  return (
    <Grid container className="App">
        
      <Header id='header' newSynth={newSynth}/>
        
        {synthBank&&synthBank.length>0?(
        
          <Grid container className='synthBank' gap={2} >
            {synthBank.map((synth,i)=>{
              return (
                <Grid key={synth.id} container gap={2} item xs={12} className='synthRack'>
                  <Grid container gap={1} direction='column' xs={1} item className='synthBlock' key={`synth_${i}`} >
                    <Synth id={synth.id} synth={synth}/>
                    <select  id='effect_selection' defaultValue='' onChange={e=>addEffect(e)}>
                      <option value='' disabled hidden>Effects</option>
                      <option value='reverb'>Reverb</option>
                    </select>
                    <Button variant='contained' color='error' onClick={e=>deleteSynth(e)} id={i} className='btn'>delete</Button>
                  </Grid>
                  <Grid item xs={2} className='visualizer'>
                    <p>placeholder for visualizer</p>
                  </Grid>
                  <Grid container item xs={8} className='effectsRack'>
                    {synth.effectsRack.length>0?(
                      synth.effectsRack.map((effect,i)=>{
                      return (
                        <Grid item>
                          <p>placeholder</p>
                        </Grid>
                      )  
                    })
                  ):(null)
              }
                  </Grid>
                </Grid>     
              )
          })}
          </Grid>

    ):(
      null
      )
    } 
    </Grid>
  )
}

export default App
