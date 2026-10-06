// Persistent storage for high-resolution ID document photo and transform settings using IndexedDB
const DB_NAME = 'KaspiDigitalIdStore';
const STORE_NAME = 'documents';
const DOC_KEY = 'id_document_card';

export function openIdDB() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (err) => {
      console.warn('IndexedDB opening error:', err);
      resolve(null);
    };
  });
}

export async function saveDocumentCard(cardData) {
  try {
    const db = await openIdDB();
    if (db) {
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(cardData, DOC_KEY);
        tx.oncomplete = () => {
          // Also set small lock flag in localStorage for fast sync checks
          try {
            localStorage.setItem('kaspi_id_card_is_saved', 'true');
          } catch (e) {}
          resolve(true);
        };
        tx.onerror = () => resolve(false);
      });
    } else {
      // Fallback
      try {
        localStorage.setItem(DOC_KEY, JSON.stringify(cardData));
        localStorage.setItem('kaspi_id_card_is_saved', 'true');
        return true;
      } catch (err) {
        console.warn('LocalStorage fallback failed:', err);
        return false;
      }
    }
  } catch (err) {
    console.warn('Error saving document card:', err);
    return false;
  }
}

export async function loadDocumentCard() {
  try {
    const db = await openIdDB();
    if (db) {
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(DOC_KEY);
        req.onsuccess = () => {
          resolve(req.result || null);
        };
        req.onerror = () => {
          resolve(null);
        };
      });
    } else {
      const raw = localStorage.getItem(DOC_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    }
  } catch (err) {
    console.warn('Error loading document card:', err);
  }
  return null;
}
