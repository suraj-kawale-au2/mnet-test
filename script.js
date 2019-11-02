let mails = new Map();

let rows = [];
console.log(rows);
const createRow = (mail) => {
           if(mails.has(mail)){
               alert("MAIL ID ALREADY EXISTS");
               return 0;
           }
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
            let td3data = document.createTextNode(`	\u{1F5D1}`);
            td3.appendChild(td3data);
            td3.className = "delete";
            td3.id = mail;
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            return row;
}

const addmails = (e) => {
    e.preventDefault();
    let mail = document.getElementById("inputmail").value.toLowerCase();
    let i = 0;
    if (mail) {
        if (mail.includes("@")) {
            document.querySelector('form').reset();
            console.log('added', mails);
            let mailrow = createRow(mail);
            if(mailrow){
            rows.push(mailrow);
            rows.map(item=>document.getElementById('tablebody').appendChild(item));
            }
            mails.set(mail, { isEnable: false })
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
            while (child){
                console.log(child.children[1].textContent)
                document.getElementById("tablebody").removeChild(child);
                child = document.getElementById("tablebody").lastElementChild;
            }
            let searchrow = rows.filter(item=>item.children[1].textContent == searchedMail);
            console.log(searchrow)
            document.getElementById("tablebody").appendChild(searchrow[0]);
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
    let child = document.getElementById("tablebody").lastElementChild;
            while (child){
                console.log(child.children[1].textContent)
                document.getElementById("tablebody").removeChild(child);
                child = document.getElementById("tablebody").lastElementChild;
            }
    rows.map(item=>document.getElementById('tablebody').appendChild(item));
}

const deleteMail = (event) => {
    if(event.target && event.target.className=="delete")
    {
        mails.delete(event.target.id);
        console.log(mails);
        rows = rows.filter(item=>item.children[1].textContent !== event.target.id)
        console.log(rows);
        showall(event);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("addMailsBtn").addEventListener('click', addmails);
    document.getElementById("searchbtn").addEventListener('click', searchmails);
    document.getElementById("showall").addEventListener('click',showall);
    document.addEventListener('click',deleteMail)
})