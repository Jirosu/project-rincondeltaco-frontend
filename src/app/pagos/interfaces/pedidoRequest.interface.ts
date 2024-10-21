import DetallePedido from "./detallePedido.interface";
import Pedido from "./pedido.interface";

export default interface PedidoRequest {
  datosPedido: Pedido;
  listaProductos: DetallePedido[];
}
