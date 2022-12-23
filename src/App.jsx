import './App.css'
import {  useEffect, useState } from 'react';
import Synth from './components/Synth'
import Master from './components/Master'
import Effect from './components/Effect'
import * as Tone from 'tone'
import { v4 as uuidv4 } from 'uuid';
import { Grid,Button } from '@mui/material';

function App() {
  const [masterGain, setMasterGain] = useState({})
  const [synthBank, setSynthBank]=useState([])
  const [volumeMixer, setVolumeMixer] = useState([])


  const newSynth =()=>{
    const synthBankCopy= [...synthBank]
    const mixerCopy = [...volumeMixer]
    const trackGain = new Tone.Gain(0).connect(masterGain)
    const synth = new Tone.Synth().connect(trackGain)
    synth.id = uuidv4()
    trackGain.id = uuidv4()
    trackGain.synth_id = synth.id
    synth.effectsRack=[]
    synth.power=false
    synth.volume.value='-60'
    synthBankCopy.push(synth)
    mixerCopy.push(trackGain)
    setSynthBank(synthBankCopy)
    setVolumeMixer(mixerCopy)
  }

  const deleteSynth=(e)=>{
    const synthBankCopy=[...synthBank];
    const mixerCopy=[...volumeMixer];
    synthBank[e.target.id].dispose()
    synthBankCopy.splice(e.target.id,1)
    mixerCopy[e.target.id].dispose()
    mixerCopy.splice(e.target.id,1)
    setSynthBank(synthBankCopy)
    setVolumeMixer(mixerCopy)
  }
const newInstrument= (v)=>{
    //depending on value, make new instrument
    console.log(v)
    switch (v){
      case 'newSynth': 
        newSynth()
        break
      case 'metalSynth':
        newMetalSynth()
        break
      default:
        break
    }
  }
  const addEffect=(e, id)=>{
    let synthBankCopy=[...synthBank];
    let foundSynth = synthBankCopy.find(synth=>{
      return synth.id===id;
    })
    
    let mixerCopy=[...volumeMixer];
    let foundTrack = mixerCopy.find(track=>{
      return track.synth_id===id;
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
    if(value==='chebyshev'){
      let chebyshev = new Tone.Chebyshev();
      chebyshev.wet.value=0
      chebyshev.id = uuidv4();
      chebyshev.synth_id=foundSynth.id;
      chebyshev.power = false
      foundSynth.effectsRack.push(chebyshev);
    }
    

    foundSynth.chain(...foundSynth.effectsRack, foundTrack)
    setSynthBank(synthBankCopy)
    
  }
  
  const handleTrackVolumeChange = (e) =>{
    let mixerCopy= [...volumeMixer]
    let foundTrack = mixerCopy.find(track=>{return track.id==e.target.id})
    foundTrack.gain.value= e.target.value
    setVolumeMixer(mixerCopy)
  }

  const deleteEffect = (event, synthId, effectId) => {
    let synthBankCopy=[...synthBank];
    let mixerCopy=[...volumeMixer];
    let foundSynth = synthBankCopy.find(synth=>synth.id===synthId)
    let foundTrack = mixerCopy.find(track=>track.synth_id===synthId)
    foundSynth.effectsRack = foundSynth.effectsRack.filter(option=>{
      option.disconnect()
      return option.id!==effectId
    })
    foundSynth.chain(...foundSynth.effectsRack, foundTrack, masterGain)
    setSynthBank(synthBankCopy)
  }

  useEffect(()=>{
    let initMaster = new Tone.Gain(0).toDestination()
    initMaster.id = uuidv4()
    setMasterGain(initMaster)
  }, [])
  
  const displayInstrument=(synth)=>{
      if(synth.name==='Synth'){
        return <Synth id={synth.id} synth={synth}/>
      }
  }


  return (
    <Grid container className="App">
        
      <Master id='header' gain={masterGain} newInstrument={newInstrument}/>
        
        {synthBank&&synthBank.length>0?(
        
          <Grid container className='synthBank' gap={2} >
            {synthBank.map((synth,i)=>{
              let trackVolume = volumeMixer.find((track)=> { return track.synth_id=== synth.id })

              return (
                <Grid key={`synth_${i}`} alignItems='center' container gap={2} item xs={12} className='synthRack'>
                  <Grid container gap={1} direction='column' xs={1} item className='synthBlock' key={synth.id} >
                    {displayInstrument(synth)}
                    <select  id='effect_selection' value='' onChange={e=>addEffect(e,synth.id)}>
                      <option value='' disabled hidden>Effects</option>
                      <option value='reverb'>Reverb</option>
                      <option value='distortion'>Distortion</option>
                      <option value='bitCrusher'>BitCrusher</option>
                      <option value='delay'>Delay</option>
                      <option value='chebyshev'>Chebyshev</option>
                    </select>
                    <Button variant='contained' color='error' onClick={e=>deleteSynth(e)} id={i} className='btn'>delete</Button>
                  </Grid>
                  <Grid item xs={1}> 
                  <input type='range' id={trackVolume.id} step={.01} min={0} max={10}className='slider' style={{rotate:'270deg'}} value = {trackVolume.gain.value} onChange={e=>handleTrackVolumeChange(e)}/>
                  </Grid>
                  <Grid item xs={2} className='visualizer'  textAlign='center'>
                    <p>placeholder for visualizer</p>
                  </Grid>
                  <Grid item xs={7} container className='effectsRack'>
                    <Grid item container gap={1} style={{width:'inherit', overflowX:'auto', flexWrap:'nowrap'}}>
                    {synth.effectsRack.length>0?(
                      synth.effectsRack.map((effect,i)=>{
                      return (
                          <Effect id={effect.id} effect={effect} synth={synth} deleteEffect={deleteEffect} placement={i} key={`effect_${i}`}/>
                      )  
                    })
                  ):(null)
                }
                  </Grid>
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