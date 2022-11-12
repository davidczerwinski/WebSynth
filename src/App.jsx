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
    const synth = new Tone.Synth()
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


  const addEffect=(e, id)=>{
    let synthBankCopy=[...synthBank]
    const {value} = e.target
    console.log(id)
    if(!value){
      alert('no effect selected')
    }
    if(value==='reverb'){
      let reverb = new Tone.Reverb()
      let foundSynth = synthBankCopy.find(synth=>{
        console.log('synth in synthback: ',synth.id)
        console.log('id supplied: ',id)
        return synth.id==id
      })
      foundSynth.effectsRack.push(reverb)
      console.log('found: ',foundSynth)
      foundSynth.chain(reverb, Tone.Destination)
      setSynthBank(synthBankCopy)
    }
    
  }


console.log(synthBank)
  return (
    <Grid container className="App">
        
      <Header id='header' newSynth={newSynth}/>
        
        {synthBank&&synthBank.length>0?(
        
          <Grid container className='synthBank' gap={2} >
            {synthBank.map((synth,i)=>{
              return (
                <Grid key={`synth_${i}`} container gap={2} item xs={12} className='synthRack'>
                  <Grid container gap={1} direction='column' xs={1} item className='synthBlock' key={synth.id} >
                    <Synth id={synth.id} synth={synth}/>
                    <select  id='effect_selection' value='' onChange={e=>addEffect(e,synth.id)}>
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
                          <p>{effect.name}</p>
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
