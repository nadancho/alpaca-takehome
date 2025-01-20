'use server';

import InputAreaMain from '@/app/components/input-area/InputAreaMain';
import TopNavMain from '@/app/components/topnav/TopNavMain';

export default async function NotesPage() {
    return (
        <div id='main-conainer' className='flex flex-col mx-auto w-full'>
            <div id='top-bar'>
                <TopNavMain></TopNavMain>
            </div>
            <div className='flex flex-row justify-between gap-4 p-4'>
                <InputAreaMain />
            </div>
        </div>
    );
}
