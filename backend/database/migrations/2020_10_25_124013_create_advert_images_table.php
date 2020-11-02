<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdvertImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('advert_images', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->bigInteger('advert_id')->unsigned();
            $table->string('imageUrl');
            $table->foreign('advert_id')
                ->references('id')
                ->on('adverts')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('advert_images');
    }
}
