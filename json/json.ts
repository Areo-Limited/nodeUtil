export function isJson(obj: any): boolean{
    try{
        JSON.parse(obj);
        return true;
    } catch { return false; }
}