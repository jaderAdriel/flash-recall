import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Form } from '@inertiajs/react'
import { store } from '@/routes/cards'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'
import { Spinner } from '@/components/ui/spinner'
import { DeckType, FlashCardType } from '@/types'

interface CardFormProps {
  flashCard?: FlashCardType,
  deck: DeckType
  onSuccess?: () => void,
  onCancel?: () => void
}

export default function FlashCardForm({flashCard, deck, onSuccess, onCancel} : CardFormProps) {

    return (
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle>Create a new Deck</CardTitle>
          </CardHeader>

          <CardContent>
              <Form
                  method="post"
                  action={flashCard ? `/cards/${flashCard.id}` : `/cards/${deck.id}`}
                  onSuccess={() => onSuccess?.()}
              >
                  {({ errors, processing }) => (
                      <>
                          {flashCard && <input type="hidden" name="_method" value="PUT" />}

                          <div className="grid gap-4">
                              <div className="grid gap-2">
                                  <Label htmlFor="card-question">Question</Label>
                                  <Input
                                      id="card-question"
                                      type="text"
                                      name="question"
                                      defaultValue={flashCard?.question ?? ''}
                                      required
                                      autoFocus
                                  />
                                  <InputError message={errors.question} />
                              </div>

                              <div className="grid gap-2">
                                  <Label htmlFor="card-correct_answer">Answer</Label>
                                  <Textarea
                                      id="card-correct_answer"
                                      name="correct_answer"
                                      required
                                      defaultValue={flashCard?.correct_answer ?? ''}
                                  />
                                  <InputError message={errors.correct_answer} />
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
                      </>
                  )}
              </Form>
          </CardContent>
        </Card>
    )
}
