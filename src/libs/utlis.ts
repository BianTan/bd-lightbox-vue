import { OptionsExclued, OptionsExcluedObject, OptionsExcluedItem } from '../types'

/**
 * 节流
*/
export const throttle = <T extends (...args: any[]) => any>(callback: T, delay = 200, tiggleNow = true) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    if(timer) return result
    if(tiggleNow) {
      result = callback(args)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    } else {
      timer = setTimeout(() => {
        result = callback(args)
        timer = null
      }, delay)
    }
    return result
  }
}

const isObject = (target: any): boolean => {
  return Object.prototype.toString.call(target) === '[object Object]'
}

export const getExclude = (data: OptionsExclued): string => {
  let q: string = ''

  if(typeof data === 'string') {
    q += `:not(${data})`
  } else if(isObject(data)) {
    for(let key in data as OptionsExcluedObject) {
      const value = (data as OptionsExcluedObject)[key]
      q += `:not([${key}='${value}'])`
    }
  } else if(!isObject(data)) {
    (data as OptionsExcluedItem[]).forEach((item: OptionsExcluedItem) => {
      q += getExclude(item)
    })
  }

  return q
}
