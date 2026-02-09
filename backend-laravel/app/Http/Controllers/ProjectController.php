<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('created_at', 'desc')->get();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'category' => 'required',
            'description' => 'nullable',
            'image' => 'required|image',
            'gallery' => 'nullable|array',
            'gallery.*' => 'image',
            'featured' => 'nullable',
            'link' => 'nullable'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $galleryPaths = [];
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $galleryPaths[] = '/storage/' . $path;
            }
        }
        $validated['gallery'] = $galleryPaths;
        $validated['featured'] = $request->featured === 'true' || $request->featured === true;

        $project = Project::create($validated);
        return response()->json($project, 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'nullable',
            'category' => 'nullable',
            'description' => 'nullable',
            'image' => 'nullable|image',
            'gallery' => 'nullable|array',
            'gallery.*' => 'image',
            'featured' => 'nullable',
            'link' => 'nullable'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $project->image = '/storage/' . $path;
        }

        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $galleryPaths[] = '/storage/' . $path;
            }
            $project->gallery = $galleryPaths;
        }

        $project->fill($request->except(['image', 'gallery']));
        if ($request->has('featured')) {
            $project->featured = $request->featured === 'true' || $request->featured === true;
        }
        
        $project->save();

        return response()->json($project);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return response()->json(['message' => 'Project deleted']);
    }
}
