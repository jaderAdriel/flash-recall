<?php

use App\Http\Controllers\DeckController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('decks', [DeckController::class, 'index'])->name('decks.index');
    Route::post('decks', [DeckController::class, 'store'])->name('decks.store');
    Route::put('decks/{deck}', [DeckController::class, 'update'])->name('decks.update');
    Route::delete('decks/{deck}', [DeckController::class, 'destroy'])->name('decks.destroy');
});



require __DIR__.'/settings.php';
