<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\ApiController;
use App\Jobs\SendMailNewUser;
use App\Jobs\SendWelcomeMail;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends ApiController
{
    /**
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function login(Request $request): ?JsonResponse
    {
        try {
            $validator = $this->validateLoginCreds();
            if ($validator->fails()) {
                return $this->errorResponse($validator->messages(), 422);
            }
            $credentials = request(['email', 'password']);
            if (!Auth::attempt($credentials)) {
                return $this->errorResponse('Invalid credentials', 401);
            }
            $user = User::where('email', $request->email)->first();
            if (!Hash::check($request->password, $user->password, [])) {
                return $this->errorResponse('Wrong Password', 401);
            }
            $tokenResult = $user->createToken('authToken')->plainTextToken;

            return $this->successResponse(['access_token' => $tokenResult,
                'token_type' => 'Bearer']);
        } catch (Exception $error) {
            return $this->errorResponse($error, 401);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function register(Request $request): ?JsonResponse
    {
        try {
            $validator = $this->validateRegisterCreds();
            if ($validator->fails()) {
                return $this->errorResponse($validator->messages(), 422);
            }

            $user = User::where('email', $request->email)->first();

            if (!$user && !empty($request->name)
                && !empty($request->email)
                && !empty($request->password)) {

                $user = new User();
                $user->name = $request->name;
                $user->email = $request->email;
                $user->password = Hash::make($request->password);

                $user->save();

                SendMailNewUser::dispatch($user);
                SendWelcomeMail::dispatch($user);

                $tokenResult = $user->createToken('authToken')->plainTextToken;

                return $this->successResponse(['access_token' => $tokenResult,
                    'token_type' => 'Bearer']);

            }

            return $this->errorResponse("User with e-mail $request->email already exists", 403);

        } catch (Exception $error) {
            return $this->errorResponse($error, 401);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return $this->successResponse(["success" => true]);
        } catch (Exception $error) {
            return $this->errorResponse($error, 422);
        }
    }

    public function validateLoginCreds()
    {
        return Validator::make(request()->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);
    }

    public function validateRegisterCreds()
    {
        return Validator::make(request()->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
            'name' => 'required|string',
        ]);
    }
}
