#import "RTNMyAsyncStorageSpec.h"
#import "RTNMyAsyncStorage.h"

@implementation RTNMyAsyncStorage

RCT_EXPORT_MODULE()



- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeMyAsyncStorageSpecJSI>(params);
}

- (void)getFromAndroid:(NSString *)key resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  reject(@"Fail",@"This method is not supported on ios. Use getFromIOS ",nil);
}

- (NSString *)getFromIOS:(NSString *)key {
  NSString *savedValue = [[NSUserDefaults standardUserDefaults]
      stringForKey:key];
  return savedValue;
}

- (void)saveToAndroid:(NSString *)key text:(NSString *)text resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  reject(@"Fail",@"This method is not supported on ios. Use saveToIOS ",nil);
}

- (void)saveToIOS:(NSString *)key text:(NSString *)text {
  [[NSUserDefaults standardUserDefaults] setObject:text forKey:key];
  [[NSUserDefaults standardUserDefaults] synchronize];
}

@end
