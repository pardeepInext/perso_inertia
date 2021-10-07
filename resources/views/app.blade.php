<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="key" content="{{ $key ?? '' }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
</head>

<body>
    @inertia
    @routes
    <script src="{{ mix('/js/app.js') }}" defer></script>
</body>

</html>
