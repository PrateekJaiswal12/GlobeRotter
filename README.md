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
│   │   ├── index.ts                    # Main Express server
│   │   ├── controllers/
│   │   │   ├── destinationController.ts # Destination endpoints
│   │   │   └── userController.ts       # User management
│   │   ├── models/
│   │   │   ├── Destination.ts          # Destination schema
│   │   │   └── User.ts                 # User schema
│   │   ├── routes/
│   │   │   ├── destinations.ts         # Destination routes
│   │   │   └── userRoutes.ts          # User routes
│   │   ├── lib/
│   │   │   └── db.ts                  # MongoDB connection
│   │   └── scripts/
│   │       └── seed.ts                # Database seeder
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx               # Home page
│   │   │   ├── layout.tsx            # Root layout
│   │   │   └── game/
│   │   │       └── page.tsx          # Game component
│   │   ├── components/
│   │   │   ├── Game.tsx             # Game logic
│   │   │   └── UserScore.tsx        # Score display
│   │   └── models/
│   │       └── User.ts              # User type definitions
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
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
