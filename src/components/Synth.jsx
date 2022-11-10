import React from 'react'
import { useState } from 'react';
import {Button, Grid} from '@mui/material';


export default function Synth({synth}) {
  const [oscType, setOscType]= useState(synth.oscillator.type)
  const [volLevel, setVolLevel]= useState(synth.volume.value)
  const [freqLevel, setFreqLevel]= useState(synth.frequency.value)
  const [detune, setDetune]= useState(synth.detune.value)

  const updateSynth=(e)=>{

    const {value}=e.target
    let prop = e.target.id
    if( prop==='oscillator'){
      synth[prop].type=value
        setOscType(value)

    }else{
      synth[prop].value=value
    }

    switch (prop) {
      case 'frequency':
        setFreqLevel(value)
        break;
      
      case 'volume':
        setVolLevel(value)
        break;
      
      case 'detune':
        setDetune(value)
        break;
      
      default:
        break;
    }
  }

  const start = async ()=>{
    await synth.triggerAttack(synth.frequency.value)
  }
  const stop = ()=>{
    synth.triggerRelease()
  }


  return (
    <Grid container direction='column'display='flex'>
      <select id='oscillator' value={oscType} onChange={(e)=>updateSynth(e)}>
        <option value='sine'> Sine</option>
        <option value='triangle'> Triangle</option>
        <option value='square'> Square</option>
        <option value='sawtooth'> Sawtooth</option>
      </select><Grid item>
      <h4>Volume</h4>
      <input value={volLevel} step={.1} min={'-60'} max={10}onChange={(e)=> updateSynth(e)} id='volume' type='range'/>
      <h4>Frequency</h4>
      <input value={freqLevel} step={1}max={600} onChange={(e)=> updateSynth(e)} id='frequency' type='range'/>
      <h4>Detune</h4>
      <input value={detune} step={.1} onChange={(e)=> updateSynth(e)} id='detune' type='range'/>
      </Grid>
      <Button style={{backgroundColor:'white', color:'black'}} onClick={start}>start</Button>
      <Button style={{backgroundColor:'white', color:'black'}} onClick={stop}>stop</Button>
    </Grid>
  )
}
