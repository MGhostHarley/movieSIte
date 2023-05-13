/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  env: {
    NEXT_PUBLIC_X_RapidAPI_Key:
      "972468e121msh1e3cfebd616a80fp117e96jsnd89436422823",
    NEXT_PUBLIC_X_RapidAPI_Host:
      "https://movie-database-alternative.p.rapidapi.com",
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com", "m.media-amazon.com"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
