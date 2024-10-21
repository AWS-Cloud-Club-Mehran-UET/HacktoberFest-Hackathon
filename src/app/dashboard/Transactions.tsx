"use client"
import React from 'react'
import { DataTable } from './Table'
import { ColumnDef } from '@tanstack/react-table'

function Transactions() {
     type Payment = {
        id: string
        amount: number
        description: string
        category: string
        date : Date
      }
      const data_expense  = JSON.parse(localStorage.getItem("expense") || "[]");

      const payments: Payment[] = data_expense
       
     const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "amount",
            header: "Amount",
          },
        {
          accessorKey: "description",
          header: "Description",
        },
        {
          accessorKey: "category",
          header: "Category",
        },
        {
            accessorKey: "date",
            header: "Date",
          },
        
      ]
  return (
    <>
    <div className='m-3'>

    
    <DataTable columns={columns} data={payments} />

    </div>
    
    </>
  )
}

export default Transactions