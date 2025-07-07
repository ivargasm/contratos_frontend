export type TipoContrato = "arrendamiento" | "compra-venta" | "servicios" | "comodato" | "confidencialidad";

export const contract_types_owner: Record<TipoContrato, string> = {
    arrendamiento: "arrendador",
    "compra-venta": "vendedor",
    servicios: "prestador de servicios",
    comodato: "comodante",
    confidencialidad: "propietario de la información",
};

export const contract_types_buyer: Record<TipoContrato, string> = {
    arrendamiento: "arrendatario",
    "compra-venta": "comprador",
    servicios: "cliente",
    comodato: "comodatario",
    confidencialidad: "interesado en la información",
};