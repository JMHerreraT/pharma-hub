'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  InnerCard,
} from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Info } from 'lucide-react'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

const areaChartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]
const areaChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

const HomePage = () => {
  return (
    // <div className="grid auto-rows-auto grid-cols-6 gap-5">
    <div className="grid auto-rows-auto grid-cols-3 gap-5 md:grid-cols-6 lg:grid-cols-9">
      <div className="col-span-6 xl:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-5 space-y-0 pb-2">
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              <span>Overview</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[calc(100%_-_48px)] flex-col justify-between py-4">
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <span className="text-2xl font-bold">$100,000</span>
                  <div>
                    <span>chart</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-xs">Since last month</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <span className="text-sm font-semibold">Details</span>
              <div className="flex items-center gap-1 text-emerald-500 dark:text-emerald-400">
                <span>test</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="col-span-6 lg:col-span-3 xl:col-span-2">
        <Card></Card>
      </div>
      <div className="col-span-6 lg:col-span-3 xl:col-span-2">
        <Card></Card>
      </div>
      <div className="col-span-6 lg:col-span-3 xl:col-span-3">
        <Card></Card>
      </div>
      <div className="col-span-6 xl:col-span-4">
        <Card>
          <Tabs defaultValue="monthly-sales" className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center gap-2">
                  <CardTitle>Sales</CardTitle>
                  <CardDescription>
                    <span>Sales</span>
                  </CardDescription>
                </div>

                <TabsList className="text-sm font-medium">
                  <TabsTrigger value="monthly-sales">Today</TabsTrigger>
                  <TabsTrigger value="weekly-sales">This Week</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6">
              {/* Today Sales */}
              <TabsContent value="monthly-sales">
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 sm:grid-rows-2">
                  <div className="col-span-2 row-start-1 row-end-2">
                    <InnerCard className="py-2 gap-0">
                      <CardHeader className="space-y-1.5 p-6 flex flex-row items-center justify-between px-4 pt-2 pb-2">
                        <span className="tracking-tight flex items-center gap-2 text-sm font-medium">
                          Net Sales
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Net Sales</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardHeader>
                      <CardContent className="px-4">
                        <div className="flex flex-col justify-start">
                          <span className="text-2xl font-bold">$100,000</span>
                          <span className="text-sm text-muted-foreground">Total Sales</span>
                        </div>
                      </CardContent>
                    </InnerCard>
                  </div>
                  <div className="col-span-2 sm:row-start-2 sm:row-end-3">
                    <InnerCard className="py-2 gap-0">
                      <CardHeader className="space-y-1.5 p-6 flex flex-row items-center justify-between px-4 pt-2 pb-2">
                        <span className="tracking-tight flex items-center gap-2 text-sm font-medium">
                          Net Sales
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Net Sales</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardHeader>
                      <CardContent className="px-4">
                        <div className="flex flex-col justify-start">
                          <span className="text-2xl font-bold">$100,000</span>
                          <span className="text-sm text-muted-foreground">Total Sales</span>
                        </div>
                      </CardContent>
                    </InnerCard>
                  </div>

                  <div className="col-span-4 sm:col-span-3 sm:row-span-3">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                      <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                          top: 20,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                          <LabelList
                            position="top"
                            offset={12}
                            className="fill-foreground"
                            fontSize={12}
                          />
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>
                </div>
              </TabsContent>

              {/* Weekly Sales */}
              <TabsContent value="weekly-sales">
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 sm:grid-rows-2">
                  <div className="col-span-2 row-start-1 row-end-2">
                    <InnerCard className="py-2 gap-0">
                      <CardHeader className="space-y-1.5 p-6 flex flex-row items-center justify-between px-4 pt-2 pb-2">
                        <span className="tracking-tight flex items-center gap-2 text-sm font-medium">
                          Net Sales
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Net Sales</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardHeader>
                      <CardContent className="px-4">
                        <div className="flex flex-col justify-start">
                          <span className="text-2xl font-bold">$5,000</span>
                          <span className="text-sm text-muted-foreground">Total Sales</span>
                        </div>
                      </CardContent>
                    </InnerCard>
                  </div>
                  <div className="col-span-2 sm:row-start-2 sm:row-end-3">
                    <InnerCard className="py-2 gap-0">
                      <CardHeader className="space-y-1.5 p-6 flex flex-row items-center justify-between px-4 pt-2 pb-2">
                        <span className="tracking-tight flex items-center gap-2 text-sm font-medium">
                          Net Sales
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Net Sales</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardHeader>
                      <CardContent className="px-4">
                        <div className="flex flex-col justify-start">
                          <span className="text-2xl font-bold">$3,000</span>
                          <span className="text-sm text-muted-foreground">Total Sales</span>
                        </div>
                      </CardContent>
                    </InnerCard>
                  </div>

                  <div className="col-span-4 sm:col-span-3 sm:row-span-3">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                      <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                          top: 20,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                          <LabelList
                            position="top"
                            offset={12}
                            className="fill-foreground"
                            fontSize={12}
                          />
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
      <div className="col-span-6 xl:col-span-5">
        <Card>
          <Tabs defaultValue="monthly-visitors" className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center gap-2">
                  <CardTitle>Sales</CardTitle>
                  <CardDescription>
                    <span>Sales</span>
                  </CardDescription>
                </div>

                <TabsList className="text-sm font-medium">
                  <TabsTrigger value="monthly-visitors">Today</TabsTrigger>
                  <TabsTrigger value="weekly-visitors">This Week</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6">
              {/* Today Sales */}
              <TabsContent value="monthly-visitors">
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 sm:grid-rows-2">
                  <div className="col-span-2 row-start-1 row-end-2">
                    <InnerCard className="py-2 gap-0">
                      <CardHeader className="space-y-1.5 p-6 flex flex-row items-center justify-between px-4 pt-2 pb-2">
                        <span className="tracking-tight flex items-center gap-2 text-sm font-medium">
                          Net Sales
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Net Sales</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardHeader>
                      <CardContent className="px-4">
                        <div className="flex flex-col justify-start">
                          <span className="text-2xl font-bold">$100,000</span>
                          <span className="text-sm text-muted-foreground">Total Sales</span>
                        </div>
                      </CardContent>
                    </InnerCard>
                  </div>
                  <div className="col-span-2 sm:row-start-2 sm:row-end-3">
                    <InnerCard className="py-2 gap-0">
                      <CardHeader className="space-y-1.5 p-6 flex flex-row items-center justify-between px-4 pt-2 pb-2">
                        <span className="tracking-tight flex items-center gap-2 text-sm font-medium">
                          Net Sales
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Net Sales</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardHeader>
                      <CardContent className="px-4">
                        <div className="flex flex-col justify-start">
                          <span className="text-2xl font-bold">$100,000</span>
                          <span className="text-sm text-muted-foreground">Total Sales</span>
                        </div>
                      </CardContent>
                    </InnerCard>
                  </div>

                  <div className="col-span-4 sm:col-span-3 sm:row-span-3">
                    <ChartContainer config={areaChartConfig} className="w-full h-full">
                      <AreaChart
                        accessibilityLayer
                        data={areaChartData}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                          dataKey="mobile"
                          type="natural"
                          fill="var(--color-mobile)"
                          fillOpacity={0.4}
                          stroke="var(--color-mobile)"
                          stackId="a"
                        />
                        <Area
                          dataKey="desktop"
                          type="natural"
                          fill="var(--color-desktop)"
                          fillOpacity={0.4}
                          stroke="var(--color-desktop)"
                          stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </div>
              </TabsContent>

              {/* Weekly Sales */}
              <TabsContent value="weekly-visitors">
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 sm:grid-rows-2">
                  <div className="col-span-2 row-start-1 row-end-2">
                    <InnerCard className="py-2 gap-0">
                      <CardHeader className="space-y-1.5 p-6 flex flex-row items-center justify-between px-4 pt-2 pb-2">
                        <span className="tracking-tight flex items-center gap-2 text-sm font-medium">
                          Net Sales
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Net Sales</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardHeader>
                      <CardContent className="px-4">
                        <div className="flex flex-col justify-start">
                          <span className="text-2xl font-bold">$5,000</span>
                          <span className="text-sm text-muted-foreground">Total Sales</span>
                        </div>
                      </CardContent>
                    </InnerCard>
                  </div>
                  <div className="col-span-2 sm:row-start-2 sm:row-end-3">
                    <InnerCard className="py-2 gap-0">
                      <CardHeader className="space-y-1.5 p-6 flex flex-row items-center justify-between px-4 pt-2 pb-2">
                        <span className="tracking-tight flex items-center gap-2 text-sm font-medium">
                          Net Sales
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Net Sales</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardHeader>
                      <CardContent className="px-4">
                        <div className="flex flex-col justify-start">
                          <span className="text-2xl font-bold">$3,000</span>
                          <span className="text-sm text-muted-foreground">Total Sales</span>
                        </div>
                      </CardContent>
                    </InnerCard>
                  </div>

                  <div className="col-span-4 sm:col-span-3 sm:row-span-3">
                    <ChartContainer config={areaChartConfig} className="w-full h-full">
                      <AreaChart
                        accessibilityLayer
                        data={areaChartData}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                          dataKey="mobile"
                          type="natural"
                          fill="var(--color-mobile)"
                          fillOpacity={0.4}
                          stroke="var(--color-mobile)"
                          stackId="a"
                        />
                        <Area
                          dataKey="desktop"
                          type="natural"
                          fill="var(--color-desktop)"
                          fillOpacity={0.4}
                          stroke="var(--color-desktop)"
                          stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
      <div className="col-span-6 xl:col-span-2">
        <Card></Card>
      </div>
      <div className="col-span-6 lg:col-span-3 xl:col-span-2">
        <Card></Card>
      </div>
      <div className="col-span-6 lg:col-span-3 xl:col-span-2">
        <Card></Card>
      </div>
      <div className="col-span-6 lg:col-span-3 xl:col-span-3">
        <Card></Card>
      </div>
    </div>
  )
}

export default HomePage
