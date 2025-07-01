# 🐝 Spelling Bee Game

A web-based word puzzle game inspired by the _New York Times Spelling Bee_, built with **Next.js** and **MongoDB Atlas**.

Players are given **7 letters** and must form as many valid words as possible — with bonus points for discovering the **pangram**!

---

## ✨ Features

- 🔤 Randomly generated 7-letter puzzles
- 🧠 Words must be at least 4 letters long
- 💡 One letter is **required in every word**
- 🌟 Pangram detection (a word using **all 7 letters**)
- 📆 Daily puzzle system backed by MongoDB
- 📈 Scoring, tracking, and user submissions

---

## 🕹️ Game Rules

### Goal

Form as many valid English words as possible using only the 7 provided letters.

### Rules

- Words must be **at least 4 letters long**
- Each word must include the **central letter**
- Letters may be reused
- Only dictionary-valid English words count
- The same word cannot be entered twice
- You earn more points for longer words (1 point for 4 letters; word length points for words over 4 letters)
- You get a **bonus** for discovering a **pangram** — a word that uses all 7 letters at least once

---

## 🧠 Example

If the letters are:  
`G  L  A  C  I  E  R`  
and the center letter is: **A**

You can submit:

- `grace` ✅
- `cage` ✅
- `glacier` ✅ (pangram!)
- `rig` ❌ (too short)
- `rice` ❌ (missing A)

---

## 🛠️ Project Structure

```
.
├── actions/               # Server Actions for DB interaction
├── app/
│   ├── hints              # Hints for the daily puzzle
│   ├── solution           # Solution of today's puzzle
│   └── page.tsx           # Main UI
├── components/
│   └── ui                 # UI components (shadcn)
├── lib/
│   ├── utils.ts           # utility functions for operations on the words
│   └── mongodb.ts         # MongoDB connection logic
├── models/
│   ├── DailyLetters.ts    # Mongoose model for puzzles
│   └── DailyWords.ts      # Mongoose model for valid answers
├── public/
├── .env.local             # Contains MONGODB_URI
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourname/spelling-bee-game.git
cd spelling-bee-game
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb+srv://yourUser:yourPassword@yourCluster.mongodb.net/yourDb
```

### 4. Run the App

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🧩 Future Ideas

- ✅ Daily leaderboard
- ✅ User login (email or social)
- ✅ Palindromes
- ✅ Share results

---

## 🧑‍💻 Tech Stack

- [Next.js (App Router)](https://nextjs.org)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose](https://mongoosejs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn](https://ui.shadcn.com/)

---

## 📄 License

MIT — feel free to use, modify, and build upon it!
