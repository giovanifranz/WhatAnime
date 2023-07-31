'use client'

import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FiSearch } from 'react-icons/fi'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'

import { zodResolver } from '@hookform/resolvers/zod'
import * as AccessibleIcon from '@radix-ui/react-accessible-icon'
import { z } from 'zod'

import { animeStore } from '@/store/animeStore'

import { Button } from './ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormDescription,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
/*import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'*/

const formSchema = z.object({
  title: z.string().min(3).max(30),
  select: z.enum(['word', 'upload']),
})

export function Search() {
  const { getAnimesByTitle, isLoading, error } = animeStore((state) => ({
    getAnimesByTitle: state.getAnimesByTitle,
    isLoading: state.byTitle?.isLoading || false,
    error: state.byTitle?.error || null,
  }))
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
        className="flex h-48 max-w-4xl flex-col justify-center gap-4"
      >
        {
          <FormField
            control={form.control}
            name="select"
            render={
              (/*{ field }*/) => (
                <FormItem>
                  <div className="flex h-12 items-center gap-4">
                    <FormLabel className="scroll-m-20 text-2xl font-semibold uppercase tracking-tight md:text-3xl">
                      Search
                    </FormLabel>

                    {/*<FormControl>
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
          </FormControl>*/}
                  </div>
                </FormItem>
              )
            }
          />
        }
        <div className="flex w-full max-w-full items-center space-x-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    minLength={3}
                    maxLength={30}
                    placeholder="Enter your search key word"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-16" disabled={isLoading}>
            <AccessibleIcon.Root label="Search Button">
              {isLoading ? <UseAnimations animation={loading} /> : <FiSearch size={20} />}
            </AccessibleIcon.Root>
          </Button>
        </div>
        {!error ? (
          <FormDescription className="capitalize">
            Search your favorite Anime
          </FormDescription>
        ) : (
          <FormMessage className="capitalize">{error}</FormMessage>
        )}
      </form>
    </Form>
  )
}
