import React from 'react';
import { ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';

const CustomsBarChart = ({ data }) => {
    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey="amount" fill="#FF8042" radius={[10, 10, 0, 0]} activeDot={{ r: 8, fill: "yellow" }} activeStyle={{ fill: "green" }} > 

                        <Cell
                    </Bar>

                </BarChart>

        </div>
    );
};

export default CustomsBarChart;