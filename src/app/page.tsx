import styles from "./page.module.css";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import { AddButton } from "./components/AddButton/AddButton";
import { headers } from 'next/headers'
import { getCookieData } from "./utils/cookieHelper";
import { locationCoordinates } from "../../public/locationCoordinates";


export type Location = {
  name:string,
  lat:string,
  lon:string
}
export default async function Page() {

  const headersList = await headers()
  const homeCity = headersList.get('X-Vercel-IP-City') ?? "Misssouri City"
  const homeLat = headersList.get('x-vercel-ip-latitude') ?? "29.6186"
  const homeLon = headersList.get('x-vercel-ip-longitude') ?? "-95.5377"
  const homeLocation = {name:homeCity, lat:homeLat, lon:homeLon};

  const locationData = await getCookieData()
  const locationsToDisplay = locationData ? locationData.map((locDatum: string)=>(locationCoordinates.find(locCoordinates => locCoordinates.name === locDatum))): []
  locationsToDisplay.unshift(homeLocation)

  const validAddLocations =  locationCoordinates.filter(location => !locationData.includes(location.name)).map(location => location.name)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.cards}>
          {locationsToDisplay.map((location:Location, i:number)=>(
            <WeatherCard key={location?.name} location={location} showDelete={i!=0}/>
          ))}             
        </div>
        <div className={styles.addButton}>        
          <AddButton locations={validAddLocations}/>
        </div>
      </main>
    </div>
  );
}
