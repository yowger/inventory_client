import { Box, Paper, styled, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2" // Grid version 2
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Pie,
    PieChart,
    LineChart,
    Line,
} from "recharts"
import DashboardHeader from "../../components/shared/dashboard/DashboardHeader"
import { useGetStatsQuery } from "./dashboardApiSlice"

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
}))

const Dashboard = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetStatsQuery()

    return (
        <div>
            <DashboardHeader title="Dashboard" />

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                        <Item>
                            total Category: <b>{data?.totalCategories}</b>
                        </Item>
                    </Grid>

                    <Grid xs={12} md={4}>
                        <Item>
                            Total Quantity: <b>{data?.finalQuantity}</b>
                        </Item>
                    </Grid>

                    <Grid xs={12} md={4}>
                        <Item>
                            Total Amount: <b>{data?.finalAmount}</b>
                        </Item>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <Item sx={{ height: 450 }}>
                            <Typography sx={{ mb: 1 }}>
                                Categories and total quantity
                            </Typography>

                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data?.category}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="total" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Item>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <Item sx={{ height: 450 }}>
                            <Typography sx={{ mb: 1 }}>
                                Total amount by category
                            </Typography>

                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        dataKey="amount"
                                        isAnimationActive={false}
                                        data={data?.amount}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        fill="#8884d8"
                                        label
                                    />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Item>
                    </Grid>

                    <Grid xs={12}>
                        <Item sx={{ height: 500 }}>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart
                                    width={500}
                                    height={200}
                                    data={data?.amountByWeek}
                                    syncId="anyId"
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                            <p>Maybe some other content</p>

                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart
                                    width={500}
                                    height={200}
                                    data={data?.quantityByWeek}
                                    syncId="anyId"
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="quantity"
                                        stroke="#82ca9d"
                                        fill="#82ca9d"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Dashboard
