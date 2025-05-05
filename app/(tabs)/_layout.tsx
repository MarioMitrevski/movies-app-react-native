import { useThemeColor } from '@/hooks/useThemeColor';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
        }}
      />
    </Tabs>
  );
}
