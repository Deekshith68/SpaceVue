// Dashboard.js
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { PieChart, Pie, Cell, Label, Tooltip } from 'recharts';

const Dashboard = ({ missions }) => {
  // Mapping the received data to the expected format
  const rowData = missions.map((mission) => ({
    missionName: mission.mission,
    launchCompany: mission.company,
    location: mission.location,
    missionDate: mission.date,
    missionTime: mission.time,
    rocketType: mission.rocket,
    price: mission.price,
    launchSuccess: mission.successful ? 'Yes' : 'No',
  }));

  // Calculate the number of successful and failed missions
  const successfulMissions = missions.filter((mission) => mission.successful).length;
  const failedMissions = missions.length - successfulMissions;

  // Data for the pie chart
  const pieChartData = [
    { name: 'Success', value: successfulMissions },
    { name: 'Failure', value: failedMissions },
  ];

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={[
            { headerName: 'Mission Name', field: 'missionName' },
            { headerName: 'Launch Company', field: 'launchCompany' },
            { headerName: 'Location', field: 'location' },
            { headerName: 'Date', field: 'missionDate' },
            { headerName: 'Time', field: 'missionTime' },
            { headerName: 'Rocket Type', field: 'rocketType' },
            { headerName: 'Price', field: 'price' },
            { headerName: 'Launch Success', field: 'launchSuccess' },
          ]}
          rowData={rowData}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
      <PieChart width={300} height={300}>
          <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            <Label
              content={({ viewBox }) => {
                const { cx, cy } = viewBox;
                return (
                  <text x={cx} y={cy} dy={-10} textAnchor="middle" fill="#333">
                    Success vs Failure
                  </text>
                );
              }}
            />
            <Cell fill="#82ca9d" />
            <Cell fill="#8884d8" />
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default Dashboard;
