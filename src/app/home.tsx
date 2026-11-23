import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Language = "English" | "Hindi";
type ActionCard = {
  title: string;
  description: string;
  icon: "school-outline" | "book-outline" | "calendar-outline" | "ribbon-outline";
  iconColor: string;
  iconBackground: string;
  question: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const { language: languageParam } = useLocalSearchParams<{
    language?: string | string[];
  }>();
  const [query, setQuery] = useState("");
  const language: Language = languageParam === "Hindi" ? "Hindi" : "English";
  const isHindi = language === "Hindi";

  const copy = isHindi
    ? {
        greeting: "नमस्ते, विद्यार्थी!",
        subtitle: "आपकी शिक्षा की यात्रा यहीं से शुरू होती है।",
        notifications: "सूचनाएँ अभी उपलब्ध नहीं हैं",
        searchLabel: "क्या खोज रहे हैं?",
        searchPlaceholder: "कॉलेज, कोर्स खोजें...",
        quickActions: "त्वरित विकल्प",
        quickActionsSubtitle: "अपनी शिक्षा यात्रा के लिए उपयोगी जानकारी पाएँ।",
        assistantTitle: "प्रवेश में सहायता चाहिए?",
        assistantDescription:
          "कॉलेज, कोर्स, प्रवेश और छात्रवृत्ति के बारे में मार्गदर्शन के लिए ShikshaSathi AI से पूछें।",
        chatButton: "AI से चैट करें",
        updates: "प्रवेश संबंधी नवीनतम अपडेट",
        emptyUpdates: "आधिकारिक अपडेट जल्द ही यहाँ दिखाई देंगे।",
        searchQuestion: (value: string) => `कृपया इस बारे में मार्गदर्शन करें: ${value}`,
        actions: [
          {
            title: "कॉलेज खोजें",
            description: "कॉलेज चुनने के लिए जानकारी पाएँ",
            icon: "school-outline",
            iconColor: "#1769CE",
            iconBackground: "#E8F1FF",
            question:
              "राजस्थान में कॉलेज चुनते समय किन जानकारियों की तुलना करनी चाहिए?",
          },
          {
            title: "कोर्स देखें",
            description: "अपनी रुचि के अनुसार कोर्स जानें",
            icon: "book-outline",
            iconColor: "#16866B",
            iconBackground: "#E7F7F2",
            question: "मेरी रुचियों के अनुसार तकनीकी कोर्स चुनने में मदद करें।",
          },
          {
            title: "प्रवेश अपडेट",
            description: "आधिकारिक अपडेट सत्यापित करना सीखें",
            icon: "calendar-outline",
            iconColor: "#B76B05",
            iconBackground: "#FFF3D9",
            question:
              "मैं आधिकारिक प्रवेश अपडेट कहाँ सत्यापित कर सकता हूँ और किन बातों की जाँच करूँ?",
          },
          {
            title: "छात्रवृत्ति",
            description: "विकल्प और पात्रता की जानकारी पाएँ",
            icon: "ribbon-outline",
            iconColor: "#7547C8",
            iconBackground: "#F1EAFF",
            question:
              "छात्रवृत्ति के विकल्प और पात्रता की आधिकारिक जानकारी कैसे खोजूँ?",
          },
        ] as ActionCard[],
      }
    : {
        greeting: "Namaste, Student!",
        subtitle: "Your education journey starts here.",
        notifications: "Notifications are not available yet",
        searchLabel: "What are you looking for?",
        searchPlaceholder: "Search colleges, courses...",
        quickActions: "Quick Actions",
        quickActionsSubtitle: "Helpful tools for your education journey.",
        assistantTitle: "Need Help with Admissions?",
        assistantDescription:
          "Ask ShikshaSathi AI for guidance about colleges, courses, admissions and scholarships.",
        chatButton: "Chat with AI",
        updates: "Latest Admission Updates",
        emptyUpdates: "Official updates will appear here soon.",
        searchQuestion: (value: string) => `Please guide me about: ${value}`,
        actions: [
          {
            title: "Find Colleges",
            description: "Get guidance on choosing a college",
            icon: "school-outline",
            iconColor: "#1769CE",
            iconBackground: "#E8F1FF",
            question:
              "What information should I compare when choosing a college in Rajasthan?",
          },
          {
            title: "Explore Courses",
            description: "Discover courses that fit your goals",
            icon: "book-outline",
            iconColor: "#16866B",
            iconBackground: "#E7F7F2",
            question: "Help me explore technical courses based on my interests.",
          },
          {
            title: "Admission Updates",
            description: "Learn how to verify official updates",
            icon: "calendar-outline",
            iconColor: "#B76B05",
            iconBackground: "#FFF3D9",
            question:
              "Where can I verify official admission updates, and what should I check?",
          },
          {
            title: "Scholarships",
            description: "Explore options and eligibility guidance",
            icon: "ribbon-outline",
            iconColor: "#7547C8",
            iconBackground: "#F1EAFF",
            question:
              "How can I find scholarship options and verify eligibility through official sources?",
          },
        ] as ActionCard[],
      };

  const openChat = (question: string) => {
    router.push({ pathname: "/chat", params: { question, language } });
  };

  const submitSearch = () => {
    const searchTerm = query.trim();
    if (searchTerm) {
      openChat(copy.searchQuestion(searchTerm));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.brandRow}>
            <View style={styles.brand}>
              <View style={styles.brandIcon}>
                <Ionicons name="school" size={23} color="#FFFFFF" />
              </View>
              <Text style={styles.brandName}>ShikshaSathi AI</Text>
            </View>

            <View
              style={styles.notificationButton}
              accessible
              accessibilityLabel={copy.notifications}
            >
              <Ionicons name="notifications-outline" size={22} color="#142B50" />
            </View>
          </View>

          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>{copy.greeting}</Text>
            <Text style={styles.subtitle}>{copy.subtitle}</Text>
          </View>

          <View style={styles.searchSection}>
            <Text style={styles.sectionEyebrow}>{copy.searchLabel}</Text>
            <View style={styles.searchField}>
              <Ionicons name="search" size={20} color="#64748B" />
              <TextInput
                accessibilityLabel={copy.searchPlaceholder}
                autoCapitalize="sentences"
                onChangeText={setQuery}
                onSubmitEditing={submitSearch}
                placeholder={copy.searchPlaceholder}
                placeholderTextColor="#94A3B8"
                returnKeyType="search"
                style={styles.searchInput}
                value={query}
              />
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionTitle}>{copy.quickActions}</Text>
              <Text style={styles.sectionSubtitle}>
                {copy.quickActionsSubtitle}
              </Text>
            </View>

            <View style={styles.actionGrid}>
              {copy.actions.map((action) => (
                <TouchableOpacity
                  key={action.title}
                  accessibilityRole="button"
                  accessibilityLabel={`${action.title}. ${action.description}`}
                  activeOpacity={0.82}
                  onPress={() => openChat(action.question)}
                  style={styles.actionCard}
                >
                  <View
                    style={[
                      styles.actionIcon,
                      { backgroundColor: action.iconBackground },
                    ]}
                  >
                    <Ionicons
                      name={action.icon}
                      size={22}
                      color={action.iconColor}
                    />
                  </View>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDescription}>
                    {action.description}
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color="#94A3B8"
                    style={styles.actionArrow}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.assistantBanner}>
            <View style={styles.assistantIcon}>
              <Ionicons name="sparkles" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.assistantTitle}>{copy.assistantTitle}</Text>
            <Text style={styles.assistantDescription}>
              {copy.assistantDescription}
            </Text>
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.84}
              onPress={() =>
                openChat(
                  isHindi
                    ? "कॉलेज, कोर्स, प्रवेश और छात्रवृत्ति के बारे में मार्गदर्शन करें।"
                    : "Please guide me about colleges, courses, admissions, and scholarships.",
                )
              }
              style={styles.chatButton}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#1769CE" />
              <Text style={styles.chatButtonText}>{copy.chatButton}</Text>
              <Ionicons name="arrow-forward" size={17} color="#1769CE" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionTitle}>{copy.updates}</Text>
            </View>
            <View style={styles.emptyState}>
              <View style={styles.emptyStateIcon}>
                <Ionicons name="newspaper-outline" size={23} color="#64748B" />
              </View>
              <Text style={styles.emptyStateText}>{copy.emptyUpdates}</Text>
            </View>
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
  content: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  scrollContent: {
    flexGrow: 1,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#1769CE",
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    color: "#142B50",
    fontSize: 17,
    fontWeight: "800",
  },
  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6ECF5",
  },
  greetingSection: {
    marginTop: 28,
  },
  greeting: {
    color: "#142B50",
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "800",
  },
  subtitle: {
    color: "#64748B",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 5,
  },
  searchSection: {
    marginTop: 25,
  },
  sectionEyebrow: {
    color: "#142B50",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  searchField: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E9F3",
    backgroundColor: "#FFFFFF",
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    color: "#142B50",
    fontSize: 15,
  },
  section: {
    marginTop: 28,
  },
  sectionHeading: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#142B50",
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  actionCard: {
    width: "48%",
    minHeight: 158,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E8EDF5",
    backgroundColor: "#FFFFFF",
    shadowColor: "#142B50",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 9,
    elevation: 2,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  actionTitle: {
    color: "#142B50",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },
  actionDescription: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
    paddingRight: 4,
  },
  actionArrow: {
    position: "absolute",
    top: 16,
    right: 14,
  },
  assistantBanner: {
    marginTop: 28,
    padding: 19,
    borderRadius: 22,
    backgroundColor: "#1769CE",
    overflow: "hidden",
  },
  assistantIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },
  assistantTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
  },
  assistantDescription: {
    color: "#EAF2FF",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },
  chatButton: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    alignSelf: "flex-start",
    marginTop: 17,
    paddingHorizontal: 15,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  chatButtonText: {
    color: "#1769CE",
    fontSize: 14,
    fontWeight: "800",
  },
  emptyState: {
    minHeight: 104,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    padding: 17,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E8EDF5",
    backgroundColor: "#FFFFFF",
  },
  emptyStateIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F4F9",
  },
  emptyStateText: {
    flex: 1,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
  },
});
