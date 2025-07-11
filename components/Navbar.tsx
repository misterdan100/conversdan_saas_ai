import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  
  

  return (
    <nav className='navbar'>
      <Link href='/'>
        <div className='flex items-center gap-2.5 cursor-pointer'>
          <Image src='/images/logo.svg' alt='logo' width={52} height={52} />
        </div>
      </Link>

      <div className='flex items-center gap-8'>
        {<NavItems />}
        <SignedOut>
          <SignInButton >
            <button className="btn-signin">Sign In</button>
          </SignInButton>

        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}