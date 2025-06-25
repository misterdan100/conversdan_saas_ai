'use client'

import { switchBookmarkCompanion } from '@/lib/actions/companion.actions'
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'

interface CompanionCardProps {
    id: string
    name: string
    topic: string
    subject: string
    duration: number
    color: string
    bookmark: boolean
}

export default function CompanionCard({ id, name, topic, subject, duration, color, bookmark }: CompanionCardProps) {
    const [isBookmark, setIsBookmark] = useState(false)
  
  const switchBookmark = async () => {

    const res = await switchBookmarkCompanion(id, !isBookmark)

    setIsBookmark(res.bookmark)
  }
  
  return (
    <article
        className="companion-card"
        style={{
            background: color,
        }}
    >
        <div
            className="flex justify-between items-center"
        >
            <div className="subject-badge">{subject}</div>
            <button className="companion-bookmark"
                onClick={switchBookmark}
            >
                <Image 
                    src={isBookmark ? '/icons/bookmark-filled.svg' : '/icons/bookmark.svg'}
                    alt="bookmark"
                    width={12.5}
                    height={15}
                />
            </button>
        </div>

        <h2 className="font-bold text-2xl">{name}</h2>
        <p className="text-sm">{topic}</p>

        <div className="flex items-center gap-2">
            <Image 
                src='/icons/clock.svg'
                alt="duration"
                width={13.5}
                height={13.5}
            />
            <p className="text-sm">{duration} minutes</p>
        </div>

        <Link href={`/companions/${id}`} className="w-full">
            <button className="justify-center w-full btn-primary">
                Launch Lesson
            </button>
        </Link>

    </article>
  )
}