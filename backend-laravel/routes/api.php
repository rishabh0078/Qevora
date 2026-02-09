<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\PackageController;

Route::apiResource('projects', ProjectController::class);
Route::apiResource('services', ServiceController::class);
Route::apiResource('packages', PackageController::class);

