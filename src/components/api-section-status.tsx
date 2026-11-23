import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ApiSectionStatusProps = {
  status: "loading" | "error" | "empty";
  message: string;
  retryLabel: string;
  onRetry: () => void;
};

export function ApiSectionStatus({
  status,
  message,
  retryLabel,
  onRetry,
}: ApiSectionStatusProps) {
  return (
    <View style={styles.container}>
      {status === "loading" ? (
        <ActivityIndicator color="#1769CE" />
      ) : (
        <Ionicons
          name={
            status === "error"
              ? "cloud-offline-outline"
              : "information-circle-outline"
          }
          size={22}
          color="#64748B"
        />
      )}
      <Text style={styles.message}>{message}</Text>
      {status === "error" && (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={onRetry}
          style={styles.retryButton}
        >
          <Text style={styles.retryText}>{retryLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E8EDF5",
    backgroundColor: "#FFFFFF",
  },
  message: {
    flex: 1,
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
  },
  retryButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 11,
    backgroundColor: "#E8F1FF",
  },
  retryText: {
    color: "#1769CE",
    fontSize: 12,
    fontWeight: "800",
  },
});
