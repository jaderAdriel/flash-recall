

import { BreadcrumbItem, Deck } from '@/types';
import { index as listAll, store as storeDeck } from '@/routes/decks';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { DeckCard } from '@/components/deck-card';
import DeckForm from './DeckForm';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Decks',
        href: listAll().url,
    },
];

interface Props {
    decks: Deck[];
}

export default function DeckList({decks} : Props) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Decks" />
        <div className="flex items-start h-full flex-1 gap-4 flex-wrap rounded-xl p-4">
          {decks.map((deck) => (
              
              <DeckCard
                deck={deck}
                active={true}
                progress={50}
                nextReview={new Date("2025-12-12")}
                cards={10}
              />
          ))}
            
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setOpenDialog(true)}>New Deck</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0 border-0">
            <DeckForm onSuccess={() => setOpenDialog(false)} onCancel={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>

    </AppLayout>
  )
}
