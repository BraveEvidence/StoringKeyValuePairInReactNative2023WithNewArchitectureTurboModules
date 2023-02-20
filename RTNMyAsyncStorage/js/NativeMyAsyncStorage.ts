import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  saveToIOS(key: string, text: string): void;
  getFromIOS(key: string): string;

  saveToAndroid(key: string, text: string): Promise<{}>;
  getFromAndroid(key: string): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>(
  'RTNMyAsyncStorage',
) as Spec | null;
