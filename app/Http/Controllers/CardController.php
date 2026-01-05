<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCardRequest;
use App\Http\Requests\UpdateCardRequest;
use App\Http\Resources\CardResource;
use App\Http\Resources\DeckResource;
use App\Models\Card;
use App\Models\Deck;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Deck $deck)
    {

        $cards = $deck->cards;

        return Inertia::render('flashcard/Index', [
            'cards' => CardResource::collection($cards),
            'deck' => $deck
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCardRequest $request, Deck $deck)
    {
        Card::create([
            'question' => $request->validated('question'),
            'correct_answer' => $request->validated('correct_answer'),
            'deck_id' => $deck->id
        ]);

        return redirect()->route('cards.index', ["deck" => $deck])
            ->with('message', 'Card created with success!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Card $card)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Card $card)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCardRequest $request, Card $card)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $card)
    {
        //
    }
}
