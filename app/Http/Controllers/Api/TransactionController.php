<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        return auth()->user()->transactions()->with('category')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
        ]);

        return auth()->user()->transactions()->create($data);
    }

    public function show(Transaction $transaction)
    {
        $this->authorize('view', $transaction);
        return $transaction->load('category');
    }

    public function update(Request $request, Transaction $transaction)
    {
        $this->authorize('update', $transaction);

        $data = $request->validate([
            'description' => 'string',
            'amount' => 'numeric',
            'date' => 'date',
            'category_id' => 'exists:categories,id',
        ]);

        $transaction->update($data);
        return $transaction;
    }

    public function destroy(Transaction $transaction)
    {
        $this->authorize('delete', $transaction);
        $transaction->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
