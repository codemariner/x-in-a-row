export const isEmpty = (obj: any): boolean => {
    if (!obj) {
        return true;
    }
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }
    if (Object.keys(obj).length) {
        return false;
    }
    return true;
};
