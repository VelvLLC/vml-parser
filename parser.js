function readvml(vml) {
    if(vml.slice(0, 8) != "%>velv<%"){
        console.error("Failed to load vml: incorrect syntax at vml:0:0 " + vml.slice(0, 8) + "\n                                                   ^^^^^^^^")
        return "<!DOCTYPE html><html><head><title>Error</title></head><body>Failed to load vml: incorrect syntax at vml:0:0 " + vml.slice(0, 8) + "</body></html>";
    }
    vml = vml.split("\n").join("").split("%").filter(chars => /\S/.test(chars))
    console.log(vml)
    let reservedWords = [">velv<", ">vlev<", "head", "tail", "body", "end", "text", "h1", "h2", "h3", "h4", "h5", "h6"]
    let toHTML = ["html", "/html", "head", "/head", "body", "/body", "span", "h1", "h2", "h3", "h4", "h5", "h6"];

    let outDoc = "<!DOCTYPE html>";
    for(var i = 0, k = vml.length; i < k; i ++){
        for(var j = 0, l = reservedWords.length; j < l; j ++){
            if(vml[i] == reservedWords[j]){
                outDoc += "<"+toHTML[j]+">"
            } else if(vml[i].split("").reverse().join("") == reservedWords[j]){
                outDoc += "</"+toHTML[j]+">"
            } else if(j == reservedWords.length - 1 && !reservedWords.includes(vml[i]) && !reservedWords.includes(vml[i].split("").reverse().join(""))){
                outDoc += vml[i]
            }
        }
    }
    return outDoc;
}
