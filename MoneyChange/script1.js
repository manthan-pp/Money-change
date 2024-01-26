//changing calculator
function calculateChange() {
  const totalAmount = document.getElementById("totalAmount").value.trim();
  const givenAmount = document.getElementById("givenAmount").value.trim();

  if(parseInt(givenAmount) < parseInt(totalAmount)){
    alert("Given Efficient Money !!! ");
  }
  else if(givenAmount === "" || totalAmount === "" ){
    alert("Given some Money");
  }
  else{
 
  let change = givenAmount - totalAmount;
  document.getElementById("c-value").innerHTML = "Return Amount Change : " +change;
 
  // Get currency and quantity data from the table
    let table = document.getElementById("table");
         
    let rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")
    // rows.sort((a,b)=>{
    //   b.cells[0].innerText - a.cells[0].innerText;
    // })
    // Array.from(table.getElementsByTagName("tbody")[0].getElementsByTagName("tr") ) ;

    // const sortRow = rows.sort((a,b)=>{
    //   const currencyA = parseInt(a.getElementsByTagName("td")[0].textContent);
    //   const currencyB = parseInt(b.getElementsByTagName("td")[0].textContent);
    //   return currencyB - currencyA;
    // });

    // let rowLength = table.rows.length;
    
    // Calculate the change in terms of each currency
    let result = [];
    for (let i = 1; i < rows.length && change>0 ; i++) {
      let cells = rows[i].getElementsByTagName("td");
      let currency = parseInt(cells[0].innerText);
      let quantity = parseInt(cells[1].innerText);

      let currencyChange = Math.floor(change / currency);
      change %= currency;
      result.push(currencyChange + " x " + currency);
      if ((currencyChange > quantity)) {
        currencyChange = 0;
        change = change;
        continue;
      } else if(change != 0){
        // currencyChange = 0;/
        change =change;
        continue;
      }
      // if(change != 0){
      //   currencyChange = 0;
      //   change = change;
      //   continue;
      // }
      // Update the quantity in the main table
      let updatedQuantity = quantity - currencyChange;
      cells[1].innerText = updatedQuantity;
      
      // Remove the row if the quantity zero
      if (updatedQuantity <= 0) {
        table.deleteRow(i);
        i--;
        alert("Inefficient quantity of " +currency+ " currency.");
      }        
    }
    
    //result
    document.getElementById("changeResult").innerText =  result.join("\n ");
  }
}
const btn1 = document.getElementById("btn-change");
btn1.addEventListener("click",calculateChange);