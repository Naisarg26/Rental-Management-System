import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';

function ChatComponent() {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      let currentTalkUserConfig;

      // Check if there is an email in local storage
      if (window.localStorage.getItem("email") != null) {
        currentTalkUserConfig = {
          id: window.localStorage.getItem("email"),
          name: window.localStorage.getItem('username'),
          email: window.localStorage.getItem("email"),
          welcomeMessage: 'Hello!',
          role: "Renter"
        };
      } else {
        // Check if there is a random number in local storage
        if (window.localStorage.getItem("randomId") != null) {
          currentTalkUserConfig = {
            id: window.localStorage.getItem("randomId"),
            name: 'Guest',
            email: 'Guest',
            welcomeMessage: 'Hello!',
            role: "Renter"
          };
        } else {
          // Generate a random number and store it in local storage
          const randomId = Math.floor(Math.random() * 1000000);
          window.localStorage.setItem('randomId', randomId);

          currentTalkUserConfig = {
            id: randomId,
            name: 'Guest',
            email: 'Guest',
            welcomeMessage: 'Hello!',
            role: "Renter"
          };
        }
      }

      console.log("log--");
      console.log(currentTalkUserConfig);
      const newUser = new Talk.User(currentTalkUserConfig);

      // Cleanup previous conversation and related objects
      if (currentUser) {
        currentUser.destroy();
      }
      if (currentConversation) {
        currentConversation.destroy();
      }

      setCurrentUser(newUser);

      const otherUser = new Talk.User({
        id: '2',
        name: 'Owner',
        email: 'jessicawells@example.com',
        welcomeMessage: 'Hello!',
        role: 'Owner',
      });

      const session = new Talk.Session({
        appId: 'tPyjFWSw',
        me: newUser,
      });

      const conversationId = Talk.oneOnOneId(newUser, otherUser);
      console.log("conversationId " + conversationId);
      const newConversation = session.getOrCreateConversation(conversationId);
      newConversation.setParticipant(newUser);
      newConversation.setParticipant(otherUser);

      setCurrentConversation(newConversation);

      const popup = session.createPopup();
      popup.select(newConversation);
      popup.mount({ show: false });

      const button = document.getElementById('btn-getInTouch');
      button.addEventListener('click', (event) => {
        event.preventDefault();
        popup.show();
      });
    }
  }, [talkLoaded]);

  return (
    <button id="btn-getInTouch"></button>
  )
}

export default ChatComponent;