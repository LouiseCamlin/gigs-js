var Input = function () {

};

Input.prototype = {
  create: function () {
    var body = document.getElementsByTagName('body')[0];
    var search = document.createElement('input');
    body.appendChild(search);

    search.addEventListener('input', function() {
      console.log("woot console logging all day bro")
    })
  },







}



// console.log input field value
//then try to get it to connect to the api


module.exports = Input;
