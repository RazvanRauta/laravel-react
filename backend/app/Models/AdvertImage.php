<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\AdvertImage
 *
 * @property string $imageUrl
 * @property-read Advert $advert
 * @method static Builder|AdvertImage newModelQuery()
 * @method static Builder|AdvertImage newQuery()
 * @method static Builder|AdvertImage query()
 * @mixin Eloquent
 * @property int $id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int $advert_id
 * @method static Builder|AdvertImage whereAdvertId($value)
 * @method static Builder|AdvertImage whereCreatedAt($value)
 * @method static Builder|AdvertImage whereId($value)
 * @method static Builder|AdvertImage whereImageUrl($value)
 * @method static Builder|AdvertImage whereUpdatedAt($value)
 */
class AdvertImage extends Model
{
    use HasFactory;

    public function advert()
    {
        return $this->belongsTo(Advert::class);
    }
}
