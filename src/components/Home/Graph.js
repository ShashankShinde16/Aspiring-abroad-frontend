import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useTable } from "react-table";

const Graph = () => {
  const data = [
    { country: "AUS", people: 303, color: "#d62728" },
    { country: "GER", people: 179, color: "#9467bd" },
    { country: "NOR", people: 16, color: "#8c564b" },
    { country: "USA", people: 277, color: "#2ca02c" },
    { country: "DNK", people: 6, color: "#7f7f7f" },
    { country: "NLD", people: 39, color: "#9467bd" },
    { country: "SG", people: 12, color: "#bcbd22" },
    { country: "IRE", people: 132, color: "#8c564b" },
    { country: "ITA", people: 22, color: "#d62728" },
    { country: "NZ", people: 46, color: "#e377c2" },
    { country: "PHL", people: 36, color: "#7f7f7f" },
    { country: "CAN", people: 504, color: "#1f77b4" },
    { country: "AUT", people: 18, color: "#ff7f0e" },
    { country: "KOR", people: 10, color: "#e377c2" },
    { country: "UK", people: 378, color: "#ff7f0e" },
    { country: "FRA", people: 32, color: "#2ca02c" },
    { country: "ESP", people: 8, color: "#1f77b4" },
    { country: "RUS", people: 24, color: "#17becf" },
  ];



  const tableData = [
    {
      country: "Canada",
      cities: 15,
      students: 504,
      flag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/640px-Flag_of_Canada_%28Pantone%29.svg.png",
    },
    {
      country: "UK",
      cities: 12,
      students: 378,
      flag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png",
    },
    {
      country: "USA",
      cities: 10,
      students: 277,
      flag:
        "https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg",
    },
    {
      country: "Australia",
      cities: 9,
      students: 303,
      flag:
        "https://cdn.britannica.com/78/6078-050-18D5DEFE/Flag-Australia.jpg",
    },
  ];

  // Table columns
  const columns = [
    {
      Header: "Country",
      accessor: "country",
    },
    {
      Header: "Number of Cities",
      accessor: "cities",
    },
    {
      Header: "Number of Students",
      accessor: "students",
    },
    {
      Header: "Flag",
      accessor: "flag",
    },
  ];

  // Custom table component
  const Table = () => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
        columns,
        data: tableData,
      });

    return (
      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md mb-4">
        <table
          {...getTableProps()}
          className="min-w-full bg-white divide-y divide-gray-200"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" // Added "text-center" class
                    style={{ width: `${100 / headerGroup.headers.length}%` }} // Equal width for each column
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center ${
                          index === 3 ? "text-2xl" : ""
                        }`} // Added "text-2xl" class to increase font size for flag cell
                      >
                        {index === 3 ? (
                          <div className="flex justify-center items-center">
                            <img
                              src={cell.value}
                              alt={row.original.country}
                              style={{ width: "40px", height: "auto" }} // Increased width of the flag
                            />
                          </div>
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div className="container mx-auto bg-white mt-10 mb-1 rounded-lg border border-gray-300 shadow-xl">
        <h2 className="text-2xl sm:text-5xl font-bold text-center text-gray-800 pt-10 font-sans">
          Distribution of International Students
        </h2>
        <p className="text-center text-gray-600 mb-6">
          This bar chart shows the distribution of international students across
          different countries.
        </p>
        <div className="overflow-hidden" style={{ height: 400 }}>
          <ResponsiveBar
            data={data}
            keys={["people"]}
            indexBy="country"
            margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
            padding={0.3}
            colors={(bar) => bar.data.color}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              legendOffset: -40,
            }}
            enableLabel={false}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            maxValue={600}
            borderRadius={3}
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto ">
        <div className="mt-6">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Graph;
