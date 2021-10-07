import React from 'react'

const RecentChat = ({ addConvesation, conversation }) => {

    let messages = conversation.messages.length > 0 ? conversation.messages : null;
    return (
        <div className="chat_list" style={{ cursor: 'pointer' }} onClick={() => addConvesation(conversation.id)}>
            <div className="chat_people">
                <div className="chat_img"> <img src={conversation.profile_pic} alt="sunil" /> </div>
                <div className="chat_ib">
                    <h5>{conversation.name} <span className="chat_date">{messages != null && messages[0].time}</span></h5>
                    <p>{messages != null && messages[0].you && 'You:'}{messages != null && messages[0].message}</p>
                </div>
            </div>
        </div>

    )
}

export default RecentChat
