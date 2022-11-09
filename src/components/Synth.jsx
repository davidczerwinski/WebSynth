import React from 'react'
import { useState } from 'react';


export default function Synth({synth}) {
  const [volLevel, setVolLevel]= useState('-20')
  const [freqLevel, setFreqLevel]= useState(synth.frequency.value)
  const [detune, setDetune]= useState(synth.detune.value)


  const updateSynth=(e)=>{

    const {value}=e.target
    let prop = e.target.id
    synth[prop].value=value
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
    <div style={{display:'flex'}}>
      <div>
      <h4>Volume</h4>
      <input value={volLevel} step={.1} min={`-20`} max={20} onChange={(e)=> updateSynth(e)} id='volume' type='range'/>
      <h4>Frequency</h4>
      <input value={freqLevel} step={1}max={2500} onChange={(e)=> updateSynth(e)} id='frequency' type='range'/>
      <h4>Detune</h4>
      <input value={detune} step={.1} onChange={(e)=> updateSynth(e)} id='detune' type='range'/>
      </div>
      <button style={{backgroundColor:'white', color:'black'}} onClick={start}>start</button>
      <button style={{backgroundColor:'white', color:'black'}} onClick={stop}>stop</button>
    </div>
  )
}
