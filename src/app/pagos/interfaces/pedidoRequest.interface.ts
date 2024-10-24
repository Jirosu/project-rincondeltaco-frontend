import DetallePedido from "./detallePedido.interface";
import Pedido from "./pedido.interface";
import Voucher from "./voucher.interface";

export default interface PedidoRequest {
  datosPedido: Pedido;
  datosVoucher: Voucher;
  listaProductos: DetallePedido[];
}
