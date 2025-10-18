import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  MovieDetails: { id: number };
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Saved: undefined;
};