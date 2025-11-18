// ============================================
// FIREBASE CONFIGURATION
// Înlocuiește cu datele tale din Firebase Console
// ============================================

// TODO: Înlocuiește cu configurația ta de la Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBrScfX47_Z--bJKaDCCSpYmFAz3EsAho8",
    authDomain: "kdrama-42760.firebaseapp.com",
    projectId: "kdrama-42760",
    storageBucket: "kdrama-42760.firebasestorage.app",
    messagingSenderId: "499781846774",
    appId: "1:499781846774:web:fc0162d4ea94650475ced7"
};

// Inițializare Firebase
let db = null;
let auth = null;
let storage = null;

// Verifică dacă Firebase este încărcat
if (typeof firebase !== 'undefined') {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        storage = firebase.storage();
        console.log('✅ Firebase inițializat cu succes!');
    } catch (error) {
        console.error('❌ Eroare inițializare Firebase:', error);
    }
} else {
    console.warn('⚠️ Firebase SDK nu este încărcat. Folosim localStorage ca fallback.');
}

// ============================================
// DATABASE HELPER FUNCTIONS
// ============================================

const FirebaseDB = {
    // Users
    async createUser(uid, userData) {
        if (!db) return localStorage.setItem(`user_${uid}`, JSON.stringify(userData));
        return await db.collection('users').doc(uid).set(userData);
    },

    async getUser(uid) {
        if (!db) return JSON.parse(localStorage.getItem(`user_${uid}`) || '{}');
        const doc = await db.collection('users').doc(uid).get();
        return doc.exists ? doc.data() : null;
    },

    async updateUser(uid, data) {
        if (!db) {
            const user = JSON.parse(localStorage.getItem(`user_${uid}`) || '{}');
            localStorage.setItem(`user_${uid}`, JSON.stringify({...user, ...data}));
            return;
        }
        return await db.collection('users').doc(uid).update(data);
    },

    // Watch Progress
    async saveProgress(uid, seriesId, episodeNumber) {
        const progressData = {
            userId: uid,
            seriesId: seriesId,
            episodeNumber: episodeNumber,
            timestamp: new Date().toISOString(),
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (!db) {
            const progress = JSON.parse(localStorage.getItem(`progress_${uid}`) || '{}');
            progress[seriesId] = progressData;
            localStorage.setItem(`progress_${uid}`, JSON.stringify(progress));
            return;
        }

        return await db.collection('watchProgress')
            .doc(`${uid}_${seriesId}`)
            .set(progressData, { merge: true });
    },

    async getProgress(uid) {
        if (!db) {
            return JSON.parse(localStorage.getItem(`progress_${uid}`) || '{}');
        }

        const snapshot = await db.collection('watchProgress')
            .where('userId', '==', uid)
            .get();
        
        const progress = {};
        snapshot.forEach(doc => {
            const data = doc.data();
            progress[data.seriesId] = data;
        });
        return progress;
    },

    // Favorites
    async saveFavorites(uid, favorites) {
        if (!db) {
            localStorage.setItem(`favorites_${uid}`, JSON.stringify(favorites));
            return;
        }

        return await db.collection('users').doc(uid).update({
            favorites: favorites,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });
    },

    async getFavorites(uid) {
        if (!db) {
            return JSON.parse(localStorage.getItem(`favorites_${uid}`) || '[]');
        }

        const doc = await db.collection('users').doc(uid).get();
        return doc.exists && doc.data().favorites ? doc.data().favorites : [];
    },

    // Series Management (Admin)
    async saveSeries(seriesId, seriesData) {
        if (!db) {
            const allSeries = JSON.parse(localStorage.getItem('seriesData') || '{}');
            allSeries[seriesId] = seriesData;
            localStorage.setItem('seriesData', JSON.stringify(allSeries));
            return;
        }

        return await db.collection('series').doc(seriesId).set(seriesData);
    },

    async getAllSeries() {
        if (!db) {
            return JSON.parse(localStorage.getItem('seriesData') || '{}');
        }

        const snapshot = await db.collection('series').get();
        const series = {};
        snapshot.forEach(doc => {
            series[doc.id] = doc.data();
        });
        return series;
    },

    async getSeries(seriesId) {
        if (!db) {
            const allSeries = JSON.parse(localStorage.getItem('seriesData') || '{}');
            return allSeries[seriesId] || null;
        }

        const doc = await db.collection('series').doc(seriesId).get();
        return doc.exists ? doc.data() : null;
    },

    async deleteSeries(seriesId) {
        if (!db) {
            const allSeries = JSON.parse(localStorage.getItem('seriesData') || '{}');
            delete allSeries[seriesId];
            localStorage.setItem('seriesData', JSON.stringify(allSeries));
            return;
        }

        return await db.collection('series').doc(seriesId).delete();
    },

    // Episodes Management
    async addEpisode(seriesId, episodeData) {
        if (!db) {
            const allSeries = JSON.parse(localStorage.getItem('seriesData') || '{}');
            if (!allSeries[seriesId]) return;
            
            allSeries[seriesId].episodes.push(episodeData);
            localStorage.setItem('seriesData', JSON.stringify(allSeries));
            return;
        }

        const seriesRef = db.collection('series').doc(seriesId);
        return await seriesRef.update({
            episodes: firebase.firestore.FieldValue.arrayUnion(episodeData)
        });
    },

    async updateEpisode(seriesId, episodeIndex, episodeData) {
        if (!db) {
            const allSeries = JSON.parse(localStorage.getItem('seriesData') || '{}');
            if (!allSeries[seriesId]) return;
            
            allSeries[seriesId].episodes[episodeIndex] = episodeData;
            localStorage.setItem('seriesData', JSON.stringify(allSeries));
            return;
        }

        const series = await this.getSeries(seriesId);
        series.episodes[episodeIndex] = episodeData;
        return await db.collection('series').doc(seriesId).update({
            episodes: series.episodes
        });
    },

    // Watch History
    async addToHistory(uid, seriesId, episodeNumber) {
        const historyEntry = {
            userId: uid,
            seriesId: seriesId,
            episodeNumber: episodeNumber,
            watchedAt: new Date().toISOString(),
            timestamp: firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : Date.now()
        };

        if (!db) {
            const history = JSON.parse(localStorage.getItem(`history_${uid}`) || '[]');
            history.unshift(historyEntry);
            if (history.length > 100) history.pop();
            localStorage.setItem(`history_${uid}`, JSON.stringify(history));
            return;
        }

        return await db.collection('watchHistory').add(historyEntry);
    },

    async getHistory(uid, limit = 50) {
        if (!db) {
            const history = JSON.parse(localStorage.getItem(`history_${uid}`) || '[]');
            return history.slice(0, limit);
        }

        const snapshot = await db.collection('watchHistory')
            .where('userId', '==', uid)
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .get();
        
        const history = [];
        snapshot.forEach(doc => history.push(doc.data()));
        return history;
    }
};

// ============================================
// AUTH HELPER FUNCTIONS
// ============================================

const FirebaseAuth = {
    async signUp(email, password, username) {
        if (!auth) {
            // Fallback to localStorage
            const users = JSON.parse(localStorage.getItem('kdrama_users') || '{}');
            if (users[username]) throw new Error('Username already exists');
            
            users[username] = {
                email: email,
                password: password,
                role: 'user',
                createdAt: new Date().toISOString()
            };
            localStorage.setItem('kdrama_users', JSON.stringify(users));
            localStorage.setItem('kdrama_user', username);
            localStorage.setItem('kdrama_logged_in', 'true');
            return { user: { uid: username, email: email } };
        }

        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({ displayName: username });
        
        await FirebaseDB.createUser(userCredential.user.uid, {
            username: username,
            email: email,
            role: 'user',
            createdAt: new Date().toISOString(),
            favorites: [],
            settings: {}
        });

        return userCredential;
    },

    async signIn(email, password) {
        if (!auth) {
            const users = JSON.parse(localStorage.getItem('kdrama_users') || '{}');
            const user = Object.values(users).find(u => u.email === email && u.password === password);
            
            if (!user) throw new Error('Invalid credentials');
            
            const username = Object.keys(users).find(k => users[k] === user);
            localStorage.setItem('kdrama_user', username);
            localStorage.setItem('kdrama_logged_in', 'true');
            localStorage.setItem('kdrama_user_role', user.role || 'user');
            
            return { user: { uid: username, email: email } };
        }

        return await auth.signInWithEmailAndPassword(email, password);
    },

    async signOut() {
        if (!auth) {
            localStorage.removeItem('kdrama_user');
            localStorage.removeItem('kdrama_logged_in');
            localStorage.removeItem('kdrama_user_role');
            return;
        }

        return await auth.signOut();
    },

    getCurrentUser() {
        if (!auth) {
            const username = localStorage.getItem('kdrama_user');
            return username ? { uid: username, email: username } : null;
        }

        return auth.currentUser;
    },

    onAuthStateChanged(callback) {
        if (!auth) {
            const username = localStorage.getItem('kdrama_user');
            callback(username ? { uid: username } : null);
            return () => {};
        }

        return auth.onAuthStateChanged(callback);
    }
};

// Export pentru utilizare globală
window.FirebaseDB = FirebaseDB;
window.FirebaseAuth = FirebaseAuth;

console.log('🔥 Firebase Config loaded successfully!');