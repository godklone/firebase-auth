const TAGS = ["tipo", "comprobante", "emision", "suc", "puntos"];

const mapLastMovements = (apiLastMovements) => {
  const arrayTransformado = [];

  apiLastMovements.forEach(movement => {
    const objetoTransformado = {
      tipo: movement.TIPOPUNTO,
      comprobante: movement.NRO_COMPROBANTE,
      emision: movement.FEC_EMISION,
      suc: movement.SUCURSAL,
      puntos: movement.PUNTOS
    };
    arrayTransformado.push(objetoTransformado);
  });
  return arrayTransformado;
}

export {
  mapLastMovements,
  TAGS
}