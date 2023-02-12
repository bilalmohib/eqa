const set_data = (data) => {
    return (dispatch) => {
        dispatch({ type: "SETDATA", data: data })
    }
}

const set_seller_data = (selldata) => {
    console.log("INDEX JS==>", selldata)
    return (dispatch) => {
        dispatch({ type: "SETSELLDATA", data: selldata })
    }
}

const setCurrentKey = (data) => {
  //  console.log("The key is: ", key)
    return (dispatch) => {
        dispatch({ type: "SETCURRENTKEY", data: data })
    }
}

const setSearchedData=(data)=>{
    console.log("The data data you you searched is in action is : ",data)
    return (dispatch) => {
        dispatch({type:"SETSEARCHEDDATA",data:data})
    }
}

const setSelectedCategory =(c) =>{
    console.log("The selected category is : ",c)
    return (dispatch)=>{
        dispatch({type:"SETSELECTEDCATEGORY",data:c})
    }
}

const showCondition=(data)=>{
    console.log("what do you mean by this==>",data)
    return (dispatch)=>{
        dispatch({type:"SETCONDITION",data:data})
    }
}



const add_bookmark = (i) => {
    console.log("The bookmark is: ", i)

    ////////////////////////////
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    dateTime = dateTime.toString();
    //  ////////////////////////////

    let bookmark={
        index:i,
        time:dateTime
    }

    //firebase.database().ref(`BookMark/`).push(bookmark);
    alert("Added to bookmark")
}

const get_bookmarked=()=>{
    return (dispatch) => {

        // let users = [];
        // firebase.database().ref(`BookMark/`).on('value', (snapshot) => {
        //     snapshot.forEach(function (data) {
        //         users.push(data.val())
        //     })
        //     dispatch({ type: "GET_BOOKMARKED", data: users })
        //     //console.log(users)
        // })

        dispatch({ type: "GET_BOOKMARKED", data: [] })
    }
}

const sendData = (data) => {
    console.log("challl nahi bhag raha hai", data)
    ////////////////////////////
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    dateTime = dateTime.toString();
    //  ////////////////////////////

    /////////////////////////////////////////////////////////////////////////    
    //Setting the current user
    let SellerData = {
        ...data,
        dateTime
    }
    let category = data.Category;


    //For storing all ads i.e to show at main page
    // firebase.database().ref(`WithSignIn/`).push(SellerData);
    alert("Your ad has been posted successfully")

    //For storing the seller personal ads
    //firebase.database().ref(`WithSignIn/${category}/${res12}`).push(SellerData);

    //For storing ads category wise
    //firebase.database().ref(`WithoutSignIn/${category}/`).push(SellerData);

}


const get_seller_all_data = () => {
    return (dispatch) => {

        let users = [];
        // firebase.database().ref(`WithSignIn/`).on('value', (snapshot) => {
        //     snapshot.forEach(function (data) {
        //         users.push(data.val())
        //     })
        
        //     dispatch({ type: "GETSELLDATA", data: users }) 
        //     //console.log(users)
        // })
        dispatch({ type: "GETSELLDATA", data: [] })        
    }
}



export {
    set_data,
    set_seller_data,
    sendData,
    get_seller_all_data,
    setCurrentKey,
    add_bookmark,
    get_bookmarked,
    setSelectedCategory,
    setSearchedData,
    showCondition
}