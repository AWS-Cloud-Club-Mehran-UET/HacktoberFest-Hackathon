"use client";
import { Button } from '@/components/ui/button'
import React, { FormEvent } from 'react'
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

function All_Income() {
    const [add_income_open, setAdd_income_open] = React.useState(false);

    const data_income  = JSON.parse(localStorage.getItem("income") || "[]");
    function deleteincome(id: any) {
        const data_income = JSON.parse(localStorage.getItem("income") || "[]");
        const newData = data_income.filter((income: any) => income.id !== id);
        localStorage.setItem("income", JSON.stringify(newData));
        window.location.reload();
    }
    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const id =formData.get("id");
        const source =formData.get("source");
        const amount =formData.get("amount");
        const description =formData.get("description");
        const all_income = localStorage.getItem("income");

        if (all_income) {
            
            const data = JSON.parse(all_income);
             const  newData = data.filter((income: any) => income.id == id);

            if (newData.length > 0) {
                newData[0].source = source;
                newData[0].amount = amount;
                newData[0].description = description;
                localStorage.setItem("income", JSON.stringify(newData));
                window.location.reload();
            }
            
        }



    }

  return (
    <>
    <div className='m-3'>

    
   

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            
            <tr>
                <th scope="col" className="px-6 py-3">
                    source
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
                <th scope="col" className="px-6 py-3">
                   Description
                </th>

                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {data_income.map((income: any) => (
            <tr key={income.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {income.source}
                </th>
                <td className="px-6 py-4">
                    {income.amount}
                </td>
                <td className="px-6 py-4">
                    {income.description}
                </td>
                <td className="px-6 py-4">
                    {income.date}
                </td>
                <td className="px-6 py-4">
                    <div className='flex md:flex md:flex-grow flex-row m-3 justify-end space-x-1'>

<Dialog open={add_income_open} onOpenChange={setAdd_income_open}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit income</DialogTitle>
          <DialogDescription>
            Fill in the form below to edit an income.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
            <input type='hidden' name='id' value={income.id}/>

        <div className="grid gap-4 py-4">

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Source
            </Label>
            <Select name ="source" >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food" >Food</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="entertainment">
                  entertainment
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="amount"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Description
            </Label>
            <Textarea
              className="resize-none w-[280px]"
              id="description"
              name="description"
              placeholder="description"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add income</Button>
        </DialogFooter>
        </form>
      
      </DialogContent>
    </Dialog>
                        <Button variant={"destructive"} onClick={() => deleteincome(income.id)}>Delete </Button>
                    </div>
                </td>
            </tr>
            ))}
                    </tbody>
    </table>
</div>


    </div>
    
    </>
  )
}

export default All_Income