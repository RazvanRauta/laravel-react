@component('mail::message')
    # Welcome to <br/> {{ config('app.name') }}

    Hi, {{$user->name}}!

    Thanks for joining,<br/>
    Admin
@endcomponent
