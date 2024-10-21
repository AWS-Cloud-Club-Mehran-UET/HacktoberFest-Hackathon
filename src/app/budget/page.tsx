import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { FormEvent } from 'react'
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea'

function Budget() {
  const [add_Budget_open, setadd_Budget_open] = React.useState(false);

  const data_budget  = JSON.parse(localStorage.getItem("budget") || "[]");
  function deletebudget(id: any) {
      const data_budget = JSON.parse(localStorage.getItem("budget") || "[]");
      const newData = data_budget.filter((budget: any) => budget.id !== id);
      localStorage.setItem("budget", JSON.stringify(newData));
      window.location.reload();
  }
  function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const id =formData.get("id");
      const category =formData.get("category");
      const amount =formData.get("amount");
      const description =formData.get("description");
      const all_budget = localStorage.getItem("budget");

      if (all_budget) {
          
          const data = JSON.parse(all_budget);
           const  newData = data.filter((budget: any) => budget.id == id);

          if (newData.length > 0) {
              newData[0].category = category;
              newData[0].amount = amount;
              newData[0].description = description;
              localStorage.setItem("budget", JSON.stringify(newData));
              window.location.reload();
          }
          
      }



  }
  return (
   <>


   <div>


   <Card>
  <CardHeader>
    <CardTitle>Budget</CardTitle>
    <CardDescription>Budget Overview</CardDescription>
  </CardHeader>
  <CardContent>

<div className='flex-1 grid a-items-center justify-center '>
  <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Update Budget</CardTitle>
        <CardDescription>Update your budget.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Catogary">Catogary</Label>
              <Select>
                <SelectTrigger id="Catogary">
                  <SelectValue placeholder="Select a catogary" />
                </SelectTrigger>
                <SelectContent position="popper">
                <SelectItem value="Food"> Food</SelectItem>
                <SelectItem value="entertainment"> entertainment</SelectItem>
                <SelectItem value="budget"> budget</SelectItem>
                 
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Type">Type</Label>
              <Select>
                <SelectTrigger id="Type">
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent position="popper">
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
          
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input type='number' id="amout" placeholder="Enter amount" />
            </div>
           
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>update</Button>
      </CardFooter>
    </Card>

</div>

<div className='m-3'>
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Category
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
          {data_budget.map((budget: any) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {budget.category}
                </th>
                <td className="px-6 py-4">
                   
                </td>
                <td className="px-6 py-4">
                    {budget.amount}
                </td>
                <td className="px-6 py-4">
                    {budget.description}
                </td>
                <td className="px-6 py-4">
                    {budget.date}
                </td>
                <td className="px-6 py-4">
                    <div className='flex md:flex md:flex-grow flex-row m-3 justify-end space-x-1'>

                <Button variant={"outline"}>View</Button>
                <Dialog open={add_Budget_open} onOpenChange={setadd_Budget_open}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Budget</DialogTitle>
                      <DialogDescription>
                        Fill in the form below to edit an Budget.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={onSubmit}>

                    <div className="grid gap-4 py-4">

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                          Catagory
                        </Label>
                        <Select name ="catagory" >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="catagory" />
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
                      <Button type="submit">Add Budget</Button>
                    </DialogFooter>
                    </form>
                  
                  </DialogContent>
                </Dialog>
                <Button variant={"destructive"} onClick={() => deletebudget(budget.id)}>Delete </Button>
                    </div>  
                </td>
            </tr>

          ))}
      
           
        </tbody>
    </table>

</div>
   
  </CardContent>

</Card>

   </div>
   
   
   
   
   </>
  )
}

export default Budget