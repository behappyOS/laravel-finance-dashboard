<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return auth()->user()->categories()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:income,expense',
        ]);

        return auth()->user()->categories()->create($data);
    }

    public function show(Category $category)
    {
        $this->authorize('view', $category);
        return $category;
    }

    public function update(Request $request, Category $category)
    {
        $this->authorize('update', $category);

        $data = $request->validate([
            'name' => 'string',
            'type' => 'in:income,expense',
        ]);

        $category->update($data);
        return $category;
    }

    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);
        $category->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
