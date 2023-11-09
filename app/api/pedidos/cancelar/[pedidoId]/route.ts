import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { pedidoId: string }}
) {
  try {
    const getId = params.pedidoId;

    if (!getId){
      return new NextResponse("Pedido ID missing", { status: 400 });
    }

    const id = parseInt(getId)

    const pedido = await db.pedido.update({
      where: {
        id: id
      },
      data: {
        estado: "CANCELADO"
      }
    })

    return NextResponse.json(pedido);
  } catch (error) {
    console.log('Cancelar pedidos', error);
    return new NextResponse('Internal error', { status: 500} );
  }
}