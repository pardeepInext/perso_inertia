<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Events\ChatMessage;
use App\Models\Message;

class MessageController extends Controller
{
    function index()
    {

        $users = [];

        $conversations = Conversation::orWhere('user_1', '=', Auth::id())
            ->orWhere('user_2', '=', Auth::id())
            ->with([
                'messages' => fn ($qry) => $qry->latest()->take(1),
                'messages.sender'
            ])->get();

        if ($conversations->count() == 0) $users = User::where('id', '<>', Auth::id())->take(10)->get();

        return inertia('Chat', compact('conversations', 'users'))->withViewData([
            'key' => 'fasfsa'
        ]);
    }

    function send(Request $request)
    {
        $create = $request->only('message', 'sender_id', 'conversation_id');
        $create['sender_id'] = Auth::id();
        $message = Message::create($create);
        $message->load('sender');
        broadcast(new ChatMessage($message));
        return redirect()->route('message');
    }

    function search(Request $request)
    {
        return $request->search;
    }

    function addConversation(Request $request)
    {
        $conversation = Conversation::orWhere('user_1', Auth::id())
            ->orWhere('user_2', Auth::id())->first();
        if (!$conversation) $conversation = Conversation::create(['user_1' => $request->id, 'user_2' => Auth::id()]);

        $conversation->load(['messages' => fn ($qry) => $qry->take(10), 'messages.sender']);
        return $conversation;
    }
}
