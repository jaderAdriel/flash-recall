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
  const [selectedCard, setSelectedCard] = useState<FlashCardType | null>(null);
  const [modalType, setModalType] = useState<'form' | 'delete' | null>(null);

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

    const handleEdit = (card: FlashCardType) => {
        setSelectedCard(card);
        setModalType('form');
    };

    const handleDelete = (card: FlashCardType) => {
        setSelectedCard(card);
        setModalType('delete');
    };

    const closeModal = () => {
        setSelectedCard(null);
        setModalType(null);
    };


    return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={`Cards - ${deck.name}`} />
        <div className="flex flex-wrap gap-2 p-4">
            {cards.map(card => (
                <FlashCard
                    key={card.id}
                    card={card}
                    onEdit={() => handleEdit(card)}
                    onDelete={() => handleDelete(card)}
                />
            ))}
        </div>

        <Dialog open={modalType === 'form'} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[425px] p-0 border-0">
                <FlashCardForm
                    deck={deck}
                    flashCard={selectedCard ?? undefined}
                    onSuccess={closeModal}
                    onCancel={closeModal}
                />
            </DialogContent>
        </Dialog>
    </AppLayout>
  )
}
