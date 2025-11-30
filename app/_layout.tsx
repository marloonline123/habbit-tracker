import AuthContextProvider, { useAuthContext } from "@/context/AuthProvider";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoadingUser } = useAuthContext();
  const router = useRouter();
  const segments = useSegments();
  const firstSegment = segments[0] ?? ""; // fallback to empty string
  const inAuthRoutes = ["login", "register"].includes(firstSegment);


  useEffect(() => {
    console.log('auth routes: ', segments);
    
    if (!isLoadingUser && !user && !inAuthRoutes) {
      console.log('first');
      
      router.replace("/login");
    } else if (!isLoadingUser && user && inAuthRoutes) {
      console.log('second');
      router.replace("/(tabs)/habits");
    }
  }, [user, isLoadingUser, inAuthRoutes, segments, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <AuthGuard>
        <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </Stack>
      </AuthGuard>
    </AuthContextProvider>
  );
}
