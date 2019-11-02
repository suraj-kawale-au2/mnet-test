let mails = new Map();

let rows = [];
const createRow = (mail) => {
            let i=0;
            let row = document.createElement("tr");
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = i;
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            td1.appendChild(checkbox);
            let td2data = document.createTextNode(mail)
            td2.appendChild(td2data);
            let td3data = document.createTextNode(`\u2421`);
            td3.appendChild(td3data);
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            document.getElementById("tablebody").appendChild(row);
            return row;
}

const addmails = (e) => {
    e.preventDefault();
    let mail = document.getElementById("inputmail").value.toLowerCase();
    let i = 0;
    if (mail) {
        if (mail.includes("@")) {
            mails.set(mail, { isEnable: false })
            document.querySelector('form').reset();
            console.log('added', mails);
            let mailrow = createRow(mail);
            rows.push(mailrow);
        }
        else {
            alert("mail doesn't contain @")
        }
    }
    else {
        alert("mail cannot be empty");
    }
}

const searchmails = (e) => {
    e.preventDefault();
    let searchedMail = document.getElementById("searchbox").value.toLowerCase();
    if (searchedMail) {
        if (mails.has(searchedMail)) {
            let reterievedMails = mails.get(searchedMail);
            console.log(reterievedMails);
            let child = document.getElementById("tablebody").lastElementChild;
            while (child) {
                document.getElementById("tablebody").removeChild(child);
                child = document.getElementById("tablebody").lastElementChild;
            }
            let searchrow = createRow(searchedMail);
            document.getElementById("tablebody").appendChild(searchrow);
            document.getElementById('searchform').reset();
        } else {
            alert(`${searchedMail} Not Found`);
            document.getElementById('searchform').reset();
        }
    } else {
        alert("Search cannot be empty");
    }
}

const showall = (e) => {
    e.preventDefault();
    rows.map(item=>document.getElementById('tablebody').appendChild(item));
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("addMailsBtn").addEventListener('click', addmails);
    document.getElementById("searchbtn").addEventListener('click', searchmails);
    document.getElementById("showall").addEventListener('click',showall);
})