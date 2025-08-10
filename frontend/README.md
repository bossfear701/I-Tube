# I Tube — Frontend (Deploy to GitHub Pages)

This frontend is a Vite + React app that uploads videos directly to Firebase Storage.

## Setup

1. Create a Firebase project at https://console.firebase.google.com/ and enable **Storage**.
2. In your Firebase project settings, get the Web SDK config and create a file `frontend/.env` with the following keys:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# optional: backend URL (Render) to notify when upload completes
VITE_BACKEND_URL=https://your-backend.onrender.com
```

3. Allow reads/writes for testing in Storage rules (not for production):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```
(Change rules before going production.)

4. Install and run locally:
```bash
cd frontend
npm install
npm run dev
```

5. To deploy to GitHub Pages:
- Set `homepage` in `package.json` to `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME`
- Then run:
```bash
npm run deploy
```
