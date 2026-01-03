import { Calendar, Layers, MoreHorizontal, MoreHorizontalIcon, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { router } from '@inertiajs/react';

import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import DeckForm from "@/pages/decks/DeckForm"
import { Deck } from "@/types"

interface DeckProps {
    deck: Deck,
    progress: number | null,
    cards: number,
    active: boolean,
    nextReview: Date | null
}

export function DeckCard({deck, progress, cards, active, nextReview } : DeckProps) {
  const [showNewDialog, setShowNewDialog ] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    function handleDelete() {
        router.delete(`/decks/${deck.id}`, {
            onSuccess: () => {
                console.log("Deck deleted!");
                setShowDeleteDialog(false);
            },
            onError: (errors) => console.error(errors),
        });
    }

    return (
    <>
    <Card className="w-full max-w-sm overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-1">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl">{deck.name} #{deck.id}</CardTitle>
            <CardDescription>{ deck.description }</CardDescription>
          </div>
          <Badge variant="secondary" className="flex gap-1 dark:bg-black-900">
            <Layers className="w-3 h-3" /> {cards}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-1">
        <div className="flex flex-col gap-2">

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>


          <div className="flex items-center gap-4 text-sm text-muted-foreground">

            {nextReview ?
              <div className="flex items-center gap-1" title="next review">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {Intl.DateTimeFormat('en-us').format(nextReview)}
                </span>

              </div>
              : null}

            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${active ? "bg-green-500" : "bg-red-500"}`} />
              <span>{active ? "Active" : "deactivated"}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button className="w-full gap-2 cursor-pointer" size="sm">
          <Play className="w-4 h-4 fill-current" /> Study Now
        </Button>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" aria-label="Open menu" size={"sm"}>
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuLabel className="">Deck Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => setShowNewDialog(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogContent className="sm:max-w-[400px] p-4">
                  <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>
                  <p>Are you sure you want to delete the deck "{deck.name}"?</p>
                  <div className="flex justify-end gap-2 mt-4">
                      <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
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

      </CardFooter>
    </Card>
    <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
      <DialogContent className="sm:max-w-[425px] border-0 p-0">
        <DeckForm
          deck={deck}
          onCancel={() => {setShowNewDialog(false)}}
          onSuccess={() => {setShowNewDialog(false)}}
        />
      </DialogContent>
    </Dialog>
    </>
  )
}
