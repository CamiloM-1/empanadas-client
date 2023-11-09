'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"
import { ShoppingCart } from "lucide-react";
import { Producto } from "@prisma/client";
import Carrito from "../carrito";

interface NabvarPorps{
  carrito: Producto []
}

function Navbar({
  carrito
}: NabvarPorps) {
  const router = useRouter();

  return (
    <nav
      className="flex items-center justify-between rounded w-full mt-5"
    >
      <div className="relative h-10 w-20">
        <Image onClick={() => router.push('/')} src={'/logo.png'} fill alt="logo" className="cursor-pointer"/>
      </div>
      <Carrito carrito={carrito} />
    </nav>
  )
}

export default Navbar