import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fit Freak",
    short_name: "Fit Freak",
    description: "Your personal training, nutrition and progress tracker.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0d0b",
    theme_color: "#0a0d0b",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
