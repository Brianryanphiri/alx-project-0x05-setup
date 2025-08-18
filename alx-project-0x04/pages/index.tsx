import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  // Redirect to the counter app by default
  useEffect(() => {
    router.push('/counter-app');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Counter App</title>
        <meta name="description" content="Counter App with Next.js and Context API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Counter App</h1>
        <p className="text-gray-600">Redirecting to the counter app...</p>
      </div>
    </div>
  );
}
