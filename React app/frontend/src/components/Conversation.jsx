import { useState, useCallback } from 'react';
import { Conversation } from '@11labs/client';
import { styles } from './Conversation/styles';
import { AGENT_ID } from './Conversation/types';
import Avatar from './Conversation/Avatar';
import StatusInfo from './Conversation/StatusInfo';

/**
 * ConversationComponent manages the voice conversation with an AI agent
 */
const ConversationComponent = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [isStarted, setIsStarted] = useState(false);
  const [conversationInstance, setConversationInstance] = useState(null);

  const toggleConversation = useCallback(async () => {
    if (!isStarted) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });

        const conversation = await Conversation.startSession({
          agentId: AGENT_ID,
          onConnect: () => {
            setConnectionStatus('Connected');
            setIsStarted(true);
          },
          onDisconnect: () => {
            setConnectionStatus('Disconnected');
            setIsStarted(false);
          },
          onError: (error) => {
            console.error('Error:', error);
          },
          onModeChange: () => {
            // Mode changes are no longer tracked
          },
        });

        setConversationInstance(conversation);
      } catch (error) {
        console.error('Failed to start conversation:', error);
      }
    } else if (conversationInstance) {
      await conversationInstance.endSession();
      setConversationInstance(null);
      setIsStarted(false);
      setConnectionStatus('Disconnected');
    }
  }, [isStarted, conversationInstance]);

  return (
    <div style={styles.container}>
      <Avatar isActive={isStarted} onClick={toggleConversation} />
      <StatusInfo connectionStatus={connectionStatus} />
    </div>
  );
};

export default ConversationComponent;
