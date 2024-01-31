"use client";

import styles from './page.module.css'
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react'
import Image from "next/image";

export default function Home() {

  const { data, status } = useSession();
  const [users, setUsers] = useState([])
  const [loggedIn, setLoggedIn] = useState()

  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn'))

    // fetch all users from api.
    const fetchUsers = async () => {
      const res = await fetch('back/api/v1/users')
      const data = await res.json()
      setUsers(data)
    }
    fetchUsers()
  }, [])


  // Create a new user based on google-account.
  const createUser = async (user) => {
    await fetch(`back/api/v1/users`, {
        method: "POST",
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: new URLSearchParams({
          name: user.email,
          balance: 0,
          recurring_withdraw: 0
        })
        .toString()
    })
    .then((response) => {
        console.log(response.status)
        console.log(response)
        if (response.status === 201) {
          console.log(`user: ${user.email} created`)
          response.json()
          .then((data) => 
          localStorage.setItem('id', data.newId))
          console.log(localStorage.getItem('id'))
        } else {
          response.json()
          .then((data) => 
          console.log(data.message))
        throw new Error("An error has occurred");
        }
      })
}

  // When authenticated by google check if user is in database
  // otherwise create new user.
  const signInHandler = () => {
    const selected = users.filter((item) => item.name == data.user.email).map(({id, name}) => ({id, name}));
    if (selected[0] === undefined) {
      createUser(data.user)
      localStorage.setItem('loggedIn', true)
    }
    else {
      localStorage.setItem('id', selected[0].id)
      localStorage.setItem('loggedIn', true)
    }
  }

  // Sign out and clear local storage variables.
  const signOutHandler = () => {
    localStorage.clear()
    signOut()
  }

  if (status === 'loading') return <h1 className={styles.main}> loading... please wait</h1>
  if (status === 'authenticated') {
      if (loggedIn === null) {
        signInHandler()
      }
      return (
        <main className={styles.main}>
        <Image src="/assets/images/titel1.png" alt="logo" width={1200} height={300} priority />
        <Image src="/assets/images/logo1.png" alt="logo" width={600} height={300} priority />
          <h1> Welcome {data.user.name}!</h1>
          <div className='sign'><Image src="/assets/images/signout.png" alt="sign out button"
            width={175} height={40} onClick={signOutHandler} /></div>
          <div>
            <Image className='photo' src="/assets/images/scooter2.jpg" alt="girl on scooter"
              width={1200} height={800} priority />
          </div>
        </main>
      );
    }

  localStorage.clear()
  return (
    <main className={styles.main}>
      <Image src="/assets/images/titel1.png" alt="logo" width={1200} height={350} priority />
      <Image src="/assets/images/logo1.png" alt="logo" width={600} height={300} priority />
      <div className='sign'><Image src="/assets/images/signin.png" alt="sign in button"
        width={175} height={40} onClick={() => signIn('google')} /></div>
      <div>
          <Image className='photo' src="/assets/images/scooter2.jpg" alt="girl on scooter"
            width={1200} height={800} priority />
      </div>
    </main>
  );
}
