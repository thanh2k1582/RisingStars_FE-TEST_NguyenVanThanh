var selectedItem = null
// array list
var array = [];
// index of array
var index ; 

// action when submit form
function onFormSubmit(){
    event.preventDefault();
    var inputData = getData()
    if(selectedItem === null){
        if(inputData == "")
        { 
            alert("Vui lòng nhập , không được để trống") 
        }
        else{
            AddNew(inputData);
        }
    }
    else{
        if(inputData == ""){
            alert("Vui lòng nhập nội dung cần sửa")
        }
        else{
            update(inputData);
            selectedItem = null;
        }
    }
    reset()
}

// get data from input form
function getData(){
    let inputVal = document.getElementById("inputValue").value;
    return inputVal
}


// add function
function AddNew(data){
    document.querySelector(".list").remove()
    var list = document.createElement("ul")
    list.className = "list"
    document.querySelector(".itemList").appendChild(list)
    array.push(data)
    Sort()
    for(var i=0;i<array.length;i++){
        var list = document.querySelector(".list")
        var li = document.createElement("li");
        li.id = "deleteItem"
        var item = `<li class="item-1" data-toggle="modal" data-target="#exampleModal" type="button" onclick="onEdit(this)">
                            <p class="p-text">${array[i]}</p>
                            <button class="btn-delete" id="delete-btn" onclick="Delete(this)">X</button>
                    </li>`
        li.innerHTML = item
        list.appendChild(li)
    }
}

// sort function
function Sort(){
    return array.sort();
}


// get value input to edit
function onEdit(item){
    selectedItem = item.children
    document.getElementById("inputValue").value = selectedItem[0].innerHTML
    for(var i=0;i<array.length;i++){
        if(array[i] === selectedItem[0].innerHTML){
            index = i
        }
    }
}


// update function
function update(data){
    array[index] = data
    selectedItem[0].innerHTML = data
    document.querySelector(".list").remove()
    var list = document.createElement("ul")
    list.className = "list"
    document.querySelector(".itemList").appendChild(list)
    Sort()
    for(var i=0;i<array.length;i++){
        var list = document.querySelector(".list")
        var li = document.createElement("li");
        li.id = "deleteItem"
        var item = `<li class="item-1" type="button" onclick="onEdit(this)">
                            <p class="p-text">${array[i]}</p>
                            <button class="btn-delete" id="delete-btn" onclick="Delete(this)">X</button>
                    </li>`
        li.innerHTML = item
        list.appendChild(li)
    }
}

// delete function
function Delete(items){
    if(confirm("Bạn có muốn xóa?")){
        for(var i=0;i<array.length;i++){
            if(array[i] === items.parentElement.children[0].innerHTML){
                console.log(array[i])
                delete array[i]
                Sort()
                array.pop()
            }
        }
        let item = items.parentElement.parentElement
        item.remove();
        event.stopPropagation()
    }
}

// reset form
function reset(){
    document.getElementById('inputValue').value = ""
}