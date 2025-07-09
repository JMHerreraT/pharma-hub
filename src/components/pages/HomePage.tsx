"use client"

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { DataTable } from '../templates/DataTable'
import { ColumnDef } from '@tanstack/react-table';
import { createActionsColumn, createSelectColumn } from '@/lib/column-helper';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

export type User = {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user" | "moderator";
    avatar?: string;
    createdAt: Date;
};

const userData: User[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        createdAt: new Date("2024-01-15"),
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        createdAt: new Date("2024-02-10"),
    },
    {
        id: "3",
        name: "Robert Wilson",
        email: "robert@example.com",
        role: "moderator",
        createdAt: new Date("2024-01-20"),
    },
    {
        id: "4",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        role: "user",
        createdAt: new Date("2024-02-15"),
    },
    {
        id: "5",
        name: "Michael Brown",
        email: "michael@example.com",
        role: "admin",
        createdAt: new Date("2024-01-25"),
    },
    {
        id: "6",
        name: "Emily Davis",
        email: "emily@example.com",
        role: "user",
        createdAt: new Date("2024-02-01"),
    },
    {
        id: "7",
        name: "David Miller",
        email: "david@example.com",
        role: "moderator",
        createdAt: new Date("2024-01-30"),
    },
    {
        id: "8",
        name: "Lisa Anderson",
        email: "lisa@example.com",
        role: "user",
        createdAt: new Date("2024-02-05"),
    },
    {
        id: "9",
        name: "James Wilson",
        email: "james@example.com",
        role: "user",
        createdAt: new Date("2024-01-22"),
    },
    {
        id: "10",
        name: "Jennifer Taylor",
        email: "jennifer@example.com",
        role: "admin",
        createdAt: new Date("2024-02-12"),
    },
    {
        id: "11",
        name: "Daniel Moore",
        email: "daniel@example.com",
        role: "user",
        createdAt: new Date("2024-01-18"),
    },
    {
        id: "12",
        name: "Michelle Lee",
        email: "michelle@example.com",
        role: "moderator",
        createdAt: new Date("2024-02-08"),
    },
    {
        id: "13",
        name: "Christopher White",
        email: "chris@example.com",
        role: "user",
        createdAt: new Date("2024-01-28"),
    },
    {
        id: "14",
        name: "Amanda Martinez",
        email: "amanda@example.com",
        role: "user",
        createdAt: new Date("2024-02-03"),
    },
    {
        id: "15",
        name: "Kevin Thompson",
        email: "kevin@example.com",
        role: "admin",
        createdAt: new Date("2024-01-16"),
    },
    {
        id: "16",
        name: "Jessica Rodriguez",
        email: "jessica@example.com",
        role: "user",
        createdAt: new Date("2024-02-09"),
    },
    {
        id: "17",
        name: "Brian Clark",
        email: "brian@example.com",
        role: "moderator",
        createdAt: new Date("2024-01-24"),
    },
    {
        id: "18",
        name: "Rachel Lewis",
        email: "rachel@example.com",
        role: "user",
        createdAt: new Date("2024-02-07"),
    },
    {
        id: "19",
        name: "Steven Walker",
        email: "steven@example.com",
        role: "user",
        createdAt: new Date("2024-01-19"),
    },
    {
        id: "20",
        name: "Nicole Harris",
        email: "nicole@example.com",
        role: "admin",
        createdAt: new Date("2024-02-11"),
    },
    {
        id: "21",
        name: "Marcus Chen",
        email: "marcus@example.com",
        role: "user",
        createdAt: new Date("2024-02-12"),
    },
    {
        id: "22",
        name: "Diana Foster",
        email: "diana@example.com",
        role: "moderator",
        createdAt: new Date("2024-01-28"),
    },
    {
        id: "23",
        name: "Ryan Cooper",
        email: "ryan@example.com",
        role: "user",
        createdAt: new Date("2024-02-01"),
    },
    {
        id: "24",
        name: "Michelle Wong",
        email: "michelle@example.com",
        role: "admin",
        createdAt: new Date("2024-01-15"),
    },
    {
        id: "25",
        name: "Trevor Phillips",
        email: "trevor@example.com",
        role: "user",
        createdAt: new Date("2024-02-08"),
    },
    {
        id: "26",
        name: "Sophia Anderson",
        email: "sophia@example.com",
        role: "user",
        createdAt: new Date("2024-01-22"),
    },
    {
        id: "27",
        name: "Lucas Rivera",
        email: "lucas@example.com",
        role: "moderator",
        createdAt: new Date("2024-02-05"),
    },
    {
        id: "28",
        name: "Emma Wilson",
        email: "emma@example.com",
        role: "user",
        createdAt: new Date("2024-01-30"),
    },
    {
        id: "29",
        name: "Adrian Patel",
        email: "adrian@example.com",
        role: "admin",
        createdAt: new Date("2024-02-13"),
    },
    {
        id: "30",
        name: "Olivia Scott",
        email: "olivia@example.com",
        role: "user",
        createdAt: new Date("2024-01-25"),
    },
    {
        id: "31",
        name: "Nathan Kim",
        email: "nathan@example.com",
        role: "user",
        createdAt: new Date("2024-02-10"),
    },
    {
        id: "32",
        name: "Isabella Brown",
        email: "isabella@example.com",
        role: "moderator",
        createdAt: new Date("2024-01-18"),
    },
    {
        id: "33",
        name: "Christopher Lee",
        email: "chris@example.com",
        role: "user",
        createdAt: new Date("2024-02-15"),
    },
    {
        id: "34",
        name: "Victoria Garcia",
        email: "victoria@example.com",
        role: "admin",
        createdAt: new Date("2024-01-27"),
    },
    {
        id: "35",
        name: "Daniel Taylor",
        email: "daniel@example.com",
        role: "user",
        createdAt: new Date("2024-02-03"),
    },
    {
        id: "36",
        name: "Ava Mitchell",
        email: "ava@example.com",
        role: "user",
        createdAt: new Date("2024-01-20"),
    },
    {
        id: "37",
        name: "James Wilson",
        email: "james@example.com",
        role: "moderator",
        createdAt: new Date("2024-02-14"),
    },
    {
        id: "38",
        name: "Mia Johnson",
        email: "mia@example.com",
        role: "user",
        createdAt: new Date("2024-01-29"),
    },
    {
        id: "39",
        name: "William Zhang",
        email: "william@example.com",
        role: "admin",
        createdAt: new Date("2024-02-06"),
    },
    {
        id: "40",
        name: "Sofia Rodriguez",
        email: "sofia@example.com",
        role: "user",
        createdAt: new Date("2024-01-23"),
    }
];

const userColumns: ColumnDef<User>[] = [
    createSelectColumn<User>(),
    {
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.getValue("role") as string;
            return (
                <Badge variant={role === "admin" ? "default" : "secondary"}>
                    {role}
                </Badge>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
            const date = row.getValue("createdAt") as Date;
            return date.toLocaleDateString();
        },
    },
    createActionsColumn<User>([
        {
            label: "Edit user",
            onClick: (user) => console.log("Edit", user),
        },
        {
            label: "Delete user",
            onClick: (user) => console.log("Delete", user),
            className: "text-red-600",
        },
    ]),
];


const HomePage = () => {
    return (
        <div className="grid grid-cols-5 grid-rows-7 gap-4">
            <div className="col-span-5 row-span-2">
                <Card className='w-full h-full bg-white/10'>
                    <CardHeader>
                        Resultado de ventas
                    </CardHeader>
                    <CardContent className='w-full h-full flex flex-row gap-4'>
                        <Card className='w-full h-full bg-white/10'>
                            <CardHeader>
                                <CardTitle>
                                    Grafica 1
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='w-full h-full flex items-center justify-center'>
                                <p>Aqui mis grafica 1</p>
                            </CardContent>
                        </Card>
                        <Card className='w-full h-full bg-white/10'>
                            <CardHeader>
                                <CardTitle>
                                    Grafica 2
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='w-full h-full flex items-center justify-center'>
                                <p>Aqui mis grafica 2</p>
                            </CardContent>
                        </Card>
                        <Card className='w-full h-full bg-white/10'>
                            <CardHeader>
                                <CardTitle>
                                    Grafica 3
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='w-full h-full flex items-center justify-center'>
                                <p>Aqui mis grafica 3</p>
                            </CardContent>
                        </Card>
                        <Card className='w-full h-full bg-white/10'>
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
                <Card className='w-full h-full bg-white/10'>
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
                <Card className='w-full h-full bg-white/10'>
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
                <Card className='w-full h-full bg-white/10'>
                    <CardContent className='w-full h-full items-center justify-center flex'>
                        <DataTable
                            title="Recent Sales List"
                            data={userData}
                            columns={userColumns}
                            filterColumn="name"
                            filterPlaceholder="Filter users..."
                            enablePagination={true}
                            enableColumnVisibility={true}
                        />
                    </CardContent>
                    <CardFooter>
                        <p>Aqui mi footer</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default HomePage
