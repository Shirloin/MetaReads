import React from 'react'
import { AuthClient } from "@dfinity/auth-client";

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

    const handleLogin = async () => {
        const authClient = await AuthClient.create(defaultOptions.createOptions);

        if (await authClient.isAuthenticated()) {
            // handleAuthenticated(authClient);
            console.log("Logged IN!");

        }
        else {
            authClient.login(defaultOptions.loginOptions).then(async () => {
                console.log("Asdasd");

                // console.log("LOL");
            })

        }
    }

    const handleLogout = async () => {
        const authClient = await AuthClient.create(defaultOptions.createOptions);
        await authClient.logout();
    }

    return (
        <div>
            <button onClick={handleLogin}>Login using Internet Identity</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default LoginPage