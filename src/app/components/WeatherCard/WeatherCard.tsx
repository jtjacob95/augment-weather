import { DeleteButton } from "../DeleteButton/DeleteButton";
import styles from "./WeatherCard.module.css";
import { Location } from "@/app/page";
import Image from "next/image";

export default async function WeatherCard({location, showDelete}:{location:Location, showDelete:boolean}) {

    const data = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&exclude=hourly,daily&units=imperial&appid=${process.env.OpenWeatherApiKey}`)
    const weatherData = await data.json()

    return (
        <div className={styles.card}>
            <h2 className={styles.city}>
                {location.name}
            </h2>
            <div className={styles.temp}>
                {weatherData.current.temp} &deg;F
            </div>
            <div className={styles.summary}>
                Feels like {weatherData.current.feels_like} &deg;F with {weatherData.current.weather[0].description}
            </div>
            <div className={styles.miniCardWrapper}>
                <div className={styles.miniCards}>
                    <Image  src="/humidity.svg" width={24} height={24} alt={"Humidity"} />  {weatherData.current.humidity}% 
                </div>
                <div className={styles.miniCards}>
                    <Image  src="/wind.svg" width={24} height={24} alt={"Humidity"} /> {weatherData.current.wind_speed} mph
                </div>
                <div className={styles.miniCards}>
                    <Image  src="/uvi.svg" width={24} height={24} alt={"Humidity"} /> {weatherData.current.uvi} uvi
                </div>
            </div>
            {showDelete && 
            <div className={styles.deleteButton}>       
                <DeleteButton location={location.name}/>
            </div>     
            }
        </div>
    )
  }