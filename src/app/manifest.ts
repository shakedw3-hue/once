import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Once.",
    short_name: "Once",
    description: "Your path to a better life.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#FAFAFF",
    theme_color: "#4F46E5",
    orientation: "portrait",
    icons: [
      { src: "/icon?size=192", sizes: "192x192", type: "image/png" },
      { src: "/icon?size=512", sizes: "512x512", type: "image/png" },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
