import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAbsoluteURL(path: string) {
  if(typeof window !== 'undefined') return path

  if(process.env.VERCEL_URL) return `https://un-cover.vercel.app${path}`

  return `http://localhost:${process.env.PORT ?? 3000}${path}`
}


export function generateMetaData({
  title = "unCover - Everything you need while applying for a job at one place.",
  description = "unCover is an open-source software to make creation of cover letter easy to apply for job.",
  image = "/thumbnail.jpg",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@sudhanvanadiger"
    },
    metadataBase: new URL('https://un-cover.vercel.app'),
    themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}