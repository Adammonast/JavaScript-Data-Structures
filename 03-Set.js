/* Sets - data structures similar to arrays, but there are no duplicate items and the items are no particular order */
// ES6 has a built-in set object, however it does NOT contain all the methods common in sets
// ES6 Sets includes methods: values, add, delete (remove), and size (not a method, but a property) (no need for () )

function mySet() {
  // The let collection will contain (hold) the set
  let collection = [];
  // This "has" method will check for the presence of an element and return true or false
  this.has = function (element) {
    // indexOf checks the indexes of the collection, -1 meaning it is empty
    return collection.indexOf(element) !== -1;
  };

  // This method will return ALL of the values in the set
  this.values = function () {
    return collection;
  };

  // This method will add an element to the set
  this.add = function (element) {
    // Invoke recently created "has" method to check for already existing methods
    if (!this.has(element)) {
      // If the set does NOT already contain the element, push the element into it
      collection.push(element);
      // Return true after push
      return true;
    }
    // If element already exists, push will be skipped and return false
    return false;
  };

  // This method will remove an element from a set
  this.remove = function (element) {
    // Again, check if the element already exists within the set
    if (this.has(element)) {
      // Set index variable to the targeted index within the collection
      index = collection.indexOf(element);
      // Splice starting at the index and pass in 1 for number of elements removed
      // Targets one element
      collection.splice(index, 1);
      // Return true when removed
      return true;
    }
    // Return false if not removed
    return false;
  };

  // This method will return the size of the collection
  this.size = function () {
    return collection.length;
  };

  /************************* METHODS NOT INCLUDED WITHIN ES6 SYNTAX BUT STILL USEFUL FOR SETS ******************************/

  // This method will return the union of two sets
  // Union will combine two sets, but leave out any duplicates or repeating elements
  // Call the union method on the original set and pass in the set that is to be combined
  this.union = function (otherSet) {
    // create a set that will contain the combined elements
    let unionSet = new mySet();
    // Call values method to get the current set's values
    let firstSet = this.values();
    // Call values method to get the values of the passed in set
    let secondSet = otherSet.values();
    // For each element in the current set, iterate and add each one to the combined set (unionSet)
    firstSet.forEach((element) => unionSet.add(element));
    // For each element in the passed-in set, iterate and add each one to the combined set (unionSet)
    secondSet.forEach((element) => unionSet.add(element));
    // Return the combined set at the end of the function
    return unionSet;
  };

  // This method will return the intersection of two sets as a new set
  // This will include ALL the items that are in both sets
  this.intersection = function (otherSet) {
    // Create a new set that will contain the intersection values
    let intersectionSet = new mySet();
    // Call values method to get the current set's values
    let firstSet = this.values();
    // For each element in the current set, iterate over
    firstSet.forEach((element) => {
      // Call has method from earlier, check if the pass-in set already has the elements
      if (otherSet.has(element)) {
        // If not, add the elements to the newly created intersectionSet
        intersectionSet.add(element);
      }
    });
    // Return the intersectionSet at the end
    return intersectionSet;
  };

  // This method will return the difference of two sets as a new set
  this.difference = function (otherSet) {
    // Create a new set that will contain the difference values
    let differenceSet = new mySet();
    // Call values method to get the current set's values
    let firstSet = this.values();
    // For each element in the current set, iterate over
    firstSet.forEach((element) => {
      // Call has method from earlier, check if the pass-in set does NOT have the elements already
      if (!otherSet.has(element)) {
        // If not, add the elements to the newly created differenceSet
        differenceSet.add(element);
      }
    });
    // Return the differenceSet at the end
    return differenceSet;
  };

  // This method will test if the set is a subset of a different set
  // Test if the first set is completely contained within the second set
  // Returns true or false
  this.subset = function (otherSet) {
    // Call values method to get the current set's values
    let firstSet = this.values();
    // Every method will test whether all the elements in the array pass the test implemented by the provided function
    return firstSet.every((value) => {
      // Checks if all the elements in the first are in the pass-in set
      return otherSet.has(value);
    });
  };
}

// Built out Set class
let setA = new mySet();
let setB = new mySet();
setA.add("a");
setB.add("b");
setB.add("c");
setB.add("a");
setB.add("d");
console.log(setA.subset(setB));
console.log(setA.intersection(setB).values());

// Built-in Set class
let setC = new Set();
let setD = new Set();
setC.add("a");
setD.add("b");
setD.add("c");
setD.add("a");
setD.add("d");
console.log(setD.values());
setD.delete("a");
console.log(setD.has("a"));
console.log(setD.add("d"));
