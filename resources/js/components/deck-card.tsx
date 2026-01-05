import { Calendar, Layers, MoreHorizontal, MoreHorizontalIcon, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Link, router } from '@inertiajs/react';

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
import { DeckType } from "@/types"
import { index as cardList } from "@/routes/cards"

interface DeckProps {
	deck: DeckType,
	progress: number | null,
	cards: number,
	active: boolean,
	nextReview: Date | null,
	onEdit: (deck : DeckType) => void,
	onDelete: (deck : DeckType) => void
}

export function DeckCard({deck, progress, cards, active, nextReview, onEdit, onDelete } : DeckProps) {

	return (
		<Card className="w-full max-w-sm h-60 overflow-hidden transition-all hover:shadow-md flex flex-col justify-between">
			<CardHeader className="pb-1 flex-1">
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
			<Link href={cardList({deck: deck.id})} className="w-full">
				<Button className="w-full gap-2 cursor-pointer" size="sm">
				<Play className="w-4 h-4 fill-current" /> Study Now
				</Button>
			</Link>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
				<Button variant="outline" aria-label="Open menu" size={"sm"}>
					<MoreHorizontalIcon />
				</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-40" align="end">
				<DropdownMenuLabel className="">Deck Actions</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem onSelect={() => onEdit(deck)}>
					Edit
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => onDelete(deck)}>
					Delete
					</DropdownMenuItem>
				</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>

			</CardFooter>
	  	</Card>
  	)
}
