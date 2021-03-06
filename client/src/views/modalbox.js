var dropdown = require('./dropdown.js');
var Button = require('./button.js');

var ModalBox = function(){
  this.currentBoxOption;
  this.onModalClick;
}

ModalBox.prototype = {
  create: function(gig, onModalClick){
    this.onModalClick = onModalClick;
    if (this.currentBoxOption !== undefined) {
      this.clear(this.currentBoxOption);
    }
    var body = document.getElementsByTagName('body')[0];
    var jsonString = JSON.stringify(gig);
    var gigName = gig.name;
    var startDate= gig.dates.start.localDate;
    var pTag1 = document.createElement('p');
    var pTag2 = document.createElement('p');
    pTag1.innerText = gigName;
    pTag2.innerText = startDate;
    var url = '/api/listings';
    var confirmBox = document.createElement('div');
    this.currentBoxOption = confirmBox;
    confirmBox.id = 'Confirm-box';

    var confirmButton = this.createConfirmButton(url, jsonString, confirmBox)
    var cancelButton = this.createCancelButton(confirmBox)
    this.append(confirmBox, pTag1, pTag2, confirmButton, cancelButton)
    body.appendChild(confirmBox);
  },

  clear: function (node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.children[0]);
    }
    node.remove();
   },

  append: function() {
    for (var i =  1; i <= arguments.length - 1; i++) {
      arguments[0].appendChild(arguments[i]);
    }
  },

  createConfirmButton: function(url, jsonString, confirmBox){
    var buttonSubmit = new Button();
    var confirmButton = buttonSubmit.create("post", url, function(){
      this.clear(confirmBox)
      this.onModalClick();
    }.bind(this), jsonString);
    buttonSubmit.text("Add");
    buttonSubmit.button.className = 'buttons';
    return confirmButton;
  },

  createCancelButton: function(confirmBox){
    var buttonCancel = document.createElement('button');
    buttonCancel.innerText = 'Cancel';
    buttonCancel.className = 'buttons';
    buttonCancel.addEventListener('click', function(){
      this.clear(confirmBox)
    }.bind(this))
    return buttonCancel;
  }

}

module.exports = ModalBox;
