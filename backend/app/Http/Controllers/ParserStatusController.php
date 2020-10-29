<?php

namespace App\Http\Controllers;

use App\Models\ParserStatus;
use Illuminate\Http\JsonResponse;

class ParserStatusController extends ApiController
{
    /**
     * Display the specified resource.
     *
     * @return JsonResponse
     */
    public function show(): JsonResponse
    {
        $status = ParserStatus::find(1);
        return $status ?
            $this->successResponse($status) :
            $this->errorResponse("No status yet", 404);
    }
}
