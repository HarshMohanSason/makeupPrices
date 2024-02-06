
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
  import {getDatabase, ref, onValue, get} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

   //Configuration to connect the website to firebase

  const firebaseConfig = {
    apiKey: "AIzaSyDfSGj4_xH0yUjjJ4gCRL7WrO7_k3SfAXU",
    authDomain: "makemepretty-61b89.firebaseapp.com",
    projectId: "makemepretty-61b89",
    databaseURL: "https://makemepretty-61b89-default-rtdb.firebaseio.com",
    storageBucket: "makemepretty-61b89.appspot.com",
    messagingSenderId: "1035466979704",
    appId: "1:1035466979704:web:9d06327b1453a3eb12b08d",
    measurementId: "G-MTCRN2F6P6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app); //connect to the Database
  let globalData = [];



  //Simple function to get the makeUpData
  async function getMakeupData(){

    try{

     const snapshot = await get(ref(db)); //get the snapshot from the realtime database

     if(snapshot.exists())//checking if the data exists
     {
       const data = snapshot.val(); //get the map from the snapshot
       globalData = Object.values(data); //push the data in the object
       populateTable();//populate the table
     }
     else {
       console.errror("No data available at this time ");
     }
    }

    catch(error)
    {
      console.error("Could not fetch the data: ", error); //display the error on the screen
    }

  }

  function populateTable()
  {

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clearing existing rows

    globalData.forEach(data => {

      const row = document.createElement("tr");
      row.innerHTML = `
          <td>$${data.Price}</td>
          <td>${data.Brand}</td>
          <td>${data.ProductType}</td>
          <td><a href="${data.Link}" target="_blank">Link to Buy</a></td>`;
      tableBody.appendChild(row);
    })
  }

  getMakeupData();
