@extends('admin.layouts.app')

@section('title')
    Subscriptions
@endsection

@section('content')
<div class="row my-5">
    <div class="col-md-3">
        @include('admin.layouts.sidebar')
    </div>
    <div class="col-md-9">
        <div class="card">
            <div class="card-header bg-white">
                <h3 class="mt-2">
                    Subscriptions ({{ $subscriptions->count() }})
                </h3>
            </div>
            <div class="card-body">
                <div
                    class="table-responsive"
                >
                    <table
                        class="table"
                    >
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Plan</th>
                                <th scope="col">User</th>
                                <th scope="col">Status</th>
                                <th scope="col">Starting from</th>
                                <th scope="col">Ending on</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($subscriptions as $key => $subscription)
                                <tr>
                                    <td scope="row">{{ $key += 1}} </td>
                                    <td>{{ $subscription->plan->name }}</td>
                                    <td>{{ $subscription->user->email }}</td>
                                    <td>
                                        <span class="badge bg-success">
                                            {{ $subscription->stripe_status }}
                                        </span>
                                    </td>
                                    <td>{{ $subscription->current_period_start }}</td>
                                    <td>{{ $subscription->current_period_end }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    </div>
</div>
@endsection