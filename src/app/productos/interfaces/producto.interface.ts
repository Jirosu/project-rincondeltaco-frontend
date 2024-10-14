import { CategoriaProducto } from "./categoria-producto.interface";
import { EstadoProducto } from "./estado-producto.interface";

export interface Producto {
  codProd: string;
  nomProd: string;
  descProd: string;
  precProd: number;
  rutaImg: string;
  // codEstProd: string,
  codCatProd: string,
  ref_catProd: CategoriaProducto;
  // ref_estProd: EstadoProducto;
  enabled: boolean,
}
