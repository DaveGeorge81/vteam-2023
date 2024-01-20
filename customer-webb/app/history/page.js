"use client";
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import Link from "next/link";
import styles from '../table.module.css'

export default function History() {
    const { data, status } = useSession();
    let userId = null
    const router = useRouter()

    const [history, setHistory] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (status != 'authenticated') {
            router.push('/')
        }
        // Fetch history for user.
        const fetchHistory = async () => {
            const res = await fetch(`back/api/v1/rides/user/${userId}`)
            const data = await res.json()
            setHistory(data)
            setLoading(false)
            }
        fetchHistory()
    }, [userId]) // eslint-disable-line react-hooks/exhaustive-deps

    // Check if user id is in local storage, otherwise
    // deny access to page.
    if (typeof window !== 'undefined') {
        try {
        userId = localStorage.getItem('id').toString()
        } catch (error) {
            return <p><Link href="/"> Access denied... return to main page</Link></p>
        }
    }

    if (!data) return <p><Link href="/"> Access denied... return to main page</Link></p>
    if (isLoading) return <p>Loading...</p>
    return (
        <main className={styles.main}>
        <h1>Rent history</h1>
        <ul className="responsive-table">
            <li className="table-header">
                <div className="col col-1">Start time:</div>
                <div className="col col-2">Start coordinates: (lat:lon)</div>
                <div className="col col-3">End coordinates: (lat:lon)</div>
                <div className="col col-4">Duration:</div>
                <div className="col col-5">Bike id:</div>
                <div className="col col-6">Cost:</div>
            </li>
            {history.map((bike) => {
                return (
                    <li className="table-row" key={bike.id}>
                        <div className="col col-1">{bike.start_time}</div>
                        <div className="col col-2">{bike.start_lat} : {bike.start_lon}</div>
                        <div className="col col-3">{bike.stop_lat} : {bike.stop_lon}</div>
                        <div className="col col-4">{bike.duration}min</div>
                        <div className="col col-5">{bike.bike_id}</div>
                        <div className="col col-6">{bike.price.toFixed(2)}kr</div>
                    </li>)
            })}
        </ul>
        </main>
    )
}
