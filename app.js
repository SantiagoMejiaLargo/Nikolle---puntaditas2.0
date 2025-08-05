function closeOffcanvas() {
  var offcanvas = bootstrap.Offcanvas.getInstance(
    document.getElementById("offcanvasExample")
  );
  if (offcanvas) {
    offcanvas.hide();
  }
}

const agregar = document.getElementById('add')
