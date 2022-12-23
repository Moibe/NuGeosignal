const btnBuscar = document.getElementById('btnBuscar');

//Lo comento porque aún no agregamos notificaciones.
//btnBuscar.addEventListener('click', displayNotification);

function handlePermission() {
  console.log("Entré a Handle Permissions...");
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        report(result.state);
        permiso = result.state;
        locate_sample.style.display = 'none';
      } else if (result.state === 'prompt') {
        report(result.state);
        permiso = result.state;
        //geoBtn.style.display = 'none';
        //navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
      } else if (result.state === 'denied') {
        report(result.state);
        permiso = result.state;
        //geoBtn.style.display = 'inline';
      }
      result.addEventListener('change', () => {
        report(result.state);
        permiso = result.state;
        if(window_aceptar_permiso == true && permiso == "granted"){
            locate_sample.style.display = 'none';
            registrarPosicion();
        }else{
            console.log("No haré nada ante el cambio de permiso...");
        }
      });
    });
  }
  
  function report(state) {
    console.log(`Permission ${state}`);
  }
  

  function handleNotificationPermissions() {


    console.log("Estoy en handleNotificationPermissions()...");

    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!");
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
          console.log("Desplegando otra notificacion...");

          navigator.serviceWorker.getRegistration().then(
            
          
          console.log("Llegué hasta aquí...")
            
            
            );

          // …
        }
      });
    }
    
      // At last, if the user has denied notifications, and you
      // want to be respectful there is no need to bother them anymore.
    

  }

  function displayNotification(){
  
console.log("Desplegando notificacion...");

if (Notification.permission === 'default'){

  console.log("El permiso está en default...");


  navigator.serviceWorker.getRegistration().then(reg =>

    {
  
  
      reg.showNotification('Hola mundo...');
    }
    
    
    
    
    );
  
  
    }


}

     
  