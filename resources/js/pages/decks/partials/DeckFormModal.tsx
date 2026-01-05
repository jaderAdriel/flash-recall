import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Form } from '@inertiajs/react'
import { store, update } from '@/routes/decks'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'
import { Spinner } from '@/components/ui/spinner'
import { DeckType } from '@/types'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface DeckFormModalProps {
    open: boolean,
    deck?: DeckType | null,
    onSuccess?: () => void,
    onCancel?: () => void
}

export default function DeckFormModal({open, deck, onSuccess, onCancel} : DeckFormModalProps) {
    
  return (
        <Dialog open={open} onOpenChange={() => {onCancel?.()}}>
            <DialogContent className="sm:max-w-[425px] p-0 border-0">
                <Card className="w-full sm:max-w-md">
                    <CardHeader>
                        <CardTitle>{deck ? `Update deck ${deck.id}` : 'Create a new Deck' }</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Form 
                            method={deck ? 'put' : 'post'}
                            action={deck ? update({ deck: deck.id }).url : store().url}
                            onSuccess={() => onSuccess?.()}
                        >
                    
                            {({ errors, processing }) => (
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                <Label htmlFor="deck-name">Name</Label>
                                <Input
                                    id="deck-name"
                                    type="text"
                                    name="name"
                                    defaultValue={deck?.name ?? ''}
                                    required
                                    autoFocus
                                    tabIndex={1}
                                />
                                <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                <Label htmlFor="deck-description">Description</Label>
                                <Input
                                    id="deck-description"
                                    type="text"
                                    name="description"
                                    required
                                    defaultValue={deck?.description ?? ''}
                                    autoFocus
                                    tabIndex={1}
                                />
                                <InputError message={errors.description} />
                                </div>

                                <div className="actions flex gap-2">
                                <Button
                                    type="reset"
                                    variant={'secondary'}
                                    className="mt-4 w-full cursor-pointer"
                                    onClick={() => onCancel?.()}
                                    tabIndex={5}
                                    disabled={processing}
                                >
                                    {processing && <Spinner />}
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    className="mt-4 w-full"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    Salvar
                                </Button>
                                </div>
                            </div>
                            )}
                        </Form>
                
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>

    )
}
