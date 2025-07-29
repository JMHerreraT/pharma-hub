"use client"

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import ProductsDataTable from '../organisms/ProductsDataTable';
// import DonutChart from '../organisms/DonutChart';

export type User = {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user" | "moderator";
    avatar?: string;
    createdAt: Date;
};




const HomePage = () => {
    return (
        <div className="grid grid-cols-5 grid-rows-7 gap-4">
            <div className="col-span-5 row-span-2">
                <Card className='w-full h-full'>
                    <CardHeader>
                        Resultado de ventas
                    </CardHeader>
                    <CardContent className='w-full h-full flex flex-row gap-4'>
                    {/* <DonutChart
        title="Resumen Financiero"
        size="lg"
        total={755000}
        data={[
          { name: "Compras", value: 300000, percentage: 40, color: "#C7E9B4" },
          { name: "Ventas", value: 200000, percentage: 26.5, color: "#FFB3BA" },
          { name: "Inactivos", value: 120000, percentage: 16, color: "#E5E5E5", pattern: "diagonal-stripes" },
          { name: "Proveedores", value: 135000, percentage: 17.5, color: "#7FCDCD" },
        ]}
      /> */}
                        {/* <Card className='w-full h-full'>
                            <CardHeader>
                                <CardTitle>
                                    Grafica 1
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='w-full h-full flex items-center justify-center'>
                                <p>Aqui mis grafica 1</p>
                            </CardContent>
                        </Card> */}
                        <Card className='w-full h-full'>
                            <CardHeader>
                                <CardTitle>
                                    Grafica 2
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='w-full h-full flex items-center justify-center'>
                                <p>Aqui mis grafica 2</p>
                            </CardContent>
                        </Card>
                        <Card className='w-full h-full'>
                            <CardHeader>
                                <CardTitle>
                                    Grafica 3
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='w-full h-full flex items-center justify-center'>
                                <p>Aqui mis grafica 3</p>
                            </CardContent>
                        </Card>
                        <Card className='w-full h-full'>
                            <CardHeader>
                                <CardTitle>
                                    Grafica 4
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='w-full h-full flex items-center justify-center'>
                                <p>Aqui mis grafica 4</p>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-2 row-span-3 row-start-3">
                <Card className='w-full h-full'>
                    <CardHeader>
                        Resultado de ventas
                    </CardHeader>
                    <CardContent className='w-full h-full p-0 items-center justify-center flex'>
                        <p>Aqui mis graficas</p>
                    </CardContent>
                    <CardFooter>
                        <p>Aqui mi footer</p>
                    </CardFooter>
                </Card>
            </div>
            <div className="col-span-3 row-span-3 col-start-3 row-start-3">
                <Card className='w-full h-full'>
                    <CardHeader>
                        Resultado de ventas
                    </CardHeader>
                    <CardContent className='w-full h-full p-0 items-center justify-center flex'>
                        <p>Aqui mis graficas</p>
                    </CardContent>
                    <CardFooter>
                        <p>Aqui mi footer</p>
                    </CardFooter>
                </Card>
            </div>
            <div className="col-span-5 row-span-2 row-start-6">
                {/* <Card className='w-full h-full'>
                    <CardContent className='w-full h-full items-center justify-center flex'>

                    </CardContent>
                </Card> */}
                <ProductsDataTable />
            </div>
        </div>
    )
}

export default HomePage
