export function isJson(obj) {
    try {
        JSON.parse(obj);
        return true;
    }
    catch {
        return false;
    }
}
