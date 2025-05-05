import { View, Text } from 'react-native'
import CtrlManterProdutos from '@/src/controller/CtrlManterProdutos'
import React from 'react'

const Produtos = () => {
  const ctrl = new CtrlManterProdutos()
  return (
    <View>
      <Text style={{
        color: "#fff"
      }}>Produtos</Text>
    </View>
  )
}

export default Produtos