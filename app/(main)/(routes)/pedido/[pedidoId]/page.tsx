'use client'

import axios from "axios";
import { Pedido, columns } from "./columns";
import { DataTable } from "./data-table"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";


async function getData( id : string ): Promise<Pedido[]> {
  const response = await axios.get(`/api/pedidos/${id}`);
  return response.data;
}

function PedidosUserPage() {
  const [data, setData] = useState<Pedido[]>([]);
  const router = useRouter()
  const { pedidoId } = useParams()

  useEffect(() => {
    async function fetchData() {
      const products = await getData(pedidoId as string);
      setData(products);
    }
    if (data !== data){
      router.refresh();
    }
    
    fetchData();
  }, [data, router, pedidoId]);


  return (
    <>
      <nav
        className="flex items-center justify-between rounded w-full mt-5"
      >
        <div className="relative h-10 w-20">
          <Image onClick={() => router.push('/')} src={'/logo.png'} fill alt="logo" className="cursor-pointer"/>
        </div>
      </nav>
      <div className="p-24">
        <h1 className="text-4xl text-center font-bold my-10">Pedidos Realizados</h1>
        <DataTable columns={columns} data={data}/>
      </div>
    </>
  )
}

export default PedidosUserPage