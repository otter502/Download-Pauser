class storageClass{
    constructor(key, type, data){
        this.key = key;
        this.type = type;
        this.set(data);
    }
    
    get(){
        chrome.storage[this.type].get([this.key]);
    }
    set(value){
        chrome.storage[this.type].set({[this.key]: value});
    }
}


chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.session.set({ "state" : true })
});


chrome.action.onClicked.addListener(async (tab) => {
    let data = await chrome.storage.session.get(["state"]);
    currState = !data.state;

    chrome.storage.session.set({ "state": currState });

    if (currState) {
        chrome.action.setIcon({
            path: {
                "16" : "/images/download-Pauser-16.png",
                "32" : "/images/download-Pauser-32.png",
                "48" : "/images/download-Pauser-48.png",
                "128" : "/images/download-Pauser-128.png"
            }
        })
    } else {
        chrome.action.setIcon({
            path: {
                "16" : "/images/off-download-Pauser-16.png",
                "32" : "/images/off-download-Pauser-32.png",
                "48" : "/images/off-download-Pauser-48.png",
                "128" : "/images/off-download-Pauser-128.png"
            }
        })
    }
});


chrome.downloads.onCreated.addListener(async (item) => {
    // if (currState){
    chrome.downloads.pause(item.id);
    const id = item.id;
    
    
    let data = await chrome.storage.session.get(["state"]);
    let currState = data.state;

    console.log(!currState && item.danger === "safe");
    if (!currState && item.danger === "safe") {
        chrome.downloads.resume(id)
    }
    
    // }
})


