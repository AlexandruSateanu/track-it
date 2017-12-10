module.exports = function datePickerCustom() {
  return {
    restrict: 'EA',
    scope: {
      dateForm: '=ngModel',
      customDateOptions: '=datepickerOptions'
    },
    templateUrl: '/comune/datePickerCustom/datePickerCustom.template.html',
    controller: 'datePickerCustomCtrl as dpvm'
  };
};
