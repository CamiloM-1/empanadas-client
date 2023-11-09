"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OrderStatus, Producto } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"

export type Pedido = {
  id: number
  productos: Producto[]
  valor_total: number
  estado: OrderStatus
}

export const ProductActionsCell: React.FC<{ id: number }> = ({ id }) => 
{
  const router = useRouter();
  const cancelarPedido = () => {
    axios.patch(`/api/pedidos/cancelar/${id}`)
    router.refresh()
  }

  const pagarPedido = () => {
    axios.patch(`/api/pedidos/pagar/${id}`)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
        </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={pagarPedido}
          className="cursor-pointer"
        >
          Pagar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={cancelarPedido}
          className="cursor-pointer"
        >
          Cancelar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<Pedido>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "valor_total",
    header: "Valor Total",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
  {
    id: "actions",
    header: "Opciones",
    cell: ({ row }) => {
      const product = row.original
      return (
        <ProductActionsCell id={product.id} />
      )
    },
  },
]
