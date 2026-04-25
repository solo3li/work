import { useLocalSearchParams } from 'expo-router';
import Chat from '../../../../components/Chat';

export default function ChannelScreen() {
  const { channel, server } = useLocalSearchParams();
  
  return <Chat channelId={channel as string} serverId={server as string} />;
}
