"use client";
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import Link from "next/link";
import styles from '../page.module.css'
import Image from "next/image";

export default function Wallet() {

    const { data, status } = useSession();
    let userId = null
    const router = useRouter()

    const [userData, setUserData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [deposit, setDeposit] = useState(0)
    const [balance, setBalance] = useState(0)
    const [monthlyDeposit, setMonthlyDeposit] = useState(0)
    const [monthly, setMonthly] = useState(0)

    useEffect(() => {
        if (status != 'authenticated') {
            router.push('/')
        }
        // Fetch data for user.
        const fetchUser = async () => {
            const res = await fetch(`back/api/v1/users/${userId}`)
            const data = await res.json()
            setUserData(data)
            setLoading(false)
            setBalance(data.balance)
            setMonthlyDeposit(data.recurring_withdraw)
            }
    fetchUser()
    setLoading(false)
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

    // Add money to users balance.
    const addMoney = () => {
        fetch(`back/api/v1/users/withdraw`, {
            method: "PUT",
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: new URLSearchParams({
                id: userData.id,
                amount: -deposit
            })
            .toString()
        })
        .then((response) => {
            console.log(response.status)
            if (response.status === 200) {
            // console.log("ok")
            setBalance(balance + deposit)
            setDeposit(0)
            } else {
            // console.log("nein")
            throw new Error("An error has occurred");
            }
        })
    }

    // Add value to monthly deposit for user.
    const addMonthly = () => {
        fetch(`back/api/v1/users/`, {
            method: "PUT",
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: new URLSearchParams({
                id: userData.id,
                name: userData.name,
                balance: balance,
                recurring_withdraw: monthly
            })
            .toString()
        })
        .then((response) => {
            console.log(response.status)
            if (response.status === 200) {
            setMonthlyDeposit(monthly)
            setMonthly(0)
            } else {
            throw new Error("An error has occurred");
            }
        })
    }

    // Handler for updating deposit value.
    const depositHandler = (event) => {
        let value = parseInt(event.target.value)
        setDeposit(value)
    }

    // Handler for updating monthly deposit value.
    const monthlyHandler = (event) => {
        let value = parseInt(event.target.value)
        setMonthly(value)
    }

    if (!data) return <p><Link href="/"> Access denied... return to main page</Link></p>
    if (isLoading) return <p>Loading...</p>
    return (
        <main className={styles.main}>
        <h1>Welcome {data.user.name}</h1>
        <h2>Current balance: {balance.toFixed(2)}kr</h2>
        <h3>Add money: <input type="number" placeholder='0' value={deposit} min='0' onChange={depositHandler}></input>
            <button className='button-17' onClick={() => addMoney()}>Add</button></h3>
        <h3>Monthly balance deposit: </h3>
            <p>{monthlyDeposit}kr</p>
            <input type="number" placeholder='0' value={monthly} min='0' onChange={monthlyHandler}></input>
            <button className='button-17' onClick={() => addMonthly()}>Change</button>
        <div>
            <Image className='photo' src="/assets/images/scooter1.jpg" alt="girl on scooter" width={1200} height={800} priority />
        </div>
        </main>
    )
}
