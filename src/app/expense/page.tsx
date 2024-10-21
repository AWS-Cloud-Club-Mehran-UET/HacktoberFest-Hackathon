"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React, { FormEvent } from "react";
import All_Expense from "./All_Expense";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"

function Expense() {
  const { toast } = useToast()
  const [add_Expense_open, setAdd_Expense_open] = React.useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const all_expense = localStorage.getItem("expense");
    const id = Math.random().toString(36).substring(2, 9);

    if (all_expense) {
      const data = JSON.parse(all_expense);
      data.push({
        id : id,
        
        amount: formData.get("amount"),
        catagory: formData.get("catagory"),
        description: formData.get("description"),
        date : new Date().toDateString()
      });
      localStorage.setItem("expense", JSON.stringify(data));
    } else {
      localStorage.setItem("expense", JSON.stringify([{id: id ,amount: formData.get("amount"), catagory: formData.get("catagory"), description: formData.get("description"),date : new Date().toDateString()}]));
    
    
    }
    toast({
      title: "Expense added",
      description: "Your expense has been added",
    })
    setAdd_Expense_open(false);
}
  return (
    <>
      <div className="m-3">
        <Card>
          <CardHeader>
            <CardTitle>All Expense</CardTitle>
            <CardDescription>
              <div className="flex md:flex md:flex-grow flex-row m-3 justify-end space-x-1">
                <Dialog open={add_Expense_open} onOpenChange={setAdd_Expense_open}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Add Expense</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add a new expense</DialogTitle>
                      <DialogDescription>
                        Fill in the form below to add a new expense.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={onSubmit}>

                    <div className="grid gap-4 py-4">

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                          Catagory
                        </Label>
                        <Select name ="catagory">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="catagory" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Food">Food</SelectItem>
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
                      <Button type="submit">Add expense</Button>
                    </DialogFooter>
                    </form>
                  
                  </DialogContent>
                </Dialog>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <All_Expense />
          </CardContent>
        </Card>
      </div>
    </>
  );
}



export default Expense;
