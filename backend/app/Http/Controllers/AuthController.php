<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
/**
 * @OA\Post(
 *     path="/api/login",
 *     summary="Login with email and password",
 *     @OA\RequestBody(
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 @OA\Property(
 *                     property="email",
 *                     type="string"
 *                 ),
 *                 @OA\Property(
 *                     property="password",
 *                     type="string"
 *                 ),
 *                 example={"email": "test@testy.com", "password": "password"}
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Access code",
 *     @OA\MediaType(
 *         mediaType="application/json",
 *         @OA\Schema(
 *                 @OA\Property(
 *                     property="status_code",
 *                     type="int"
 *                 ),
 *                 @OA\Property(
 *                     property="access_token",
 *                     type="string"
 *                 ),
 *                @OA\Property(
 *                     property="token_type",
 *                     type="string"
 *                 ),
 *              example={
 *                 "status_code": 200,
 *                 "access_token": "1|CLjA6Efso0bncROxknVwpdWqJx8Ohg1OazrAut8M",
 *                 "token_type": "Bearer"
 *                  }
 *        ),
 *     )
 *     ),
 * )
 */
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'email|required',
                'password' => 'required',
            ]);
            $credentials = request(['email', 'password']);
            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'status_code' => 401,
                    'message' => 'Unauthorized',
                ]);
            }
            $user = User::where('email', $request->email)->first();
            if (!Hash::check($request->password, $user->password, [])) {
                throw new \Exception('Error in Login');
            }
            $tokenResult = $user->createToken('authToken')->plainTextToken;
            return response()->json([
                'status_code' => 200,
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
            ]);
        } catch (Exception $error) {
            return response()->json([
                'status_code' => 401,
                'message' => 'Error in Login',
                'error' => $error,
            ]);
        }
    }
}
