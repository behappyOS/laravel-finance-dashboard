<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index()
    {
        return auth()->user()->accounts;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'balance' => 'required|numeric',
        ]);

        return auth()->user()->accounts()->create($validated);
    }

    public function show(Account $account)
    {
        $this->authorize('view', $account);
        return $account;
    }

    public function update(Request $request, Account $account)
    {
        $this->authorize('update', $account);
        $account->update($request->only('name', 'balance'));
        return $account;
    }

    public function destroy(Account $account)
    {
        $this->authorize('delete', $account);
        $account->delete();
        return response()->noContent();
    }
}
