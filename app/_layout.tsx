import AuthContextProvider, { useAuthContext } from "@/context/AuthProvider";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoadingUser } = useAuthContext();
  const router = useRouter();
  const segments = useSegments();
  const firstSegment = segments[0] ?? ""; // fallback to empty string
  const inAuthRoutes = ["login", "register"].includes(firstSegment);


  useEffect(() => {
    if (!isLoadingUser && !user && !inAuthRoutes) {

      router.replace("/login");
    } else if (!isLoadingUser && user && inAuthRoutes) {
      router.replace("/(tabs)/habits");
    }
  }, [user, isLoadingUser, inAuthRoutes, segments, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <AuthContextProvider>
        <AuthGuard>
          <Stack
            initialRouteName="login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
          </Stack>
        </AuthGuard>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
