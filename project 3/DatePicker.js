"use strict";
function DatePicker(divID, callback) {
    //cognoo songoh ued dahin callback
    //callback n 2 nemelt ugugdliig aguulna: id, fixedDate.
    //fixedDate n sar, udur, jiliin talbaruudtai
    this.divID = divID;
    this.callback = callback;
}


//sariig songono
//divID's contents with HTML that displays a 
//Neg sariin huanli
DatePicker.prototype.render = function (date) {
    //date is a Date object
    var elem = document.getElementById(this.divID);
    elem.innerHTML = 
    `<span id="previous-${this.divID}" class="button"> \< </span>
    <span id="header-${this.divID}" >  </span>
    <span id="next-${this.divID}"  class="button" >  \>  </span>
    <table id="cal-${this.divID}" >
    </table>
    `;
    var cal = document.getElementById(`cal-${this.divID}`);

    var header = document.getElementById(`header-${this.divID}`);
    
    var previous = document.getElementById(`previous-${this.divID}`);

    var getCal = () => {
        var firstDay = new Date(date.getTime())  ;
        firstDay.setDate(1);
        var currDate = new Date(firstDay.getTime());

        var lastDay = new Date(date.getTime());
        lastDay.setMonth(date.getMonth() + 1);
        lastDay.setDate(0);
        var getWeek = () => {
            var tr = document.createElement("tr");
            tr.innerHTML = "";

            for (var day = 0; day < 7; day++) {
                var td = document.createElement("td");
                td.innerHTML = `${currDate.getDate()}`;
                var isCurrMonth = firstDay.getMonth() === currDate.getMonth();
                td.className = isCurrMonth ? "normal" : "dim";
                td.onclick = isCurrMonth ? 
                    () => {this.callback(this.divID, 
                        {day: currDate.getDate(), 
                        month: new Intl.DateTimeFormat('en-US', {month: 'long'}).format(currDate), 
                        year: currDate.getFullYear()});
                    } : () => {};
                tr.appendChild(td);
                currDate.setDate(currDate.getDate() + 1);
            }
            return tr;
        };
        
        var numWeeks = Math.ceil((firstDay.getDay() + lastDay.getDate())/7);
        currDate.setDate(currDate.getDate() - currDate.getDay());
        
        for (var week = 0; week < numWeeks; week++) {
            var tr = getWeek();
            cal.appendChild(tr);
        }
    };

    function changeMonth(increment, dateToChange) {
        date.setMonth(date.getMonth() + increment, 1);
        cal.innerHTML = `
        <tr>
        <th>Nyam</th>
        <th>Davaa</th>
        <th>Myagmar</th>
        <th>Lhagva</th>
        <th>Purev</th>
        <th>Baasan</th>
        <th>Byamba</th>
        </tr>
        `;
        getCal();
    }
    previous.onclick = () => {changeMonth(-1, date);
        header.innerHTML = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date) + 
            " " + date.getFullYear();};
    var next = document.getElementById(`next-${this.divID}`);
    next.onclick = () => {changeMonth(1, date); 
        header.innerHTML = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date) + 
            " " + date.getFullYear() + " ";};
    
    header.innerHTML = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date) + 
        " " + date.getFullYear() + " ";
    
    cal.innerHTML = `
        <tr>
            <th>Nyam</th>
            <th>Davaa</th>
            <th>Myagmar</th>
            <th>Lhagva</th>
            <th>Purev</th>
            <th>Baasan</th>
            <th>Byamba</th>
        </tr>
        `;
    getCal();
    //Herev hereglegch tuhain sariin neg udur tovshvol uuniig duudna.callback
};