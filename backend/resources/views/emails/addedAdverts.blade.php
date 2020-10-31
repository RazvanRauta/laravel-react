@component('mail::message')
New Adverts were added.

@foreach($adverts as $advert)

[{{$advert->title}}]({{ url('https://ama.rrazvan.dev/adv/'.$advert->id) }})

@endforeach

Have a good day,<br>
Admin
@endcomponent
