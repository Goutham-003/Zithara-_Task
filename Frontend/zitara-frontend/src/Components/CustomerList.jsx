import React from 'react';
import '../Css/CustomerList.css'

function CustomerList({ data, pageIndex }) {
  console.log(pageIndex)
  return (
    <div>
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer, index) => (
            <tr key={index}>
              <td>{pageIndex * 20 + index + 1}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{new Date(parseFloat(customer.created_at)).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
