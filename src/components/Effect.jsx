import React, {useState} from 'react'
import { Grid} from '@mui/material'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function Effect({effect, placement, synth}) {
  const [effectObj, setEffectObj] = useState({...effect});
  const props = effect.get()

  console.log('names!: ', effect.name)


    //effect node bypass
  // const togglePower=(e)=>{
  //   let effectCopy = {...effectObj}
  //   e.preventDefault()
  //   if(!effect.power){
  //     effect.power = true
  //     effectObj.power=true
  //     setEffectObj(effectCopy)
  //   }else{
  //     effect.power = false
  //     effectObj.power=false
  //     effect.wet.value=0
  //     effectObj.wet.value=0
  //     setEffectObj(effectCopy)
  //   }
  // }

  const editEffectSetting = (e)=>{
    const effectCopy= {...effectObj}
    const setting= e.target.id
    const {value} = e.target
    if (effect[setting].value!== undefined ) {
      effect[setting].value=value
      effectCopy[setting].value=value
    } else {
      effectCopy[setting]=value
      effect[setting]=value
      
    }
      setEffectObj(effectCopy)
    }
    const displayEffect = ()=>{ 
      let effectSettings = Object.entries(props).map(item=> {
        return item})

      return (

        <Grid item container sx={styles[effect.name]}textAlign='center' direction='column'>
          <Grid item> 
          {effect.name}
          </Grid>
          <Grid item>
            <PowerSettingsNewIcon  fontSize='large' className='pwr-btn' color={((effect.wet.value>0)?'success':'default')}/>
          </Grid>
          <Grid item direction='column' container>

          {effectSettings.map(( setting, i)=>{

            console.log(`checking ${setting[0]}`,effect[setting[0]]?.value? effect[setting[0]]?.value : effect[setting[0]] )
            if (setting[0] === 'maxDelay') {return null} 
            if (setting[0] === 'wet' || setting[0] === 'feedback' || setting[0] === 'delayTime' || setting[0] === 'roomSize'  ) {
              return( 
                <Grid item key={setting[0]}> 
                  <p>{setting[0]}: {effect[setting[0]].value} </p>
                  <input id={setting[0]} onChange={e=>editEffectSetting(e)} max={1} step={.01} value={effect[setting[0]].value} type='range' />
                </Grid>
              )
            }
            if (setting[0] === 'bits') {
              return( 
                <Grid item key={setting[0]}> 
                  <p>{setting[0]}: {effect[setting[0]].value} </p>
                  <input id={setting[0]} onChange={e=>editEffectSetting(e)} max={16} min={1} step={1} value={effect[setting[0]].value} type='range' />
                </Grid>
              )
            }
            if(setting[0]==='oversample'){
              return(
              <Grid item key={setting[0]}> 
                  {setting[0]}: 
              <select  className='effect_selection' id={setting[0]} value={effect[setting[0]]} onChange={e=>editEffectSetting(e)}>
                      <option value='none'>None</option>
                      <option value='2x'>2x</option>
                      <option value='4x'>4x</option>
                    </select>
              </Grid>)
              
            } 
            
              return(
              <Grid item key={setting[0]}> 
              <p>{setting[0]}: {effect[setting[0]]?.value? effect[setting[0]].value : effect[setting[0]]} </p>
              <input id={setting[0]} onChange={e=>editEffectSetting(e)} value={effect[setting[0]]?.value? effect[setting[0]]?.value : effect[setting[0]]} type='range' />
              </Grid>
              ) 
            })}
          </Grid>
        </Grid>
      )
    }

  return (
    <Grid className='effect' container>
{displayEffect()}
    </Grid>
  )
}


let styles = {
  Reverb: {
    backgroundColor:'red'
  },
  Distortion: {
    backgroundColor:'blue'
  },
  BitCrusher: {
    backgroundColor:'orange'
  },
  FeedbackDelay: {
    backgroundColor:'purple'
  },
}