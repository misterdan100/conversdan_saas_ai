import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  
  
  
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning your way.</div>
      <h2 className="font-bold text-3xl">
        Build and Personalize Learning Companion
      </h2>

      <button className="border-2 border-yellow-500 animate-bounce btn-primary" >
        <Image 
          src='/icons/plus.svg'
          alt="plus"
          width={12}
          height={12}
        />
        <Link href='/companions/new'>
          <p>Build a New Companion</p>
        </Link>
      </button>

      <p>Pick a name, subject, voice, & personality - and start learning through voice conversations that feel natural and fun.</p>

      <Image 
        src='images/cta.svg'
        alt="cta"
        width={362}
        height={232}
      />



    </section>
  )
}