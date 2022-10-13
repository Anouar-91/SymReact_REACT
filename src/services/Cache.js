const cache = {};

function set(key, data){
    cache[key] = {
        data: data,
        cachedAt: new Date().getTime()
    }
} 

function get(key){
    return new Promise(resolve => {
        //on vérifie qu'on a bien un élément à la clé demandé 
        //on check si la date du cacheAt de notre élément + 15min et plus petite que la date actuel 
       
        resolve((cache[key] && cache[key].cachedAt + 15*60*10000 > new Date().getTime()) ? cache[key].data : null);
    })
}
export default {
    get,
    set
}