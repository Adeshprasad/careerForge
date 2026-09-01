import { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

import "./Analytics.css";


function Analytics() {

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        async function fetchAnalytics() {

            try {

                setLoading(true);

                setError("");

                const token =
                    localStorage.getItem("token");


                const response = await fetch(
                    "http://localhost:3000/applications/analytics",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


                const data =
                    await response.json();


                if (!response.ok) {

                    setError(
                        data.message ||
                        "Failed to load analytics"
                    );

                    setLoading(false);

                    return;
                }


                setAnalytics(data);

                setLoading(false);

            } catch (error) {

                console.error(error);

                setError(
                    "Failed to load analytics"
                );

                setLoading(false);
            }
        }


        fetchAnalytics();

    }, []);


    if (loading) {

        return (
            <section className="analytics analytics-state">

                <div className="loading-spinner"></div>

                <p>
                    Loading analytics...
                </p>

            </section>
        );
    }


    if (error) {

        return (
            <section className="analytics analytics-state">

                <h3>
                    Unable to load analytics
                </h3>

                <p>
                    {error}
                </p>

            </section>
        );
    }


    function getStatusCount(status) {

        return (
            analytics.statusBreakdown.find(
                (item) =>
                    item._id === status
            )?.count || 0
        );
    }


    /* =========================
       STATUS CHART DATA
    ========================= */

    const chartData =
        analytics.statusBreakdown.map(
            (item) => ({
                name: item._id,
                value: item.count
            })
        );


    /* =========================
       TIME CHART DATA
    ========================= */

    const rawTimeData =
        analytics.applicationsOverTime || [];


    const timeDataMap =
        new Map(
            rawTimeData.map((item) => [
                item._id,
                item.count
            ])
        );


    const months = [];

    const today = new Date();


    for (let i = 5; i >= 0; i--) {

        const date = new Date(
            today.getFullYear(),
            today.getMonth() - i,
            1
        );

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const key =
            `${year}-${month}`;


        months.push({
            month: key,

            applications:
                timeDataMap.get(key) || 0
        });
    }


    const timeChartData =
        months.map((item) => {

            const [year, month] =
                item.month.split("-");


            const date = new Date(
                Number(year),
                Number(month) - 1,
                1
            );


            return {
                ...item,

                label: date.toLocaleDateString(
                    "en-US",
                    {
                        month: "short"
                    }
                )
            };

        });


    const chartColors = {
        Applied: "#3b82f6",
        Interview: "#8b5cf6",
        Offer: "#22c55e",
        Rejected: "#ef4444"
    };


    return (
        <section className="analytics">


            {/* =========================
                HEADER
            ========================= */}

            <div className="analytics-header">

                <div>

                    <p className="analytics-eyebrow">
                        OVERVIEW
                    </p>

                    <h2>
                        Career Analytics
                    </h2>

                    <p>
                        A quick look at your
                        application pipeline.
                    </p>

                </div>

            </div>


            {/* =========================
                SUMMARY CARDS
            ========================= */}

            <div className="analytics-cards">


                <div className="analytics-card">

                    <div className="analytics-card-icon">
                        📋
                    </div>

                    <div>

                        <span>
                            TOTAL APPLICATIONS
                        </span>

                        <strong>
                            {analytics.totalApplications}
                        </strong>

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="analytics-card-icon">
                        📤
                    </div>

                    <div>

                        <span>
                            APPLIED
                        </span>

                        <strong>
                            {getStatusCount("Applied")}
                        </strong>

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="analytics-card-icon">
                        🎤
                    </div>

                    <div>

                        <span>
                            INTERVIEWS
                        </span>

                        <strong>
                            {getStatusCount("Interview")}
                        </strong>

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="analytics-card-icon">
                        🎯
                    </div>

                    <div>

                        <span>
                            OFFERS
                        </span>

                        <strong>
                            {getStatusCount("Offer")}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =========================
                VISUAL ANALYTICS
            ========================= */}

            <div className="analytics-visual-grid">


                {/* =========================
                    DONUT CHART
                ========================= */}

                <div className="analytics-chart-card">

                    <div className="chart-card-header">

                        <div>

                            <h3>
                                Applications by Status
                            </h3>

                            <p>
                                Current application distribution
                            </p>

                        </div>

                    </div>


                    <div className="donut-chart-wrapper">

                        <ResponsiveContainer
                            width="100%"
                            height={260}
                        >

                            <PieChart>

                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={72}
                                    outerRadius={100}
                                    paddingAngle={3}
                                    stroke="none"
                                >

                                    {chartData.map(
                                        (entry) => (

                                            <Cell
                                                key={
                                                    entry.name
                                                }
                                                fill={
                                                    chartColors[
                                                    entry.name
                                                    ]
                                                }
                                            />

                                        )
                                    )}

                                </Pie>


                                <Tooltip
                                    formatter={(
                                        value,
                                        name
                                    ) => [
                                            value,
                                            name
                                        ]}
                                />

                            </PieChart>

                        </ResponsiveContainer>


                        <div className="donut-center">

                            <strong>
                                {analytics.totalApplications}
                            </strong>

                            <span>
                                Total
                            </span>

                        </div>

                    </div>


                    {/* LEGEND */}

                    <div className="chart-legend">

                        {chartData.map(
                            (item) => (

                                <div
                                    className="legend-item"
                                    key={item.name}
                                >

                                    <span
                                        className="legend-dot"
                                        style={{
                                            background:
                                                chartColors[
                                                item.name
                                                ]
                                        }}
                                    ></span>

                                    <span>
                                        {item.name}
                                    </span>

                                    <strong>
                                        {item.value}
                                    </strong>

                                </div>

                            )
                        )}

                    </div>

                </div>


                {/* =========================
                    PIPELINE
                ========================= */}

                <div className="analytics-chart-card">

                    <div className="chart-card-header">

                        <div>

                            <h3>
                                Application Pipeline
                            </h3>

                            <p>
                                Breakdown by current status
                            </p>

                        </div>

                    </div>


                    <div className="status-list">

                        {[
                            "Applied",
                            "Interview",
                            "Offer",
                            "Rejected"
                        ].map(
                            (status) => {

                                const count =
                                    getStatusCount(
                                        status
                                    );


                                const percentage =
                                    analytics.totalApplications >
                                        0
                                        ? (
                                            (count /
                                                analytics.totalApplications) *
                                            100
                                        ).toFixed(1)
                                        : 0;


                                return (

                                    <div
                                        className="status-item"
                                        key={status}
                                    >

                                        <div className="status-item-header">

                                            <span className="status-name">
                                                {status}
                                            </span>

                                            <span className="status-count">

                                                {count}

                                                <small>
                                                    {" "}
                                                    ({percentage}%)
                                                </small>

                                            </span>

                                        </div>


                                        <div className="status-bar">

                                            <div
                                                className={`status-bar-fill ${status.toLowerCase()}`}
                                                style={{
                                                    width:
                                                        `${percentage}%`
                                                }}
                                            ></div>

                                        </div>

                                    </div>

                                );
                            }
                        )}

                    </div>

                </div>

            </div>


            {/* =========================
                APPLICATIONS OVER TIME
            ========================= */}

            <div className="analytics-chart-card analytics-time-chart">

                <div className="chart-card-header">

                    <div>

                        <h3>
                            Applications Over Time
                        </h3>

                        <p>
                            Your application activity by month
                        </p>

                    </div>

                </div>


                <div className="time-chart-wrapper">

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={timeChartData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 5
                            }}
                        >

                            <CartesianGrid
                                stroke="var(--border)"
                                strokeDasharray="4 4"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="label"
                                stroke="var(--text-secondary)"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                stroke="var(--text-secondary)"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    background:
                                        "var(--surface-secondary)",

                                    border:
                                        "1px solid var(--border)",

                                    borderRadius: "10px",

                                    color:
                                        "var(--text)"
                                }}

                                labelStyle={{
                                    color:
                                        "var(--text-secondary)",

                                    marginBottom: "4px"
                                }}

                                formatter={(value) => [
                                    value,
                                    "Applications"
                                ]}
                            />

                            <Line
                                type="monotone"
                                dataKey="applications"
                                stroke="var(--primary)"
                                strokeWidth={3}
                                dot={{
                                    r: 4,
                                    fill: "var(--primary)",
                                    strokeWidth: 0
                                }}
                                activeDot={{
                                    r: 6
                                }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

            {/* =========================
    PIPELINE CONVERSION
========================= */}

            <div className="conversion-card">

                <div className="chart-card-header">

                    <div>

                        <h3>
                            Pipeline Conversion
                        </h3>

                        <p>
                            How applications move through your pipeline
                        </p>

                    </div>

                </div>


                <div className="conversion-grid">


                    {/* APPLICATION → INTERVIEW */}

                    <div className="conversion-item">

                        <div className="conversion-top">

                            <span className="conversion-label">
                                APPLICATION → INTERVIEW
                            </span>

                            <strong>
                                {analytics.totalApplications > 0
                                    ? (
                                        (
                                            getStatusCount("Interview") /
                                            analytics.totalApplications
                                        ) * 100
                                    ).toFixed(1)
                                    : 0
                                }%
                            </strong>

                        </div>


                        <div className="conversion-bar">

                            <div
                                className="conversion-fill interview"
                                style={{
                                    width:
                                        `${analytics.totalApplications > 0
                                            ? (
                                                (
                                                    getStatusCount("Interview") /
                                                    analytics.totalApplications
                                                ) * 100
                                            )
                                            : 0
                                        }%`
                                }}
                            ></div>

                        </div>


                        <p>
                            {getStatusCount("Interview")} of{" "}
                            {analytics.totalApplications} applications
                        </p>

                    </div>


                    {/* APPLICATION → OFFER */}

                    <div className="conversion-item">

                        <div className="conversion-top">

                            <span className="conversion-label">
                                APPLICATION → OFFER
                            </span>

                            <strong>
                                {analytics.totalApplications > 0
                                    ? (
                                        (
                                            getStatusCount("Offer") /
                                            analytics.totalApplications
                                        ) * 100
                                    ).toFixed(1)
                                    : 0
                                }%
                            </strong>

                        </div>


                        <div className="conversion-bar">

                            <div
                                className="conversion-fill offer"
                                style={{
                                    width:
                                        `${analytics.totalApplications > 0
                                            ? (
                                                (
                                                    getStatusCount("Offer") /
                                                    analytics.totalApplications
                                                ) * 100
                                            )
                                            : 0
                                        }%`
                                }}
                            ></div>

                        </div>


                        <p>
                            {getStatusCount("Offer")} of{" "}
                            {analytics.totalApplications} applications
                        </p>

                    </div>


                    {/* INTERVIEW → OFFER */}

                    <div className="conversion-item">

                        <div className="conversion-top">

                            <span className="conversion-label">
                                INTERVIEW → OFFER
                            </span>

                            <strong>
                                {getStatusCount("Interview") > 0
                                    ? (
                                        (
                                            getStatusCount("Offer") /
                                            getStatusCount("Interview")
                                        ) * 100
                                    ).toFixed(1)
                                    : 0
                                }%
                            </strong>

                        </div>


                        <div className="conversion-bar">

                            <div
                                className="conversion-fill success"
                                style={{
                                    width:
                                        `${getStatusCount("Interview") > 0
                                            ? (
                                                (
                                                    getStatusCount("Offer") /
                                                    getStatusCount("Interview")
                                                ) * 100
                                            )
                                            : 0
                                        }%`
                                }}
                            ></div>

                        </div>


                        <p>
                            {getStatusCount("Offer")} of{" "}
                            {getStatusCount("Interview")} interviews
                        </p>

                    </div>

                </div>

            </div>


        </section>
    );
}


export default Analytics;