"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation'

const Foot = () => {


    return (
        <a href="https://www.flaticon.com/free-icons/password" title="password icons">Password icons created by IYAHICON - Flaticon</a>
    )
}

export default Foot
