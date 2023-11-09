import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Producto } from "@prisma/client"
import { ShoppingCart } from "lucide-react"
import { Separator } from "./ui/separator"
import Decimal from "decimal.js"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

interface CarritoPorps{
  carrito: Producto []
}

function Carrito({
  carrito
}: CarritoPorps) {
  const router = useRouter()

  const precioTotal = carrito.reduce((total, producto) => {
    return total.add(producto.precio);
  }, new Decimal(0));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <ShoppingCart className="w-10 h-10 text-white" />
          {carrito.length !== 0 && (
            <div className="absolute bg-rose-500 rounded-full top-0 right-0 px-1.5 py-0.5 text-xs font-semibold text-white">{carrito.length}</div>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle>Carrito de compra</SheetTitle>
          <SheetDescription>
            <div className="flex flex-row justify-between items-center my-2">
              <h2 className="text-white/90 font-semibold text-base">Producto</h2>
              <h2 className="text-white/90 font-semibold text-base">Precio</h2>
            </div>
            <Separator orientation="vertical" className="h-0.5 bg-gray-700 w-full my-2"/>
            {carrito.map((cart) => (
              <div className="flex flex-row justify-between items-center my-0.5" key={cart.id}>
                <p>{cart.nombre}</p>
                <p>$ {cart.precio.toString()}</p>
              </div>
            ))}
            <Separator orientation="vertical" className="h-0.5 bg-gray-700 w-full my-2"/>
            <div className="flex flex-row justify-between items-center my-2">
              <p className="text-white/90 font-semibold text-base">Total</p>
              <p className="text-white/90 font-semibold text-base">$ {precioTotal.d.toString()}</p>
            </div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button
            onClick={() => {router.push('/pedido')}}
          >
            Realizar pedido
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Carrito