import './App.css'
import {  useEffect, useState } from 'react';
import Synth from './components/Synth'
import Master from './components/Master'
import Effect from './components/Effect'
import * as Tone from 'tone'
import { v4 as uuidv4 } from 'uuid';
import { Grid,Button } from '@mui/material';

function App() {
  const [gain, setGain] = useState({})
  const [synthBank, setSynthBank]=useState([])

  const newSynth =()=>{
    const synthBankCopy= [...synthBank]
    const synth = new Tone.Synth()
    synth.id= uuidv4()
    synth.effectsRack=[]
    synth.power=false
    synth.volume.value='-60'
    synth.chain(gain)
    synthBankCopy.push(synth)
    setSynthBank(synthBankCopy)
  }
  const deleteSynth=(e)=>{
    const synthBankCopy=[...synthBank];
    synthBank[e.target.id].dispose()
    synthBankCopy.splice(e.target.id,1)
    setSynthBank(synthBankCopy)
  }

  const addEffect=(e, id)=>{
    let synthBankCopy=[...synthBank];
    let foundSynth = synthBankCopy.find(synth=>{
      return synth.id===id;
    })
    const {value} = e.target;
    if(!value){
      alert('no effect selected');
    }
    if(value==='reverb'){
      let reverb = new Tone.Reverb();
      reverb.wet.value=0
      reverb.id = uuidv4();
      reverb.synth_id=foundSynth.id;
      reverb.power = false
      foundSynth.effectsRack.push(reverb);
      setSynthBank(synthBankCopy);
    }

    if(value==='distortion'){
      let distortion = new Tone.Distortion();
      distortion.wet.value=0
      distortion.id = uuidv4();
      distortion.synth_id=foundSynth.id;
      distortion.power = false
      foundSynth.effectsRack.push(distortion);
    }
    
    if(value==='bitCrusher'){
      let crusher = new Tone.BitCrusher();
      crusher.wet.value=0
      crusher.id = uuidv4();
      crusher.synth_id=foundSynth.id;
      crusher.power = false
      foundSynth.effectsRack.push(crusher);
    }
    if(value==='delay'){
      let delay = new Tone.FeedbackDelay();
      delay.wet.value=0
      delay.id = uuidv4();
      delay.synth_id=foundSynth.id;
      delay.power = false
      foundSynth.effectsRack.push(delay);
    }
    
    foundSynth.chain(...foundSynth.effectsRack, gain);
    setSynthBank(synthBankCopy);
    
  }

  useEffect(()=>{
    setGain(new Tone.Gain(0).toDestination())
  }, [])

  console.log(synthBank)
  return (
    <Grid container className="App">
        
      <Master id='header' gain={gain} setGain={setGain} newSynth={newSynth}/>
        
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
                      <option value='distortion'>Distortion</option>
                      <option value='bitCrusher'>BitCrusher</option>
                      <option value='delay'>Delay</option>
                    </select>
                    <Button variant='contained' color='error' onClick={e=>deleteSynth(e)} id={i} className='btn'>delete</Button>
                  </Grid>
                  <Grid item xs={2} className='visualizer'>
                    <p>placeholder for visualizer</p>
                  </Grid>
                  <Grid item xs={8} container alignContent='center' className='effectsRack'>
                    {synth.effectsRack.length>0?(
                      synth.effectsRack.map((effect,i)=>{
                      return (
                        <Grid item> 
                          <Effect id={effect.id} effect={effect} synth={synth} placement={i} key={`effect_${i}`}/>
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
