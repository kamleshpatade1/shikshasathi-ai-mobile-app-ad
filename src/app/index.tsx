import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Language = "English" | "Hindi";

export default function OnboardingScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("English");

  const isHindi = language === "Hindi";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screenContent}>
          <View style={styles.header}>
            <View style={styles.govtTag}>
              <Ionicons name="shield-checkmark" size={15} color="#176B45" />
              <Text style={styles.govtText}>GOVERNMENT OF RAJASTHAN</Text>
            </View>

            <Text style={styles.headerSub}>
              Department of Technical Education
            </Text>
          </View>

          <View style={styles.content}>
            <View style={styles.logoCircle}>
              <Ionicons name="school" size={55} color="#FFFFFF" />
            </View>

            <Text style={styles.appName}>ShikshaSathi AI</Text>
            <Text style={styles.tagline}>
              {isHindi
                ? "आपकी शिक्षा, आपका डिजिटल साथी"
                : "Your Smart Companion for Education"}
            </Text>

            <View style={styles.aiBadge}>
              <Ionicons name="sparkles" size={16} color="#D97706" />
              <Text style={styles.aiBadgeText}>
                AI POWERED STUDENT ASSISTANCE
              </Text>
            </View>

            <Text style={styles.welcome}>
              {isHindi ? "नमस्ते विद्यार्थी!" : "Hello, Student!"}
            </Text>

            <Text style={styles.description}>
              {isHindi
                ? "कॉलेज, कोर्स, एडमिशन, स्कॉलरशिप और शिक्षा से जुड़े सवालों के जवाब अब एक ही जगह।"
                : "Get help with colleges, courses, admissions, scholarships and all your education-related questions in one place."}
            </Text>

            <View style={styles.languageSection}>
              <Text style={styles.languageTitle}>
                {isHindi ? "अपनी भाषा चुनें" : "Choose Your Language"}
              </Text>

              <View style={styles.languageRow}>
                {(["English", "Hindi"] as const).map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.languageButton,
                      language === item && styles.selectedLanguage,
                    ]}
                    onPress={() => setLanguage(item)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: language === item }}
                  >
                    <Ionicons
                      name={
                        language === item
                          ? "checkmark-circle"
                          : "ellipse-outline"
                      }
                      size={20}
                      color={language === item ? "#FFFFFF" : "#64748B"}
                    />
                    <Text
                      style={[
                        styles.languageText,
                        language === item && styles.selectedLanguageText,
                      ]}
                    >
                      {item === "Hindi" ? "हिन्दी" : "English"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() =>
                router.replace({ pathname: "/home", params: { language } })
              }
              activeOpacity={0.85}
              accessibilityRole="button"
            >
              <Text style={styles.startButtonText}>
                {isHindi ? "शुरू करें" : "Get Started"}
              </Text>
              <Ionicons name="arrow-forward" size={21} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.footer}>
              Empowering Students • Building Futures
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  screenContent: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 26,
    paddingVertical: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 8,
  },
  govtTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E8F5ED",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
  },
  govtText: {
    color: "#176B45",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  headerSub: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 8,
  },
  content: {
    alignItems: "center",
  },
  logoCircle: {
    width: 112,
    height: 112,
    borderRadius: 35,
    backgroundColor: "#1769CE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    elevation: 8,
    shadowColor: "#1769D2",
    shadowOpacity: 0.22,
    shadowRadius: 14,
  },
  appName: {
    fontSize: 31,
    fontWeight: "800",
    color: "#142B50",
    letterSpacing: -0.8,
  },
  tagline: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 7,
    textAlign: "center",
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#FFF4DF",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    marginTop: 22,
  },
  aiBadgeText: {
    fontSize: 9,
    color: "#A65C08",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  welcome: {
    fontSize: 25,
    fontWeight: "800",
    color: "#142B50",
    marginTop: 30,
  },
  description: {
    color: "#64748B",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 10,
  },
  languageSection: {
    width: "100%",
    marginTop: 28,
  },
  languageTitle: {
    color: "#142B50",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 12,
  },
  languageRow: {
    flexDirection: "row",
    gap: 12,
  },
  languageButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#DCE4EF",
    backgroundColor: "#FFFFFF",
  },
  selectedLanguage: {
    backgroundColor: "#1769CE",
    borderColor: "#1769CE",
  },
  languageText: {
    color: "#334155",
    fontWeight: "700",
    fontSize: 14,
  },
  selectedLanguageText: {
    color: "#FFFFFF",
  },
  startButton: {
    width: "100%",
    backgroundColor: "#1769CE",
    paddingVertical: 17,
    borderRadius: 14,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    elevation: 4,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  footer: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 22,
    marginBottom: 10,
  },
});
