"use client";
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


const BackButton = () => {
    const router = useRouter();

    return (
        <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft/>
        </Button>
    )
}

export default BackButton;