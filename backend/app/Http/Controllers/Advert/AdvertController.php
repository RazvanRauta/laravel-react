<?php

namespace App\Http\Controllers\Advert;

use App\Http\Controllers\ApiController;
use App\Models\Advert;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdvertController extends ApiController
{
    /**
     * @OA\GET(
     *     path="/api/adverts",
     *     summary="Returns a list of adverts",
     *     @OA\Response(
     *         response=200,
     *         description="List of adverts",
     *     @OA\MediaType(
     *         mediaType="application/json",
     *         @OA\Schema(),
     * )
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $adverts = Advert::paginate(6);
        return $adverts ?
            $this->successResponse($adverts) :
            $this->errorResponse('No adverts were found', 404);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        return $this->successResponse(Advert::create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $advert = Advert::find($id);
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
     */
    public function delete($id): JsonResponse
    {
        $advert = Advert::findOrFail($id);
        $advert->delete();

        return $this->successResponse(null, 'Advert deleted', 204);
    }
}
