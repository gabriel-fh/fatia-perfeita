import React from "react";
import Produto from "@/src/model/Produto";
import PrimaryCard from "./PrimaryCard";
import SecondaryCard from "./SecondaryCard";

type ProductCardProps = {
  infos: Produto;
  variant?: "primary" | "secondary";
}

const ProductCard = ({ infos, variant = 'primary' }: ProductCardProps) => {
  const formatToReal = (valor: number | bigint | Intl.StringNumericLiteral): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  return (
    variant === "primary" ? (
      <PrimaryCard infos={infos} formatToReal={formatToReal}/>
    ) : (
      <SecondaryCard/>
    )
  );
};


export default ProductCard;
