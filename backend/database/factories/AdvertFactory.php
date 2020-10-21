<?php

namespace Database\Factories;

use App\Models\Advert;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdvertFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Advert::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(5),
            'description' => $this->faker->paragraph,
            'price' => $this->faker->numberBetween(100, 1000) . '/ month',
            'postedDate' => $this->faker->dateTime,
            'advertUrl' => $this->faker->url,
            'imageUrl' => $this->faker->imageUrl(),
            'advertId' => '#' . $this->faker->numberBetween(10000, 100000),
            'rooms' =>$this->faker->numberBetween(1,4)
        ];
    }
}
