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

function revisaVisitaConversion(){
    console.log("Estoy en revisaVisitaConversion...");
    
    try {
        console.log("Estoy en el try de revisaVisitaConversion...")
        console.log("Visitas vale antes:");
        console.log(visitas);
        visitas = JSON.parse(localStorage.getItem('visita_conversion')); 
        console.log("SI SI Existe y guardo un valor en visitas");
        console.log("Éste valor:");
        console.log(visitas);
        return true;
        
    } catch(e) {
        console.log("Caimos al catch de revisaVisitaConversión...");
        console.log("Concluyo que visita_conversion no existía y por eso marcó error.");
        console.log("Esto vale visitas al momento:");
        console.log(visitas)
        return false;
    }

}

function sumaVisita(){

    //Sumará una visita a visitas_conversión si viene de un referrer.


    if (document.referrer == ''){

        console.log("El document referrer está vacío no sumes.");
        referido = 'vacio';
  
    }
    else{
        console.log("No está vacío el referrer.");
        console.log("El referrer es:");
        console.log(document.referrer);
        console.log("Visitas ANTES de extraer el dato vale:");
        console.log(visitas);
        visitas = JSON.parse(localStorage.getItem('visita_conversion')); 
        console.log("Visitas DESPUES de extraer el dato vale:");
        console.log(visitas);
        console.log("Ahora sumamos...");
        visitas = visitas + 1;
        console.log("Y visitas ahora vale:");
        console.log(visitas);    
        //Guarda el valor + 1 en localStorage.    
        localStorage.setItem('visita_conversion', JSON.stringify(visitas));
    }

    

}

