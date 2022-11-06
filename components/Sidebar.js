import React from 'react'
import styled from 'styled-components';
import { Avatar, Button, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import Chat from './Chat';

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
        (chatus) =>
        chatus.data().users.find((userus) => userus === recipientEmail)?.length > 0
    );

    const createChat = () => {
        const input = prompt('Please provide an email address');
        if (!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
            // We need to add the chat to database 'chats' collection
            db.collection("chats").add({
                users: [user.email, input],
            });
        }
    };

  return (
    <Container>
        <Header>
            <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />


            <IconsContainer>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </IconsContainer>
        </Header>

        <Search>
            <SearchIcon />
            <SearchInput placeholder="Search in chats" />
        </Search>

        <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

        {/* List of chats */}
        {chatsSnapshot?.docs.map(chat => (
            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;  /* IE and Edge */
     scrollbar-width: none;     /* Firefox */
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 2px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div``;

const SidebarButton = styled(Button)`
    width: 100%;

    &&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    }
`;