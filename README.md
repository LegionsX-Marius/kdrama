# 🎬 KDrama Hub v4.0 - Platforma Ultra-Modernă

**Nou în v4.0:** Sincronizare cloud cu Firebase, Design ultra-modern, Progress tracking persistent, UI/UX revolutionary!

---

## 🚀 Caracteristici Majore

### ✨ Sincronizare Cloud (Firebase)
- 📊 **Progress tracking** salvat cross-device
- ❤️ **Favorite** sincronizate automat
- 📝 **Istoric vizionări** persistent
- 👤 **Autentificare sigură** cu Firebase Auth
- 🔄 **Real-time updates** - datele se sincronizează instant

### 🎨 Design Ultra-Modern
- 🌈 **Gradient animations** pe toate elementele
- 🎭 **Glassmorphism** effects
- ⚡ **Smooth transitions** - 60fps animations
- 🎯 **Hover effects** complexe 3D
- 🌓 **Dark/Light mode** cu tranziții fluide
- 📱 **Responsive** perfect pe orice device

### 📊 Progress Tracking
- 📈 **Procentaj vizionare** per serial
- 🕐 **Continue watching** - preia exact de unde ai rămas
- 📺 **Episode progress bars** vizuale
- 📊 **Statistici detaliate** - episoade văzute, timp total

### 🔐 Sistem Avansat de Conturi
- 🌐 **Login social** (Google, Facebook)
- 👥 **Multi-device sync** - aceleași date pe toate device-urile
- 🔒 **Securitate** - Firebase Authentication
- 💾 **Auto-save** - progresul se salvează automat

---

## 📦 Instalare în 5 Pași

### Pas 1: Descarcă Fișierele

```bash
git clone https://github.com/username/kdrama-hub-v4.git
cd kdrama-hub-v4
```

**Structură fișiere:**
```
kdrama-hub-v4/
├── index.html              # Homepage modernizat
├── series.html             # Pagină serial
├── episode.html            # Player episod
├── login.html              # Autentificare
├── register.html           # Înregistrare
├── history.html            # Istoric vizionări
├── admin.html              # Panou admin
├── episode-manager.html    # Manager episoade
├── firebase-config.js      # ⚠️ IMPORTANT - Configurație Firebase
├── data.js                 # Date seriale (fallback local)
└── img/                    # Folder imagini
    ├── logo.png
    └── [posterele serialelor]
```

### Pas 2: Setup Firebase (GRATUIT)

1. **Creează cont Firebase:**
   - Mergi la: https://console.firebase.google.com/
   - Click "Add Project"
   - Nume proiect: `kdrama-hub` (sau orice nume)
   - Dezactivează Google Analytics (opțional)
   - Click "Create Project"

2. **Activează Firestore Database:**
   - Din meniul lateral: `Build` → `Firestore Database`
   - Click "Create database"
   - Alege "Start in **test mode**" (pentru dezvoltare)
   - Location: `eur3 (europe-west)` (sau cel mai apropiat)
   - Click "Enable"

3. **Activează Authentication:**
   - Din meniul lateral: `Build` → `Authentication`
   - Click "Get started"
   - Tab "Sign-in method"
   - Activează: **Email/Password**, **Google**, **Facebook** (opțional)

4. **Obține configurația:**
   - Din meniul lateral: ⚙️ `Project Settings`
   - Scroll la "Your apps"
   - Click `</>` (Web app)
   - Nickname: `KDrama Hub Web`
   - **NU** bifa "Firebase Hosting"
   - Click "Register app"
   - **COPIAZĂ** configurația JavaScript

### Pas 3: Configurează firebase-config.js

Deschide `firebase-config.js` și înlocuiește:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyD-EXEMPLU-AICI",          // ⚠️ Schimbă cu al tău
    authDomain: "kdrama-hub-xxxxx.firebaseapp.com",  // ⚠️ Schimbă
    projectId: "kdrama-hub-xxxxx",           // ⚠️ Schimbă
    storageBucket: "kdrama-hub-xxxxx.appspot.com",  // ⚠️ Schimbă
    messagingSenderId: "123456789012",       // ⚠️ Schimbă
    appId: "1:123456789012:web:abc123xyz"   // ⚠️ Schimbă
};
```

### Pas 4: Securizează Firebase (IMPORTANT)

În Firebase Console → `Firestore Database` → `Rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Series (doar read public, write doar admin)
    match /series/{seriesId} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }
    
    // Watch Progress
    match /watchProgress/{progressId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    
    // Watch History
    match /watchHistory/{historyId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

Click **"Publish"**

### Pas 5: Testează Local

```bash
# Opțiunea 1: Cu Python
python -m http.server 8000

# Opțiunea 2: Cu Node.js
npx serve

# Opțiunea 3: Cu Live Server (VS Code extension)
# Click dreapta pe index.html → Open with Live Server
```

Deschide browser: `http://localhost:8000`

---

## 🎮 Utilizare

### 👤 Creează Cont Admin

1. Deschide `register.html`
2. Înregistrează-te cu email: `admin@kdramahub.com`
3. În Firebase Console → `Authentication` → `Users`
4. Click pe userul creat → `Custom claims`
5. Adaugă: `{"admin": true}`

Acum ai acces la Admin Panel!

### 📺 Adaugă Seriale Noi

**Metoda 1: Prin Firebase Console** (Recomandat)
1. Firebase Console → `Firestore Database`
2. Click "Start collection"
3. Collection ID: `series`
4. Document ID: `id_serial` (ex: `squid_game`)
5. Adaugă câmpurile:
   ```
   title: "Squid Game"
   image: "img/squid-game.jpg"
   icon: "🎯"
   year: "2021"
   rating: "9.0"
   genre: "Thriller, Drama"
   description: "Descriere serial..."
   category: "thriller"
   episodes: [] (array gol - adaugi ulterior)
   ```

**Metoda 2: Prin Episode Manager**
1. Login ca admin
2. Click `Episode Manager` din header
3. Click "Add Series"
4. Completează formularul
5. Codul se salvează automat în Firebase!

### ➕ Adaugă Episoade

1. Intră în `Episode Manager`
2. Selectează serialul
3. Click "Add Episode"
4. Completează:
   - Titlu: "Episodul 1"
   - Durată: "60 min"
   - Descriere: "..."
   - URL Video: Link embed (YouTube, Vimeo, etc.)

**Link-uri Video Suportate:**
```javascript
// YouTube
"https://www.youtube.com/embed/VIDEO_ID"

// Vimeo
"https://player.vimeo.com/video/VIDEO_ID"

// Google Drive
"https://drive.google.com/file/d/FILE_ID/preview"

// Dailymotion
"https://geo.dailymotion.com/player.html?video=VIDEO_ID"
```

---

## 🎨 Customizare Design

### Culori Principale

În `<style>` fiecărui fișier HTML:

```css
:root {
    --primary: #4A90E2;        /* Albastru principal */
    --secondary: #667eea;      /* Violet secundar */
    --accent: #f093fb;         /* Pink accent */
    --success: #10b981;        /* Verde success */
    --danger: #ef4444;         /* Roșu eroare */
}
```

### Efecte Hover

Poți ajusta intensitatea efectelor în CSS:

```css
.series-card:hover {
    transform: translateY(-12px) scale(1.02);  /* Crește/scade valoarea */
    box-shadow: 0 20px 60px rgba(74, 144, 226, 0.4);  /* Ajustează opacitatea */
}
```

### Logo Custom

Înlocuiește `img/logo.png` cu logo-ul tău (recomandat: 500x500px, PNG transparent)

---

## 🌐 Deploy Online

### Opțiunea 1: Firebase Hosting (Recomandat)

```bash
# Instalează Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Init hosting
firebase init hosting

# Setări:
# - Public directory: .
# - Single-page app: No
# - GitHub auto-deploy: No

# Deploy
firebase deploy --only hosting
```

Site-ul tău va fi live la: `https://kdrama-hub-xxxxx.web.app`

### Opțiunea 2: GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/kdrama-hub.git
git push -u origin main
```

Settings → Pages → Source: `main` → Save

Live la: `https://USERNAME.github.io/kdrama-hub/`

### Opțiunea 3: Netlify

1. Drag & drop folder-ul în Netlify
2. Site live instant!

---

## 📊 Funcționalități Premium

### 🔐 Limitare Conținut Free

În `series.html` și `episode.html`:

```javascript
const FREE_EPISODE_LIMIT = 10; // Modifică numărul aici
```

Utilizatorii neautentificați pot vedea doar primele 10 episoade.

### 📈 Analytics Progress

Firebase salvează automat:
- Ultimul episod vizionat per serial
- Procentaj completare
- Data ultimei vizionări
- Istoric complet episoade

Datele se sincronizează automat pe toate device-urile!

### ⚡ Performance

- **Lazy loading** pentru imagini
- **Caching** Firebase queries
- **Optimized animations** - 60fps
- **Responsive images** - auto-resize

---

## 🛠️ Troubleshooting

### Eroare: "Firebase not defined"

**Soluție:** Verifică că CDN-ul Firebase este încărcat:
```html
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
```

### Eroare: "Permission denied"

**Soluție:** Verifică Firestore Rules - trebuie să permită read/write.

### Progresul nu se salvează

**Soluție:** 
1. Verifică că ești autentificat
2. Deschide Console (F12) → Network → verifică request-urile Firebase
3. Verifică că `FirebaseDB.saveProgress()` este apelat

### Serialele nu apar

**Soluție:**
1. Verifică că `data.js` este încărcat
2. Sau verifică că seriale există în Firebase → `series` collection
3. Deschide Console → verifică erori JavaScript

---

## 📱 Responsive Breakpoints

```css
/* Desktop Large */
@media (min-width: 1600px) { /* 10+ seriale/rând */ }

/* Desktop */
@media (min-width: 1200px) { /* 6-8 seriale */ }

/* Laptop */
@media (min-width: 1024px) { /* 4-6 seriale */ }

/* Tablet */
@media (max-width: 768px) { /* 3-4 seriale */ }

/* Mobile */
@media (max-width: 480px) { /* 2 seriale */ }
```

---

## 🔒 Securitate

### ⚠️ IMPORTANT pentru Producție

1. **Nu partaja** `apiKey` public pe GitHub
2. Folosește **Environment Variables**:
   ```javascript
   const firebaseConfig = {
       apiKey: process.env.FIREBASE_API_KEY,
       // ...
   };
   ```

3. **Firestore Rules** stricte:
   ```javascript
   // ❌ NU lăsa așa în producție:
   allow read, write: if true;
   
   // ✅ Folosește autentificare:
   allow read, write: if request.auth != null;
   ```

4. **Rate limiting** în Firebase
5. **Backup** database săptămânal

---

## 📄 Licență

MIT License - Free pentru uz personal și comercial

---

## 👨‍💻 Dezvoltat cu ❤️

**Versiunea 4.0** - 2025

**Features:**
- ✅ Cloud sync cu Firebase
- ✅ Progress tracking persistent
- ✅ Design ultra-modern
- ✅ Animații complexe
- ✅ Multi-device support
- ✅ Real-time updates

**Stack:**
- Frontend: HTML5, CSS3, Vanilla JavaScript ES6+
- Backend: Firebase (Firestore + Auth)
- Animations: CSS3 Transitions & Keyframes
- Icons: Unicode Emojis

---

## 🆘 Support

**Probleme? Contact:**
- 📧 Email: contact@kdramahub.ro
- 🐛 GitHub Issues: [Link-ul tău]
- 💬 Discord: [Server-ul tău]

**Documentație Firebase:**
- 📚 https://firebase.google.com/docs

---

## 🎯 Roadmap Viitor

- [ ] Rating sistem per episod
- [ ] Comentarii utilizatori
- [ ] Notificări push episoade noi
- [ ] Download episoade offline
- [ ] Subtitrări multiple limbi
- [ ] Chromecast support
- [ ] Aplicație mobilă nativă
- [ ] AI recommendations

---

**Made with 🔥 Firebase & 💙 for K-Drama fans worldwide!**