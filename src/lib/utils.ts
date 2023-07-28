import { type ClassValue, clsx } from 'clsx'
import { remove as removeDiacritics } from 'diacritics'
import pino from 'pino'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const logger = pino({
  enabled: process.env.ENV_TYPE !== 'test',
})

export const ONE_DAY = 60 * 60 * 24

export function isDevEnvironment() {
  return process.env.NODE_ENV === 'development'
}

export function isMockEnabled() {
  return process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
}

export function processAndConvertToLowerCase(str: string) {
  return removeDiacritics(str)
    .toLowerCase()
    .replace(/[!,@#$%^&*()_+]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}
