'use client'
import { addLocation } from '../../actions'
import {useState} from 'react'
import style from './AddButton.module.css'

export const AddButton = ({locations}:{locations:Array<string>}) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClick= (locationName:string) => {
    setDialogOpen(false)
    const addLocationWithName = addLocation.bind(null,locationName)
    addLocationWithName();
  }
  
  return (
    <div>
      <button className={style.addButton} onClick={() => setDialogOpen(!dialogOpen)}>Add Location</button>
      {dialogOpen && 
        <div className={style.dialog}>
          {locations.map((location)=>(
            <div key={location} onClick={()=>handleClick(location)}>
              {location}
            </div>
          ))}
        </div>
      }
    </div>
  )
}
