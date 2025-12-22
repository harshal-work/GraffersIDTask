// File: screens/Chat.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width } = Dimensions.get('window');
const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;

// compact responsive size
const BASE_WIDTH = 375;
const scale = width / BASE_WIDTH;
const rs = size => size * scale;

const Chat = () => {
  const navigation = useNavigation();
  const { bgColor } = useColor();
  const scrollViewRef = useRef(null);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm on my way with your order. I'll reach in about 10 minutes.",
      time: '10:55 AM',
      isUser: false,
    },
    {
      id: 2,
      text: 'Okay, thanks for the update!',
      time: '10:56 AM',
      isUser: true,
    },
    {
      id: 3,
      text: 'Could you please share your exact location?',
      time: '10:57 AM',
      isUser: false,
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isUser: true,
    };

    setMessages(prev => [...prev, userMsg]);
    setMessage('');

    setTimeout(() => {
      const autoReply = {
        id: Date.now() + 1,
        text: "Sure, I'll be waiting at the main gate.",
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isUser: false,
      };
      setMessages(prev => [...prev, autoReply]);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />

      {/* HEADER */}
      <View
        style={[
          styles.header,
          { backgroundColor: bgColor, paddingTop: STATUS_BAR_HEIGHT + rs(6) },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require('../../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.agentName}>Mann Sharma</Text>
          <Text style={styles.agentStatus}>Delivery Partner • Online</Text>
        </View>

        <TouchableOpacity style={styles.callButton}>
          <Image
            source={require('../../../assets/call.png')}
            style={styles.callIcon}
          />
        </TouchableOpacity>
      </View>

      {/* CHAT */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.isUser
                  ? [styles.userBubble, { backgroundColor: bgColor }]
                  : styles.agentBubble,
              ]}
            >
              <Text style={[styles.messageText, msg.isUser && styles.userText]}>
                {msg.text}
              </Text>
              <Text style={[styles.messageTime, msg.isUser && styles.userTime]}>
                {msg.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* INPUT */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: message.trim() ? bgColor : '#ccc' },
            ]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Image
              source={require('../../../assets/send.png')}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(14),
    paddingBottom: rs(10),
  },
  backButton: { padding: rs(4) },
  backIcon: {
    width: rs(16),
    height: rs(16),
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  headerInfo: { flex: 1, marginLeft: rs(10) },
  agentName: { color: '#fff', fontSize: rs(13), fontWeight: '700' },
  agentStatus: {
    color: '#fff',
    fontSize: rs(10),
    marginTop: 2,
    opacity: 0.9,
  },
  callButton: {
    padding: rs(6),
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: rs(14),
  },
  callIcon: {
    width: rs(16),
    height: rs(16),
    tintColor: '#fff',
    resizeMode: 'contain',
  },

  chatContainer: { flex: 1 },
  messagesContainer: { flex: 1 },
  messagesContent: {
    paddingHorizontal: rs(14),
    paddingTop: rs(12),
    paddingBottom: rs(6),
  },

  messageBubble: {
    maxWidth: '78%',
    paddingVertical: rs(7),
    paddingHorizontal: rs(10),
    borderRadius: rs(14),
    marginBottom: rs(10),
  },
  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: rs(4),
  },
  agentBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: rs(4),
  },
  messageText: {
    fontSize: rs(12),
    lineHeight: rs(17),
    color: '#000',
  },
  userText: { color: '#fff' },
  messageTime: {
    fontSize: rs(9),
    marginTop: rs(3),
    opacity: 0.7,
  },
  userTime: { color: '#fff', textAlign: 'right' },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: rs(12),
    paddingVertical: rs(8),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: rs(18),
    paddingHorizontal: rs(12),
    paddingVertical: rs(8),
    maxHeight: rs(80),
    marginRight: rs(8),
    fontSize: rs(12),
  },
  sendButton: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    width: rs(16),
    height: rs(16),
    tintColor: '#fff',
    resizeMode: 'contain',
  },
});
