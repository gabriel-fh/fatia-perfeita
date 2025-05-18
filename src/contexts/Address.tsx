import React, { createContext, useContext, useEffect, useState } from "react";
import { Endereco } from "../model/Endereco";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AddressType = {
  rua: string;
  numero: string;
  bairro: string;
  complemento: string;
  cidade: string;
  cep: string;
};

interface Props {
  children: React.ReactNode;
}

interface AddressContextData {
  address: Endereco | null;
  setAddress: React.Dispatch<React.SetStateAction<Endereco | null>>;
  saveAddressToStorage: (address: Endereco) => Promise<void>;
  loadAddressFromStorage: () => Promise<void>;
}

export const AddressContext = createContext<AddressContextData>({} as AddressContextData);

export const AddressProvider: React.FC<Props> = ({ children }) => {
  const [address, setAddress] = useState<Endereco | null>(null);

  const saveAddressToStorage = async (address: Endereco) => {
    try {
      const jsonValue = JSON.stringify(address);
      await AsyncStorage.setItem("address", jsonValue);
    } catch (error) {
      console.error("Error saving address to storage:", error);
      throw error;
    }
  }

  const loadAddressFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("address");
      if (jsonValue !== null) {
        const parsedAddress: AddressType = JSON.parse(jsonValue);
        setAddress(new Endereco(
          parsedAddress.rua,
          parsedAddress.numero,
          parsedAddress.bairro,
          parsedAddress.complemento,
          parsedAddress.cidade,
          parsedAddress.cep
        ));
      }
    } catch (error) {
      console.error("Error loading address from storage:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await loadAddressFromStorage();
    })()
  }, []);

  return (
    <AddressContext.Provider
      value={{
        address,
        setAddress,
        saveAddressToStorage,
        loadAddressFromStorage,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export function useAddress(): AddressContextData {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }

  return context;
}
