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
