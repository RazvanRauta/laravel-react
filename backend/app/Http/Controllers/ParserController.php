<?php

namespace App\Http\Controllers;

use App\Models\ParserStatus;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Validator;


class ParserController extends ApiController
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
            $this->successResponse(['working' => $status->working === 1]) :
            $this->errorResponse("No status yet", 404);
    }

    public function run(Request $request): JsonResponse
    {
        try {
            $validator = $this->validateParams();
            if ($validator->fails()) {
                return $this->errorResponse($validator->messages(), 422);
            }

            Artisan::queue('rr:parse-web-page', [
                'startingPageNumber' => $request->startingPageNumber ?: 0,
                'maxNumberOfPages' => $request->maxNumberOfPages ?: 3,
            ]);

            return $this->successResponse(["message" => "Command was added to the queue"]);

        } catch (Exception $error) {
            return $this->errorResponse($error, 500);
        }

    }

    public function validateParams(): \Illuminate\Contracts\Validation\Validator
    {
        return Validator::make(request()->all(), [
            'startingPageNumber' => 'int|max:99',
            'maxNumberOfPages' => 'int|max:10',
        ]);
    }
}
