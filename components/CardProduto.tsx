import { View, Text } from 'react-native'
import React from 'react'
import Produto from '@/src/model/Produto'

const CardProduto = ({produto} : {produto: Produto}) => {
  return (
    <View>
      <Text>CardProduto</Text>
    </View>
  )
}

export default CardProduto