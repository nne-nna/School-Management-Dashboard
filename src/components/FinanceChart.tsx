"use client";

import Image from "next/image";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    {
        name: "Jan",
        income: 2000,
        expense: 1600,
    },
    {
        name: "Feb",
        income: 4500,
        expense: 2000,
    },
    {
        name: "Mar",
        income: 3654,
        expense: 6700,
    },
    {
        name: "Apr",
        income: 2000,
        expense: 1780,
    },
    {
        name: "May",
        income: 3910,
        expense: 2300,
    },
    {
        name: "Jun",
        income: 1500,
        expense: 1300,
    },
    {
        name: "Jul",
        income: 4000,
        expense: 2320,
    },
    {
        name: "Aug",
        income: 2900,
        expense: 2720,
    },
    {
        name: "Sept",
        income: 5000,
        expense: 4820,
    },
    {
        name: "Oct",
        income: 3420,
        expense: 2000,
    },
    {
        name: "Nov",
        income: 2220,
        expense: 1220,
    },
    {
        name: "Dec",
        income: 3320,
        expense: 4620,
    },
]

const FinanceChart= () => {
    return(
        <div className="bg-white rounded-xl w-full h-full p-4">
            {/* TITLE */}
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Finance</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            {/* CHART */}
                <ResponsiveContainer width="100%" height="90%" >
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ddd"/>
                        <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} tickMargin={10}/>
                        <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} tickMargin={20} />
                        <Tooltip />
                        <Legend align="center" verticalAlign="top" wrapperStyle={{paddingTop:"10px", paddingBottom:"30px"}}/>
                        <Line type="monotone" dataKey="income"  stroke="#C3EBFA" strokeWidth={4}/>
                        <Line type="monotone" dataKey="expense" stroke="#CFCEFF" strokeWidth={4} />
                    </LineChart>
                </ResponsiveContainer>
        </div>
    )
}

export default FinanceChart;