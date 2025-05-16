/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true,
  },
};
const [headline, setHeadline] = useState("Are you really in control?");
useEffect(() => {
  const headlines = [
    "Are you really in control?",
    "Master Your Masculine Energy",
    "Become the Man You Were Meant to Be",
  ];
  let index = 0;
  const interval = setInterval(() => {
    index = (index + 1) % headlines.length;
    setHeadline(headlines[index]);
  }, 4000);
  return () => clearInterval(interval);
}, []);

export default nextConfig;
