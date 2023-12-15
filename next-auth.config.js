export default {
    providers: [
        {
            id: "google",
            name: "Google",
            type: "oauth",
            version: "2.0",
            scope: "email profile",
            params: { grant_type: "authorization_code" },
            accessTokenUrl: "https://accounts.google.com/o/oauth2/token",
            requestTokenUrl:
                "https://accounts.google.com/o/oauth2/auth?response_type=code",
            authorizationUrl:
                "https://accounts.google.com/o/oauth2/auth?response_type=code",
            profileUrl:
                "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
            async signIn(options, redirectTo) {
                const width = 500; // Set the desired width of the small window
                const height = 600; // Set the desired height of the small window

                const url = new URL(options.authorizationUrl);
                url.searchParams.append("client_id", options.clientId);
                url.searchParams.append("redirect_uri", options.redirectUri);
                url.searchParams.append("scope", options.scope);
                url.searchParams.append("response_type", "code");
                url.searchParams.append("state", options.state);

                const popup = window.open(
                    url.toString(),
                    "Google Login",
                    `width=${width}, height=${height}`
                );
                const result = await new Promise((resolve) => {
                    const listener = (event) => {
                        if (
                            event.data.provider === "google" &&
                            event.data.type === "authorization_response"
                        ) {
                            resolve(event.data);
                            window.removeEventListener("message", listener);
                            popup.close();
                        }
                    };
                    window.addEventListener("message", listener);
                });

                return result;
            },
            ...otherProviderConfigurations
        }
        // Other providers
    ]
    // Other NextAuth.js configurations
};
