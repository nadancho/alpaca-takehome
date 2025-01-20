'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (
        <div className='flex min-h-screen flex-col items-center justify-center gap-8 p-8 text-center'>
            <h1 className='text-3xl font-bold'>
                Alpaca Health Platform Take-Home: Nathan Cho
            </h1>

            <p className='max-w-lg text-lg'>
                Please click the button below to go to the Note Taking Area.
            </p>

            <Button
                variant='outlined'
                onClick={() => {
                    router.push('/notes');
                }}
            >
                START
            </Button>
        </div>
    );
}
