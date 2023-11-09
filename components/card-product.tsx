import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { Producto } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

interface CardProductPorps{
  id: number
  nombre: string
  precio: Decimal
  carrito: Producto[]; 
  setCarrito: (carrito: Producto[]) => void; 
}


function CardProduct({
  id,
  nombre,
  precio,
  carrito,
  setCarrito,
}: CardProductPorps) {
  const handleAddToCart = () => {
    const updatedCarrito = [...carrito, { id, nombre, precio }];
    setCarrito(updatedCarrito);

    localStorage.setItem('carrito', JSON.stringify(updatedCarrito));

    console.log(updatedCarrito)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{nombre}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Precio: ${precio.toString()}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardProduct