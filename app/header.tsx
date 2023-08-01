import Link from 'next/link';
import { cookies } from "next/headers";
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export default async function Header() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isLoggedIn = session ? true : false;

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <GlobeAltIcon className="h-8 w-8 stroke-indigo-500" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <div className="py-6 -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white">
            { isLoggedIn ?
            <Link href="/dashboard">
              Dashboard <span aria-hidden="true">&rarr;</span>
            </Link>
              :
            <Link href="login">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
            }
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="-mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
