@component('mail::message')
    New Adverts were added.

    @foreach($adverts as $advert)

        [{{$advert->title}}]({{ url('/advs/'.$advert->id) }})

    @endforeach

    Have a good day,<br>
    Admin
@endcomponent
