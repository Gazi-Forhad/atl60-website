"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

/** Let Unsplash's own CDN resize/compress (fast, no server work). */
const unsplashLoader = ({ src, width, quality }: ImageLoaderProps) =>
  `${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 70}`;

/**
 * next/image wrapper. Placeholder Unsplash photos use their CDN loader.
 * Everything else (client uploads in /public, CMS images) uses Next's optimiser.
 */
export function Img(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const isUnsplash = src.startsWith("https://images.unsplash.com/");
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps and passed through
  return <Image {...props} loader={isUnsplash ? unsplashLoader : props.loader} />;
}
