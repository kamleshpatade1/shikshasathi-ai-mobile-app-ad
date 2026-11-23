import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Language = "English" | "Hindi";

export default function ChatScreen() {
  const router = useRouter();
  const { question: questionParam, language: languageParam } =
    useLocalSearchParams<{
      question?: string | string[];
      language?: string | string[];
    }>();
  const language: Language = languageParam === "Hindi" ? "Hindi" : "English";
  const isHindi = language === "Hindi";
  const question =
    typeof questionParam === "string" ? questionParam : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={isHindi ? "डैशबोर्ड पर वापस जाएँ" : "Back to dashboard"}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={21} color="#142B50" />
        </TouchableOpacity>

        <View style={styles.chatIcon}>
          <Ionicons name="sparkles" size={28} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>ShikshaSathi AI</Text>
        <Text style={styles.description}>
          {isHindi
            ? "AI चैट सहायता जल्द ही उपलब्ध होगी।"
            : "AI chat assistance is coming soon."}
        </Text>

        {question ? (
          <View style={styles.questionCard}>
            <Text style={styles.questionLabel}>
              {isHindi ? "आपका सवाल" : "Your question"}
            </Text>
            <Text style={styles.question}>{question}</Text>
          </View>
        ) : null}

        <Text style={styles.note}>
          {isHindi
            ? "अभी के लिए, आधिकारिक जानकारी संबंधित सरकारी स्रोतों से सत्यापित करें।"
            : "For now, verify official information with the relevant government sources."}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FF",
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    padding: 24,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E6ECF5",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  chatIcon: {
    width: 62,
    height: 62,
    borderRadius: 21,
    backgroundColor: "#1769CE",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    color: "#142B50",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  description: {
    color: "#64748B",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    textAlign: "center",
  },
  questionCard: {
    marginTop: 28,
    padding: 17,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E6ECF5",
    backgroundColor: "#FFFFFF",
  },
  questionLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 7,
  },
  question: {
    color: "#142B50",
    fontSize: 15,
    lineHeight: 22,
  },
  note: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 22,
    textAlign: "center",
  },
});
