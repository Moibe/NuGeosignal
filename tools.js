function addTextRow(text, delay, id, writing_area) {
  
    textRowArea = writing_area;
    
    let p = document.createElement('p');
    // if id is not null then add id to the p element
    if (id != "") {
        p.id = id;
    }
    p.innerHTML = text;
   
    // if delay is not 0 then add delay to the p element
    if (delay != 0) {
        setTimeout(() => {
            textRowArea.appendChild(p);
        }, (timing_elements + delay) * 1000);
    } else {
        textRowArea.appendChild(p);
    }
}

function isLocalStorageAvailable(){
    console.log("Estoy en isLocalStorageAvailable...");
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        local_storage_available = true;
        return true;
        
       
    } catch(e) {
        local_storage_available = false;
        return false;
      
    }
}

function sumaVisita(){


    if (document.referrer == ''){

        console.log("El document referrer está vacío no sumes.");
        referido = 'vacio';
  
    }
    else{
        console.log("No está vacío el referrer.");
        console.log("El referrer es:");
        console.log(document.referrer);
        visitas = visitas + 1;
        
    }

    localStorage.setItem('visita_conversion', JSON.stringify(visitas));

}

function revisaVisitaConversion(){
    console.log("Estoy en revisaVisitaConversion...");
    
    try {
        visitas = JSON.parse(localStorage.getItem('visita_conversion')); 
        console.log("Existe" + existe);
        return true;
        
    } catch(e) {
        visitas = 'No existe';
        return false;
    }

    



}