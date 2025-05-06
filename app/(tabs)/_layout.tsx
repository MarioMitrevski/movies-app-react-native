import { useThemeColor } from '@/components/Themed';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
        }}
      />
    </Tabs>
  );
}
