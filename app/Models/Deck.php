<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Deck extends Model
{
    protected $fillable = [
        'name',
        'description',
        'created_by',
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');    
    }

    public function decks() 
    {
        return $this->hasMany(Deck::class, 'created_by');
    }
}
