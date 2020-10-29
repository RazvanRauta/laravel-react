<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\ApiController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class UserController extends ApiController
{

    public function index()
    {
        $users = User::all();
        return $this->successResponse($users);
    }

    public function current(){
        $user = Auth::user();
        return $user ?
         $this->successResponse($user, null, 200) :
            $this->errorResponse('You are not logged in', 401);
    }

    public function store(Request $request)
    {
        $validator = $this->validateUser();
        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(), 422);
        }

        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);

        return $this->successResponse($user, 'User Created', 201);
    }

    public function validateUser()
    {
        return Validator::make(request()->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    public function show(User $user)
    {
        return $this->successResponse($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return $this->successResponse(null, 'User Deleted');
    }
}
