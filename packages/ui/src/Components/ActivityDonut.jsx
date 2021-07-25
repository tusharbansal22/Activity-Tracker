import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { durationToString } from '../utils';

export const ActivityDonutChart = ({ data }) => {
	const defaultOptions = {
		dataLabels: {
			enabled: false,
		},
		legend: {
			show: true,
			position: 'bottom',
			labels: {
				colors: undefined,
				useSeriesColors: true,
			},
		},
		plotOptions: {
			pie: {
				startAngle: 30,
				endAngle: 330,
				donut: {
					size: '85%',
					background: 'transparent',
					labels: {
						show: true,
						name: {
							show: true,
						},
						value: {
							show: true,
							color: '#757575',
							formatter: function (val) {
								return durationToString(val);
							},
						},
						total: {
							show: true,
							label: 'Today',
							color: '#757575',
							formatter: function (w) {
								return durationToString(
									w.globals.seriesTotals.reduce((a, b) => {
										return a + b;
									}, 0),
								);
							},
						},
					},
				},
			},
		},
	};

	const [state] = useState({
		options: {
			...defaultOptions,
			labels: data.map(app => app.name),
		},
		series: data.map(app => Math.floor(app.duration)),
	});

	return (
		<div className="donut">
			<Chart
				options={state.options}
				series={state.series}
				type="donut"
				width={400}
				height={280}
			/>
		</div>
	);
};
