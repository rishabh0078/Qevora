<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderBy('order', 'asc')->get();
        return response()->json($services);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'features' => 'nullable|array',
            'icon' => 'nullable',
            'order' => 'nullable|integer'
        ]);

        $service = Service::create($validated);
        return response()->json($service, 201);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'nullable',
            'description' => 'nullable',
            'features' => 'nullable|array',
            'icon' => 'nullable',
            'order' => 'nullable|integer'
        ]);

        $service->fill($request->all());
        $service->save();

        return response()->json($service);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();
        return response()->json(['message' => 'Service deleted']);
    }
}
