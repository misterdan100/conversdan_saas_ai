'use client'

import { cn, configureAssistant, getSubjectColor } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import soundwaves from '@/constants/soundwaves.json'
import { addToSessionHistory } from '@/lib/actions/companion.actions';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

export default function CompanionComponent({companionId, name, style, subject, topic, userImage, userName, voice}: CompanionComponentProps) {
  const [ callStatus, setCallStatus ] = useState<CallStatus>(CallStatus.INACTIVE)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [messages, setMessages] = useState<SavedMessage[]>([])

  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if(lottieRef) {
      if(isSpeaking) {
        lottieRef.current?.play()

      } else {
        lottieRef.current?.stop()
      } 
    }
  }, [isSpeaking, lottieRef])

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED)

      // Add to session history
      addToSessionHistory(companionId)
    }

    const onMessage = (message: Message) => {
      if(message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript}

        setMessages((prev) => [newMessage, ...prev])
      }

    }

    
    const onSpeechStart = () => setIsSpeaking(true)
    
    const onSpeechEnd = () => setIsSpeaking(false)

    const onError = (error: Error) => console.log('Error', error) 

    vapi.on('call-start', onCallStart)
    vapi.on('call-end', onCallEnd)
    vapi.on('message', onMessage)
    vapi.on('error', onError)
    vapi.on('speech-start', onSpeechStart)
    vapi.on('speech-end', onSpeechEnd)
    
    return () => {
      vapi.off('call-start', onCallStart)
      vapi.off('call-end', onCallEnd)
      vapi.off('message', onMessage)
      vapi.off('error', onError)
      vapi.off('speech-start', onSpeechStart)
      vapi.off('speech-end', onSpeechEnd)

    }
  }, [])

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();

    vapi.setMuted(!isMuted)
    setIsMuted(!isMuted)
  }

  const handleCall = async () => {
    // 1. start a call
    setCallStatus(CallStatus.CONNECTING)

    const assistantOverrides = {
      variableValues: {
        subject, topic, style
      },
      clientMessages: ['transcript'],
      serverMessages: []
    }

    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides)
  }

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }
  
  
  
  return (
    <section className='flex flex-col h-[70vh]'>
      <section className='flex max-sm:flex-col gap-8'>

        {/* Left Section */}
        <div className='companion-section'>
          <div className='companion-avatar' style={{backgroundColor: getSubjectColor(subject)}}>
            <div className={cn(
              'transition-opacity duration-1000 p-4',
              callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0',
              callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
            )}>

              <Image 
                src={`/icons/${subject}.svg`}
                alt='subject'
                width={150}
                height={150}
                className='max-sm:w-fit'
              />
            </div>

            <div className={cn('absolute transition-opacity duration-1000',
              callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'
            )}>
              <Lottie 
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className='companion-lottie'
              />
            </div>

          </div>

          <p className='font-bold text-2xl'>{name}</p>
        </div>

        {/* Right Section */}
        <div className='user-section'>

          {/* Avatar logo */}
          <div className='user-avatar'>
            <Image 
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className='rounded-lg'
            />
            <p className='font-bold text-2xl'>
              {userName}
            </p>

          </div>

          {/* Microphone button */}
          <button className='btn-mic'
            onClick={() => toggleMicrophone()}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image 
              src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
              alt='mic'
              width={36}
              height={36}
            />
            <p className='max-sm:hidden'>
              {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
            </p>
          </button>

          <button className={cn('py-2 rounded-lg w-full text-white transition-colors cursor-pointer', 
            callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-green-700',
            callStatus === CallStatus.CONNECTING && 'animate-pulse'
          )}
            onClick={ callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall }
          >
            {callStatus === CallStatus.ACTIVE 
              ? 'End Session'
              : callStatus === CallStatus.CONNECTING
                ? 'Connecting'
              : 'Start Session'
            }
          </button>


        </div>
      </section>

      {/* Transcript section */}
      <section className='transcript'>
        <div className='transcript-message no-scrollbar'>
            {messages.map( (message, index) => {
              if(message.role === 'assistant') {
                return (
                  <p
                  key={index}
                  className='opacity-80 max-sm:text-sm'
                  ><span className='font-semibold'>{name.split(' ')[0].replace('/[.,]/g,', '')}:</span> {message.content}</p>
                )
              } else {
                return (<p
                  key={index}
                  className='bg-gray-200 max-sm:text-sm'
                ><span className='font-bold'>{userName}: </span> {message.content}</p>
                )
              }
            })}
        </div>

        <div className='transcript-fade'/>

      </section>
    </section>
  )
}