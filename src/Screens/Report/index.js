import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import { useMemo } from 'react';
import 'smart-webcomponents-react/source/styles/smart.default.css';
// import { Grid } from 'smart-webcomponents-react/grid';
// const [jsonData1, setJsonData1] = useState([]);
// import { MaterialReactTable } from "material-react-table";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
// import { MDBDataTable } from "mdbreact";


function Report() {

  const [datatable, setDatatable] = useState({
    columns: [
      { label: "No", field: "No" },
      { label: "name", field: "uName" },
      { label: "mobile", field: "uMobile" },
      { label: "type", field: "uType" },
      { label: "gender", field: "uGender" },
      { label: "active", field: "active" },
      { label: "actions", field: "actions" },
    ],
  });
  // const getOrderdetail = async () => {
  //   const token1 = localStorage.getItem("token1");
  //   const accessToken = localStorage.getItem("accessToken");
  //   try {
  //     let res = await axios.get(
  //       // `https://pets.dev.savaapi.com/api/schema/dev1/mongodb/pets/pet_hostel_bookings`,
  //       {
  //         headers: {
  //           "x-am-authorization": token1,
  //           "x-am-user-authorization": accessToken,
  //         },
  //         // params: {
  //         //   deep: "userId"
  //         // }
  //       }
  //     );
  //     const data = res.restaurants?.restaurants?.map((item) => ({
  
  //       ownerName: item.ownerName,
  //       restaurantName: item.restaurantName,
  //       restaurantAddress: item.restaurantAddress,
  //       email: item.email,
  //       phone: item.phone,
   
       
  //       // actions: (
  //       //   <div>
  //       //     <FontAwesomeIcon
  //       //       icon={faEye}
  //       //       onClick={() => navigateDetails1(item.service, item.serviceLocation)}
  //       //     />
  //       //   </div>
  //       // ),
  //     }));
  //     setJsonData1(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const [selectedOption, setSelectedOption] = useState('');
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [data, setData] = useState(null);

  // const handleOptionChange = (e) => {
  //   setSelectedOption(e.target.value);
  //   setStartDate(null); 
  //   setEndDate(null);   
  //   setData(null);      
  // };

  // const handleDateChange = (date) => {
  //   if (!startDate || (startDate && endDate)) {
  //     setStartDate(date);
  //     setEndDate(null); 
  //   } else if (startDate && !endDate && date > startDate) {
  //     setEndDate(date);
  //   }
  // };

  // const fetchDataFromAPI = async () => {
  //   try {
  
  //     const fetchedData = await mockFetchData(startDate, endDate);
  //     setData(fetchedData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setData(null); 
  //   }
  // };

  // const mockFetchData = async (start, end) => {

  //   if (!start || !end) {
  //     throw new Error('Please select both start and end dates.');
  //   }
   

  //   // const data = {
  //   //   startDate: start.toDateString(),
  //   //   endDate: end.toDateString(),
  //   //   events: [
  //   //     { title: 'Event 1', description: 'Description of Event 1' },
  //   //     { title: 'Event 2', description: 'Description of Event 2' },
  //   //     { title: 'Event 3', description: 'Description of Event 3' }
  //   //   ]
  //   // };

  //   return data;
  // };
  // const colvendor = useMemo(
  //   () => [
  //     { accessorKey: "pName", header: "Name" },
  //     { accessorKey: "pMobile", header: "Mobile" },
  //     { accessorKey: "businessName", header: "BUSINESS NAME" },
  //     { accessorKey: "actions", header: "Actions" },
  //   ],
  //   []
  // );
  // const handleSubmit = async () => {
  //   try {
  //     await fetchDataFromAPI();
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  return (
    <>
   {/* <MDBDataTable striped bordered small data={datatable} /> */}
      {/********************
  Preloader start test
    *********************/}
    
      {/********************
  Preloader end
    *********************/}
      {/***********************************
  Main wrapper start
    ************************************/}
      <div id="main-wrapper">
        {/***********************************
      Nav header start
  ************************************/}
        <NavHeader />
        {/***********************************
      Nav header end
  ************************************/}
        {/***********************************
      Header start
  ************************************/}
      
        {/***********************************
      Header end ti-comment-alt
  ************************************/}
        <Slidebar />

        {/***********************************
      Content body start
  ************************************/}
    <MaterialReactTable />
        {/***********************************
      Content body end
  ************************************/}
        {/***********************************
      Footer start
  ************************************/}
      

        {/***********************************
      Footer end
  ************************************/}
        {/***********************************
     Support ticket button start
  ************************************/}
        {/***********************************
     Support ticket button end
  ************************************/}
      </div>
      {/***********************************
  Main wrapper end
    ************************************/}
      {/***********************************
  Scripts
    ************************************/}

      {/* Required vendors */}
      {/* Apex Chart */}
      {/*  */}
      {/* Chart piety plugin files */}
      {/* Dashboard 1 */}
      {/*  */}
      {/* Modal */}
     
      {/* Modal */}
 
    </>
  );
}

export default Report;
