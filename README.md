# 🌍 Globetrotter

A fun and engaging travel quiz web application where users guess destinations based on cryptic clues!

## 🚀 Features

- 100+ destinations with unique clues and fun facts
- Interactive quiz gameplay with immediate feedback
- Score tracking and progress monitoring
- Challenge friends feature with shareable links
- Beautiful animations and engaging UI
- Secure backend architecture

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 🏃‍♂️ Getting Started

1. Clone the repository
```bash
git clone https://github.com/PrateekJaiswal12/globetrotter.git
cd globetrotter
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory and add:
```
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Project Structure

```
globetrotter/
├── backend/
│   ├── src/
│   │   ├── index.ts           # Main backend server file
│   │   ├── models/
│   │   │   └── Destination.ts # Destination model
│   │   ├── lib/
│   │   │   └── db.ts         # Database connection
│   │   └── scripts/
│   │       └── seed.ts       # Database seeding script
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── page.tsx      # Main game page
│   │       ├── layout.tsx    # Root layout
│   │       └── api/
│   │           └── destinations/
│   │               └── random/
│   │                   └── route.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── package.json              # Root package.json for workspaces
├── .env.local               # Environment variables
└── .gitignore
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📱 Responsive Design

The application is fully responsive and works great on:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop computers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 