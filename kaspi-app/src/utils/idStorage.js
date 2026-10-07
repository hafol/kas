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
    // 1. Dual persistence: always store in localStorage for instant sync backup
    try {
      localStorage.setItem(DOC_KEY, JSON.stringify(cardData));
      localStorage.setItem('kaspi_id_card_is_saved', 'true');
    } catch (lsErr) {
      // If full DataURL exceeds localStorage quota, store compressed copy
      try {
        const compactData = {
          ...cardData,
          savedAt: Date.now()
        };
        localStorage.setItem(DOC_KEY, JSON.stringify(compactData));
        localStorage.setItem('kaspi_id_card_is_saved', 'true');
      } catch (e) {
        console.warn('LocalStorage save attempt warning:', e);
      }
    }

    // 2. Persistent storage in IndexedDB (handles large multi-megabyte images)
    const db = await openIdDB();
    if (db) {
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(cardData, DOC_KEY);
        tx.oncomplete = () => resolve(true);
        tx.onerror = (e) => {
          console.warn('IndexedDB put error:', e);
          resolve(true); // localStorage backup already succeeded
        };
      });
    }
    return true;
  } catch (err) {
    console.warn('Error saving document card:', err);
    return false;
  }
}

export async function loadDocumentCard() {
  try {
    // 1. First try IndexedDB
    const db = await openIdDB();
    if (db) {
      const dbResult = await new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(DOC_KEY);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
      if (dbResult && dbResult.photoUrl) {
        return dbResult;
      }
    }

    // 2. Fallback to localStorage
    const raw = localStorage.getItem(DOC_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.photoUrl) {
        // Restore to IndexedDB if it was missing
        if (db) {
          try {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).put(parsed, DOC_KEY);
          } catch (e) {}
        }
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error loading document card:', err);
  }
  return null;
}

// Requisites entered by the user on the "Реквизиты" tab (ФИО, ИИН, dates, number), same store
const REQS_KEY = 'id_document_requisites';

export async function saveRequisites(values) {
  try {
    const db = await openIdDB();
    if (db) {
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(values, REQS_KEY);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    }
    localStorage.setItem(REQS_KEY, JSON.stringify(values));
    return true;
  } catch (err) {
    console.warn('Error saving requisites:', err);
    return false;
  }
}

export async function loadRequisites() {
  try {
    const db = await openIdDB();
    if (db) {
      return new Promise((resolve) => {
        const req = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(REQS_KEY);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    }
    const raw = localStorage.getItem(REQS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Error loading requisites:', err);
  }
  return null;
}
