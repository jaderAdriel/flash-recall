import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { DeckType, FlashCardType } from "@/types"
import { useState } from "react"
import { ShieldQuestionIcon, EyeClosedIcon, MoreHorizontalIcon, Play, Zap } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

interface FlashCardProps {
    card: FlashCardType
    onEdit: () => void
    onDelete: () => void
}

export function FlashCard({ card, onEdit, onDelete }: FlashCardProps) {
    const [showBack, setShowBack] = useState(false);
    const reviews = [
      { status: 'correct' },
      { status: 'correct' },
      { status: 'incorrect' },
      { status: 'correct' },
      { status: 'correct' }
    ];

    const question = (max: number) => {
      if (card.question.length < max) return card.question;

      return card.question.slice(0, max) + '...';
    }

    return (
    <>
    <Card className="w-full md:max-w-80 md:h-50 overflow-hidden transition-all hover:shadow-md flex flex-col justify-between gap-1 p-2"  onClick={() => {setShowBack(!showBack)}}>
      <CardHeader className="flex-row justify-between items-start space-y-0 p-2 flex-1">
        <div className="flex flex-col gap-1">
            <CardTitle className="text-sm leading-tight text-foreground flex gap-2">
                {question(80)}
            </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-1 p-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Last answers</span>
        <div className="flex gap-1 mt-1">
            {reviews.map((rev, i) => (
                <div
                    key={i}
                    className={cn(
                        "h-2 w-2 rounded-full",
                        rev.status === 'correct' ? "bg-green-500 shadow-[0_0_5px_#22c55e]" : "bg-red-500 shadow-[0_0_5px_#ef4444]"
                    )}
                    title={rev.status === 'correct' ? 'Acerto' : 'Erro'}
                />
            ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-2">
        <Button className="w-full gap-2 cursor-pointer" variant={"outline"} size="sm">
          <Zap className="w-4 h-4" /> Recall
        </Button>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" aria-label="Open menu" size={"sm"}>
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuLabel className="">Card Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation()
                        onEdit()
                    }}
                >
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation()
                        onDelete()
                    }}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
    </>
  )
}
