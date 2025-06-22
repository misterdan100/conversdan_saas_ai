import React from 'react'
import {Button} from "@/components/ui/button";
import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import CTA from '@/components/CTA';
import { recentSessions } from '@/constants';

const Page = () => {
  return (
    <main>
      <h1 className='text-2xl underline'>Popular Companions</h1>
      <section 
        className='home-section'
      >
        <CompanionCard 
          id='123'
          name='Neura The Brainy Explore'
          topic='Nuearal Network of the Brain'
          subject='science'
          duration={45}
          color='#ffda6e'
        />
        <CompanionCard 
          id='124'
          name='Astro The Space Guide'
          topic='Wonders of the Solar System'
          subject='astronomy'
          duration={30}
          color='#6ecbff'
        />
        <CompanionCard 
          id='125'
          name='Eco The Green Guardian'
          topic='Ecosystems and Biodiversity'
          subject='biology'
          duration={40}
          color='#7effa1'
        />

      </section>

      <section 
        className='home-section'
      >
        <CompanionsList 
          title='Recently completed sessions'
          companions={recentSessions}
          classNames='w-2/3 max-lg:w-full'
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page