/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */

'use strict';

var access_token = '';

function getAccessToken(){
    var decodedCookie = decodeURIComponent(document.cookie);
    var name = "access_token=s:";
    var ca = decodedCookie.split('.');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            access_token = c.substring(name.length, c.length);
        }
    }
}

getAccessToken();

function checkAccessToken(){
    if(access_token == ''){
        const root = document.getElementById('root');
        if(root == null){
            const link = document.getElementById('link');
            link.hidden = false;
        } else {
            const p = document.createElement('p');
            p.setAttribute('class','text-warning');
            p.textContent = "WARNING!!! NO ACCESS TOKEN PLEASE LOGIN WITH GITHUB IN HOME PAGE";
            root.appendChild(p);
        }
        return false;
    }
    return true;
}

function getDataBarang(){
    if(!checkAccessToken(this)){
        return;
    }
    var request = new XMLHttpRequest();
    request.open('GET','http://192.168.43.252:3000/api/DataBarang', true);
    request.setRequestHeader('X-Access-Token',access_token);
    request.onload = function (){
        var data = JSON.parse(this.response);

        const root = document.getElementById('root');
        const table = document.createElement('table');
        table.setAttribute('class','table table-hover');
        root.appendChild(table);
        const thead = table.appendChild(document.createElement('thead'));
        thead.setAttribute('class','thead-dark');
        const tr = thead.appendChild(document.createElement('tr'));
        tr.appendChild(document.createElement('th')).textContent='ID Barang';
        tr.appendChild(document.createElement('th')).textContent='Nama Barang';
        tr.appendChild(document.createElement('th')).textContent='Jumlah Barang';
        tr.appendChild(document.createElement('th')).textContent='Action';
        const tbody = table.appendChild(document.createElement('tbody'));
        if(data.length == 0){
            root.appendChild(document.createElement('br'));
            const h2 = document.createElement('h2');
            h2.setAttribute('class','text-danger');
            h2.textContent = 'Data Kosong!';
            root.appendChild(h2);
        } else {
            data.forEach(barang => {
                const trb = tbody.appendChild(document.createElement('tr'));
                trb.appendChild(document.createElement('td')).textContent=barang.IDBarang;
                trb.appendChild(document.createElement('td')).textContent=barang.NamaBarang;
                trb.appendChild(document.createElement('td')).textContent=barang.JumlahBarang;
                const actions = trb.appendChild(document.createElement('td'));
                const btn = actions.appendChild(document.createElement('button'));
                btn.setAttribute('class','btn btn1');
                const i = btn.appendChild(document.createElement('i'));
                i.setAttribute('class','fa fa-pencil-square-o');
                const btn1 = actions.appendChild(document.createElement('button'));
                btn1.setAttribute('class','btn btn1');
                btn1.setAttribute('onclick','return delDataBar("'+barang.IDBarang+'","DataBarang")');
                btn1.setAttribute('style','margin-left: 25px;');
                const ii = btn1.appendChild(document.createElement('i'));
                ii.setAttribute('class','fa fa-trash');
            });
        }
        
    };
    request.send();
}

function getDataPeminjaman(){
    if(!checkAccessToken()){
        return;
    }
    var request = new XMLHttpRequest();
    request.open('GET','http://192.168.43.252:3000/api/DataPeminjaman', true);
    request.setRequestHeader('X-Access-Token',access_token);
    request.onload = function (){
        var data = JSON.parse(this.response);

        const root = document.getElementById('root');
        const table = document.createElement('table');
        table.setAttribute('class','table table-hover');
        root.appendChild(table);
        const thead = table.appendChild(document.createElement('thead'));
        thead.setAttribute('class','thead-dark');
        const tr = thead.appendChild(document.createElement('tr'));
        tr.appendChild(document.createElement('th')).textContent='ID Peminjaman';
        tr.appendChild(document.createElement('th')).textContent='Nama Peminjam';
        tr.appendChild(document.createElement('th')).textContent='Kontak Peminjam';
        tr.appendChild(document.createElement('th')).textContent='Jumlah Barang';
        tr.appendChild(document.createElement('th')).textContent='ID Barang';
        tr.appendChild(document.createElement('th')).textContent='Status';
        tr.appendChild(document.createElement('th')).textContent='Waktu Pengembalian';
        tr.appendChild(document.createElement('th')).textContent='Action';
        const tbody = table.appendChild(document.createElement('tbody'));
        if(data.length == 0){
            root.appendChild(document.createElement('br'));
            const h2 = document.createElement('h2');
            h2.setAttribute('class','text-danger');
            h2.textContent = 'Data Kosong!';
            root.appendChild(h2);
        } else {
            data.forEach(barang => {
                const trb = tbody.appendChild(document.createElement('tr'));
                trb.appendChild(document.createElement('td')).textContent=barang.IDPeminjaman;
                trb.appendChild(document.createElement('td')).textContent=barang.NamaPeminjam;
                trb.appendChild(document.createElement('td')).textContent=barang.KontakPeminjam;
                trb.appendChild(document.createElement('td')).textContent=barang.JumlahBarang;
                var id_barang = barang.Barang;
                var temp = id_barang.substr(id_barang.length - 8);
                trb.appendChild(document.createElement('td')).textContent=temp;
                trb.appendChild(document.createElement('td')).textContent=barang.Status;
                var waktu_pengembalian = barang.WaktuPengembalian;
                var temp1 = waktu_pengembalian.substr(0,10);
                trb.appendChild(document.createElement('td')).textContent=temp1;
                const actions = trb.appendChild(document.createElement('td'));
                const btn = actions.appendChild(document.createElement('button'));
                btn.setAttribute('class','btn');
                const i = btn.appendChild(document.createElement('i'));
                i.setAttribute('class','fa fa-pencil-square-o');
                const btn1 = actions.appendChild(document.createElement('button'));
                btn1.setAttribute('class','btn');
                btn1.setAttribute('onclick','return delDataBar("'+barang.IDPeminjaman+'","DataPeminjaman")');
                btn1.setAttribute('style','margin-left: 25px;');
                const ii = btn1.appendChild(document.createElement('i'));
                ii.setAttribute('class','fa fa-trash');
            });
        }
    };
    request.send();
}

function getDataforForm(){
    var request = new XMLHttpRequest();
    request.open('GET','http://192.168.43.252:3000/api/DataBarang', true);
    request.setRequestHeader('X-Access-Token',access_token);
    request.onload = function (){
        var data = JSON.parse(this.response);

        const root = document.getElementById('form');
        const select = document.createElement('select');
        select.setAttribute('class','form-control');
        select.setAttribute('id','itemBarang');
        select.required = true;
        root.appendChild(select);
        if(data.length == 0){
            const option = document.createElement('option');
            option.setAttribute('value',null);
            option.textContent = '<--- Data Kosong --->';
            select.appendChild(option);
            select.disabled = true;
        } else {
            data.forEach(barang => {
                const option = document.createElement('option');
                option.setAttribute('value',barang.IDBarang);
                option.textContent = barang.NamaBarang;
                select.appendChild(option);
            });
        }
    };
    request.send();
}

function getDataforForm1(){
    var request = new XMLHttpRequest();
    request.open('GET','http://192.168.43.252:3000/api/DataPeminjaman', true);
    request.setRequestHeader('X-Access-Token',access_token);
    request.onload = function (){
        var data = JSON.parse(this.response);

        const root = document.getElementById('id-p');
        const select = document.createElement('select');
        select.setAttribute('class','form-control');
        select.setAttribute('id','itemPeminjaman');
        select.required = true;
        root.appendChild(select);
        if(data.length == 0){
            const option = document.createElement('option');
            option.setAttribute('value',null);
            option.textContent = '<--- Data Kosong --->';
            select.appendChild(option);
            select.disabled = true;
        } else{
            data.forEach(barang => {
                const option = document.createElement('option');
                option.setAttribute('value',barang.IDPeminjaman);
                option.textContent = barang.IDPeminjaman;
                select.appendChild(option);
            });
        }
    };
    request.send();
}

function sendPeminjaman(){
    var request = new XMLHttpRequest();
    var data = '';
    request.onreadystatechange = function(){
       var name = document.getElementById('Name').value;
       var contact = document.getElementById('Contact').value;
       var jumlah = document.getElementById('quantity').value;
       var id_bar = document.getElementById('itemBarang').value;
       var waktu = document.getElementById('date').value;
       var temp = '{ "$class": "model.WriteDataPeminjaman","Nama":"' + name + '","Kontak":"' + contact + '","Jumlah":' + jumlah + ',"IDBarang": "resource:model.DataBarang#' + id_bar + '","WaktuPengembalian": "'+ waktu +'"}';
       data = temp;
    };
    request.open('POST','http://192.168.43.252:3000/api/WriteDataPeminjaman', true);
    request.setRequestHeader('Content-type','application/json');
    request.setRequestHeader('X-Access-Token',access_token);
    var corm = confirm("Yakin isinya sudah benar?");
    if(corm){
        request.send(data);
        alert("Terima Kasih. Jangan Lupa Dikembalikan yaa XD");
        return true;
    } else {
        return false;
    }
}

function sendDataPengembalian(){
    var request = new XMLHttpRequest();
    var data = '';
    request.onreadystatechange = function(){
       var itemBarang = document.getElementById('itemBarang').value;
       var itemPeminjaman = document.getElementById('itemPeminjaman').value;
       var temp = '{ "$class": "model.EditDataPeminjaman", "IDBarang": "resource:model.DataBarang#'+itemBarang+'",  "IDPeminjaman": "resource:model.DataPeminjaman#'+itemPeminjaman+'" }';
       data = temp;
    };
    request.open('POST','http://localhost:3000/api/EditDataPeminjaman', true);
    request.setRequestHeader('Content-type','application/json');
    request.setRequestHeader('X-Access-Token',access_token);
    var corm = confirm("Yakin isinya sudah benar?");
    if(corm){
        request.send(data);
        alert("Terima Kasih sudah dikembalikan XD");
        return true;
    } else {
        return false;
    }
}

function delDataBar(id,req_url){
    var request = new XMLHttpRequest();
    var url = 'http://192.168.43.252:3000/api/'+ req_url +'/'+id;
    var corm = confirm("Yakin ingin menghapus data?");
    if(corm){
        request.open('DELETE',url, true);
        request.setRequestHeader('Content-type','application/json');
        request.setRequestHeader('X-Access-Token',access_token);
        request.send();
        alert('Data Sudah Terhapus! Mohon menuggu page akan refresh dengan sendirinya');
        setTimeout(location.reload.bind(location), 2000);
        return true;
    } else {
        return false;
    }
}

function addDataBarang(){
    var request = new XMLHttpRequest();
    var data = '';
    request.onreadystatechange = function(){
       var name = document.getElementById('Name').value;
       var jumlah = document.getElementById('quantity').value;
       var temp = '{ "$class": "model.WriteDataBarang","NamaBarang":"' + name + '","JumlahBarang":' + jumlah + '}';
       data = temp;
    };
    request.open('POST','http://192.168.43.252:3000/api/WriteDataBarang', true);
    request.setRequestHeader('Content-type','application/json');
    request.setRequestHeader('X-Access-Token',access_token);
    var corm = confirm("Yakin data sudah benar?");
    if(corm){
        request.send(data);
        alert('Data Sudah ditambahkan! Mohon menuggu page akan refresh dengan sendirinya');
        setTimeout(location.reload.bind(location), 2000);
        return true;
    } else {
        return false;
    }
}