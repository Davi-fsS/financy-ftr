import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvatarFallback(userName?: string){
  if(userName){
    const nameArray = userName.split(" ");

    if(nameArray.length > 1){
      return `${nameArray[0][0]}${nameArray[nameArray.length - 1][0]}`
    }
    
    return nameArray[0][0]
  }
  else{
    return "UK"
  }
}