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
            'account_id' => 'required|exists:accounts,id',
        ]);

        $account = auth()->user()->accounts()->findOrFail($data['account_id']);

        $category = auth()->user()->categories()->findOrFail($data['category_id']);

        if ($category->type === 'income') {
            $account->balance += $data['amount'];
        } else {
            $account->balance -= $data['amount'];
        }
        $account->save();

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
            'account_id' => 'exists:accounts,id',
        ]);

        $oldAccount = $transaction->account;
        $oldCategory = $transaction->category;
        $oldAmount = $transaction->amount;

        if ($oldCategory->type === 'income') {
            $oldAccount->balance -= $oldAmount;
        } else {
            $oldAccount->balance += $oldAmount;
        }
        $oldAccount->save();

        $transaction->update($data);

        $newAccount = $transaction->account;
        $newCategory = $transaction->category;

        if ($newCategory->type === 'income') {
            $newAccount->balance += $transaction->amount;
        } else {
            $newAccount->balance -= $transaction->amount;
        }
        $newAccount->save();

        return $transaction;
    }

    public function destroy(Transaction $transaction)
    {
        $this->authorize('delete', $transaction);

        $account = $transaction->account;
        $category = $transaction->category;

        if ($category->type === 'income') {
            $account->balance -= $transaction->amount;
        } else {
            $account->balance += $transaction->amount;
        }
        $account->save();

        $transaction->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
