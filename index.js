const xp={123:{"Name":"Guru","xp":560},
            456: {"Name": "Sanjay", "xp":460}}

async function verification(id) {
    return new Promise((resolve,reject)=> {
        const user=xp[id]
        if (user){
            resolve(true);
        }
        else{
            reject(false);
        }
    })
}

async function update(id,amount){
    return verification(id)
    .then(()=>xp[id]["xp"]+=amount)
}

async function sendmessage(id){
    return new Promise((resolve)=> {
        console.log("Sending message..");
        console.log(`${xp[id]["Name"]}'s xp has been updated!`)
        console.log(`New xp: ${xp[id]["xp"]}`)
        resolve("Successfully Updated")
    })
}

async function handleXP(id,amount){
    const verify=verification(id);
    verify
    .then(()=> update(id,amount))
    .then(()=>sendmessage(id))
    .catch((reason)=> {console.log("User not found")})
}


handleXP(345,400)