import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type ScrollViewInstance,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApiError } from "../services/api-client";
import { sendChatMessage } from "../services/chat-service";

type Language = "English" | "Hindi";
type Message = {
  id: string;
  role: "assistant" | "student";
  text: string;
  createdAt: Date;
  isError?: boolean;
};

export default function ChatScreen() {
  const router = useRouter();
  const { question: questionParam, language: languageParam } =
    useLocalSearchParams<{
      question?: string | string[];
      language?: string | string[];
    }>();
  const language: Language = languageParam === "Hindi" ? "Hindi" : "English";
  const isHindi = language === "Hindi";
  const initialQuestion = Array.isArray(questionParam)
    ? questionParam[0]?.trim()
    : questionParam?.trim();
  const copy = isHindi
    ? {
        assistantTitle: "AI Student Assistant",
        ready: "AI चैट",
        readyLabel: "AI Student Assistant",
        back: "होम डैशबोर्ड पर वापस जाएँ",
        welcome:
          "नमस्ते! मैं शिक्षा साथी AI हूँ। मैं राजस्थान में कॉलेज, कोर्स, प्रवेश, फीस और स्कॉलरशिप की जानकारी पाने में आपकी मदद कर सकता हूँ। आप क्या जानना चाहेंगे?",
        suggestionsTitle: "इनमें से कुछ पूछें",
        suggestions: [
          "राजस्थान में इंजीनियरिंग कॉलेज खोजें।",
          "प्रवेश की क्या आवश्यकताएँ हैं?",
          "छात्रवृत्तियों के बारे में बताएँ।",
          "मैं कॉलेज की फीस कैसे जाँच सकता/सकती हूँ?",
          "12वीं के बाद कौन-कौन से कोर्स कर सकता/सकती हूँ?",
        ],
        placeholder: "अपना सवाल लिखें...",
        send: "संदेश भेजें",
        voiceHint: "वॉइस इनपुट जल्द उपलब्ध होगा।",
        thinking: "जवाब तैयार किया जा रहा है...",
        errorLabel: "AI सहायक अभी उपलब्ध नहीं है",
        connectionError:
          "बैकएंड तक पहुँचा नहीं जा सका। फ़ोन और Mac को एक ही Wi-Fi से जोड़ें, बैकएंड चालू रखें और EXPO_PUBLIC_API_BASE_URL में localhost की जगह Mac का LAN IP रखें।",
        errorReply:
          "कृपया इंटरनेट जाँचकर फिर से प्रयास करें। प्रवेश संबंधी जानकारी आधिकारिक स्रोतों से सत्यापित करें।",
      }
    : {
        assistantTitle: "AI Student Assistant",
        ready: "AI Chat",
        readyLabel: "AI Student Assistant",
        back: "Back to Home Dashboard",
        welcome:
          "Namaste! I'm ShikshaSathi AI. I can help you explore colleges, courses, admissions, fees and scholarships in Rajasthan. What would you like to know?",
        suggestionsTitle: "Suggested questions",
        suggestions: [
          "Find engineering colleges in Rajasthan.",
          "What are the admission requirements?",
          "Tell me about scholarships.",
          "How can I check college fees?",
          "Which courses can I pursue after 12th?",
        ],
        placeholder: "Type your question...",
        send: "Send message",
        voiceHint: "Voice input coming soon.",
        thinking: "Thinking...",
        errorLabel: "AI assistant unavailable",
        connectionError:
          "Can't reach the backend. Put your phone and Mac on the same Wi-Fi, keep the backend running, and use your Mac's LAN IP instead of localhost in EXPO_PUBLIC_API_BASE_URL.",
        errorReply:
          "Please check your internet connection and try again. Verify admission information with official sources.",
      };

  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showVoiceHint, setShowVoiceHint] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      text: copy.welcome,
      createdAt: new Date(),
    },
  ]);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const nextMessageId = useRef(0);
  const processedQuestions = useRef(new Set<string>());
  const hasMountedRef = useRef(false);
  const sendingRef = useRef(false);

  const sendMessage = useCallback(
    async (value: string) => {
      const text = value.trim();
      if (!text || sendingRef.current) return;

      const now = new Date();
      const studentMessage: Message = {
        id: `student-${nextMessageId.current++}`,
        role: "student",
        text,
        createdAt: now,
      };

      sendingRef.current = true;
      setIsSending(true);
      setMessages((current) => [...current, studentMessage]);
      setDraft("");
      setShowVoiceHint(false);

      try {
        const reply = await sendChatMessage(text, language);
        setMessages((current) => [
          ...current,
          {
            id: `assistant-${nextMessageId.current++}`,
            role: "assistant",
            text: reply,
            createdAt: new Date(),
          },
        ]);
      } catch (error) {
        const errorMessage =
          error instanceof ApiError && error.status === undefined
            ? copy.connectionError
            : error instanceof ApiError && error.status === 502
              ? error.message
            : copy.errorReply;
        setMessages((current) => [
          ...current,
          {
            id: `assistant-error-${nextMessageId.current++}`,
            role: "assistant",
            text: errorMessage,
            createdAt: new Date(),
            isError: true,
          },
        ]);
      } finally {
        sendingRef.current = false;
        setIsSending(false);
      }
    },
    [copy.connectionError, copy.errorReply, language],
  );

  useEffect(() => {
    if (!initialQuestion || processedQuestions.current.has(initialQuestion)) {
      return;
    }

    processedQuestions.current.add(initialQuestion);
    sendMessage(initialQuestion);
  }, [initialQuestion, sendMessage]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const frame = requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [messages.length, isSending]);

  const submitDraft = () => {
    void sendMessage(draft);
  };
  const showSuggestions = !messages.some((message) => message.role === "student");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={copy.back}
          onPress={() =>
            router.replace({ pathname: "/home", params: { language } })
          }
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={21} color="#142B50" />
        </TouchableOpacity>

        <View style={styles.headerAvatar}>
          <Ionicons name="sparkles" size={19} color="#FFFFFF" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.brandName}>ShikshaSathi AI</Text>
          <Text style={styles.assistantTitle}>{copy.assistantTitle}</Text>
        </View>
        <View
          style={styles.readyIndicator}
          accessible
          accessibilityLabel={copy.readyLabel}
        >
          <View style={styles.readyDot} />
          <Text style={styles.readyText}>{copy.ready}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardArea}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messageList}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => {
            const isStudent = message.role === "student";
            const time = message.createdAt.toLocaleTimeString(
              isHindi ? "hi-IN" : "en-IN",
              { hour: "numeric", minute: "2-digit" },
            );

            return (
              <View
                key={message.id}
                style={[
                  styles.messageRow,
                  isStudent ? styles.studentMessageRow : styles.assistantMessageRow,
                ]}
              >
                {!isStudent && (
                  <View style={styles.messageAvatar}>
                    <Ionicons name="sparkles" size={15} color="#1769CE" />
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    isStudent ? styles.studentBubble : styles.assistantBubble,
                  ]}
                >
                  {message.isError && (
                    <Text style={styles.errorLabel}>{copy.errorLabel}</Text>
                  )}
                  <Text
                    style={[
                      styles.messageText,
                      isStudent && styles.studentMessageText,
                    ]}
                  >
                    {message.text}
                  </Text>
                  <Text
                    style={[
                      styles.messageTime,
                      isStudent && styles.studentMessageTime,
                    ]}
                  >
                    {time}
                  </Text>
                </View>
                {isStudent && (
                  <View style={[styles.messageAvatar, styles.studentAvatar]}>
                    <Ionicons name="person" size={14} color="#FFFFFF" />
                  </View>
                )}
              </View>
            );
          })}

          {isSending && (
            <View style={[styles.messageRow, styles.assistantMessageRow]}>
              <View style={styles.messageAvatar}>
                <Ionicons name="sparkles" size={15} color="#1769CE" />
              </View>
              <View style={[styles.messageBubble, styles.assistantBubble]}>
                <Text style={styles.messageText}>{copy.thinking}</Text>
              </View>
            </View>
          )}

          {showSuggestions && (
            <View style={styles.suggestionsSection}>
              <Text style={styles.suggestionsTitle}>
                {copy.suggestionsTitle}
              </Text>
              <View style={styles.suggestionsList}>
                {copy.suggestions.map((suggestion) => (
                  <TouchableOpacity
                    key={suggestion}
                    accessibilityRole="button"
                    onPress={() => void sendMessage(suggestion)}
                    style={styles.suggestion}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                    <Ionicons name="arrow-forward" size={16} color="#1769CE" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {showVoiceHint && (
          <Text style={styles.voiceHint}>{copy.voiceHint}</Text>
        )}

        <View style={styles.composer}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={copy.voiceHint}
            onPress={() => setShowVoiceHint((visible) => !visible)}
            style={styles.microphoneButton}
          >
            <Ionicons name="mic-outline" size={21} color="#64748B" />
          </TouchableOpacity>
          <TextInput
            accessibilityLabel={copy.placeholder}
            onChangeText={setDraft}
            editable={!isSending}
            onSubmitEditing={submitDraft}
            placeholder={copy.placeholder}
            placeholderTextColor="#94A3B8"
            returnKeyType="send"
            style={styles.input}
            value={draft}
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={copy.send}
            accessibilityState={{ disabled: !draft.trim() || isSending }}
            disabled={!draft.trim() || isSending}
            onPress={submitDraft}
            style={[
              styles.sendButton,
              (!draft.trim() || isSending) && styles.sendButtonDisabled,
            ]}
          >
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FF",
  },
  header: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 11,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF5",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F6FB",
    marginRight: 10,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1769CE",
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  brandName: {
    color: "#142B50",
    fontSize: 14,
    fontWeight: "800",
  },
  assistantTitle: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 2,
  },
  readyIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginLeft: 7,
  },
  readyDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#1769CE",
  },
  readyText: {
    color: "#687386",
    fontSize: 10,
    fontWeight: "700",
  },
  keyboardArea: {
    flex: 1,
  },
  messageList: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 20,
  },
  messageRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  assistantMessageRow: {
    justifyContent: "flex-start",
  },
  studentMessageRow: {
    justifyContent: "flex-end",
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5EEFC",
    marginRight: 8,
  },
  studentAvatar: {
    backgroundColor: "#1769CE",
    marginRight: 0,
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: "82%",
    paddingHorizontal: 14,
    paddingTop: 11,
    paddingBottom: 8,
    borderRadius: 18,
  },
  assistantBubble: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6ECF5",
    borderBottomLeftRadius: 6,
  },
  studentBubble: {
    backgroundColor: "#1769CE",
    borderBottomRightRadius: 6,
  },
  messageText: {
    color: "#142B50",
    fontSize: 14,
    lineHeight: 21,
  },
  studentMessageText: {
    color: "#FFFFFF",
  },
  messageTime: {
    color: "#8793A5",
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 5,
  },
  studentMessageTime: {
    color: "#DCE9FF",
  },
  errorLabel: {
    color: "#B45309",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 5,
  },
  suggestionsSection: {
    marginLeft: 38,
    marginTop: 2,
    marginBottom: 10,
  },
  suggestionsTitle: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 9,
  },
  suggestionsList: {
    gap: 8,
  },
  suggestion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DCE6F5",
    backgroundColor: "#FFFFFF",
  },
  suggestionText: {
    flex: 1,
    color: "#24558F",
    fontSize: 13,
    lineHeight: 19,
  },
  voiceHint: {
    color: "#64748B",
    fontSize: 12,
    paddingHorizontal: 18,
    paddingVertical: 7,
  },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingHorizontal: 14,
    paddingTop: 11,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8EDF5",
  },
  microphoneButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F6FB",
  },
  input: {
    flex: 1,
    minHeight: 46,
    maxHeight: 46,
    paddingHorizontal: 15,
    borderRadius: 16,
    backgroundColor: "#F3F6FB",
    color: "#142B50",
    fontSize: 14,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1769CE",
  },
  sendButtonDisabled: {
    backgroundColor: "#B7C4D8",
  },
});
