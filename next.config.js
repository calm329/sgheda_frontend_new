/** @type {import('next').NextConfig} */

const { createSecureHeaders } = require("next-secure-headers");
const path = require("path");
const fs = require("fs");

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")]
    },
    images: {
        formats: ["image/avif", "image/webp"],
        domains: ["slinkyghxdesign.com"]
    },
    env: {
        siteTitle: "SGHEDA",
        siteDescription:
            "SGHEDA is a cutting-edge analytical tool designed to provide comprehensive design solutions and promote the adoption of Ground Source Heat Pump systems for sustainable and decarbonized heating and cooling solutions.",
        siteKeywords:
            "ground source heat pump design, slinky ground loop heat exchanger, shallow ground heat exchanger, geothermal heat pump design, heat pump simulation",
        siteUrl: "https://slinkyghxdesign.com",
        siteImagePreviewUrl: "/images/preview.png",
        twitterHandle: "@your_handle"
    },
    headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    ...createSecureHeaders(),
                    // HSTS Preload: https://hstspreload.org/
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload"
                    }
                ]
            }
        ];
    }
};

module.exports = nextConfig;
