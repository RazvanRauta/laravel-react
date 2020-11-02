<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\Advert
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $price
 * @property string $postedDate
 * @property string $advertUrl
 * @property string $imageUrl
 * @property int $rooms
 * @property string $advertId
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|Advert newModelQuery()
 * @method static Builder|Advert newQuery()
 * @method static Builder|Advert query()
 * @method static Builder|Advert whereAdvertId($value)
 * @method static Builder|Advert whereAdvertUrl($value)
 * @method static Builder|Advert whereCreatedAt($value)
 * @method static Builder|Advert whereDescription($value)
 * @method static Builder|Advert whereId($value)
 * @method static Builder|Advert whereImageUrl($value)
 * @method static Builder|Advert wherePostedDate($value)
 * @method static Builder|Advert wherePrice($value)
 * @method static Builder|Advert whereRooms($value)
 * @method static Builder|Advert whereTitle($value)
 * @method static Builder|Advert whereUpdatedAt($value)
 * @mixin Eloquent
 * @property-read Collection|AdvertImage[] $images
 * @property-read int|null $images_count
 * @property string $size
 * @method static Builder|Advert whereSize($value)
 * @property string $floor
 * @method static Builder|Advert whereFloor($value)
 * @property string $priceType
 * @method static Builder|Advert wherePriceType($value)
 * @property string|null $region
 * @property string|null $city
 * @method static Builder|Advert whereCity($value)
 * @method static Builder|Advert whereRegion($value)
 */
class Advert extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'price',
        'priceType'
    ];

    public function images()
    {
        return $this->hasMany(AdvertImage::class, 'advert_id', "id");
    }
}
