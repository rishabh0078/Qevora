<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    public function index()
    {
        $packages = Package::orderBy('order', 'asc')->get();
        return response()->json($packages);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'features' => 'nullable|array',
            'featured' => 'nullable|boolean',
            'order' => 'nullable|integer'
        ]);

        $package = Package::create($validated);
        return response()->json($package, 201);
    }

    public function show($id)
    {
        $package = Package::findOrFail($id);
        return response()->json($package);
    }

    public function update(Request $request, $id)
    {
        $package = Package::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'nullable',
            'price' => 'nullable',
            'description' => 'nullable',
            'features' => 'nullable|array',
            'featured' => 'nullable|boolean',
            'order' => 'nullable|integer'
        ]);

        $package->fill($request->all());
        $package->save();

        return response()->json($package);
    }

    public function destroy($id)
    {
        $package = Package::findOrFail($id);
        $package->delete();
        return response()->json(['message' => 'Package deleted']);
    }
}
