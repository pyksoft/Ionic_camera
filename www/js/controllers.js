angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('VibrationCtrl', function($scope,  $cordovaVibration) {

  $scope.spice = 'very';

  $scope.chiliSpicy = function () {
    $scope.spice = 'chili';
  };

  $scope.jalapenoSpicy = function () {
    $scope.spice = 'jalapeño';
  };

  $scope.vibrate = function(){
    $cordovaVibration.vibrate(1000);

    // navigator.vibrate(3000)
  }
/*
    // Vibrate 100ms
  $cordovaVibration.vibrate(1000);
*/
})

  .controller("CameraController", function ($scope, $cordovaCamera, $cordovaVibration) {

    $scope.takePhoto = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };

      alert('omg camera');
      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
        $cordovaVibration.vibrate(200);
      }, function (err) {
        // An error occured. Show a message to the user
        alert('Close and reopen the camera');
      });
    }

    $scope.choosePhoto = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
        $cordovaVibration.vibrate(200);
      }, function (err) {
        // An error occured. Show a message to the user
        alert('Close and reopen the album');
      });
    };
  })

  .controller('ContactCtrl', function ($scope, $cordovaContacts, $ionicPlatform) {

    

      $scope.getAllContacts = function () {
        alert('Doing stuff');
        document.addEventListener("deviceready", onDeviceReady, false);



              function onSuccess(contacts) {
                  alert('Found ' + contacts.length + ' contacts.');
              };

              function onError(contactError) {
                  alert('onError!');
              };

              // find all contacts with 'Bob' in any name field
              var options      = new ContactFindOptions();
              options.filter   = "A";
              options.multiple = true;
              options.desiredFields = [navigator.contacts.fieldType.id];
              options.hasPhoneNumber = true;
              var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
              navigator.contacts.find(fields, onSuccess, onError, options);



}
      /*  $cordovaContacts.find()
          .then(function (allContacts) {
            //omitting parameter to .find() causes all contacts to be returned
            $scope.contacts = allContacts;
            alert(allContacts);
            alert($scope.contacts);
          })*/

  });
