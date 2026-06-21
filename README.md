# Accessibility Analyzer

A full-stack web application that audits website accessibility using [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) and [axe-core](https://www.deque.com/axe/).

---

## Features

-  Input any URL and perform an accessibility scan
-  View Lighthouse accessibility score and axe-core violations
-  Stores scan history in MongoDB
-  Results include WCAG-related issues, ARIA usage, contrast ratios, and more

---

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (React), [Tailwind CSS](https://tailwindcss.com/)  
- **Backend:** [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)  
- **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
- **Auditing Tools:** [Lighthouse](https://developers.google.com/web/tools/lighthouse), [axe-core](https://www.deque.com/axe/)

---

## 📁 Project Structure

```
accessibility-analyzer/
├── client/          → Frontend UI (Next.js)
├── server/          → Express API & MongoDB logic
├── docs/            → Project planning & documentation
├── design-assets/   → Screenshots, mockups, wireframes
└── .gitignore       → Ignored files (node_modules, .env, etc.)
```
---

## Screenshots

*abhi karna baaki h bro*
[Scan Result](design-assets/result-page.png)

---

## How It Works

1. Enter a website URL in the frontend form
2. Server launches a **headless browser (Puppeteer)**
3. Runs **Lighthouse** and **axe-core** audits
4. Stores results in **MongoDB Atlas**
5. Displays a full report in the frontend UI

---

## Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/k-9733/Accessibility-Analyzer.git
cd Accessibility-Analyzer
```

### 2. Install Dependencies

```
cd client
npm install
cd ../server
npm install
```

### 3. Configure Environment

- Create a .env file inside /server:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
PORT=5000
```

### 4. Run the App

- Start the backend:
```
cd server
npm run dev
```

- Start the frontend:
```
cd ../client
npm run dev
```

- App runs at: http://localhost:3000

---

## Example URLs
### Try scanning these:

https://bbc.com
https://www.wikipedia.org
https://github.com
https://developer.mozilla.org

Complex UI
https://www.amazon.in
https://www.flipkart.com
https://www.linkedin.com
https://www.youtube.com

Govt and accessibility friendly sites
https://www.nasa.gov
https://www.w3.org/WAI/

Violation prone
https://old.reddit.com
https://news.ycombinator.com
https://www.craigslist.org

Test Forms
https://github.com/login
https://accounts.google.com
https://www.amazon.in/ap/signin

DEMO
https://www.gov.uk
https://www.bbc.com
https://github.com
https://www.amazon.in
https://news.ycombinator.com

---

## Future Improvements

- 👤 User authentication (login & saved scan history)

- 📄 Export reports to PDF / CSV

- 🕓 Schedule automatic scans

- 🔍 Add SEO/performance audits toggle

- ⚙️ Add admin dashboard

- 📱 Make PWA with offline scan queue

---

# Acknowledgments

- Lighthouse

- axe-core

- MongoDB Atlas

- Next.js

- Tailwind CSS
