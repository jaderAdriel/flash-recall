
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { DeckType } from '@/types'
import { destroy } from '@/routes/decks'
import React, { useState } from 'react'
import { router } from '@inertiajs/react'
import { CardTitle } from '@/components/ui/card'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

interface DeckDeleteModalProps {
    open: boolean,
    deck: DeckType,
    onClose: () => void,
}

function DeckDeleteModal({open, deck, onClose} : DeckDeleteModalProps) {

    const [error, setError] = useState('');

    const handleDelete = () => {
        router.delete(destroy({deck: deck.id}).url, {
            onSuccess: () => {
                onClose();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                setError(firstError);
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={() => {onClose?.()}}>
            
            <DialogContent className="sm:max-w-[400px] p-4">
                <DialogHeader>
                    <DialogTitle className='font-bold'>Confirm delete</DialogTitle>
                    <DialogDescription>Are you sure you want to delete the deck "{deck.name}"?</DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="bg-destructive/10 p-3 rounded-md border border-destructive/20 mb-4">
                        <p className="text-sm text-destructive font-medium">{error}</p>
                    </div>
                )}

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={() => onClose()}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleDelete()}
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeckDeleteModal