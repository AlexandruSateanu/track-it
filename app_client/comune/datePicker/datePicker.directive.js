module.exports = function datePicker() {
  return {
    restrict: 'EA',
    scope: {
      dateForm: '=ngModel'
    },
    templateUrl: '/comune/datePicker/datePicker.template.html',
    controller: 'datePickerCtrl as dpvm'
  };
};
