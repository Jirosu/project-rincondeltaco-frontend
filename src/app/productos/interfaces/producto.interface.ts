import { CategoriaProducto } from "./categoria-producto.interface";
import { EstadoProducto } from "./estado-producto.interface";

export interface Producto {
  codProd: number;
  nomProd: string;
  descProd: string;
  precProd: number;
  rutaImg: string;
  codCatProd: string,
  ref_catProd: CategoriaProducto;
  enabled: boolean,
}
