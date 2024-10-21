"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'

function Heading() {
  const [total_income, setTotal_income] = React.useState(0)
  const [total_expense, setTotal_expense] = React.useState(0)
  const [balance , setBalance] = React.useState(0)
  useEffect(() => {
    const data_income  = JSON.parse(localStorage.getItem("income") || "[]");
    //total income of all amount in this income array
    const total_amount = data_income.reduce((total: any, item: { amount: any }) => total + item.amount, 0);
    setTotal_income(total_amount)

    const data_expense  = JSON.parse(localStorage.getItem("expense") || "[]");
    //total expense of all amount in this expense array
    const total_amount_expense = data_expense.reduce((total: any, item: { amount: any }) => total + item.amount, 0);
    setTotal_expense(total_amount_expense)
    setBalance(total_amount - total_amount_expense)

  }, [])


  return (
    <>
    <div className="grid gap-3 grid-cols-3 m-3">
    <Card>
  <CardHeader>
    <CardTitle>Total Income</CardTitle>
  </CardHeader>
  <CardContent>
    <div>{total_income}$</div>
  </CardContent>
 
</Card>
<Card>

<CardHeader>
    <CardTitle>Total Expenses</CardTitle>
  </CardHeader>
  <CardContent>
    <div>{total_expense}$</div>
  </CardContent>
 
</Card>

<Card>

<CardHeader>
    <CardTitle>Current Balance</CardTitle>
  </CardHeader>
  <CardContent>
    <div>{balance}$</div>
  </CardContent>
 
</Card>



    </div>
    </>
  )
}

export default Heading