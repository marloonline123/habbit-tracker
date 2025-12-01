import { useAuthContext } from '@/context/AuthProvider';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { logout } = useAuthContext();
  return (
    <Tabs initialRouteName='habits' screenOptions={{
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 },
      tabBarStyle: { backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 },
      headerRight: () => <Feather
        onPress={logout}
        name='log-out' size={24}
        style={{
          fontWeight: 'bold',
          marginRight: 20,
          backgroundColor: '#2488edff',
          padding: 7,
          color: "white",
          borderRadius: 8
        }}
      />
     }}>
      <Tabs.Screen name="habits" options={{ 
        title: "Today's Habits",
        tabBarIcon: ({ color, size }) => <FontAwesome name="calendar" size={size} color={color} />
       }} />
      <Tabs.Screen name="streaks" options={{ 
        title: "Streaks",
        tabBarIcon: ({ color, size }) => <FontAwesome name="bar-chart" size={size} color={color} />
       }} />
      <Tabs.Screen name="add-habit" options={{ 
        title: "Add Habit",
        tabBarIcon: ({ color, size }) => <FontAwesome name="plus-circle" size={size} color={color} />
       }} />
    </Tabs>
  )
}
