"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from 'next-auth/react';

const Nav = () => {

    const { status } = useSession();


    return (
        <nav className="nav">
            <Link href="/" className="nav">
                <Image src="/assets/images/login.png" alt="logo" width={100} height={75} priority/>
            </Link>
            <div>
                {status === "authenticated" ? (
                    <div className="nav-item">
                        <Link href="/wallet/" className="button-17" >My wallet</Link>
                        <Link href="/history" className="button-17">History</Link>
                        <Link href="/fees" className="button-17">Current fees</Link>
                        <Link href="/logout" className="button-17">Sign out</Link>
                    </div>
                ): (<div className="nav-item">
                    <Image src="/assets/images/padlock.png" alt="padlock" width={50} height={50} priority/>
                    <h3>Not signed in</h3>
            </div>)}
            </div>
        </nav>
    )
}

export default Nav
