'use client'
 
import { removeLocation } from '../../actions'
import styles from "./DeleteButton.module.css";

export const DeleteButton = ({location}:{location:string}) => {
  const removeLocationWithName = removeLocation.bind(null,location)

  return <button className={styles.deleteButton} onClick={() => removeLocationWithName()}>x</button>
}
