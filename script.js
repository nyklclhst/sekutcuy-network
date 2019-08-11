const request = new XMLHttpRequest();

function signUp(){
    var data = '';

    request.onreadystatechange = function(){
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        data = '{ "$class": "model.userData","userEmail":"' + username + '@seculab-network","username":"'+ username + '","email":"'+ email +'","password":"'+ password+'" }';
    }
    request.open('POST','http://localhost:3001/api/userData', true);
    request.setRequestHeader('Content-type','application/json');
    var corm = confirm("Yakin data sudah benar?");
    if(corm){
        request.send(data);
        alert('Data Sudah ditambahkan! Mohon menuggu page akan refresh dengan sendirinya');
        return true;
    } else {
        return false;
    }
}

function issueData(userID){
    const data = {
        "participant":"model.userData#"+userID,
        "userID": userID,
        "options": {}
    };

    request.onreadystatechange = function(){
        var a;
        if (request.readyState === 4 && request.status === 200) {
            // Trick for making downloadable link
            a = document.createElement('a');
            a.href = window.URL.createObjectURL(request.response);
            // Give filename you wish to download
            a.download = userID+'.card';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
        }
    }
    request.open('POST','http://localhost:3001/api/system/identities/issue', true);
    request.setRequestHeader('Content-type','application/json');
    request.setRequestHeader('Accept','application/octet-stream');
    request.responseType = "blob";
    request.send(JSON.stringify(data));
    return true;
}

function uploadcard(){
    const name = document.getElementById('name').value;
    const myForm = document.getElementById('myForm');
    let data = document.getElementById("fileToUpload").files[0];
    let formData = new FormData(myForm);
    formData.append('card',data);
    request.open('POST','http://localhost:3000/api/wallet/import?name='+name, true);
    request.withCredentials = true;
    request.send(formData);
    return true;
}

function test(userID){
    const data = {
        "participant":"model.userData#"+userID,
        "userID": userID,
        "options": {}
    };

    request.onreadystatechange = function(){
        if (request.readyState === 4 && request.status === 200) {
            // // Trick for making downloadable link
            // a = document.createElement('a');
            // a.href = window.URL.createObjectURL(request.response);
            // // Give filename you wish to download
            // a.download = userID+'.card';
            // a.style.display = 'none';
            // document.body.appendChild(a);
            // a.click();
            var cardData = new File([Blob], userID+'.card', 
            {type: 'application/octet-stream', lastModified: Date.now()});
            sendData(cardData);
        }
    }
    request.open('POST','http://localhost:3001/api/system/identities/issue', true);
    request.setRequestHeader('Content-type','application/json');
    request.setRequestHeader('Accept','application/octet-stream');
    request.responseType = "blob";
    request.send(JSON.stringify(data));
    return true;
}

function sendData(file){
    const formData = new FormData();
    formData.append('card',file);
    request.open('POST','http://localhost:3000/api/wallet/import?name=test', true);
    request.withCredentials = true;
    request.send(formData);
    return true;
}