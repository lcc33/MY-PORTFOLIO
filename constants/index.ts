import aZ from "../app/assets/a-z.png";
import blindspot from "../app/assets/blindspot.png";
import shinigami from "../app/assets/shinigami.png";
import tracevault from "../app/assets/tracevault.png";
import veritas from "../app/assets/veritas.png";
import zenoai from "../app/assets/zeno.png";
import buymebread from "../app/assets/bmb.png";
import diamondpark from "../app/assets/diamond.png";
import code from "../app/assets/code.png";
import cmn from "../app/assets/cmn.png";
import helious from "../app/assets/helious.png";


const projects = [
  {
    id: "zenoai",
    name: "ZenoAI",
    status: "In Development",
    description: "ZenoAI is an AI-powered productivity and automation platform built under Very Unreal. It integrates intelligent task management, model interaction, and real-time collaboration — designed to help users and developers work smarter and faster.",
    vision: "ZenoAI aims to become an intelligent workspace assistant for startups and builders — automating tasks, understanding goals, and collaborating in real time.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "tailwindcss", color: "green-text-gradient" },
      { name: "postgresql", color: "pink-text-gradient" },
    ],
    image: zenoai,
    source_code_link: "https://zenoai-ten.vercel.app/",
  },
  {
    id: "helious",
    name: "Helious",
    status: "Live",
    description: "Helious is an AI-powered smart contract analyzer and on-chain guardian. Paste any contract address to get instant safety scoring, risk assessment, and plain English breakdown before signing.",
    vision: "To make Web3 safer by helping users and dApps detect risky smart contracts using AI + on-chain intelligence.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "tailwindcss", color: "green-text-gradient" },
      { name: "typescript", color: "pink-text-gradient" },
      { name: "ai", color: "orange-text-gradient" },        // optional
      { name: "web3", color: "purple-text-gradient" },      // optional
    ],
    image: helious,
    source_code_link: "https://heliouss.vercel.app",
  },
  {
    id: "challengemenow",
    name: "ChallengeMeNow",
    status: "Live",
    description: "ChallengeMeNow is a timed skill-assessment platform that lets users prove their real knowledge in various tech skills through real-world challenges under time pressure. Features granular scoring, weak area detection, and progress tracking.",
    vision: "To eliminate guesswork about skill levels by providing honest, measurable proof of proficiency for developers, teams, and organizations.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "typescript", color: "green-text-gradient" },
      { name: "tailwindcss", color: "pink-text-gradient" },
    ],
    image: cmn,
    source_code_link: "https://challengemenow-one.vercel.app",
  },
  {
    id: "tracevault",
    name: "TraceVault",
    status: "MVP",
    description: "TraceVault is an open-source lost and found platform designed for campuses and communities. It allows users to report, search, and claim lost items seamlessly while building a trusted community of contributors.",
    vision: "The goal is for TraceVault to live beyond me — a true open-source platform where communities can customize and deploy their own lost-and-found systems.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "mongodb", color: "green-text-gradient" },
      { name: "cloudinary", color: "pink-text-gradient" },
    ],
    image: tracevault,
    source_code_link: "https://tracevault.xyz",
  },
  // ... rest of your projects remain the same
  {
    id: "buymebread",
    name: "BuyMeBread",
    status: "In Development",
    description: "BuyMeBread is a simple creator support platform under Kindra that allows fans to support their favorite creators directly through micro-donations. It focuses on simplicity, transparency, and meaningful connections.",
    vision: "BuyMeBread aims to become a frictionless creator economy layer where fans can support with intent, and creators can grow communities without burnout.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "tailwind", color: "green-text-gradient" },
      { name: "nestjs", color: "pink-text-gradient" },
    ],
    image: buymebread,
    source_code_link: "https://buymebread.vercel.app/",
  },
  {
    id: "a-zpetstore",
    name: "A-Z Pet Store",
    status: "Completed",
    description: "A-Z Pet Store is an e-commerce website that offers a wide range of pet products and accessories. The platform provides a user-friendly interface for browsing, searching, and purchasing items for various types of pets.",
    vision: "To streamline the pet care shopping experience through an intuitive, high-performance interface that prioritizes accessibility and product discovery.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Tailwind CSS", color: "green-text-gradient" },
      { name: "TypeScript", color: "pink-text-gradient" },
    ],
    image: aZ,
    source_code_link: "https://a-z-pet-store.vercel.app/",
  },
  {
    id: "codenohero",
    name: "Code No Hero",
    status: "Completed",
    description: "Code no Hero is an anime-themed website that teaches HTML, CSS, and JavaScript to beginners. It makes learning web development fun and interactive by using characters, animations, and storytelling.",
    vision: "To gamify the learning experience for young developers, using the power of anime and storytelling to make technical education engaging and memorable.",
    tags: [
      { name: "javascript", color: "blue-text-gradient" },
      { name: "Firebase", color: "green-text-gradient" },
      { name: "css", color: "pink-text-gradient" },
    ],
    image: code,
    source_code_link: "https://codenohero.vercel.app",
  },
  {
    id: "veritas",
    name: "Veritas",
    status: "In Development",
    description: "Veritas is a platform that combats misinformation by providing transparent, evidence-based claim verification. Unlike black-box fact-checkers, we show sources and reasoning behind every verdict.",
    vision: "Veritas envisions a more informed digital society where transparency and evidence-based logic serve as the primary defenses against digital misinformation.",
    tags: [
      { name: "typescript", color: "blue-text-gradient" },
      { name: "nestjs", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: veritas,
    source_code_link: "https://veritas-beryl.vercel.app/",
  },
  {
    id: "diamondpark",
    name: "Diamond Park Ilorin",
    status: "Completed",
    description: "Diamond Park Ilorin stands as the premier recreational and event destination in Ilorin, Kwara State, Nigeria. The park offers a unique blend of natural beauty and modern amenities for families and groups.",
    vision: "To digitally capture the essence of a physical destination, creating an online gateway that reflects the beauty and modern hospitality of Diamond Park.",
    tags: [
      { name: "firebase", color: "blue-text-gradient" },
      { name: "css", color: "green-text-gradient" },
      { name: "javascript", color: "pink-text-gradient" },
    ],
    image: diamondpark,
    source_code_link: "https://diamond-park-ilorin.vercel.app/",
  },
  {
    id: "boredshinigami",
    name: "Bored Shinigami NFTs",
    status: "Completed",
    description: "Bored Shinigamiz is the first collection of 11,111 unique 3D anime-inspired NFTs living on the Solana blockchain. Each Shinigami is hand-crafted with over 250+ traits.",
    vision: "To build the strongest community and digital identity framework around anime NFTs, merging art and blockchain technology into a unique cultural experience.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "tailwind", color: "green-text-gradient" },
      { name: "web3", color: "pink-text-gradient" },
    ],
    image: shinigami,
    source_code_link: "https://bored-shinigami.vercel.app/",
  },
  {
    id: "blindspot",
    name: "Blindspot",
    status: "In Development",
    description: "BlindSpot is a lightweight, privacy-first desktop app that helps users instantly hide sensitive information with blackout or blur overlays during screen sharing sessions.",
    vision: "Blindspot aims to provide ultimate peace of mind for streamers and professionals, ensuring that privacy is only a single click away in any live digital environment.",
    tags: [
      { name: "rust & tauri", color: "blue-text-gradient" },
      { name: "reactjs", color: "green-text-gradient" },
      { name: "typescript", color: "pink-text-gradient" },
    ],
    image: blindspot,
    source_code_link: "https://blindspot-eta.vercel.app/",
  },
];

export { projects };