'use client'

import Navbar from '@/components/navbar/navbar'
import { useEffect, useState } from 'react'
import axios from "axios"
import CardProduct from '@/components/card-product'
import { Producto } from '@prisma/client'
import { useRouter } from "next/navigation"

async function getData(): Promise<Producto[]> {
  const response = await axios.get('/api/productos');
  return response.data;
}

export default function Home() {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const router = useRouter()

  useEffect(() => {

    const carritoData = localStorage.getItem('carrito');
    if (carritoData) {
      setCarrito(JSON.parse(carritoData));
    }

    async function getProducts() {
      const products = await getData();
      setProductos(products);
    }

    if (productos !== productos){
      router.refresh();
    }

    getProducts()
  }, [productos, router])

  return (
    <main className="flex flex-col items-center justify-between">
      <Navbar carrito={carrito} />
      <div className="p-24 ">
        <h2 className="text-white font-bold pt-10 text-4xl text-center">Productos</h2>
        <div className="w-full grid grid-cols-3 gap-8 pt-10">
          {productos.map((product) => (
            <CardProduct id={product.id} nombre={product.nombre} precio={product.precio} carrito={carrito} setCarrito={setCarrito} key={product.id}/>
          ))}
        </div>
      </div>
    </main>
  )
}
