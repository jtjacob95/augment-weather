'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { getCookieData } from './utils/cookieHelper'



export async function addLocation(location:string) {
    const cookieStore = await cookies()
    const locations = await getCookieData()

    locations.push(location)
    const newLocs = JSON.stringify(locations)
    cookieStore.set('locations', newLocs)
    
    revalidatePath("/")
}

export async function removeLocation(location:string) {
    const cookieStore = await cookies()
    const locations = await getCookieData()

    locations.splice(locations.indexOf(location), 1);
    const newLocs = JSON.stringify(locations)
    cookieStore.set('locations', newLocs)

    revalidatePath("/")
}
