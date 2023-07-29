'use client'

import { useCallback, type HtmlHTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { FiSearch } from 'react-icons/fi'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { cn } from '@/lib/utils'

import { animeStore } from '@/store/animeStore'

import { Button } from './ui/button'
import { FormField, FormItem, FormLabel, FormControl, Form } from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

type Props = HtmlHTMLAttributes<HTMLFormElement>

const formSchema = z.object({
  title: z.string().min(3).max(30),
  select: z.enum(['word', 'upload']),
})

export function Search({ className, ...rest }: Props) {
  const getAnimesByTitle = animeStore((state) => state.getAnimesByTitle)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      select: 'word',
    },
  })

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      getAnimesByTitle(values.title)
    },
    [getAnimesByTitle],
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-4 max-w-4xl justify-center', className)}
        {...rest}
      >
        <FormField
          control={form.control}
          name="select"
          render={({ field }) => (
            <FormItem>
              <div className="flex h-12 items-center gap-4">
                <FormLabel className="scroll-m-20 text-2xl font-semibold uppercase tracking-tight md:text-3xl">
                  Search
                </FormLabel>

                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Word" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="word">Word</SelectItem>
                        <SelectItem value="upload">Upload</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <div className="flex w-full max-w-full items-center space-x-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your search key word"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">
            <FiSearch size={20} />
          </Button>
        </div>
      </form>
    </Form>
  )
}
