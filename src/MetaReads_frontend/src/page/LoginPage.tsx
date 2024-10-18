import React from 'react'
import { AuthClient } from "@dfinity/auth-client";
import MetaReadsLogo from "../../public/assets/Meta Reads Full Logo.png";
import { MetaReads_backend } from "../../../declarations/MetaReads_backend";
import { Principal } from '@dfinity/principal';

function LoginPage() {
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
                document.cookie = "identity=" + internetIdentityId.toString();
            }
        }
        else {
            authClient.login(defaultOptions.loginOptions).then(async () => {
                
            })
        }
    }

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <div className='w-[20vw] h-[10vw] text-white login-button'>
                <div onClick={handleLogin} className='flex flex-col w-full h-full items-center justify-center'>
                    <img src={MetaReadsLogo} alt="Full Logo" width={200} />
                    <div className='text-center'>Login using Internet Identity</div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage