import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

function Budget() {
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
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
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
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   Food
                </th>
                <td className="px-6 py-4">
                   
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    20/12/2022
                </td>
                <td className="px-6 py-4">
                    <div className='flex md:flex md:flex-grow flex-row m-3 justify-end space-x-1'>

                <Button variant={"outline"}>View</Button>
                <Button>Edit</Button>
                <Button variant={"destructive"}>Delete </Button>
                    </div>
                </td>
            </tr>
           
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