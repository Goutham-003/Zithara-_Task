import { useState, useEffect } from 'react';
import './App.css';
import {getUserData} from './helper.js';
import CustomerList from './Components/CustomerList.jsx';

function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [sortParam, setSortParam] = useState('');
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("ASC");
  useEffect(() => {
    fetchData();
  }, [pageIndex, search, sortParam, sortType]);

  const fetchData = async () => {
    // Fetch data based on pageIndex, search, and sortParam
    const newData = await getUserData(pageIndex, search, sortParam, sortType);
    setData(newData.records);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortParam(event.target.value);
  };

  const handlePagination = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleSortTypeChange = (event) => {
    setSortType(event.target.value);
  }

  return (
    <div className="App">
      <h1>Zithara Users</h1>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />
        <select value={sortParam} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="customer_name">Name</option>
          <option value="created_at">Date</option>
          <option value="created_at">Time</option>
        </select>
        <select value={sortType} onChange={handleSortTypeChange}>
          <option value="">Sort Type</option>
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>
    <CustomerList data={data} pageIndex={pageIndex}/> 
    {
      data.length == 0 &&(
        <div>
          <h2>No Data Found</h2>
        </div>
      )
    }  
      <div>
        {/* Pagination controls */}
        {
        pageIndex > 0 &&
        <button onClick={() => handlePagination(pageIndex - 1)}>Previous Page</button>
        }
        {
          data.length == 20 &&
          <button onClick={() => handlePagination(pageIndex + 1)}>Next Page</button>
        }
      </div>
    </div>
  );
}

export default App;
