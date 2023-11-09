'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from 'axios';

import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { Producto } from '@prisma/client';
import { Separator } from '@radix-ui/react-separator';
import Decimal from 'decimal.js';

const formSchema = z.object({
  nombre: z.string().min(1, {
    message: "El nombre es requerido"
  }),
  cedula: z.string().
    regex(new RegExp(/^\d{10}$/), "Cedula no valida").
    min(1, {
      message: "Cedula requerida"
    }),
  direccion: z.string().min(1, {
    message: "La direccion es requerida"
  }),
  telefono: z.string().
    regex(new RegExp(/^3[0-9]{9}$/), "Telefono no valido").
    min(1, {
      message: "Telefono requerido"
    })
})

function PedidoPage() {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const router = useRouter()

  useEffect(() => {
    const carritoData = localStorage.getItem('carrito');
    if (carritoData) {
      setCarrito(JSON.parse(carritoData));
    }
  }, [])

  const precioTotal = carrito.reduce((total, producto) => {
    return total.add(producto.precio);
  }, new Decimal(0));

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      cedula: "",
      direccion: "",
      telefono: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newValues = {
        values,
        carrito
      }
      await axios.post(`/api/cliente/`, newValues);

      router.push(`/api/pedido/${values.cedula}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav
        className="flex items-center justify-between rounded w-full mt-5"
      >
        <div className="relative h-10 w-20">
          <Image onClick={() => router.push('/')} src={'/logo.png'} fill alt="logo" className="cursor-pointer"/>
        </div>
      </nav>

      <main className='max-w-6xl p-24 mx-auto'>
        <h2 className='text-4xl font-bold text-center'>Pedido</h2>
        <div className="pt-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name='nombre'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="uppercase text-xs font-bold text-white"
                      >
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-white/90 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 min-w-full"
                            placeholder="Ingresa tu nombre"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='cedula'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="uppercase text-xs font-bold text-white"
                      >
                        Cedula
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-white/90 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 min-w-full"
                            placeholder="Ingresa tu cedula"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name='direccion'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="uppercase text-xs font-bold text-white"
                      >
                        Direccion
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-white/90 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 min-w-full"
                            placeholder="Ingrese su direccion"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='telefono'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="uppercase text-xs font-bold text-white"
                      >
                        Celular
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-white/90 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 min-w-full"
                            placeholder="Ingresa tu numero celular"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <h3 className='my-3'>Productos</h3>
                {carrito.map((product) => (
                  <div key={product.id} className="flex flex-row justify-between">
                    <p>{product.nombre}</p>
                    <p>$ {product.precio.toString()}</p>
                  </div>
                ))}
                <Separator className='w-full h-0.5 bg-stone-500 mt-2'/>
                <div className="flex flex-row justify-between items-center my-2">
                  <p className="text-white/90 font-semibold text-xl">Total</p>
                  <p className="text-white/90 font-semibold text-xl">$ {precioTotal.d.toString()}</p>
                </div>
              </div>
              <Button disabled={isLoading}>
                Realizar pedido
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  )
}

export default PedidoPage