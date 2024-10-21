<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Db;
use Illuminate\Support\Facades\Auth;
// use App\Http\Middleware\UserAuth;


class UserController extends Controller
{
    public function index()
    {
        return view('admin/login');
    }
    public function login(Request $request)
    {
    
        $email = $request->email;
        $password = $request->password;
        // echo $email;
        // exit;

        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            // $users = DB::table('user')->get()
            // return view('admin/login');
            return view('admin/login');
        }else{
            $dpt = DB::table('department')->get();
            $Emp = DB::table('employee')->get();
            $total_dpt = DB::table('department')->count();
        return view('admin/user',compact('dpt'),compact('Emp'));
        }

    }
    public function dashboard()
    {
        

    }
    public function logout(Request $reques)
    {
        Auth::logout();
        return redirect('/login');
    }
}
