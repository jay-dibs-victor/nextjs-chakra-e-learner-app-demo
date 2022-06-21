// Stub: excludeObjectKeys utility
const excludeObjectKeys = (obj, keys) => {
    if (!obj || typeof obj !== 'object') return obj;
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => !keys.includes(key))
    );
};

export default excludeObjectKeys;
