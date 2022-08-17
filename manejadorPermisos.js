function handlePermission() {
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
  
 
  