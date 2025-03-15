/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'placeholder.com',
      'placekitten.com',
      'placehold.co',
      'picsum.photos',
      'images.clerk.dev',
      'img.clerk.com',
      'loremflickr.com',
      'replicate.delivery',
      'replicate.com',
      'pbxt.replicate.delivery',
    ],
  },
  // Add other config as needed
};

export default nextConfig;
