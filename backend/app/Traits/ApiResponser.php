<?php

/**
 * @author Razvan Rauta
 * 17.10.2020
 * 21:27
 */

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponser
{

    /**
     *
     * Unify the api success response
     *
     * @param $data
     * @param null $message
     * @param int $code
     * @return JsonResponse
     */
    protected function successResponse($data, $message = null, $code = 200): JsonResponse
    {
        return response()->json([
            'status' => 'Success',
            'message' => $message,
            'data' => $data
        ], $code);
    }

    /**
     *
     * Unify the api error response
     *
     * @param null $message
     * @param $code
     * @return JsonResponse
     */
    protected function errorResponse($message = null, $code): JsonResponse
    {
        return response()->json([
            'status' => 'Error',
            'message' => $message,
            'data' => null
        ], $code);
    }

}
