import { type ClassValue, clsx } from 'clsx'
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
  const processedString = str.replace(/[^\w\s]/gi, '')
  return processedString.toLowerCase()
}
