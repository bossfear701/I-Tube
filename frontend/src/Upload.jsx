import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Firebase is configured via Vite env variables at build time.
// Create a file frontend/.env with VITE_FIREBASE_API_KEY=... etc.
// See README for exact vars required.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch(e) {
  console.warn('Firebase init failed (check env).', e);
}
const storage = app ? getStorage(app) : null;

export default function Upload(){
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  async function handleUpload(e){
    e.preventDefault();
    if(!file) return setMessage('Select a file first');
    if(!storage) return setMessage('Firebase not configured — see README');

    const filename = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, 'videos/' + filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(pct);
      },
      (error) => {
        console.error(error);
        setMessage('Upload error: ' + error.message);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setMessage('Upload complete — file URL: ' + url);
        // Optionally notify backend that a new video exists
        try {
          const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
          if(backendUrl){
            await fetch(backendUrl + '/api/videos', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title: file.name, storageUrl: url })
            });
          }
        } catch(err){
          console.warn('Notify backend failed', err);
        }
      }
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload a video (Firebase Storage)</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" accept="video/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        <div className="w-full bg-slate-100 h-4 rounded overflow-hidden">
          <div style={{width: progress + '%'}} className="h-4 bg-sky-500"></div>
        </div>
        <button className="px-4 py-2 bg-sky-600 text-white rounded" type="submit">Upload</button>
      </form>
      <p className="mt-4 text-sm">{message}</p>
    </div>
  );
}