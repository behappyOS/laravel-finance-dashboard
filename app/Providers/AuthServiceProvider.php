<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Account;
use App\Policies\AccountPolicy;
use App\Models\Category;
use App\Policies\CategoryPolicy;
use App\Models\Transaction;
use App\Policies\TransactionPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Account::class => AccountPolicy::class,
        Category::class => CategoryPolicy::class,
        Transaction::class => TransactionPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
