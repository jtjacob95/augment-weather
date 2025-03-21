import { cookies } from 'next/headers'

type LocationCookie = {
    value: string
    name: string
}

export  const getCookieData = async () =>{
    const cookieStore = await cookies()
    const locationData =cookieStore.has('locations') ? cookieStore.get('locations') as unknown as LocationCookie : null
    const parsedLocationData = locationData?.value ? JSON.parse(locationData.value) : []    
    return parsedLocationData
}
