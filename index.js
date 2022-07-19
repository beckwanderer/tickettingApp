/*
This is called from the submit form to validate teh form is populated
*/
async function validFormFieldInput() {
    try {
        let checkMandatory = await checkMandatoryDetails();
        let checkPassenger1 = await checkPassenger(1);
        let checkPassenger2 = await checkPassenger(2);
        let checkContact = await checkContactDetails();
 
        updateFeedback("Booking Successful!!!", "feedback");
    }
    catch (error) {
        updateFeedback(error, "invalid-feedback");
    }
}

/*
updatefeedback: Displays the ${msg} and applies ${newClass} accordingly 
*/
updateFeedback = (msg, newClass) => {

    feedback = document.querySelector("#feedback");
    feedback.innerHTML = msg;
    feedback.className = newClass;
}

/*
This checks Mandatory details:
1.	Check if any one of the Radio buttons is clicked One way or Round trip  
2.	The following fields cannot be empty Destination  (From and To)  
3.	Compulsory field Date of Journey (Date field)
4.	Compulsory field Return of Journey (Date field) if round trip is mentioned 

*/
let checkMandatoryDetails = () => {

    return new Promise(
        (resolve, reject) =>
        {
            setTimeout(() =>
            {
 
                let detailsOneWay = document.getElementById("detailOneWay").checked;
                let detailsReturn = document.getElementById("detailReturn").checked;            
                let detailsFrom = document.getElementById("detailsFrom").value;
                let detailsTo = document.getElementById("detailsTo").value;
                let detailsFromDate = document.getElementById("detailsFromDate").value;
                let detailsToDate = document.getElementById("detailsToDate").value;

                console.log(`Details: ${detailsFrom} ${detailsTo} ${detailsFromDate} ${detailsToDate} `);
                if (!detailsOneWay && !detailsReturn) {
                    reject('Please select if you are travelling one way or a round trip on the Trip Details tab.');
                }
                else if (detailsFrom === '') {
                    reject('Please enter where you are travelling from on the Trip Details tab.');
                }
                else if (detailsFromDate === '') {
                    reject('Please enter the date of travel on the Trip Details tab.');
                }
                else if (detailsTo === '') {
                    reject('Please enter where you are going to on the Trip Details tab.');
                }
                else if (detailsToDate === '' && detailsReturn) {
                    reject('For a return journey you need to enter a return date on the details tab.');
                }
                else {
                    resolve('Success');
                }
        },200)
    });
}


/*
checkPassenger
==============
This checks:
3/5.	Check if the Passenger Name input value is more than 5 characters 
*/
let checkPassenger = (passenger) => {

    return new Promise(
        (resolve, reject) =>
        {
            setTimeout(() =>
            {
                let passFirstName = document.getElementById("passFirstName" + passenger).value;
                let passSecondName = document.getElementById("passSecondName" + passenger).value;
                console.log(`Passenger: ${passenger} ${passFirstName} ${passSecondName} `);
             
                if (passFirstName.length > 5 && passSecondName.length > 5)
                {
                    resolve('Success')
                }
                else if (passFirstName.length <= 5)   {
                    reject(`First name, ${passFirstName} must be more than 5 characters. Please check Passenger ${passenger} tab.`)
                }
                else   {
                    reject(`Second name, ${passSecondName} must be more than 5 characters. Please check Passenger ${passenger} tab.`)
                }
            },200);
        }
    )
    
  }


/*
checkContactDetails
==================
check the fields on the contact details:
9.	 Compulsory field Email Id 
10.	 Compulsory field Mobile #
*/
let checkContactDetails = () => {

    return new Promise(
        (resolve, reject) =>
        {
            setTimeout(() =>
            {

                let emailId = document.getElementById("emailId").value;
                let mobileNo = document.getElementById("mobileNo").value;            

                console.log(`Contact: ${emailId} ${mobileNo} `);
                if (emailId === '') {
                    reject('Please enter an email address on the Contact tab.');
                }
                else if (mobileNo === '') {
                    reject('Please enter a mobile number on the Contact tab.');
                }
                else {
                    resolve('Success');
                }
        },200)
    });
}


/*
Manage the tab
*/
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }