const TAGS = ["tipo", "comprobante", "emision", "suc", "puntos"];

const mapLastMovements = (apiLastMovements) => {
  const arrayTransformado = [];


  apiLastMovements.forEach(movement => {
    const objetoTransformado = {
      tipo: movement.type,
      comprobante: movement.id_voucher,
      emision: movement.date,
      suc: movement.sucursal,
      puntos: movement.points
    };
    arrayTransformado.push(objetoTransformado);
  });
  return arrayTransformado;
}

export {
  mapLastMovements,
  TAGS
}