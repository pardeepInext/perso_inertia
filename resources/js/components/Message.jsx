import React from 'react'

const Message = (props) => {
    const {message,currentUserId} = props;

    return (
        <>

            {message.sender_id == currentUserId ? (
                <div className="outgoing_msg">
                    <div className="sent_msg">
                        <p>{message.message}</p>
                        <span className="time_date">{message.time}</span> </div>
                </div>

            ) : (
                <div className="incoming_msg">
                    <div className="incoming_msg_img"> <img src={message.sender.profile_image} alt="sunil" /> </div>
                    <div className="received_msg">
                        <div className="received_withd_msg">
                            <p>{message.message}</p>
                            <span className="time_date">{message.time}</span></div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Message
