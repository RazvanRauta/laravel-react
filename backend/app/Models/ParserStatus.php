<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\ParserStatus
 *
 * @property boolean $working
 * @method static Builder|ParserStatus newModelQuery()
 * @method static Builder|ParserStatus newQuery()
 * @method static Builder|ParserStatus query()
 * @mixin Eloquent
 * @property int $id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|ParserStatus whereCreatedAt($value)
 * @method static Builder|ParserStatus whereId($value)
 * @method static Builder|ParserStatus whereUpdatedAt($value)
 * @method static Builder|ParserStatus whereWorking($value)
 */
class ParserStatus extends Model
{
    use HasFactory;
}
