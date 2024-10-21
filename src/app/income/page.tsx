"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import React, { FormEvent } from 'react'
import All_Income from './All_Income'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

function Income() {
  const { toast } = useToast()
  const [add_income_open, setAdd_income_open] = React.useState(false);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const all_income = localStorage.getItem("income");
    const id = Math.random().toString(36).substring(2, 9);

    if (all_income) {
      const data = JSON.parse(all_income);
      data.push({
        id : id,
        
        amount: formData.get("amount"),
        Source: formData.get("source"),
        description: formData.get("description"),
        date : new Date().toDateString()
      });
      localStorage.setItem("income", JSON.stringify(data));
    } else {
      localStorage.setItem("income", JSON.stringify([{id: id ,amount: formData.get("amount"), source: formData.get("source"), description: formData.get("description"),date : new Date().toDateString()}]));
    
    
    }
    toast({
      title: "income added",
      description: "Your income has been added",
    })
    setAdd_income_open(false);
}
  return (
    <>
    <div className='m-3'>

    <Card>
  <CardHeader>
    <CardTitle>All Income</CardTitle>
    <CardDescription>
    <div className="flex md:flex md:flex-grow flex-row m-3 justify-end space-x-1">
    <Dialog open={add_income_open} onOpenChange={setAdd_income_open}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Add income</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add income </DialogTitle>
                      <DialogDescription>
                        Fill in the form below to Add income .
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={onSubmit}>

                    <div className="grid gap-4 py-4">

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                          Source
                        </Label>
                        <Select name ="source" >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="salary" >Salary</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                
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
    </div>
    </CardDescription>
  </CardHeader>
  <CardContent>
    <All_Income/>
    
  </CardContent>

</Card>

    </div>
    
    </>
  )
}

export default Income