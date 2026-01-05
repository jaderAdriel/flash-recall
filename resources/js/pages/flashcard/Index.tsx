import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, DeckType, FlashCardType  } from '@/types'
import { index as listAll } from '@/routes/decks'
import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { FlashCard } from '@/components/flash-card'
import FlashCardForm from './FlashcardForm'

interface CardListProps {
    cards: FlashCardType[],
    deck: DeckType
}



export default function FlashCardList({ cards, deck } : CardListProps) {
  const [openDialog, setOpenDialog] = useState(false);
  
  const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `Decks`,
        href: listAll().url,
    },
    {
        title: `${deck.name}`,
        href: listAll().url,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={`Cards - ${deck.name}`} />
        <div className="flex flex-wrap gap-2 p-4">
          {cards.map((card) => (
              
              <FlashCard card={card} />
          ))}
            
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className='mt-auto' variant="outline" onClick={() => setOpenDialog(true)}>New Card</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0 border-0">
            <FlashCardForm deck={deck} onSuccess={() => setOpenDialog(false)} onCancel={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>

    </AppLayout>
  )
}
