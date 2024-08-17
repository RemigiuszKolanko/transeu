import { setLocalStorageWithExpiry, getLocalStorageWithExpiry } from './localStorageCache';

describe('localStorageCache', () => {
  const key = 'testKey';
  const data = { name: 'Bitcoin', symbol: 'BTC' };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should set and get data from localStorage within expiry time', () => {
    setLocalStorageWithExpiry(key, data);

    const cachedData = getLocalStorageWithExpiry(key);
    expect(cachedData).toEqual(data);
  });

  it('should return null if data has expired', () => {
    setLocalStorageWithExpiry(key, data);

    jest.advanceTimersByTime(10 * 1000 + 1);

    const cachedData = getLocalStorageWithExpiry(key);
    expect(cachedData).toBeNull();
  });

  it('should remove expired data from localStorage', () => {
    setLocalStorageWithExpiry(key, data);

    jest.advanceTimersByTime(10 * 1000 + 1);

    const cachedData = getLocalStorageWithExpiry(key);
    expect(cachedData).toBeNull();
    expect(localStorage.getItem(key)).toBeNull();
  });

  it('should return null if no data is found in localStorage', () => {
    const cachedData = getLocalStorageWithExpiry('nonExistingKey');
    expect(cachedData).toBeNull();
  });
});