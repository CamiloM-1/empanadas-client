import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { productosId: string }}
){
  try {
    const getId = params.productosId;

    if (!getId){
      return new NextResponse("Product ID missing", { status: 400 });
    }

    const id = parseInt(getId);

    const producto = await db.producto.delete({
      where: {
        id
      }
    })

    return NextResponse.json(producto);
  } catch (error) {
    console.log('Delete productos', error);
    return new NextResponse('Internal error', { status: 500} );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productosId: string }}
) {
  try {
    const getId = params.productosId;

    if (!getId){
      return new NextResponse("Product ID missing", { status: 400 });
    }
    
    const idProduct = parseInt(getId)

    const { nombre , precio } = await req.json();

    const producto = await db.producto.update({
      where: {
        id: idProduct,
      },
      data: {
        id: idProduct,
        nombre,
        precio
      }
    })

    return NextResponse.json(producto);
  } catch (error) {
    console.log('Edit productos', error);
    return new NextResponse('Internal error', { status: 500} );
  }
}