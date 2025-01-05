"use client";
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExternalLinkButton = ({url}: {url: string | null}) => {


    return (
        <Button disabled={!url} onClick={() => {window.open(url!)}}>
            Open
            <ExternalLink/>
        </Button>
    )
}

export default ExternalLinkButton;