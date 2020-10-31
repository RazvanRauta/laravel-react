@component('mail::message')

    New user has registered.

    @component('mail::panel')
        Name: {{$user->name}}<br/>Email: {{$user->email}}
    @endcomponent

    Have a wonderful day,<br>
    Admin
@endcomponent
