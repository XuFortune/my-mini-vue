export function isObject(target){
    return typeof target === 'object' && target !== null
}

export function hasChanged(oldValue, value){
    return oldValue !== value && !(Number.isNaN(oldValue) && Number.isNaN(value))
}

export function isArray(target){
    return Array.isArray(target)
}

export function isFunction(target){
    return typeof target === 'function'
}

export function isString(target){
    return typeof target === 'string'
}
export function isBoolean(target){
    return typeof target === 'boolean'
}
export function isNumber(target){
    return typeof target === 'number'
}