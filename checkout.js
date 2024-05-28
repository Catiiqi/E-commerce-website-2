// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')


  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }else
      {
        event.preventDefault();
        const username = document.getElementById('username').value

        localStorage.setItem('username',username)

        window.location.href = 'homepage.html'
        
      }
      
      form.classList.add('was-validated')
    }, false)
  })
  
})()
function preventBackNavigation() {
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
      history.go(1);
  };
}
