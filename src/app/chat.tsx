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

type Language = "English" | "Hindi";
type Message = {
  id: string;
  role: "assistant" | "student";
  text: string;
  createdAt: Date;
  isDemo?: boolean;
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
        ready: "डेमो स्क्रीन · तैयार",
        readyLabel: "डेमो स्क्रीन तैयार है। AI सेवा कनेक्ट नहीं है।",
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
        demoLabel: "डेमो जवाब",
        demoReply:
          "यह एक डेमो जवाब है। AI कनेक्शन अभी उपलब्ध नहीं है और अगले चरण में जोड़ा जाएगा। प्रवेश संबंधी जानकारी आधिकारिक स्रोतों से सत्यापित करें।",
      }
    : {
        assistantTitle: "AI Student Assistant",
        ready: "Demo · Ready",
        readyLabel: "Demo screen ready. No AI service is connected.",
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
        demoLabel: "Demo reply",
        demoReply:
          "This is a demo reply. AI connection is not available yet and will be added in the next milestone. Please verify admission information with official sources.",
      };

  const [draft, setDraft] = useState("");
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

  const sendMessage = useCallback(
    (value: string) => {
      const text = value.trim();
      if (!text) return;

      const now = new Date();
      const studentMessage: Message = {
        id: `student-${nextMessageId.current++}`,
        role: "student",
        text,
        createdAt: now,
      };
      const demoMessage: Message = {
        id: `demo-${nextMessageId.current++}`,
        role: "assistant",
        text: copy.demoReply,
        createdAt: new Date(),
        isDemo: true,
      };

      setMessages((current) => [...current, studentMessage, demoMessage]);
      setDraft("");
      setShowVoiceHint(false);
    },
    [copy.demoReply],
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
  }, [messages.length]);

  const submitDraft = () => sendMessage(draft);
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
                  {message.isDemo && (
                    <Text style={styles.demoLabel}>{copy.demoLabel}</Text>
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
                    onPress={() => sendMessage(suggestion)}
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
            accessibilityState={{ disabled: !draft.trim() }}
            disabled={!draft.trim()}
            onPress={submitDraft}
            style={[
              styles.sendButton,
              !draft.trim() && styles.sendButtonDisabled,
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
    backgroundColor: "#D98A19",
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
  demoLabel: {
    color: "#A65C08",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 5,
    textTransform: "uppercase",
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
