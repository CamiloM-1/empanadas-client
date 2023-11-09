import { db } from "@/lib/db";
import { Producto } from "@prisma/client";
import Decimal from "decimal.js";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const { values, carrito } = await req.json();

    const precioTotal = carrito.reduce((total: any, producto: any) => {
      return total.add(producto.precio);
    }, new Decimal(0));

    const clientExist = await db.cliente.findFirst({
      where: {
        cedula: values.cedula
      }
    })

    if (clientExist) {
      const cliente = await db.cliente.update({
        where: {
          id: clientExist.id,
        },
        data: {
          pedido: {
            create: {
              estado:"PENDIENTE",
              valor_total: precioTotal,
              productos: {
                connect: carrito.map((product: Producto) => ({id: product.id}))
              }
            }
          }
        }
      })

      return NextResponse.json(cliente)
    }

    const cliente = await db.cliente.create({
      data: {
        nombre: values.nombre,
        cedula: values.cedula,
        direccion: values.direccion,
        telefono: values.telefono,
        pedido: {
          create: {
            estado:"PENDIENTE",
            valor_total: precioTotal,
            productos: {
              connect: carrito.map((product: Producto) => ({id: product.id}))
            }
          }
        }
      }
    })

    return NextResponse.json(cliente)
  } catch (error) {
    console.log('Post cliente', error);
    return new NextResponse('Internal error', { status: 500} );
  }
}