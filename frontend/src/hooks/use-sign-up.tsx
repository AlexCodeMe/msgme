import React, { useState } from 'react'
import { useAuthContext } from '../context/auth-context'
import toast from 'react-hot-toast'

type RegisterInputs = {
    fullName: string
    username: string
    password: string
    confirmPassword: string
    gender: string
}

export default function useSignUp() {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    async function signup(inputs: RegisterInputs) {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);
            setAuthUser(data);
        } catch (error: any) {
            console.log('useSignUp_signup', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, signup }
}