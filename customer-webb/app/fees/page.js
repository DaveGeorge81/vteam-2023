"use client";
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";

import styles from '../table.module.css'


export default function Fees() {
    const { data, status } = useSession();
    const router = useRouter()

    const [cities, setCities] = useState([]);
    const [selected, setSelected] = useState(null);
    const [fees, setFees] = useState([]);
    const [showFees, setShowFees] = useState(false);

    useEffect(() => {
        if (status != 'authenticated') {
            router.push('/')
        }
        // Fetch all cities.
        const fetchCities = async () => {
            const res = await fetch(`back/api/v1/cities`)
            const data = await res.json()
            setCities(data)
            }
    fetchCities()
    if (selected != null) {
        const selectedCity = cities.filter((item) => item.name == selected).map(({id, name}) => ({id, name}));
        fetchFees(selectedCity)
    }
    }, [selected]) // eslint-disable-line react-hooks/exhaustive-deps


    // Fetch fees for selected city.
    const fetchFees = async (selectedCity) => {
        const res = await fetch(`back/api/v1/pricing/city/${selectedCity[0].id}`)
        const data = await res.json()
        setFees(data);
        setShowFees(true);
        }


    // Handler for updating selected city.
    const selectHandler = (event) => {
        setSelected(event.target.value)
    }

    if (!data) return <p><Link href="/"> Access denied... return to main page</Link></p>
    return (
        <main className={styles.main}>
        <h1>Current fees</h1>
        <select onChange={selectHandler}>
            <option key="blank_key" hidden value>Select city</option>
            {cities.map(item => (
                <option key={item.id} value={item.name}>{item.name}</option>
            ))}
        </select>
        {showFees && 
        <div className='fees'>
        <p>Start fee: {fees.start_fee}kr</p>
        <p>Minute fee: {fees.minute_fee}kr</p>
        <p>Extra fee*: {fees.extra_fee}kr</p>
        <p>Discount*: {fees.discount}kr</p>
        <p>* Extra fee is charged upon parking outside P-zone.
            Discount is given when renting bike outside P-zone and then parking within P-zone.</p>
        </div>
        }
        <div>
            <Image className='photo' src="/assets/images/scooter4.jpg" alt="man on scooter"
                width={1200} height={800} priority />
        </div>
        </main>
    )
}
