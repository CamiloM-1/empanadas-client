import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const { nombre , precio } = await req.json();

    const producto = await db.producto.create({
      data: {
        nombre,
        precio,
      }
    })

    return NextResponse.json(producto);
  } catch (error) {
    console.log('Post productos', error);
    return new NextResponse('Internal error', { status: 500} );
  }
}

export async function GET(
  req: Request
){
  try {
    const productos = await db.producto.findMany()

    return NextResponse.json(productos);
  } catch (error) {
    console.log('Get productos', error);
    return new NextResponse('Internal error', { status: 500} );
  }
}