module.exports = function dashboardCtrl () {
  var vm = this;
  vm.message = 'Bine ai venit!';

  vm.myProjects = {
    project1: {
      name: "Project 1",
      role: "Project Manager"
    },
    project2: {
      name: "Project 2",
      role: "Consultant"
    }
  };

  vm.recentTasks = {
    task1: {
      name: "Taskul numarul unu",
      date: "23-20-2017",
      log: "2 ore"
    },
    task1: {
      name: "Taskul numarul doi",
      date: "23-20-2017",
      log: "4 ore"
    },
  }
}
