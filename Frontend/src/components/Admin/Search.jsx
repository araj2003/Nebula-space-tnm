import React, { useState, useEffect } from "react";
import { search } from "./api";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f2f3f5;
  padding: 16px;
  border-radius: 4px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  background-color: white;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Th = styled.th`
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #d2d3d5;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #d2d3d5;
`;

const Tr = styled.tr`
  &:last-child {
    ${Td}, ${Th} {
      border-bottom: none;
    }
  }
`;

export default function FolderList() {
  const [searches, setSearches] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items to display per page

  useEffect(async () => {
    const data = await search();
    setSearches(data.results);
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(searches.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = searches.slice(offset, offset + itemsPerPage);

  const exportToCSV = () => {
    const csvData =
      "Search ID,Count\n" +
      currentItems.map((item) => `${item._id},${item.count}`).join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "searches.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Table>
        <thead>
          <Tr>
            <Th>Search ID</Th>
            <Th>Count</Th>
          </Tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.count}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <button
        onClick={exportToCSV}
        className="border-2 border-teal-600 py-2 px-3 rounded-lg text-teal-700 hover:bg-teal-600 hover:text-white transition-all duration-200"
      >
        Export to CSV
      </button>

      <div className="w-full flex justify-center my-10 md:mb-0">
        <div className="w-fit bg-teal-50 px-2 py-0.5 border text-teal-800 border-teal-600 rounded-md ">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            className="flex gap-4 px-2"
          />
        </div>
      </div>
    </Container>
  );
}
