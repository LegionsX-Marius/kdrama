# 🎬 KDrama Hub

Site web modern pentru vizionarea serialelor K-Drama cu sistem de autentificare și limitare conținut.

## 📁 Structura Proiect

```
kdrama-hub/
├── index.html          # Homepage cu toate serialele
├── login.html          # Pagină conectare
├── register.html       # Pagină înregistrare
├── series.html         # Detalii serial + episoade
├── episode.html        # Player video episoade
├── admin.html          # Panou administrare
├── data.js            # Bază de date seriale
└── img/               # Imagini seriale + logo
```

## 🚀 Instalare

1. Descarcă toate fișierele
2. Creează folder `img/`
3. Adaugă `logo.png` și posterele serialelor
4. Deschide `index.html` în browser

## 👥 Tipuri Utilizatori

### 🔴 Admin
- Login: `admin` / `admin123`
- Acces complet + panou admin
- Poate adăuga seriale noi

### 🟢 User Înregistrat
- Înregistrare: `register.html`
- Acces la toate episoadele
- Salvare favorite + comentarii

### 🟡 Vizitator (Guest)
- Fără înregistrare
- **Limitare: doar 10 episoade/serial**
- Episoadele 11+ sunt 🔒 blocate

## 🎯 Funcționalități

- ✅ Sistem complet autentificare
- ✅ Limitare conținut (10 episoade free)
- ✅ Căutare în timp real
- ✅ Filtre pe categorii
- ✅ Salvare favorite
- ✅ Dark/Light mode
- ✅ Design responsive
- ✅ Panou admin funcțional

## 📝 Adăugare Serial Nou

### Metoda 1: Admin Panel
1. Login ca admin: `admin.html`
2. Completează formularul
3. Copiază codul generat
4. Lipește în `data.js` înainte de ultimul `}`

### Metoda 2: Manual în data.js
```javascript
,
nume_serial: {
    title: "Titlu Serial",
    image: "img/serial.jpg",
    icon: "🎬",
    year: "2024",
    rating: "9.0",
    genre: "Action, Romance",
    description: "Descriere serial...",
    category: "action", // action, romance, thriller, race, comedy, fantasy
    episodes: [
        {
            title: "Episodul 1",
            duration: "60 min",
            description: "Descriere episod...",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID"
        }
    ]
}
```

## 🎥 Link-uri Video Suportate

- YouTube: `https://www.youtube.com/embed/VIDEO_ID`
- Vimeo: `https://player.vimeo.com/video/VIDEO_ID`
- Google Drive: `https://drive.google.com/file/d/FILE_ID/preview`
- Dailymotion: `https://geo.dailymotion.com/player.html?video=VIDEO_ID`

## 🔧 Configurare

### Logo
Înlocuiește `img/logo.png` cu logo-ul tău

### Categorii
Disponibile: `race`, `action`, `romance`, `thriller`, `comedy`, `fantasy`

### Limită Episoade Free
În `series.html` și `episode.html`, linia:
```javascript
const FREE_EPISODE_LIMIT = 10; // Modifică numărul aici
```

## 🌐 Deploy GitHub Pages

```bash
git init
git add .
git commit -m "KDrama Hub"
git branch -M main
git remote add origin https://github.com/USERNAME/kdrama-hub.git
git push -u origin main
```

Settings → Pages → Source: `main` → Save

Site live: `https://USERNAME.github.io/kdrama-hub/`

## 💾 Date Salvate (localStorage)

```javascript
kdrama_users          // Utilizatori înregistrați
kdrama_logged_in      // Status login
kdrama_user           // User curent
kdrama_user_role      // Role: admin/user
kdrama_favorites      // Seriale favorite
kdrama_theme          // dark/light
kdrama_remembered_user // Remember me
```

## 🛠️ Tehnologii

- HTML5
- CSS3 (Gradients, Animations, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- LocalStorage API
- No frameworks!

## 📱 Responsive

- Desktop: 1600px+ (10+ seriale/rând)
- Laptop: 1000-1600px (6-8 seriale)
- Tablet: 768-1000px (4-5 seriale)
- Mobile: <768px (2-3 seriale)

## 🔐 Securitate

⚠️ **IMPORTANT**: Acest proiect folosește localStorage pentru stocare parole în text simplu. Este doar pentru demonstrație/proiecte personale.

**Pentru producție:**
- Folosește backend (Node.js, PHP, Python)
- Hash parole (bcrypt, argon2)
- Bază de date (MySQL, MongoDB)
- Autentificare JWT/Sessions

## 📄 Licență

MIT License - Liber de folosit pentru proiecte personale sau comerciale.

## 👤 Contact

- GitHub: [@LegionsX-Marius](https://github.com/LegionsX-Marius)
- Email: mariusbun@gmail.com

---

**Made with ❤️ for K-Drama fans worldwide** 🌍