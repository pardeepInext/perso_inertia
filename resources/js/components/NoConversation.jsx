import React from 'react'

const NoConversation = (props) => {
    const { users, addConvesation } = props;

    return (
        <>
            <div style={{ margin: '18px 16px 10px', cursor: 'pointer' }}>
                {users.map(user => (
                    <div className="chat_people py-1" key={user.id} onClick={() => addConvesation(user.id)}>
                        <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                        <div className="chat_ib">
                            <h5>{user.name}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default NoConversation
