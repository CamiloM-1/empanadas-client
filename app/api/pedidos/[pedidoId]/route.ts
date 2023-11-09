import { db } from "@/lib/db";
import { Producto } from "@prisma/client";
import Decimal from "decimal.js";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { pedidoId: string }}
) {
  try {
    const getId = params.pedidoId;

    if (!getId) {
      return new NextResponse("Cliente id missing", { status: 400 });
    }

    const cliente = await db.cliente.findFirst({
      where: {
        cedula: getId,
      }
    });

    if (!cliente) {
      return new NextResponse("Cliente missing", { status: 400 });
    }

    const pedidos = await db.pedido.findMany({
      where: {
        id_cliente: cliente.id,
      },
      include: {
        productos: {
          select: {
            nombre: true,
          }
        }
      }
    })


    return NextResponse.json(pedidos);
  } catch (error) {
    console.log('Get pedidos', error);
    return new NextResponse('Internal error', { status: 500} );
  }
}