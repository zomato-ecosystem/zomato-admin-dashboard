"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const generateInitialData = () => {
    const data = []
    const now = new Date()
    for (let i = 60; i > 0; i--) {
        data.push({
            time: new Date(now.getTime() - i * 1000).toLocaleTimeString(),
            orders: Math.floor(Math.random() * 50) + 10,
        })
    }
    return data
}

export function RealTimeChart() {
    const [data, setData] = useState(generateInitialData())

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prevData) => {
                const newTime = new Date().toLocaleTimeString()
                const newOrders = Math.floor(Math.random() * 50) + 10
                const newDataPoint = { time: newTime, orders: newOrders }
                return [...prevData.slice(1), newDataPoint]
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Real-time Order Volume</CardTitle>
                <CardDescription>
                    Live updates of orders placed in the last 60 seconds.
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={() => ""} // Hide ticks for clean look
                                interval={9}
                                stroke="#888888" // Theme aware gray
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                                stroke="#888888" // Theme aware gray
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    backgroundColor: 'hsl(var(--card))',
                                    color: 'hsl(var(--foreground))'
                                }}
                                labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="orders"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
                                animationDuration={300}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
