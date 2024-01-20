"use client";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react';

export default function LogOut() {

    const { status } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (status === 'authenticated') {
            signOut()
        }
        if (status != 'authenticated') {
            router.push('/')
        }

    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return <h1>Signing out...</h1>
}
