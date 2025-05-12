import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorage = <T>() => {
  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (e) {
      console.error("Error reading data from storage", e);
      return null;
    }
  };

  const setData = async (key: string, value: T) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error("Error writing data to storage", e);
    }
  };

  const removeData = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("Error removing data from storage", e);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error("Error clearing storage", e);
    }
  };

  return {
    getData,
    setData,
    removeData,
    clearStorage,
  };
};
