# I Tube — Backend (Express) for Render

This lightweight backend accepts POST /api/videos to store video metadata (title + storageUrl).

## Deploy to Render
1. Push the repo to GitHub.
2. Create a new Web Service on Render and connect the GitHub repo.
3. For the root path, choose the `backend` folder.
4. Build/Start command: `npm install` then `npm start` (Render will run `npm install` automatically).
5. After deploy you will have a URL like `https://your-backend.onrender.com`.

## Notes
- This demo stores metadata in a file `videos.json` inside the container — in production use a real database (Postgres, Firestore, etc.).
- Secure endpoints and add authentication before production use.
