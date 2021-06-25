// check max concurrent request per host name limit for browser (chrome default is 6)
// https://docs.pushtechnology.com/cloud/latest/manual/html/designguide/solution/support/connection_limitations.html
const promisePool = (tasks, maxParallelRequest = 6) => {
  let numOfRequests = 0;
  let taskIndex = 0;
  const resolved = new Array(tasks.length).fill(null);

  return new Promise(resolve => {
    const getNextTask = () => {
      if (numOfRequests < maxParallelRequest && taskIndex < tasks.length) {
        tasks[taskIndex]().then(handleResult(taskIndex)).catch(handleResult(taskIndex));
        taskIndex++;
        numOfRequests++;
        getNextTask();
      } else if (numOfRequests === 0 && taskIndex === tasks.length) {
        resolve(resolved);
      }
    };
    const handleResult = index => result => {
      resolved[index] = result;
      numOfRequests--;
      getNextTask();
    };
    getNextTask();
  });
}

export default promisePool;