export function setSession(name,value) {
    sessionStorage.setItem(name,JSON.stringify(value))
}

export function getSession(name) {
    let arr = sessionStorage.getItem(name)
    return JSON.parse(arr)
}

export function clearSession(name){
    sessionStorage.clear(name)
}