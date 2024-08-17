const CACHE_DURATION = 10 * 1000;

export function setLocalStorageWithExpiry(key: string, data: any) {
  const entry = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(entry));
}

export function getLocalStorageWithExpiry(key: string) {
  const cachedItem = localStorage.getItem(key);

  if (!cachedItem) {
    return null;
  }

  const entry = JSON.parse(cachedItem);

  if (Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data;
  } else {
    localStorage.removeItem(key);
    return null;
  }
}