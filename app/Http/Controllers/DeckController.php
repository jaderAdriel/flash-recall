<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDeckRequest;
use App\Http\Requests\UpdateDeckRequest;
use App\Http\Resources\DeckResource;
use App\Models\Deck;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class DeckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $decks = Deck::where('created_by', $userId)->get();

        return Inertia::render('decks/index', [
            'decks' => DeckResource::collection($decks)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('decks/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeckRequest $request)
    {

        Deck::create([
            'name' => $request->validated('name'),
            'description' => $request->validated('description'),
            'created_by' => $request->user()->id
        ]);

        return redirect()->route('decks.index')->with('message', 'Deck criado com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Deck $deck)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deck $deck)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDeckRequest $request, Deck $deck)
    {
        Gate::authorize('update', $deck);
        $deck->update($request->validated());

        return redirect()->route('decks.index')->with('message', 'Deck updated with success!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Deck $deck)
    {
        //
    }
}
