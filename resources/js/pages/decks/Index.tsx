

import { BreadcrumbItem, DeckType } from '@/types';
import { index as listAll, store as storeDeck } from '@/routes/decks';
import { index as listAllCards } from '@/routes/cards';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { DeckCard } from '@/components/deck-card';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import DeckDeleteModal from './partials/DeckDeleteModal';
import DeckFormModal from './partials/DeckFormModal';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Decks',
        href: listAll().url,
    },
];

interface Props {
    decks: DeckType[];
}

export default function DeckList({decks} : Props) {
	const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);
	const [modalType, setModalType] = useState<'form' | 'delete' | null>(null);

	const handleEdit = (deck: DeckType) => {
		setSelectedDeck(deck);
		setModalType('form');
	};

	const handleDelete = (deck: DeckType) => {
		setSelectedDeck(deck);
		setModalType('delete');
	};

	const handleSuccessEdit = (deck: DeckType | null) => {
		if (!deck) return; 
		router.get(listAllCards({deck: deck.id}))
	}

	const closeModal = () => {
		setModalType(null);
		setSelectedDeck(null);
	};

  	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Decks" />
			<div className="flex flex-wrap gap-2 p-4">
				{decks.map((deck) => (
					<DeckCard
						deck={deck}
						active={true}
						progress={50}
						nextReview={new Date("2025-12-12")}
						cards={10}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				))}
			</div>
			
			{selectedDeck && 
			<DeckDeleteModal
				open={modalType === "delete"}
				deck={selectedDeck}
				onClose={closeModal}
			/>}

			<DeckFormModal
				open={modalType === "form"}
				deck={selectedDeck}
				onSuccess={closeModal}
				onCancel={closeModal}
			/>

			<div className='rounded-full bg-green-900 p-4 w-fit fixed m-4 right-0 bottom-0' aria-label='Create new label'
				onClick={() => setModalType("form")}
				>
				<Plus />
			</div>
		</AppLayout>
  	)
}
