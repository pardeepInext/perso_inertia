import React, { useState, useEffect, useRef } from 'react'
import Master from '../layouts/Master';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'
import axios from 'axios';
import { Notify } from 'notiflix';

import NoConversation from '../components/NoConversation';
import RecentChat from '../components/RecentChat';
import Message from '../components/Message'
import '../../sass/chat.scss';



const Chat = ({ asset, unreadcount, currentUser, users, conversations }) => {

    const [messages, setmessages] = useState([]);
    const [channel, setchannel] = useState(null);
    const [typing, settyping] = useState(false);
    const [typingImg, settypingImg] = useState(null);
    const chatMessage = useRef(null);
    const searchConversation = e => {
        Inertia.get(route('search-message'), { search: e.target.value })
    }

    const { post, error, data, setData } = useForm({
        conversation_id: 0,
        message: '',
    });


    const addConvesation = (id) => {

        setmessages(prev => []);

        axios.get(route('add-conversation'), {
            params: { id: id }
        }).then(res => {
            setData('conversation_id', res.data.id);
            if (res.data.messages.length > 0)
                setmessages(prev => [...prev, ...res.data.messages]);

        }).catch(e => Notify.failure("Something went wrong please try again!"));
    }


    const typeMessage = e => {

        setData('message', e.target.value);


    }


    useEffect(() => {

        if (data.conversation_id > 0) {
            let channel = Echo.private(`chat.${data.conversation_id}`);
            
            setchannel(channel);
            
            channel
                .listen('ChatMessage', e => {
                    setmessages(prev => [...prev, e.message]);
                    chatMessage.current.scrollTop = chatMessage.current.scrollHeight;
                })

                .listenForWhisper('typing', (e) => {
                    settypingImg(e.image)
                    settyping(e.typing);
                    chatMessage.current.scrollTop = chatMessage.current.scrollHeight;
                    //- chatMessage.current.clientHeight
                    
                })

        }
    }, [data.conversation_id]);

    return (
        <Master asset={asset} unreadcount={unreadcount} currentUser={currentUser}>
            <Head title="Messages" />
            <section>
                <div className="container my-5">
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="inbox_people">
                                <div className="headind_srch d-flex align-items-center">
                                    <div className="recent_heading">
                                        <h4>Recent</h4>
                                    </div>
                                    <div className="srch_bar ms-2">
                                        <div className="stylish-input-group">
                                            <input type="text" className="search-bar" placeholder="Search.." onChange={searchConversation} />
                                        </div>
                                    </div>
                                </div>
                                <div className="inbox_chat">
                                    {conversations.length > 0 ? conversations.map(conversation => <RecentChat key={conversation.id}
                                        conversation={conversation}
                                        addConvesation={addConvesation}
                                    />) : <NoConversation users={users}
                                        addConvesation={addConvesation}
                                    />}
                                </div>
                            </div>
                            <div className="mesgs" ref={chatMessage}>
                                {data.conversation_id != 0 &&
                                    <>
                                        <div className="msg_history" >
                                            {messages.length > 0 ? messages.map(message => <Message key={message.id}

                                                message={message}
                                                currentUserId={currentUser.id}

                                            />) :
                                                (<p>Start Conversation</p>)
                                            }
                                            {typing &&
                                                <div className="incoming_msg mb-2">
                                                    <div className="incoming_msg_img"> <img src={typingImg} alt="sunil" /> </div>
                                                    <div className="received_msg">
                                                        <div className="received_withd_msg">
                                                            <div className="chat-bubble">
                                                                <div className="typing">
                                                                    <div className="dot" />
                                                                    <div className="dot" />
                                                                    <div className="dot" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="type_msg">
                                            <div className="input_msg_write">
                                                <input type="text" className="write_msg" placeholder="Type a message" onChange={typeMessage}
                                                    onFocus={() => {
                                                        channel.whisper('typing', {
                                                            typing: true,
                                                            image: currentUser.profile_image
                                                        });
                                                    }}

                                                    onBlur={() => {
                                                        channel.whisper('typing', {
                                                            typing: false,
                                                            image: currentUser.profile_image
                                                        });
                                                    }}
                                                />
                                                <button className="msg_send_btn" type="button"
                                                    onClick={() => post(route('message-sent'), {
                                                        preserveScroll: true,

                                                    })}
                                                >
                                                    <i className="fas fa-paper-plane" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>

                        </div>
                    </div></div>

            </section>
        </Master>
    )
}

export default Chat
