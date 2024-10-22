import React, { useState } from 'react'
import { AuthClient } from "@dfinity/auth-client";
import MetaReadsLogo from "../../public/assets/Meta Reads Full Logo.png";
import { MetaReads_backend } from "../../../declarations/MetaReads_backend";
import { Principal } from '@dfinity/principal';
import { ToastError } from '../components/Form/Notifications/ErrorNotification';

function LoginPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const days = BigInt(1);
    const hours = BigInt(24);
    const nanoseconds = BigInt(3600000000000);
    const defaultOptions = {
        createOptions: {
            idleOptions: {
                disableIdle: true,
            },
        },
        loginOptions: {
            identityProvider: "https://identity.ic0.app/",
            maxTimeToLive: days * hours * nanoseconds,
        },
    };

    type Result<T, E> = 
    | { Ok: T }
    | { Err: E };

    function isError<T, E>(result: Result<T, E>): result is { Err: E } {
        return 'Err' in result;
    }

    const handleLogin = async () => {
        const authClient = await AuthClient.create(defaultOptions.createOptions);
        if (await authClient.isAuthenticated()) {
            const internetIdentityId = authClient.getIdentity().getPrincipal();
            const getUserById = await MetaReads_backend.get_user(internetIdentityId);
            if (isError(getUserById)) {
                window.location.href = "/register/" + internetIdentityId;
            }
            else {
                window.location.href = "/";
                document.cookie = `identity=${internetIdentityId}; path=/; expires=${new Date(Date.now() + 86400e3).toUTCString()}`;
            }
        }
        else {
            try {
                await authClient.login(defaultOptions.loginOptions);
                setLoggedIn(true);
            } catch (error) {
                ToastError("Login Error");
            }
        }
    }

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <div className='w-[20vw] h-[10vw] text-white login-button'>
                <div onClick={handleLogin} className='flex flex-col w-full h-full items-center justify-center'>
                    {
                        loggedIn ?
                        <div>Let's get into website. Click again</div> :
                        ""
                    }
                    <img src={MetaReadsLogo} alt="Full Logo" width={200} />
                    <div className='text-center'>Login using Internet Identity</div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage