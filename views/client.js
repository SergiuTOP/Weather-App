const form = document.getElementById('myForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('input[name="myInput"]').value;

  // Send the input data to the server
  const makeApiRequest = async () => {
    await fetch('http://localhost:3000/api/index'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        cityName: JSON.stringify(input),
      }
    }
  }


//   axios.post('/api/data', { input })
//   .then((response) => {
//      console.log(response.data);
//      response.render(input);
//    })
//   .catch((error) => {
//      console.error('Error:', error);
//    });
});