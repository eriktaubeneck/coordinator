import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import type { Database } from '@/lib/database.types';
import GitHubOAuthComponent from '@/app/login/GitHubOAuthComponent';

export default async function LoginPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="px-6 py-12 shadow sm:rounded-lg sm:px-12 h-screen">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <div className="flex min-h-full flex-1 flex-col justify-center py-6 sm:px-6 lg:px-8">
              <Link href="/" className="-m-1.5 pb-8">
                <GlobeAltIcon className="h-12 w-12 stroke-indigo-500 mx-auto" />
              </Link>
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in with GitHub
              </h2>
            </div>
            <div className="mx-auto w-5/6">
              <GitHubOAuthComponent />
            </div>
          </div>
  </div>
      </div>
    </>
  );
}
