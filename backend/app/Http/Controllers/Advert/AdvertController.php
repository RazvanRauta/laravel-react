<?php

namespace App\Http\Controllers\Advert;

use App\Http\Controllers\ApiController;
use App\Models\Advert;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdvertController extends ApiController
{
    /**
     *
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {

        $rooms = $request->query('rooms') ? explode(',', $request->query('rooms')) : null;
        $price = $request->query('price') ? explode(',', $request->query('price')) : null;

        $adverts = Advert::with('images')
            ->when($rooms, function ($query) use ($rooms) {
                return $query->whereIn('rooms', $rooms);
            })
            ->when($price, function ($query) use ($price) {
                return $query->orWhereBetween('price', $price);
            })
            ->paginate(6);

        return $adverts->total() > 0 ?
        $this->successResponse($adverts) :
        $this->errorResponse('No adverts were found', 404);
    }


    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $advert = Advert::with('images')->find($id);
        return $advert ?
        $this->successResponse($advert) :
        $this->errorResponse("No advert was found with id: $id", 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {
        $advert = Advert::findOrFail($id);
        $advert->update($request->all());

        return $this->successResponse($advert);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     * @throws Exception
     */
    public function delete($id): JsonResponse
    {
        $advert = Advert::findOrFail($id);
        $advert->delete();

        return $this->successResponse(["message"=>'Advert deleted'], null, 200);
    }
}
