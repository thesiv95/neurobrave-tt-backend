const os = require("os");
const fs = require('fs');

//Create function to get CPU information
function cpuAverage() {

  //Initialise sum of idle and time of cores and fetch CPU info
  let totalIdle = 0, totalTick = 0;
  const cpus = os.cpus();

  //Loop through CPU cores
  for(let i = 0, len = cpus.length; i < len; i++) {

    //Select CPU core
    const cpu = cpus[i];

    //Total up the time in the cores tick
    for(type in cpu.times) {
      totalTick += cpu.times[type];
   }     

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
  }

  //Return the average Idle and Tick times
  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

//Grab first CPU Measure
const startMeasure = cpuAverage();

//Set delay for second Measure
setTimeout(function() { 

  //Grab second Measure
  const endMeasure = cpuAverage(); 

  //Calculate the difference in idle and total time between the measures
  const idleDifference = endMeasure.idle - startMeasure.idle;
  const totalDifference = endMeasure.total - startMeasure.total;

  //Calculate the average percentage CPU usage
  const percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

  //Output result to console
  fs.writeFileSync('cpu.txt', `${percentageCPU}% CPU Usage\n`, {flag: 'a+'});

}, 100);

module.exports = cpuAverage;